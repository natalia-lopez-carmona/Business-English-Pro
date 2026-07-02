/* ============================================================
   Business English Pro — MOTOR DE LA APP
   Router + progreso (localStorage) + motores de cada módulo
   ============================================================ */

/* ---------- Estado persistente ---------- */
const LS_KEY = "bep_state_v1";
const defaultState = () => ({
  done: {},          // lecciones/roles/etc completados: {id:true}
  quizScores: {},    // {quizId: pct}
  srs: {},           // {cardKey:{ease, due(ISO), reps}}
  flashReviewed: 0,
  streak: { count: 0, last: null },
  planDone: {},      // {"w1-0":true}
  writings: 0,
  simSessions: 0,
  vocabSessions: 0,  // sesiones de repaso de vocabulario completadas
  vocabBest: 0,      // mejor % en una sesión de repaso
  vocabBestStreak: 0,// mejor racha de aciertos seguidos en una sesión
  achievements: {},
  visited: {},       // {moduleId:true}
  speechReadings: [],// [{d:"2026-07-01", pct:82, src:"Entrevista"}] confianza de voz
  geminiKey: "",      // clave de API de Gemini del usuario (BYOK, solo local)
  geminiModel: "",    // override opcional del modelo (vacío = usa el valor por defecto)
  aiSpeakingSessions: 0
});
let state = load();

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return Object.assign(defaultState(), JSON.parse(raw));
  } catch (e) {}
  return defaultState();
}
function save() { localStorage.setItem(LS_KEY, JSON.stringify(state)); refreshChrome(); }

/* ---------- Mapa de datos (const no se adjunta a window) ---------- */
const DATA = { GRAMMAR, PRONUNCIATION, BUSINESS };

/* ---------- Utilidades ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const todayStr = () => new Date().toISOString().slice(0, 10);
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US"; u.rate = 0.95;
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}

/* ---------- Reconocimiento de voz (dictado en inglés) ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const speechInputSupported = () => !!SR;
let activeRec = null;
/* Conecta un botón 🎤 a un <textarea>: dicta en en-US y escribe el texto.
   Mantiene lo ya escrito; se puede editar antes de enviar.
   confEl (opcional): elemento donde se muestra el indicador de confianza.
   srcLabel (opcional): etiqueta de origen para el historial de Estadísticas. */
function attachMic(btn, ta, confEl, srcLabel) {
  if (!btn || !ta) return;
  if (!speechInputSupported()) {
    btn.disabled = true; btn.title = "Tu navegador no soporta dictado por voz (usa Chrome o Edge).";
    btn.textContent = "🎤 No disponible";
    return;
  }
  const reset = () => { btn.classList.remove("listening"); btn.textContent = "🎤 Hablar"; };
  reset();
  btn.onclick = () => {
    if (activeRec) { activeRec.stop(); return; }
    let rec;
    try { rec = new SR(); } catch (e) { toast("No se pudo iniciar el micrófono."); return; }
    rec.lang = "en-US"; rec.interimResults = true; rec.continuous = true; rec.maxAlternatives = 1;
    const base = ta.value.trim() ? ta.value.trim() + " " : "";
    let finalText = "", confSum = 0, confCount = 0, lowFinals = 0;
    if (confEl) { confEl.style.display = "none"; confEl.innerHTML = ""; }
    rec.onstart = () => { activeRec = rec; btn.classList.add("listening"); btn.textContent = "🔴 Escuchando… (toca para parar)"; };
    rec.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed")
        toast("Permiso de micrófono denegado. Ábrelo vía http://localhost (no con doble clic al archivo).");
      else if (e.error !== "aborted" && e.error !== "no-speech") toast("Micrófono: " + e.error);
    };
    rec.onend = () => {
      activeRec = null; reset(); ta.focus();
      if (confCount > 0) recordSpeechReading(Math.round(confSum / confCount * 100), srcLabel || "Voz");
    };
    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i], alt = res[0];
        if (res.isFinal) {
          finalText += alt.transcript + " ";
          if (alt.confidence > 0) { confSum += alt.confidence; confCount++; if (alt.confidence < 0.6) lowFinals++; }
        } else interim += alt.transcript;
      }
      ta.value = base + finalText + interim;
      if (confEl && confCount) showConfidence(confEl, confSum / confCount, lowFinals);
    };
    try { rec.start(); } catch (e) { /* ya iniciado */ }
  };
}
function stopMic() { if (activeRec) { try { activeRec.stop(); } catch (e) {} activeRec = null; } }

/* Guarda la confianza de una sesión de voz para el historial de Estadísticas */
function recordSpeechReading(pct, src) {
  state.speechReadings = state.speechReadings || [];
  state.speechReadings.push({ d: todayStr(), pct: pct, src: src });
  if (state.speechReadings.length > 120) state.speechReadings = state.speechReadings.slice(-120);
  touchStreak(); checkAchievements(); save();
}
function speechStats() {
  const r = state.speechReadings || [];
  if (!r.length) return { count: 0, avg: 0, best: 0, recentAvg: 0, readings: r };
  const avg = Math.round(r.reduce((a, x) => a + x.pct, 0) / r.length);
  const best = Math.max(...r.map(x => x.pct));
  const recent = r.slice(-10);
  const recentAvg = Math.round(recent.reduce((a, x) => a + x.pct, 0) / recent.length);
  return { count: r.length, avg, best, recentAvg, readings: r };
}

/* Indicador de confianza del reconocimiento de voz (calidad de pronunciación) */
function showConfidence(el, avg, lowFinals) {
  const pct = Math.round(avg * 100);
  let color, label, tip;
  if (pct >= 80) { color = "var(--ok)"; label = "Buena pronunciación 👍"; tip = "El reconocedor te entendió con claridad."; }
  else if (pct >= 60) { color = "var(--warn)"; label = "Aceptable"; tip = "Vocaliza un poco más y marca las vocales largas."; }
  else { color = "var(--bad)"; label = "Difícil de entender"; tip = "Repite más despacio y claro; revisa los sonidos en Pronunciación."; }
  const warn = lowFinals ? ` · ⚠️ ${lowFinals} frase(s) poco clara(s)` : "";
  el.style.display = "block";
  el.innerHTML = `
    <div class="spread" style="margin-bottom:4px">
      <span class="small"><b>🎯 Confianza del reconocimiento:</b> <b style="color:${color}">${pct}%</b> · ${label}${warn}</span>
    </div>
    <div class="mini-bar"><div class="mini-fill" style="width:${pct}%;background:${color}"></div></div>
    <div class="small muted" style="margin-top:4px">${tip}</div>`;
}

/* ---------- Racha de estudio ---------- */
function touchStreak() {
  const t = todayStr();
  if (state.streak.last === t) return;
  const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  state.streak.count = (state.streak.last === yesterday) ? state.streak.count + 1 : 1;
  state.streak.last = t;
  save();
}

/* ---------- Progreso global ---------- */
function totalTrackable() {
  let n = 0;
  n += GRAMMAR.length + PRONUNCIATION.length + BUSINESS.length; // lecciones
  n += SPEAKING.length + WRITING.length + READING.length;
  n += QUIZZES.length;
  n += VOCAB.decks.length;
  if (typeof TRAVEL_SCENARIOS !== "undefined") n += TRAVEL_SCENARIOS.length + TRAVEL_VOCAB.decks.length;
  n += 3; // simulador, interview module, flashcards milestone
  return n;
}
function doneCount() {
  let n = 0;
  const ids = [
    ...GRAMMAR.map(x => x.id), ...PRONUNCIATION.map(x => x.id), ...BUSINESS.map(x => x.id),
    ...SPEAKING.map(x => x.id), ...WRITING.map(x => "wr_" + x.id), ...READING.map(x => "rd_" + x.id),
    ...VOCAB.decks.map(x => "deck_" + x.id)
  ];
  if (typeof TRAVEL_SCENARIOS !== "undefined") {
    TRAVEL_SCENARIOS.forEach(s => ids.push(s.id));
    TRAVEL_VOCAB.decks.forEach(d => ids.push("tdeck_" + d.id));
  }
  ids.forEach(id => { if (state.done[id]) n++; });
  QUIZZES.forEach(q => { if ((state.quizScores[q.id] || 0) >= 60) n++; });
  if (state.simSessions > 0) n++;
  if (state.done["interview_reviewed"]) n++;
  if (state.flashReviewed >= 25) n++;
  return n;
}
function globalPct() { return Math.round((doneCount() / totalTrackable()) * 100); }
function estLevel() {
  const p = globalPct();
  if (p >= 85) return "B2+";
  if (p >= 60) return "B2";
  if (p >= 40) return "B1+";
  if (p >= 15) return "B1";
  return "B1.1";
}

/* ---------- Logros ---------- */
function checkAchievements() {
  const a = state.achievements;
  const set = (id) => { if (!a[id]) { a[id] = true; toast("🏆 Logro desbloqueado: " + (ACHIEVEMENTS.find(x => x.id === id)?.name || id)); } };
  if (doneCount() >= 1) set("first_step");
  if (GRAMMAR.every(g => state.done[g.id])) set("grammar_master");
  if (state.flashReviewed >= 25) set("word_collector");
  if ((state.vocabBest || 0) >= 90) set("vocab_champ");
  if (Object.values(state.quizScores).some(v => v >= 80)) set("quiz_ace");
  if (state.simSessions >= 1) set("interview_ready");
  if ((state.aiSpeakingSessions || 0) >= 1) set("ai_talker");
  const _sp = state.speechReadings || [];
  if (_sp.length >= 5 && (_sp.reduce((a, x) => a + x.pct, 0) / _sp.length) >= 80) set("clear_voice");
  if (state.writings >= 3) set("writer");
  if (state.streak.count >= 7) set("streak_7");
  if (globalPct() >= 50) set("halfway");
  if (globalPct() >= 100) set("graduate");
  save();
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  let el = $("#toast");
  if (!el) { el = document.createElement("div"); el.id = "toast"; document.body.appendChild(el);
    el.style.cssText = "position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#212a3b;border:1px solid #2a3446;color:#e6ebf5;padding:12px 18px;border-radius:12px;z-index:100;box-shadow:0 10px 30px rgba(0,0,0,.4);font-size:14px;max-width:90%"; }
  el.textContent = msg; el.style.opacity = "1";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.style.opacity = "0", 2600);
}

/* ---------- Marcar completado ---------- */
function markDone(id, label) {
  if (!state.done[id]) { state.done[id] = true; touchStreak(); toast("✔ " + (label || "Completado")); }
  checkAchievements(); save();
}

/* ============================================================
   NAVEGACIÓN
   ============================================================ */
let currentModule = "dashboard";
function buildNav() {
  const nav = $("#nav");
  nav.innerHTML = COURSE.modules.map(m => {
    const prog = moduleProgressHint(m);
    return `<div class="nav-item ${m.id === currentModule ? "active" : ""}" data-id="${m.id}">
      <span class="ico">${m.icon}</span><span>${m.title}</span>${prog}</div>`;
  }).join("");
  $$(".nav-item", nav).forEach(el => el.onclick = () => go(el.dataset.id));
}
function moduleProgressHint(m) {
  if (m.type === "lessons") {
    const arr = DATA[m.data]; const d = arr.filter(x => state.done[x.id]).length;
    return `<span class="mini">${d}/${arr.length}</span>`;
  }
  if (m.id === "flashcards") return `<span class="mini">${state.flashReviewed}</span>`;
  return "";
}
function go(id) {
  currentModule = id;
  state.visited[id] = true; save();
  buildNav();
  const m = COURSE.modules.find(x => x.id === id);
  const view = $("#view"); view.innerHTML = "";
  RENDER[m.type](view, m);
  window.scrollTo(0, 0);
  closeSidebar();
}

/* ---------- Chrome (topbar, badge) ---------- */
function refreshChrome() {
  $("#globalPct").textContent = globalPct() + "%";
  $("#globalFill").style.width = globalPct() + "%";
  $("#levelValue").textContent = estLevel();
  $("#streakCount").textContent = state.streak.count;
}

/* ============================================================
   RENDERERS
   ============================================================ */
const RENDER = {};

/* ---------- DASHBOARD ---------- */
RENDER.dashboard = (view) => {
  const pct = globalPct();
  const modules = COURSE.modules.filter(m => !["dashboard"].includes(m.id));
  view.innerHTML = `
    <div class="hero">
      <h1>Bienvenido a Business English Pro</h1>
      <p class="subtitle">${COURSE.meta.goal}</p>
      <div class="row">
        <span class="pill b1">Nivel actual: ${estLevel()}</span>
        <span class="pill">${pct}% completado</span>
        <span class="pill ok">🔥 Racha: ${state.streak.count} días</span>
      </div>
      <div style="margin-top:16px" class="row">
        <button class="btn" id="goAiSpeaking">🤖 Speaking con IA (nuevo)</button>
        <button class="btn secondary" id="continueBtn">▶ Continuar donde lo dejaste</button>
        <button class="btn secondary" id="goPlan">Ver plan de 16 semanas</button>
      </div>
    </div>
    <div class="grid grid-4">
      ${stat("Módulos", modules.length)}
      ${stat("Lecciones hechas", doneCount())}
      ${stat("Flashcards repasadas", state.flashReviewed)}
      ${stat("Simulacros entrevista", state.simSessions)}
      ${stat("Charlas con IA 🤖", state.aiSpeakingSessions || 0)}
    </div>
    <h2>Explora los módulos</h2>
    <div class="grid grid-3" id="modGrid">
      ${modules.map(m => moduleCard(m)).join("")}
    </div>`;
  $("#goAiSpeaking").onclick = () => go("aispeaking");
  $("#continueBtn").onclick = () => go(suggestNext());
  $("#goPlan").onclick = () => go("plan");
  $$("#modGrid .module-card").forEach(el => el.onclick = () => go(el.dataset.id));
};
function stat(lbl, num) { return `<div class="stat"><div class="num">${num}</div><div class="lbl">${lbl}</div></div>`; }
function moduleCard(m) {
  let p = "";
  if (m.type === "lessons") { const arr = DATA[m.data]; p = Math.round(arr.filter(x => state.done[x.id]).length / arr.length * 100); }
  return `<div class="card module-card" data-id="${m.id}" style="position:relative">
    ${m.id === "aispeaking" ? `<span class="pill ok" style="position:absolute;top:10px;right:10px">NUEVO</span>` : ""}
    <div style="font-size:26px">${m.icon}</div>
    <h3 style="margin:8px 0 4px">${m.title}</h3>
    ${p !== "" ? `<div class="mini-bar"><div class="mini-fill" style="width:${p}%"></div></div>` : `<div class="small muted">Abrir módulo →</div>`}
  </div>`;
}
function suggestNext() {
  for (const g of GRAMMAR) if (!state.done[g.id]) return "grammar";
  for (const b of BUSINESS) if (!state.done[b.id]) return "business";
  if (state.flashReviewed < 25) return "flashcards";
  if (state.simSessions < 1) return "simulator";
  return "plan";
}

/* ---------- OBJETIVOS / MÉTODO ---------- */
RENDER.objectives = (view) => {
  view.innerHTML = `
    <h1>🎯 Objetivos y metodología</h1>
    <p class="subtitle">Qué lograrás y cómo está diseñado el curso (basado en evidencia).</p>
    <div class="card">
      <div class="callout ok"><b>Punto de partida: B1 medio (B1.1).</b> El curso arranca con 4 lecciones de "Base B1" (preguntas, comparativos, preposiciones in/on/at, artículos e incontables) para asentar los cimientos antes de subir a B2. No necesitas un B1 sólido para empezar.</div>
      <h3>Al terminar podrás:</h3>
      <ul>
        <li>Aprobar entrevistas laborales en inglés con respuestas estructuradas (STAR).</li>
        <li>Participar y dirigir reuniones, dailies y one-on-ones.</li>
        <li>Escribir emails, minutas, informes y mensajes de Slack/Teams profesionales.</li>
        <li>Presentar, negociar y defender ideas con diplomacia.</li>
        <li>Comunicar ideas complejas con fluidez en un entorno internacional.</li>
      </ul>
      <div class="callout warn"><b>Errores frecuentes de hispanohablantes</b> que atacaremos: false friends (actually, assist, sensible), sobreuso del pasado simple, "I am agree", incontables con -s, orden de adjetivos, y sonar demasiado directo/brusco.</div>
      <p class="small muted">Recorrido: <span class="pill b1">B1 medio (B1.1)</span> → <span class="pill b2">B2 alto</span> (CEFR).</p>
    </div>
    <h2>Metodología aplicada</h2>
    <div class="grid grid-2">
      ${METHOD.map(m => `<div class="card"><h3>${m.name}</h3><p class="small">${m.how}</p></div>`).join("")}
    </div>`;
};

/* ---------- LECCIONES (grammar, pronun, business) ---------- */
RENDER.lessons = (view, m) => {
  const arr = DATA[m.data];
  view.innerHTML = `<h1>${m.icon} ${m.title}</h1>
    <p class="subtitle">Elige una lección. Marca como completada al terminar (Active Recall con el mini-quiz).</p>
    <div class="lesson-nav" id="lnav"></div>
    <div id="lbody"></div>`;
  const nav = $("#lnav");
  nav.innerHTML = arr.map((l, i) => `<div class="chip ${state.done[l.id] ? "done" : ""}" data-i="${i}">${state.done[l.id] ? "✓ " : ""}${i + 1}. ${l.title}</div>`).join("");
  const open = (i) => {
    $$(".chip", nav).forEach((c, ci) => c.classList.toggle("active", ci === i));
    renderLesson($("#lbody"), arr[i], m);
  };
  $$(".chip", nav).forEach(c => c.onclick = () => open(+c.dataset.i));
  open(0);
};
function renderLesson(el, l, m) {
  el.innerHTML = `<div class="card">
    <div class="spread"><h2 style="margin:0">${l.title}</h2><span class="pill ${l.cefr.toLowerCase()}">${l.cefr}</span></div>
    ${l.objectives ? `<div class="callout ok"><b>Objetivos:</b> ${l.objectives.join(" · ")}</div>` : ""}
    ${l.body}
    ${l.examples ? `<h3>Ejemplos</h3>${l.examples.map(e => exampleRow(e)).join("")}` : ""}
    ${l.quiz ? `<h3>Mini-quiz (Active Recall)</h3><div id="mq"></div>` : ""}
    <div class="row" style="margin-top:16px">
      <button class="btn" id="doneL">✔ Marcar lección completada</button>
    </div>
  </div>`;
  $$(".ex .speak", el).forEach(b => b.onclick = () => speak(b.dataset.t));
  if (l.quiz) renderInlineQuiz($("#mq"), l.quiz);
  $("#doneL").onclick = () => { markDone(l.id, "Lección completada"); RENDER.lessons($("#view"), m); };
}
function exampleRow(e) {
  return `<div class="ex"><div class="en">${esc(e.en)} <button class="btn small secondary speak" data-t="${esc(e.en)}">🔊</button></div><div class="es">${esc(e.es)}</div></div>`;
}
function renderInlineQuiz(host, quiz) {
  host.innerHTML = quiz.map((q, qi) => `<div class="q" data-qi="${qi}">
    <b>${qi + 1}. ${esc(q.q)}</b>
    ${q.options.map((o, oi) => `<div class="opt" data-oi="${oi}">${esc(o)}</div>`).join("")}
    <div class="feedback" style="display:none"></div>
  </div>`).join("");
  $$(".q", host).forEach((qEl, qi) => {
    const q = quiz[qi];
    $$(".opt", qEl).forEach((opt, oi) => opt.onclick = () => {
      if (qEl.dataset.answered) return;
      qEl.dataset.answered = "1";
      const fb = $(".feedback", qEl); fb.style.display = "block";
      $$(".opt", qEl).forEach((o, i) => {
        if (i === q.answer) o.classList.add("correct");
        if (i === oi && oi !== q.answer) o.classList.add("wrong");
      });
      fb.innerHTML = (oi === q.answer ? "✅ Correcto. " : "❌ ") + esc(q.explain);
    });
  });
}

/* ---------- VOCABULARIO ---------- */
RENDER.vocab = (view) => {
  view.innerHTML = `<h1>🗂️ Vocabulario laboral</h1>
    <p class="subtitle">Por temas. Cada palabra: IPA, audio, ejemplo, sinónimos/antónimos, error típico y contexto. Añade a repaso (SRS).</p>
    <div class="lesson-nav" id="dnav"></div>
    <div id="dbody"></div>`;
  const nav = $("#dnav");
  nav.innerHTML = VOCAB.decks.map((d, i) => `<div class="chip ${state.done["deck_" + d.id] ? "done" : ""}" data-i="${i}">${d.name} (${d.words.length})</div>`).join("");
  const open = (i) => {
    $$(".chip", nav).forEach((c, ci) => c.classList.toggle("active", ci === i));
    const d = VOCAB.decks[i];
    $("#dbody").innerHTML = `<div class="grid grid-2">${d.words.map(w => wordCard(w, d.id)).join("")}</div>
      <div class="row" style="margin-top:16px">
        <button class="btn secondary" id="addAll">＋ Añadir todo el tema a repaso (SRS)</button>
        <button class="btn" id="deckDone">✔ Marcar tema estudiado</button>
      </div>`;
    $$(".word .speak", $("#dbody")).forEach(b => b.onclick = () => speak(b.dataset.t));
    $$(".word .add", $("#dbody")).forEach(b => b.onclick = () => { addToSRS("v:" + b.dataset.k); toast("Añadido a repaso: " + b.dataset.k); });
    $("#addAll").onclick = () => { d.words.forEach(w => addToSRS("v:" + w.en)); toast("Tema añadido a repaso"); };
    $("#deckDone").onclick = () => { markDone("deck_" + d.id, "Tema estudiado"); RENDER.vocab(view); };
  };
  $$(".chip", nav).forEach(c => c.onclick = () => open(+c.dataset.i));
  open(0);
};
function wordCard(w, deckId) {
  return `<div class="card word">
    <div class="spread"><div><span style="font-size:20px;font-weight:800">${esc(w.en)}</span>
      <button class="btn small secondary speak" data-t="${esc(w.en)}">🔊</button></div>
      <span class="pill">${esc(w.ipa)}</span></div>
    <div class="small muted" style="margin:6px 0"><b>ES:</b> ${esc(w.es)}</div>
    <div class="small"><b>Def:</b> ${esc(w.def)}</div>
    <div class="ex" style="margin:8px 0"><span class="en">${esc(w.example)}</span></div>
    <div class="small"><b>Sinónimos:</b> ${esc(w.syn)} · <b>Antónimo:</b> ${esc(w.ant)}</div>
    <div class="callout warn small" style="margin:8px 0"><b>Ojo:</b> ${esc(w.error)}</div>
    <div class="small muted"><b>Contexto:</b> ${esc(w.ctx)}</div>
    <button class="btn small add" data-k="${esc(w.en)}" style="margin-top:8px">＋ Repaso</button>
  </div>`;
}

/* ---------- LISTENING ---------- */
RENDER.listening = (view) => {
  view.innerHTML = `<h1>🎧 Listening</h1>
    <p class="subtitle">Canales <b>reales y oficiales</b> de YouTube (enlaces estables, no vídeos inventados). Elige uno según tu foco. Usa las tareas de comprensión con cualquier vídeo.</p>
    <div class="card">
      <h3>Tareas de comprensión (aplícalas a cualquier vídeo)</h3>
      <ol class="small">${LISTENING_TASKS.map(t => `<li>${esc(t)}</li>`).join("")}</ol>
    </div>
    <div class="grid grid-2">
      ${LISTENING.map(v => `<div class="card">
        <div class="spread"><h3 style="margin:0">${esc(v.channel)}</h3><span class="pill b2">${esc(v.level)}</span></div>
        <div class="small muted" style="margin:6px 0"><b>Temas:</b> ${esc(v.topic)}</div>
        <div class="small"><b>Qué aprenderás:</b> ${esc(v.focus)}</div>
        <a class="btn small" href="${v.url}" target="_blank" rel="noopener" style="margin-top:10px;display:inline-block;text-decoration:none">▶ Abrir canal</a>
      </div>`).join("")}
    </div>
    <div class="callout">Consejo: activa subtítulos en inglés, no en español. Empieza por Oxford Online English y Business English Pod para inglés corporativo.</div>`;
};

/* ---------- SPEAKING ---------- */
RENDER.speaking = (view) => {
  view.innerHTML = `<h1>🗣️ Speaking — roleplays</h1>
    <p class="subtitle">Simulaciones reales. Lee la situación, grábate respondiendo en voz alta, compara con el modelo y pega tu texto en el Corrector.</p>
    <div class="grid grid-2">
      ${SPEAKING.map(s => `<div class="card">
        <div class="spread"><h3 style="margin:0">${esc(s.scenario)}</h3>${state.done[s.id] ? '<span class="pill ok">✓</span>' : ""}</div>
        <div class="small muted">${esc(s.role)}</div>
        <div class="callout small"><b>Tu turno:</b><ul>${s.prompts.map(p => `<li>${esc(p)}</li>`).join("")}</ul></div>
        <div class="small"><b>Frases útiles:</b> ${s.usefulPhrases.map(p => `<span class="hl">${esc(p)}</span>`).join(" ")}</div>
        <details style="margin-top:8px"><summary class="small muted" style="cursor:pointer">Ver respuesta modelo</summary>
          <div class="ex" style="margin-top:8px"><span class="en">${esc(s.model)}</span>
          <button class="btn small secondary speak" data-t="${esc(s.model)}">🔊 Escuchar</button></div></details>
        <button class="btn small" data-done="${s.id}" style="margin-top:10px">✔ Practicado</button>
      </div>`).join("")}
    </div>`;
  $$(".speak", view).forEach(b => b.onclick = () => speak(b.dataset.t));
  $$("[data-done]", view).forEach(b => b.onclick = () => { markDone(b.dataset.done, "Roleplay practicado"); RENDER.speaking(view); });
};

/* ---------- WRITING ---------- */
RENDER.writing = (view) => {
  view.innerHTML = `<h1>✍️ Writing</h1>
    <p class="subtitle">Escribe tu intento, compáralo con la versión nativa y usa la checklist. Marca como practicado al terminar.</p>
    <div class="card"><h3>Checklist de auto-corrección</h3><ul class="small">${WRITING_CHECKLIST.map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>
    ${WRITING.map(w => `<div class="card" style="margin-top:14px">
      <div class="spread"><h3 style="margin:0">${esc(w.title)}</h3><span class="pill ${w.cefr.toLowerCase()}">${w.cefr}</span></div>
      <div class="callout small"><b>Tarea:</b> ${esc(w.prompt)}</div>
      <div class="small"><b>Tips:</b> ${w.tips.map(t => esc(t)).join(" · ")}</div>
      <textarea rows="5" placeholder="Escribe tu intento aquí..." data-w="${w.id}" style="margin-top:8px"></textarea>
      <div class="row" style="margin-top:8px">
        <button class="btn small" data-check="${w.id}">🩺 Revisar en el Corrector</button>
        <button class="btn small secondary" data-model="${w.id}">👁 Ver versión nativa</button>
      </div>
      <div class="model-box" data-box="${w.id}" style="display:none"><div class="ex" style="margin-top:8px;white-space:pre-wrap"><span class="en">${esc(w.model)}</span></div></div>
    </div>`).join("")}`;
  $$("[data-model]", view).forEach(b => b.onclick = () => {
    const box = $(`[data-box="${b.dataset.model}"]`, view);
    box.style.display = box.style.display === "none" ? "block" : "none";
    if (box.style.display === "block") { state.writings++; save(); checkAchievements(); }
  });
  $$("[data-check]", view).forEach(b => b.onclick = () => {
    const t = $(`textarea[data-w="${b.dataset.check}"]`, view).value.trim();
    if (!t) { toast("Escribe algo primero 🙂"); return; }
    pendingCorrectorText = t; go("corrector");
  });
};

/* ---------- READING ---------- */
RENDER.reading = (view) => {
  view.innerHTML = `<h1>📖 Reading</h1>
    <p class="subtitle">Textos reales del mundo laboral. Lee, responde y revisa el vocabulario nuevo.</p>
    ${READING.map(r => `<div class="card" style="margin-top:14px">
      <div class="spread"><h3 style="margin:0">${esc(r.title)}</h3><span class="pill">${esc(r.type)}</span></div>
      <div class="ex" style="white-space:pre-wrap"><span class="en">${esc(r.text)}</span></div>
      <h3>Preguntas</h3><div class="mq" data-r="${r.id}"></div>
      <details style="margin-top:8px"><summary class="small muted" style="cursor:pointer">Vocabulario / expresiones</summary>
        <ul class="small">${r.vocab.map(v => `<li>${esc(v)}</li>`).join("")}</ul></details>
      <button class="btn small" data-rd="${r.id}" style="margin-top:8px">✔ Lectura completada</button>
    </div>`).join("")}`;
  READING.forEach(r => renderInlineQuiz($(`.mq[data-r="${r.id}"]`, view), r.questions));
  $$("[data-rd]", view).forEach(b => b.onclick = () => { markDone("rd_" + b.dataset.rd, "Lectura completada"); RENDER.reading(view); });
};

/* ---------- INTERVIEW (banco de preguntas) ---------- */
RENDER.interview = (view) => {
  view.innerHTML = `<h1>🤝 Entrevistas laborales</h1>
    <p class="subtitle">Las preguntas más frecuentes, con qué busca el reclutador, cómo estructurar, errores, y ejemplos B1 / B2 / natural.</p>
    <div class="row" style="margin-bottom:12px">
      <button class="btn" onclick="go('simulator')">🎙️ Ir al simulador dinámico</button>
      <button class="btn secondary" id="ivDone">✔ He revisado este módulo</button>
    </div>
    ${INTERVIEW.questions.map((q, i) => `<div class="card" style="margin-top:12px">
      <h3>${i + 1}. ${esc(q.q)}</h3>
      <div class="callout ok small"><b>Qué busca el reclutador:</b> ${esc(q.looksFor)}</div>
      <div class="small"><b>Cómo estructurar:</b> ${esc(q.structure)}</div>
      <div class="callout bad small"><b>Errores comunes:</b> ${q.errors.map(e => esc(e)).join(" · ")}</div>
      <details><summary class="small muted" style="cursor:pointer">Ver ejemplos (B1 → B2 → natural)</summary>
        <div class="ex"><span class="tag">Ejemplo B1 (mejorable)</span><br><span>${esc(q.b1)}</span></div>
        <div class="ex"><span class="tag">Ejemplo B2 (objetivo)</span><br><span class="en">${esc(q.b2)}</span> <button class="btn small secondary speak" data-t="${esc(q.b2)}">🔊</button></div>
        <div class="ex"><span class="tag">Versión natural (nativa)</span><br><span class="en">${esc(q.natural)}</span> <button class="btn small secondary speak" data-t="${esc(q.natural)}">🔊</button></div>
        <div class="small muted">Variantes: ${q.variants.map(v => `"${esc(v)}"`).join(" · ")}</div>
      </details>
    </div>`).join("")}`;
  $$(".speak", view).forEach(b => b.onclick = () => speak(b.dataset.t));
  $("#ivDone").onclick = () => { markDone("interview_reviewed", "Módulo de entrevistas revisado"); };
};

/* ---------- SIMULATOR (entrevista dinámica, dificultad adaptativa) ---------- */
let sim = null;
RENDER.simulator = (view) => {
  view.innerHTML = `<h1>🎙️ Simulador de entrevista</h1>
    <p class="subtitle">Respondo como reclutador. La dificultad sube si respondes bien y baja si te cuesta. Responde <b>escribiendo</b> o <b>hablando</b> (🎤). Recibirás feedback automático.</p>
    <div class="card">
      <div class="chat" id="chat"></div>
      <div class="row" style="margin-top:12px">
        <textarea id="simIn" rows="3" placeholder="Escribe tu respuesta en inglés... o pulsa 🎤 Hablar"></textarea>
      </div>
      <div class="row" style="margin-top:8px">
        <button class="btn" id="simSend">Enviar respuesta ▶</button>
        <button class="btn secondary" id="simMic">🎤 Hablar</button>
        <button class="btn secondary" id="simHint">💡 Pista</button>
        <button class="btn secondary" id="simEnd">Terminar y evaluar</button>
        <span class="small muted" id="simMeta"></span>
      </div>
      <div class="conf-badge" id="simConf" style="display:none;margin-top:8px"></div>
      <div class="small muted" style="margin-top:6px">🎤 requiere Chrome/Edge y abrir la app en <code>http://localhost</code> (no con doble clic al archivo).</div>
    </div>`;
  startSim();
  $("#simSend").onclick = () => { stopMic(); simSend(); };
  $("#simHint").onclick = simHint;
  $("#simEnd").onclick = () => { stopMic(); simEnd(); };
  $("#simIn").addEventListener("keydown", e => { if (e.key === "Enter" && e.ctrlKey) { stopMic(); simSend(); } });
  attachMic($("#simMic"), $("#simIn"), $("#simConf"), "Entrevista");
};
function startSim() {
  sim = { level: "easy", asked: [], count: 0, scores: [], q: null };
  botSay("Hi, thanks for coming in today. Let's start easy.");
  nextQuestion();
}
function difficultyLabel() { return { easy: "Fácil", medium: "Media", hard: "Difícil" }[sim.level]; }
function nextQuestion() {
  const bank = INTERVIEW.simulatorBank[sim.level].filter(q => !sim.asked.includes(q));
  const pool = bank.length ? bank : INTERVIEW.simulatorBank[sim.level];
  const q = pool[Math.floor(Math.random() * pool.length)];
  sim.q = q; sim.asked.push(q); sim.count++;
  botSay(`Question ${sim.count} · [${difficultyLabel()}]\n${q}`);
  $("#simMeta").textContent = `Dificultad: ${difficultyLabel()} · Preguntas: ${sim.count}`;
}
function botSay(t) { addBubble("bot", "Recruiter", t); }
function meSay(t) { addBubble("me", "You", t); }
function addBubble(cls, who, t) {
  const c = $("#chat"); if (!c) return;
  const b = document.createElement("div"); b.className = "bubble " + cls;
  b.innerHTML = `<div class="meta">${who}</div>${esc(t)}`;
  c.appendChild(b); c.scrollTop = c.scrollHeight;
}
function scoreAnswer(t) {
  let score = 0; const words = t.split(/\s+/).filter(Boolean).length;
  if (words >= 40) score += 2; else if (words >= 20) score += 1;
  if (/\b(result|increased|reduced|improved|delivered|led|achieved|grew|saved|%|percent)\b/i.test(t)) score += 2;
  if (/\b(for example|for instance|such as|in my role|in my previous)\b/i.test(t)) score += 1;
  if (/\b(however|therefore|although|moreover|as a result)\b/i.test(t)) score += 1;
  return score; // 0..6
}
function simSend() {
  const ta = $("#simIn"); const t = ta.value.trim();
  if (!t) { toast("Escribe tu respuesta 🙂"); return; }
  meSay(t); ta.value = "";
  const sc = scoreAnswer(t); sim.scores.push(sc);
  // Feedback
  const tips = INTERVIEW.feedbackRules.filter(r => r.test(t)).map(r => r.msg);
  let fb = sc >= 4 ? "✅ Strong answer!" : sc >= 2 ? "🙂 Good start — let's sharpen it." : "💪 Let's build this up.";
  if (tips.length) fb += "\n\nTips:\n• " + tips.join("\n• ");
  else fb += "\n\nGreat structure — clear, with an example and a result. Keep it up.";
  botSay(fb);
  // Adaptar dificultad
  if (sc >= 4 && sim.level === "easy") sim.level = "medium";
  else if (sc >= 4 && sim.level === "medium") sim.level = "hard";
  else if (sc <= 1 && sim.level === "hard") sim.level = "medium";
  else if (sc <= 1 && sim.level === "medium") sim.level = "easy";
  if (sim.count >= 5) { setTimeout(simEnd, 400); return; }
  setTimeout(nextQuestion, 500);
}
function simHint() {
  const q = sim.q || "";
  let hint = "Estructura: contexto breve → qué hiciste TÚ → resultado medible. Usa 'In my role I...' y añade un dato (%, tiempo, dinero).";
  if (/yourself|background|overview/i.test(q)) hint = "Present–Past–Future: qué haces ahora → logro clave → por qué este rol.";
  if (/weakness/i.test(q)) hint = "Debilidad real pero no fatal + cómo la estás mejorando.";
  if (/salary/i.test(q)) hint = "Da un rango investigado + flexibilidad: 'Based on my research, X–Y, but I'm flexible.'";
  if (/conflict|fail|difficult/i.test(q)) hint = "Usa STAR: Situation, Task, Action, Result.";
  botSay("💡 Hint: " + hint);
}
function simEnd() {
  if (!sim || !sim.scores.length) { toast("Responde al menos una pregunta."); return; }
  const avg = sim.scores.reduce((a, b) => a + b, 0) / sim.scores.length;
  const pct = Math.round(avg / 6 * 100);
  const verdict = pct >= 70 ? "Nivel B2 — ¡listo para entrevistas reales! 🎯" : pct >= 45 ? "B1+ — buen camino, añade más ejemplos y resultados." : "B1 — practica la estructura STAR y respuestas más largas.";
  state.simSessions++; touchStreak(); checkAchievements(); save();
  botSay(`— End of session —\nRespuestas: ${sim.scores.length} · Puntuación media: ${pct}%\nVeredicto: ${verdict}\n\nConsejo: revisa el módulo 'Entrevistas' para pulir las preguntas donde flojeaste, y vuelve a intentarlo.`);
  toast("Sesión guardada ✔ (" + pct + "%)");
}

/* ---------- SPEAKING CON IA (Google Gemini, clave propia del usuario) ----------
   Sin backend: cada usuario pega su propia clave gratuita de Gemini y se guarda
   solo en localStorage. La app llama directamente a la API de Gemini desde el
   navegador (fetch), que sí admite peticiones CORS desde el cliente. */
const AI_SCENARIOS = [
  { id: "free", label: "🗨️ Conversación libre", prompt: "Have a natural, friendly conversation about everyday topics: hobbies, weekend plans, food, travel, movies, current events." },
  { id: "smalltalk", label: "☕ Small talk de oficina", prompt: "You are a coworker making small talk with the student before a meeting starts — weather, weekend, coffee, commute, weekend plans." },
  { id: "standup", label: "📋 Daily stand-up", prompt: "You are the Scrum Master running a daily stand-up meeting. Ask the student what they did yesterday, what they'll do today, and whether they have any blockers." },
  { id: "client", label: "😠 Cliente molesto", prompt: "You are an unhappy client complaining about a delayed delivery. Be firm but professional, not aggressive, and let the student practice apologizing, de-escalating and offering a solution." },
  { id: "meeting", label: "💡 Defender una idea en una reunión", prompt: "You are a skeptical colleague in a meeting. The student will pitch an idea to you; push back politely, ask for data or reasons, and let them try to convince you." },
  { id: "interview", label: "🤝 Entrevista de trabajo", prompt: "You are a recruiter interviewing the student for a mid-level professional role. Ask one interview question at a time and follow up naturally based on their answers." },
  { id: "travel", label: "✈️ Aeropuerto / hotel", prompt: "You are hotel reception or airport staff. Help the student check in, resolve a problem with their booking, and answer their questions naturally." },
  { id: "negotiation", label: "🤝 Negociar un contrato", prompt: "You are a vendor negotiating a contract with the student, who represents their company. Discuss price, timeline and terms; be reasonable but do not give in immediately." }
];
let aiChat = null;        // { scenarioId, customTopic, label, systemPrompt, messages:[{role,text,hidden}], turns, busy }
let aiAutoSpeak = true;
let aiPendingEl = null;

function aiModel() { return (state.geminiModel && state.geminiModel.trim()) || "gemini-2.0-flash"; }

function aiSystemPrompt(scenarioId, customTopic) {
  const sc = AI_SCENARIOS.find(s => s.id === scenarioId) || AI_SCENARIOS[0];
  let p = `You are an English conversation partner helping a Spanish-speaking student practice spoken Business English. Student level: B1 aiming for B2. Role-play scenario: ${sc.prompt}`;
  if (customTopic) p += ` Try to steer the conversation towards this topic when it fits naturally: "${customTopic}".`;
  p += ` Rules: 1) Reply ONLY in English, in 2-4 short sentences suited for spoken conversation (this will be read aloud). 2) Stay in character for the roleplay the whole time. 3) End almost every turn with exactly one natural follow-up question, to keep the student talking. 4) If the student's last message has a clear grammar or vocabulary mistake, add one short gentle correction in parentheses right before your reply, like "(Tip: say 'I have 5 years of experience', not 'experiences') " — only when there is a real mistake, never more than one tip per turn, and skip it entirely if the message was correct. 5) Keep a warm, encouraging, natural tone, like a friendly native speaker — not a teacher lecturing.`;
  return p;
}

async function callGemini(apiKey, model, systemPrompt, history) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const body = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
    generationConfig: { temperature: 0.85, maxOutputTokens: 250 }
  };
  let res;
  try {
    res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  } catch (e) {
    throw new Error("Failed to fetch");
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = (data && data.error && data.error.message) || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  const cand = data && data.candidates && data.candidates[0];
  const parts = cand && cand.content && cand.content.parts;
  const text = parts ? parts.map(p => p.text || "").join("").trim() : "";
  if (!text) throw new Error("Respuesta vacía (puede que Gemini haya bloqueado el contenido).");
  return text;
}

function aiErrorMessage(e) {
  const m = (e && e.message) || "";
  if (/API_KEY_INVALID|API key not valid/i.test(m)) return "Tu clave de API no es válida. Revisa que la copiaste completa desde aistudio.google.com.";
  if (/429|quota|RESOURCE_EXHAUSTED/i.test(m)) return "Has superado el límite gratuito por ahora. Espera un minuto y vuelve a intentarlo.";
  if (/403|PERMISSION_DENIED/i.test(m)) return "Google ha rechazado la petición (permiso denegado). Verifica tu clave en aistudio.google.com.";
  if (/404|NOT_FOUND|not found for API version/i.test(m)) return "El modelo indicado no existe o no está disponible. Prueba a borrar el campo de modelo (opciones avanzadas) para usar el valor por defecto.";
  if (/Failed to fetch|NetworkError/i.test(m)) return "No se pudo conectar con Gemini. Revisa tu conexión a internet.";
  return "Error al hablar con la IA: " + m;
}

RENDER.aispeaking = (view) => {
  const hasKey = !!(state.geminiKey && state.geminiKey.trim());
  view.innerHTML = `<h1>🤖 Speaking con IA</h1>
    <p class="subtitle">Mantén una conversación real en inglés con una IA (Google Gemini). Habla o escribe, la IA responde en personaje y corrige tus errores con naturalidad. Necesitas tu propia clave gratuita de Gemini — se guarda solo en este navegador.</p>
    <div class="card" id="aiKeyCard">
      <div class="spread">
        <b>🔑 Clave de API de Gemini</b>
        <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Consigue una clave gratis ↗</a>
      </div>
      <div class="row" style="margin-top:8px">
        <input id="aiKeyIn" type="password" placeholder="Pega aquí tu clave de Gemini (empieza por AIza...)" value="${hasKey ? esc(state.geminiKey) : ""}" style="flex:1;min-width:220px">
        <button class="btn secondary" id="aiKeySave">Guardar clave</button>
        ${hasKey ? `<button class="btn small secondary" id="aiKeyClear">Borrar</button>` : ""}
      </div>
      <details style="margin-top:10px">
        <summary class="small muted" style="cursor:pointer">Opciones avanzadas (modelo)</summary>
        <div class="row" style="margin-top:8px">
          <input id="aiModelIn" placeholder="Modelo de Gemini (por defecto: gemini-2.0-flash)" value="${esc(state.geminiModel || "")}" style="flex:1;min-width:220px">
          <button class="btn small secondary" id="aiModelSave">Guardar modelo</button>
        </div>
        <div class="small muted" style="margin-top:6px">Cámbialo solo si Google renombra o retira el modelo por defecto. Ejemplos: <code>gemini-2.0-flash</code>, <code>gemini-2.5-flash</code>, <code>gemini-2.0-flash-lite</code>.</div>
      </details>
      <div class="small muted" style="margin-top:8px">Tu clave se guarda únicamente en el almacenamiento local de tu navegador (igual que tu progreso) y solo se envía a la API de Google al conversar — nunca a un servidor nuestro, porque esta app no tiene backend. No la compartas ni la uses en un ordenador público.</div>
    </div>
    <div id="aiBody" style="margin-top:14px"></div>`;

  $("#aiKeySave").onclick = () => {
    const v = $("#aiKeyIn").value.trim();
    if (!v) { toast("Pega tu clave primero 🙂"); return; }
    state.geminiKey = v; save();
    toast("Clave guardada ✔");
    renderAiBody();
  };
  const clearBtn = $("#aiKeyClear");
  if (clearBtn) clearBtn.onclick = () => {
    if (!confirm("¿Borrar tu clave guardada?")) return;
    state.geminiKey = ""; save(); aiChat = null;
    go("aispeaking");
  };
  $("#aiModelSave").onclick = () => {
    state.geminiModel = $("#aiModelIn").value.trim(); save();
    toast("Modelo guardado ✔");
  };
  renderAiBody();
};

function renderAiBody() {
  const host = $("#aiBody"); if (!host) return;
  const hasKey = !!(state.geminiKey && state.geminiKey.trim());
  if (!hasKey) {
    host.innerHTML = `<div class="callout small">Pega tu clave arriba para empezar a practicar. Es gratis y tarda menos de un minuto en aistudio.google.com.</div>`;
    return;
  }
  if (!aiChat) { renderScenarioPicker(host); return; }
  renderAiChat(host);
}

function renderScenarioPicker(host) {
  host.innerHTML = `<div class="card">
      <h3 style="margin-top:0">Elige un escenario</h3>
      <div class="lesson-nav" id="aiScenarios">
        ${AI_SCENARIOS.map((s, i) => `<button class="chip${i === 0 ? " active" : ""}" data-id="${s.id}">${esc(s.label)}</button>`).join("")}
      </div>
      <div class="row" style="margin-top:12px">
        <input id="aiTopicIn" placeholder="O escribe tu propio tema (opcional)...">
        <button class="btn" id="aiStart">Empezar a hablar ▶</button>
      </div>
    </div>`;
  let selected = AI_SCENARIOS[0].id;
  $$(".chip", $("#aiScenarios")).forEach(c => {
    c.onclick = () => { $$(".chip", $("#aiScenarios")).forEach(x => x.classList.remove("active")); c.classList.add("active"); selected = c.dataset.id; };
  });
  $("#aiStart").onclick = () => {
    const topic = $("#aiTopicIn").value.trim();
    startAiChat(selected, topic);
  };
}

function startAiChat(scenarioId, customTopic) {
  const sc = AI_SCENARIOS.find(s => s.id === scenarioId) || AI_SCENARIOS[0];
  aiChat = {
    scenarioId, customTopic, label: sc.label,
    systemPrompt: aiSystemPrompt(scenarioId, customTopic),
    messages: [], turns: 0, busy: false
  };
  renderAiBody();
  aiRequestReply("(Start the conversation now — greet me briefly and begin the roleplay, following your instructions.)", true);
}

function renderAiChat(host) {
  host.innerHTML = `<div class="card">
    <div class="spread" style="margin-bottom:8px">
      <b>${esc(aiChat.label)}</b>
      <label class="small muted" style="display:flex;align-items:center;gap:6px;cursor:pointer">
        <input type="checkbox" id="aiAutoSpeak" ${aiAutoSpeak ? "checked" : ""}> Leer respuestas en voz alta
      </label>
    </div>
    <div class="chat" id="aiChatBox"></div>
    <div class="row" style="margin-top:12px">
      <textarea id="aiIn" rows="3" placeholder="Escribe tu respuesta en inglés... o pulsa 🎤 Hablar"></textarea>
    </div>
    <div class="row" style="margin-top:8px">
      <button class="btn" id="aiSend">Enviar ▶</button>
      <button class="btn secondary" id="aiMic">🎤 Hablar</button>
      <button class="btn secondary" id="aiNewScenario">🔁 Cambiar escenario</button>
      <button class="btn secondary" id="aiEnd">Terminar y evaluar</button>
    </div>
    <div class="conf-badge" id="aiConf" style="display:none;margin-top:8px"></div>
    <div class="small muted" style="margin-top:6px">🎤 requiere Chrome/Edge y abrir la app en <code>http://localhost</code> (no con doble clic al archivo).</div>
  </div>`;
  aiChat.messages.filter(m => !m.hidden).forEach(m => addAiBubble(m.role === "user" ? "me" : "bot", m.role === "user" ? "Tú" : "IA", m.text));
  $("#aiSend").onclick = aiSendClick;
  $("#aiIn").addEventListener("keydown", e => { if (e.key === "Enter" && e.ctrlKey) aiSendClick(); });
  $("#aiNewScenario").onclick = () => { stopMic(); aiChat = null; renderAiBody(); };
  $("#aiEnd").onclick = () => { stopMic(); aiEnd(); };
  $("#aiAutoSpeak").onchange = (e) => { aiAutoSpeak = e.target.checked; };
  attachMic($("#aiMic"), $("#aiIn"), $("#aiConf"), "Speaking IA");
  renderAiControls();
}

function renderAiControls() {
  const busy = !!(aiChat && aiChat.busy);
  ["aiSend", "aiMic", "aiNewScenario", "aiEnd"].forEach(id => { const el = $("#" + id); if (el) el.disabled = busy; });
}

function addAiBubble(cls, who, t, pending, isError) {
  const c = $("#aiChatBox"); if (!c) return null;
  const b = document.createElement("div");
  b.className = "bubble " + cls + (pending ? " ai-pending" : "") + (isError ? " ai-error" : "");
  b.innerHTML = `<div class="meta">${esc(who)}</div>${esc(t)}`;
  if (cls === "bot" && !pending && !isError) {
    b.innerHTML += ` <button class="btn small secondary speak" data-t="${esc(t)}" style="margin-top:6px">🔊</button>`;
  }
  c.appendChild(b); c.scrollTop = c.scrollHeight;
  const btn = b.querySelector(".speak"); if (btn) btn.onclick = () => speak(btn.dataset.t);
  return b;
}

function aiSendClick() {
  const ta = $("#aiIn"); const t = ta.value.trim();
  if (!t) { toast("Escribe o di algo primero 🙂"); return; }
  ta.value = "";
  aiRequestReply(t, false);
}

async function aiRequestReply(userText, hidden) {
  if (!aiChat || aiChat.busy) return;
  if (!hidden) addAiBubble("me", "Tú", userText);
  aiChat.messages.push({ role: "user", text: userText, hidden: !!hidden });
  aiChat.busy = true; renderAiControls();
  aiPendingEl = addAiBubble("bot", "IA", "…", true);
  try {
    const reply = await callGemini(state.geminiKey, aiModel(), aiChat.systemPrompt, aiChat.messages);
    aiChat.messages.push({ role: "model", text: reply });
    aiChat.turns++;
    if (aiPendingEl) { aiPendingEl.remove(); aiPendingEl = null; }
    addAiBubble("bot", "IA", reply);
    if (aiAutoSpeak) speak(reply);
  } catch (e) {
    if (aiPendingEl) { aiPendingEl.remove(); aiPendingEl = null; }
    addAiBubble("bot", "Error", aiErrorMessage(e), false, true);
  } finally {
    aiChat.busy = false; renderAiControls();
  }
}

async function aiEnd() {
  if (!aiChat) return;
  const realTurns = aiChat.messages.filter(m => m.role === "user" && !m.hidden).length;
  if (!realTurns) { toast("Escribe o di algo antes de terminar 🙂"); return; }
  if (aiChat.busy) return;
  aiChat.busy = true; renderAiControls();
  aiPendingEl = addAiBubble("bot", "IA", "Generando tu evaluación final…", true);
  try {
    const evalPrompt = "The roleplay is over. Based on everything the student said in this conversation, write a short assessment IN SPANISH for a Spanish-speaking English learner: 1) 2-3 fortalezas (strengths), 2) 2-3 áreas a mejorar con un ejemplo concreto de cómo decirlo mejor en inglés, 3) un nivel CEFR estimado (A2/B1/B1+/B2). Sé breve, concreto y motivador. No repitas toda la conversación.";
    const feedback = await callGemini(state.geminiKey, aiModel(), aiChat.systemPrompt, [...aiChat.messages, { role: "user", text: evalPrompt }]);
    if (aiPendingEl) { aiPendingEl.remove(); aiPendingEl = null; }
    addAiBubble("bot", "IA · Evaluación", feedback);
    state.aiSpeakingSessions = (state.aiSpeakingSessions || 0) + 1;
    touchStreak(); checkAchievements(); save();
    toast("Sesión guardada ✔");
  } catch (e) {
    if (aiPendingEl) { aiPendingEl.remove(); aiPendingEl = null; }
    addAiBubble("bot", "Error", aiErrorMessage(e), false, true);
  } finally {
    aiChat.busy = false; renderAiControls();
  }
}

/* ---------- CORRECTOR INTELIGENTE ---------- */
let pendingCorrectorText = "";
RENDER.corrector = (view) => {
  view.innerHTML = `<h1>🩺 Corrección inteligente</h1>
    <p class="subtitle">Pega una frase o texto en inglés. Detecto errores típicos de hispanohablantes, false friends, formalidad y estimación de nivel, con explicación de <b>por qué</b>.</p>
    <div class="card">
      <textarea id="corrIn" rows="6" placeholder="Escribe o pega tu texto en inglés... o pulsa 🎤 Hablar">${esc(pendingCorrectorText)}</textarea>
      <div class="row" style="margin-top:10px">
        <button class="btn" id="corrGo">Analizar</button>
        <button class="btn secondary" id="corrMic">🎤 Hablar</button>
        <button class="btn secondary" id="corrClear">Limpiar</button>
      </div>
      <div class="conf-badge" id="corrConf" style="display:none;margin-top:8px"></div>
      <div class="small muted" style="margin-top:6px">🎤 requiere Chrome/Edge y abrir la app en <code>http://localhost</code>. Habla en inglés y analiza lo que dijiste.</div>
    </div>
    <div id="corrOut"></div>`;
  pendingCorrectorText = "";
  $("#corrGo").onclick = () => { stopMic(); analyzeText($("#corrIn").value, $("#corrOut")); };
  $("#corrClear").onclick = () => { stopMic(); $("#corrIn").value = ""; $("#corrOut").innerHTML = ""; if ($("#corrConf")) { $("#corrConf").style.display = "none"; $("#corrConf").innerHTML = ""; } };
  attachMic($("#corrMic"), $("#corrIn"), $("#corrConf"), "Corrector");
  if ($("#corrIn").value.trim()) analyzeText($("#corrIn").value, $("#corrOut"));
};
/* Reglas heurísticas de corrección (deterministas, sin internet) */
const CORR_RULES = [
  { re: /\bactually\b/gi, msg: "'actually' = <b>en realidad</b> (no 'actualmente'). Si querías 'actualmente' usa <b>currently/nowadays</b>.", type: "false-friend" },
  { re: /\bi am agree\b/gi, msg: "'I am agree' ❌ → <b>I agree</b> ✅. 'agree' es verbo, no adjetivo.", type: "grammar" },
  { re: /\bexplain me\b/gi, msg: "'explain me' ❌ → <b>explain to me</b> ✅.", type: "grammar" },
  { re: /\b(informations|advices|feedbacks|equipments|softwares|peoples|staffs)\b/gi, msg: "Sustantivo incontable: no lleva -s. Ej: <b>information, advice, feedback, equipment, software, people, staff</b>.", type: "grammar" },
  { re: /\bi have \d+ years?\b/gi, msg: "Edad: <b>I am 30 (years old)</b>, no 'I have 30 years'. (Para experiencia sí: 'I have 3 years of experience'.)", type: "grammar" },
  { re: /\bassist to\b/gi, msg: "'assist to a meeting' ❌ (false friend). Asistir a = <b>attend</b>. 'assist' = ayudar.", type: "false-friend" },
  { re: /\bsensible\b/gi, msg: "'sensible' = <b>sensato</b> (no 'sensible'). Sensible (emociones) = <b>sensitive</b>.", type: "false-friend" },
  { re: /\beventually\b/gi, msg: "'eventually' = <b>finalmente/con el tiempo</b> (no 'eventualmente'). Eventualmente = <b>occasionally / from time to time</b>.", type: "false-friend" },
  { re: /\bfabric\b/gi, msg: "'fabric' = <b>tela</b> (no 'fábrica'). Fábrica = <b>factory</b>.", type: "false-friend" },
  { re: /\bmake a question\b/gi, msg: "'make a question' ❌ → <b>ask a question</b> ✅.", type: "collocation" },
  { re: /\bdo a mistake\b/gi, msg: "'do a mistake' ❌ → <b>make a mistake</b> ✅.", type: "collocation" },
  { re: /\bnowadays.*\bactually\b/gi, msg: "Cuidado mezclando 'nowadays' y 'actually'.", type: "style" },
  { re: /\bi will can\b/gi, msg: "'will can' ❌ → <b>will be able to</b> ✅.", type: "grammar" },
  { re: /\bmore better\b/gi, msg: "'more better' ❌ → <b>better</b> ✅ (comparativo doble).", type: "grammar" },
  { re: /\bthe most \w+est\b/gi, msg: "Superlativo doble: usa 'the most X' O '-est', no ambos.", type: "grammar" },
  { re: /\bin the other hand\b/gi, msg: "'in the other hand' ❌ → <b>on the other hand</b> ✅.", type: "collocation" },
  { re: /\bpretend to\b/gi, msg: "'pretend' = <b>fingir</b> (no 'pretender'). Pretender/aspirar = <b>aim to / intend to</b>.", type: "false-friend" },
  { re: /\bactualy|recieve|adress|responsability|enviroment|bussiness|wich\b/gi, msg: "Ortografía: revisa (actually, receive, address, responsibility, environment, business, which).", type: "spelling" }
];
function analyzeText(text, out) {
  text = (text || "").trim();
  if (!text) { out.innerHTML = `<div class="callout warn">Escribe algo para analizar.</div>`; return; }
  const words = text.split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  const findings = [];
  CORR_RULES.forEach(r => { const m = text.match(r.re); if (m) findings.push({ hit: [...new Set(m.map(x => x.toLowerCase()))].join(", "), msg: r.msg, type: r.type }); });

  // Repetición de palabras (contenido)
  const stop = new Set("the a an and or but to of in on for with is are was were be been i you we they he she it my your our this that as at by from".split(" "));
  const freq = {};
  words.map(w => w.toLowerCase().replace(/[^a-z']/g, "")).filter(w => w.length > 3 && !stop.has(w)).forEach(w => freq[w] = (freq[w] || 0) + 1);
  const repeated = Object.entries(freq).filter(([, c]) => c >= 3).map(([w, c]) => `${w} (×${c})`);

  // Formalidad
  const informal = (text.match(/\b(gonna|wanna|gotta|kids|stuff|guys|yeah|cool|awesome)\b/gi) || []);
  const contractions = (text.match(/\b\w+'(re|ve|ll|m|s|d|t)\b/gi) || []);
  let formality = "Neutral";
  if (informal.length) formality = "Informal (evita en emails formales)";
  else if (!contractions.length && words.length > 15) formality = "Formal";

  // Nivel estimado (heurístico)
  const avgLen = words.length / Math.max(sentences.length, 1);
  const connectors = (text.match(/\b(however|therefore|although|moreover|nevertheless|whereas|as a result|furthermore|consequently)\b/gi) || []).length;
  const advVocab = (text.match(/\b(leverage|streamline|stakeholder|deliverable|proactive|prioritize|scalable|mitigate|align|ownership)\b/gi) || []).length;
  let lvl = "A2/B1";
  let pts = 0;
  if (avgLen >= 12) pts++; if (connectors >= 1) pts++; if (connectors >= 3) pts++; if (advVocab >= 1) pts++; if (advVocab >= 3) pts++; if (words.length >= 40) pts++;
  lvl = ["A2/B1", "B1", "B1+", "B2", "B2", "B2+", "C1"][Math.min(pts, 6)];

  out.innerHTML = `
    <div class="grid grid-4" style="margin:16px 0">
      ${stat("Palabras", words.length)}
      ${stat("Frases", sentences.length)}
      ${stat("Conectores", connectors)}
      ${stat("Nivel estimado", lvl)}
    </div>
    <div class="card">
      <h3>🔎 Errores y sugerencias (${findings.length})</h3>
      ${findings.length ? findings.map(f => `<div class="callout ${f.type === "false-friend" ? "bad" : "warn"} small"><b>[${f.type}]</b> "<i>${esc(f.hit)}</i>": ${f.msg}</div>`).join("") : `<div class="callout ok small">No detecté errores típicos de hispanohablantes. ¡Bien!</div>`}
      <h3>🧭 Naturalidad y estilo</h3>
      <ul class="small">
        <li><b>Formalidad:</b> ${formality}. ${contractions.length ? `Usas ${contractions.length} contracción(es) (natural en registro neutral/informal).` : "Sin contracciones (más formal)."}</li>
        <li><b>Vocabulario repetido:</b> ${repeated.length ? repeated.join(", ") + " → busca sinónimos para variar." : "buena variedad."}</li>
        <li><b>Conectores:</b> ${connectors === 0 ? "añade conectores (however, therefore, moreover) para sonar más B2." : "buen uso de conectores."}</li>
        <li><b>Longitud media de frase:</b> ${avgLen.toFixed(1)} palabras. ${avgLen < 8 ? "Frases muy cortas: combina algunas con conectores." : avgLen > 25 ? "Frases muy largas: divide para mayor claridad." : "adecuada."}</li>
      </ul>
      <div class="callout"><b>Recomendación:</b> ${recommendFromFindings(findings, lvl)}</div>
    </div>`;
  touchStreak();
}
function recommendFromFindings(findings, lvl) {
  const types = findings.map(f => f.type);
  if (types.includes("false-friend")) return "Repasa la lección 'Conectores y linking words' (false friends) y añade estas palabras a tus flashcards.";
  if (types.includes("grammar")) return "Repasa el módulo de Gramática, en especial modales e incontables.";
  if (types.includes("collocation")) return "Estudia 'Frases útiles' para fijar colocaciones naturales (make/do, ask a question).";
  if (lvl.startsWith("B2")) return "Buen nivel. Para pulir, trabaja fluidez con Shadowing (Pronunciación).";
  return "Escribe respuestas más largas con un ejemplo y un resultado medible; usa conectores.";
}

/* ---------- PHRASES ---------- */
RENDER.phrases = (view) => {
  view.innerHTML = `<h1>💬 Biblioteca de frases útiles</h1>
    <p class="subtitle">Por categoría. Incluye traducción, cuándo usarla / cuándo NO, y nivel de formalidad. Busca lo que necesites.</p>
    <div class="card"><input id="phSearch" placeholder="🔍 Buscar frase o palabra..."></div>
    <div id="phOut" style="margin-top:14px"></div>`;
  const draw = (filter) => {
    const f = (filter || "").toLowerCase();
    $("#phOut").innerHTML = PHRASES.map(cat => {
      const items = cat.items.filter(it => !f || (it.en + it.es).toLowerCase().includes(f));
      if (!items.length) return "";
      return `<h2>${esc(cat.category)}</h2>${items.map(it => `<div class="card" style="margin-bottom:10px">
        <div class="spread"><div class="en" style="font-weight:600">${esc(it.en)} <button class="btn small secondary speak" data-t="${esc(it.en)}">🔊</button></div>
        <span class="pill">${esc(it.formality)}</span></div>
        <div class="small muted">${esc(it.es)}</div>
        <div class="small" style="margin-top:6px"><b>✔ Cuándo:</b> ${esc(it.when)}</div>
        <div class="small"><b>✖ Cuándo no:</b> ${esc(it.avoid)}</div>
      </div>`).join("")}`;
    }).join("");
    $$(".speak", $("#phOut")).forEach(b => b.onclick = () => speak(b.dataset.t));
  };
  draw("");
  $("#phSearch").oninput = (e) => draw(e.target.value);
};

/* ---------- FLASHCARDS (SRS) ---------- */
function allCards() {
  const cards = [];
  const addWord = (w) => cards.push({ key: "v:" + w.en, front: w.en, ipa: w.ipa, back: `${w.es}\n\n${w.def}\nEj: ${w.example}` });
  VOCAB.decks.forEach(d => d.words.forEach(addWord));
  if (typeof TRAVEL_VOCAB !== "undefined") TRAVEL_VOCAB.decks.forEach(d => d.words.forEach(addWord));
  // Frases de viaje (escenarios + supervivencia) como tarjetas EN → ES
  const addPhrase = (en, es) => cards.push({ key: "t:" + en, front: en, ipa: "🧳 frase de viaje", back: es });
  if (typeof TRAVEL_SCENARIOS !== "undefined") TRAVEL_SCENARIOS.forEach(s => s.phrases.forEach(p => addPhrase(p.en, p.es)));
  if (typeof TRAVEL_SURVIVAL !== "undefined") TRAVEL_SURVIVAL.forEach(p => addPhrase(p.en, p.es));
  return cards;
}
function addToSRS(key) {
  if (!state.srs[key]) { state.srs[key] = { ease: 0, due: todayStr(), reps: 0 }; save(); }
}
function dueCards() {
  const t = todayStr();
  const all = allCards();
  // auto-incluir todas si el usuario no añadió ninguna
  if (Object.keys(state.srs).length === 0) all.forEach(c => state.srs[c.key] = { ease: 0, due: t, reps: 0 });
  return all.filter(c => state.srs[c.key] && state.srs[c.key].due <= t);
}
const SRS_INTERVALS = [1, 3, 7, 16, 35]; // días según ease
RENDER.flashcards = (view) => {
  const due = dueCards();
  view.innerHTML = `<h1>🔁 Repaso — Repetición espaciada (SRS)</h1>
    <p class="subtitle">Tarjetas que tocan hoy. Si aciertas ("Fácil/Bien") vuelven más tarde; si fallas, vuelven pronto. Basado en el algoritmo de repetición espaciada.</p>
    <div class="grid grid-4" style="margin-bottom:16px">
      ${stat("Vencen hoy", due.length)}
      ${stat("En repaso", Object.keys(state.srs).length)}
      ${stat("Repasadas (total)", state.flashReviewed)}
      ${stat("Vocabulario total", allCards().length)}
    </div>
    <div id="flashArea"></div>`;
  const area = $("#flashArea");
  let queue = due.slice();
  const nextCard = () => {
    if (!queue.length) {
      area.innerHTML = `<div class="card" style="text-align:center">
        <div style="font-size:40px">🎉</div><h3>¡Repaso del día completado!</h3>
        <p class="small muted">Vuelve mañana para las siguientes tarjetas. La constancia es lo que fija el vocabulario.</p>
        <button class="btn" onclick="go('dashboard')">Volver al inicio</button></div>`;
      return;
    }
    const c = queue[0];
    area.innerHTML = `
      <div class="flashcard" id="fc">
        <div class="flash-inner">
          <div class="flash-face"><div class="tag">Palabra</div><div class="word">${esc(c.front)}</div><div class="ipa">${esc(c.ipa)}</div>
            <button class="btn small secondary speak" data-t="${esc(c.front)}" style="margin-top:14px">🔊 Escuchar</button>
            <div class="small muted" style="margin-top:14px">Toca para ver la respuesta</div></div>
          <div class="flash-face flash-back"><div class="tag">Significado</div><div style="white-space:pre-wrap;font-size:15px;margin-top:8px">${esc(c.back)}</div></div>
        </div>
      </div>
      <div class="srs-btns" id="srsBtns" style="display:none">
        <button class="btn secondary" data-q="0">😖 Otra vez</button>
        <button class="btn secondary" data-q="1">🙂 Bien</button>
        <button class="btn" data-q="2">😎 Fácil</button>
      </div>
      <p class="small muted" style="text-align:center;margin-top:10px">${queue.length} restantes hoy</p>`;
    const fc = $("#fc");
    $(".speak", fc).onclick = (e) => { e.stopPropagation(); speak(c.front); };
    fc.onclick = () => { fc.classList.toggle("flipped"); if (fc.classList.contains("flipped")) $("#srsBtns").style.display = "flex"; };
    $$("#srsBtns .btn").forEach(b => b.onclick = () => {
      const grade = +b.dataset.q;
      const rec = state.srs[c.key] || { ease: 0, reps: 0 };
      if (grade === 0) rec.ease = 0; else rec.ease = Math.min(rec.ease + grade, SRS_INTERVALS.length - 1);
      rec.reps = (rec.reps || 0) + 1;
      const days = SRS_INTERVALS[rec.ease];
      rec.due = new Date(Date.now() + days * 864e5).toISOString().slice(0, 10);
      state.srs[c.key] = rec;
      state.flashReviewed++; touchStreak(); checkAchievements(); save();
      queue.shift();
      if (grade === 0) queue.push(c); // repetir al final si falló
      nextCard();
    });
  };
  nextCard();
};

/* ---------- QUIZZES / EVALUACIONES ---------- */
RENDER.quizzes = (view) => {
  view.innerHTML = `<h1>✅ Evaluaciones</h1>
    <p class="subtitle">Tests por área. Necesitas 60% para marcar como aprobado; 80%+ desbloquea un logro.</p>
    <div class="grid grid-3" id="qgrid">
      ${QUIZZES.map(q => `<div class="card module-card" data-q="${q.id}">
        <h3>${esc(q.title)}</h3>
        <div class="small muted">${q.questions.length} preguntas</div>
        <div class="mini-bar"><div class="mini-fill" style="width:${state.quizScores[q.id] || 0}%"></div></div>
        <div class="small" style="margin-top:6px">${state.quizScores[q.id] != null ? "Mejor: " + state.quizScores[q.id] + "%" : "Sin intentar"}</div>
      </div>`).join("")}
    </div>
    <div id="quizRun" style="margin-top:16px"></div>`;
  $$("#qgrid .module-card").forEach(el => el.onclick = () => runQuiz(el.dataset.q));
};
function runQuiz(id) {
  const quiz = QUIZZES.find(q => q.id === id);
  const host = $("#quizRun");
  host.innerHTML = `<div class="card"><h2>${esc(quiz.title)}</h2><div id="quizQs"></div>
    <button class="btn" id="quizSubmit" style="margin-top:12px">Calificar</button>
    <div id="quizResult" style="margin-top:12px"></div></div>`;
  const qh = $("#quizQs");
  qh.innerHTML = quiz.questions.map((q, qi) => `<div class="q" data-qi="${qi}">
    <b>${qi + 1}. ${esc(q.q)}</b>
    ${q.options.map((o, oi) => `<div class="opt" data-oi="${oi}">${esc(o)}</div>`).join("")}
  </div>`).join("");
  const sel = {};
  $$(".q", qh).forEach((qEl, qi) => $$(".opt", qEl).forEach(opt => opt.onclick = () => {
    $$(".opt", qEl).forEach(o => o.classList.remove("sel")); opt.classList.add("sel"); sel[qi] = +opt.dataset.oi;
  }));
  $("#quizSubmit").onclick = () => {
    let correct = 0;
    quiz.questions.forEach((q, qi) => {
      const qEl = $$(".q", qh)[qi];
      $$(".opt", qEl).forEach((o, oi) => {
        if (oi === q.answer) o.classList.add("correct");
        if (oi === sel[qi] && sel[qi] !== q.answer) o.classList.add("wrong");
      });
      if (sel[qi] === q.answer) correct++;
      const fb = document.createElement("div"); fb.className = "feedback";
      fb.innerHTML = esc(q.explain); qEl.appendChild(fb);
    });
    const pct = Math.round(correct / quiz.questions.length * 100);
    state.quizScores[id] = Math.max(state.quizScores[id] || 0, pct);
    touchStreak(); checkAchievements(); save();
    $("#quizResult").innerHTML = `<div class="callout ${pct >= 60 ? "ok" : "bad"}"><b>Resultado: ${correct}/${quiz.questions.length} (${pct}%)</b> — ${pct >= 80 ? "¡Excelente! 🎯" : pct >= 60 ? "Aprobado ✔" : "Repasa el módulo y vuelve a intentarlo."}</div>`;
    RENDER.quizzes($("#view")); // refrescar barras... pero re-render borra; en su lugar:
    setTimeout(() => { $("#quizRun") && ($("#quizRun").scrollIntoView({ behavior: "smooth" })); }, 10);
  };
  host.scrollIntoView({ behavior: "smooth" });
}

/* ---------- PLAN 16 SEMANAS ---------- */
RENDER.plan = (view) => {
  const totalDays = PLAN.weeks.reduce((a, w) => a + w.days.length, 0);
  const doneDays = Object.keys(state.planDone).filter(k => state.planDone[k]).length;
  view.innerHTML = `<h1>🗓️ Plan de estudio · 16 semanas</h1>
    <p class="subtitle">${esc(PLAN.intro)}</p>
    <div class="progress-bar" style="margin-bottom:6px"><div class="progress-fill" style="width:${Math.round(doneDays / totalDays * 100)}%"></div></div>
    <div class="small muted" style="margin-bottom:16px">${doneDays}/${totalDays} sesiones marcadas</div>
    ${PLAN.weeks.map((w, wi) => `<div class="card" style="margin-bottom:12px">
      <div class="spread"><h3 style="margin:0">Semana ${w.week}: ${esc(w.focus)}</h3></div>
      <table><tr><th>Día</th><th>Min</th><th>Tareas</th><th></th></tr>
      ${w.days.map((d, di) => { const key = `w${w.week}-${di}`; return `<tr>
        <td><b>${esc(d.day)}</b></td><td>${esc(d.min)}</td>
        <td>${d.tasks.map(t => esc(t)).join(" · ")}</td>
        <td><input type="checkbox" data-pk="${key}" ${state.planDone[key] ? "checked" : ""} style="width:18px;height:18px"></td>
      </tr>`; }).join("")}
      </table></div>`).join("")}`;
  $$('input[type=checkbox][data-pk]', view).forEach(cb => cb.onchange = () => {
    state.planDone[cb.dataset.pk] = cb.checked; if (cb.checked) touchStreak(); checkAchievements(); save();
    RENDER.plan(view);
  });
};

/* ---------- CALENDARIO ---------- */
RENDER.calendar = (view) => {
  const now = new Date(); const y = now.getFullYear(), mo = now.getMonth();
  const first = new Date(y, mo, 1); const days = new Date(y, mo + 1, 0).getDate();
  const startDow = (first.getDay() + 6) % 7; // lunes=0
  const monthName = now.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  // días estudiados: aproximamos con streak.last y planDone no tienen fecha; usamos un registro simple
  const studied = state.studyLog || {};
  let cells = "";
  ["L", "M", "X", "J", "V", "S", "D"].forEach(d => cells += `<div class="cal-day" style="min-height:auto;text-align:center;background:transparent;border:none;color:var(--muted)"><b>${d}</b></div>`);
  for (let i = 0; i < startDow; i++) cells += `<div></div>`;
  for (let d = 1; d <= days; d++) {
    const ds = `${y}-${String(mo + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const isToday = ds === todayStr();
    const done = studied[ds];
    cells += `<div class="cal-day ${isToday ? "today" : ""} ${done ? "done" : ""}"><div class="d">${d}</div>${done ? "✅" : ""}${isToday ? '<div class="small">hoy</div>' : ""}</div>`;
  }
  view.innerHTML = `<h1>📅 Calendario de estudio</h1>
    <p class="subtitle">Registra tus sesiones. Marca hoy como estudiado para mantener tu racha (🔥 ${state.streak.count}).</p>
    <div class="card"><div class="spread"><h3 style="margin:0;text-transform:capitalize">${monthName}</h3>
      <button class="btn small" id="markToday">✔ Marcar hoy como estudiado</button></div>
      <div class="cal-grid" style="margin-top:14px">${cells}</div></div>`;
  $("#markToday").onclick = () => {
    state.studyLog = state.studyLog || {}; state.studyLog[todayStr()] = true; touchStreak(); save(); RENDER.calendar(view);
    toast("¡Día registrado! 🔥");
  };
};

/* ---------- ESTADÍSTICAS ---------- */
RENDER.stats = (view) => {
  const gp = globalPct();
  const quizAvg = Object.values(state.quizScores); const qa = quizAvg.length ? Math.round(quizAvg.reduce((a, b) => a + b, 0) / quizAvg.length) : 0;
  const lessonsDone = [...GRAMMAR, ...PRONUNCIATION, ...BUSINESS].filter(l => state.done[l.id]).length;
  const lessonsTotal = GRAMMAR.length + PRONUNCIATION.length + BUSINESS.length;
  // recomendaciones según errores/lagunas
  const recs = [];
  if (Object.values(state.quizScores).some(v => v < 60)) recs.push("Tienes quizzes por debajo de 60%: repite las evaluaciones débiles.");
  if (lessonsDone < lessonsTotal) recs.push(`Te faltan ${lessonsTotal - lessonsDone} lecciones por completar.`);
  if (state.flashReviewed < 25) recs.push("Repasa más flashcards (SRS) para fijar vocabulario.");
  if (state.simSessions < 1) recs.push("Aún no has probado el simulador de entrevistas: hazlo esta semana.");
  if (state.streak.count < 3) recs.push("Construye una racha: estudia un poco cada día (aunque sean 15 min).");
  const sp = speechStats();
  if (sp.count === 0) recs.push("Prueba el micrófono 🎤 en los simuladores para medir tu pronunciación.");
  else if (sp.avg < 70) recs.push("Tu confianza de pronunciación media es " + sp.avg + "%. Practica Shadowing (Pronunciación) y vocaliza más despacio.");
  else if (sp.recentAvg > sp.avg) recs.push("¡Tu pronunciación está mejorando! (reciente " + sp.recentAvg + "% vs media " + sp.avg + "%). Sigue así.");
  if (!recs.length) recs.push("¡Vas muy bien! Sube la dificultad: simulador difícil + presentaciones de 5 min.");

  view.innerHTML = `<h1>📊 Estadísticas y recomendaciones</h1>
    <p class="subtitle">Tu progreso y qué hacer a continuación (recomendaciones automáticas según tus resultados).</p>
    <div class="grid grid-4">
      ${stat("Progreso global", gp + "%")}
      ${stat("Nivel estimado", estLevel())}
      ${stat("Racha", state.streak.count + " días")}
      ${stat("Media en quizzes", qa + "%")}
      ${stat("Lecciones", lessonsDone + "/" + lessonsTotal)}
      ${stat("Flashcards", state.flashReviewed)}
      ${stat("Simulacros", state.simSessions)}
      ${stat("Charlas con IA 🤖", state.aiSpeakingSessions || 0)}
      ${stat("Pronunciación 🎤", sp.count ? sp.avg + "%" : "—")}
    </div>
    ${renderSpeechSection(sp)}
    <div class="card" style="margin-top:16px"><h3>Progreso por área</h3>
      ${areaBar("Gramática", GRAMMAR.filter(g => state.done[g.id]).length, GRAMMAR.length)}
      ${areaBar("Business English", BUSINESS.filter(g => state.done[g.id]).length, BUSINESS.length)}
      ${areaBar("Pronunciación", PRONUNCIATION.filter(g => state.done[g.id]).length, PRONUNCIATION.length)}
      ${areaBar("Speaking", SPEAKING.filter(g => state.done[g.id]).length, SPEAKING.length)}
      ${areaBar("Reading", READING.filter(g => state.done["rd_" + g.id]).length, READING.length)}
      ${areaBar("Vocabulario (temas)", VOCAB.decks.filter(d => state.done["deck_" + d.id]).length, VOCAB.decks.length)}
    </div>
    <div class="card" style="margin-top:16px"><h3>🎯 Recomendaciones para ti</h3>
      <ul>${recs.map(r => `<li>${esc(r)}</li>`).join("")}</ul></div>`;
};
function areaBar(name, d, t) {
  const p = t ? Math.round(d / t * 100) : 0;
  return `<div style="margin:10px 0"><div class="spread small"><span>${name}</span><span class="muted">${d}/${t} (${p}%)</span></div>
    <div class="mini-bar"><div class="mini-fill" style="width:${p}%"></div></div></div>`;
}
/* Color según umbral de confianza de voz */
function confColor(p) { return p >= 80 ? "var(--ok)" : p >= 60 ? "var(--warn)" : "var(--bad)"; }
/* Sección de pronunciación hablada con mini-gráfica de tendencia */
function renderSpeechSection(sp) {
  if (!sp.count) {
    return `<div class="card" style="margin-top:16px"><h3>🎙️ Pronunciación hablada (voz)</h3>
      <p class="small muted">Aún no hay datos. Usa el botón 🎤 en el simulador de entrevistas, el de viajes o el corrector (con la app en <code>http://localhost</code>). Se guardará la confianza del reconocimiento para ver tu evolución aquí.</p></div>`;
  }
  const bars = sp.readings.slice(-20);
  const spark = bars.map(x => `<div title="${x.d} · ${x.src} · ${x.pct}%" style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;height:90px">
      <div style="height:${x.pct}%;background:${confColor(x.pct)};border-radius:4px 4px 0 0;min-height:3px"></div></div>`).join("");
  const trend = sp.recentAvg - sp.avg;
  const trendTxt = sp.count < 3 ? "" : (trend > 2 ? `<span class="pill ok">▲ mejorando (+${trend}%)</span>` : trend < -2 ? `<span class="pill" style="color:var(--warn)">▼ bajando (${trend}%)</span>` : `<span class="pill">estable</span>`);
  return `<div class="card" style="margin-top:16px">
    <div class="spread"><h3 style="margin:0">🎙️ Pronunciación hablada (voz)</h3>${trendTxt}</div>
    <div class="grid grid-4" style="margin:12px 0">
      ${stat("Sesiones de voz", sp.count)}
      ${stat("Confianza media", sp.avg + "%")}
      ${stat("Últimas 10", sp.recentAvg + "%")}
      ${stat("Mejor marca", sp.best + "%")}
    </div>
    <div class="small muted" style="margin-bottom:6px">Tendencia (últimas ${bars.length} sesiones):</div>
    <div style="display:flex;gap:3px;align-items:flex-end;padding:8px;background:var(--bg-2);border:1px solid var(--border);border-radius:10px">${spark}</div>
    <div class="small muted" style="margin-top:6px">🟢 ≥80% claro · 🟡 60–79% aceptable · 🔴 &lt;60% mejorar. Pasa el cursor sobre cada barra para ver fecha y origen.</div>
  </div>`;
}

/* ---------- LOGROS ---------- */
RENDER.achievements = (view) => {
  checkAchievements();
  const unlocked = Object.keys(state.achievements).length;
  view.innerHTML = `<h1>🏆 Logros</h1>
    <p class="subtitle">${unlocked}/${ACHIEVEMENTS.length} desbloqueados. La gamificación te ayuda a mantener el hábito.</p>
    <div class="grid grid-3">
      ${ACHIEVEMENTS.map(a => `<div class="badge ${state.achievements[a.id] ? "unlocked" : ""}">
        <div class="emoji">${a.emoji}</div><div class="name">${esc(a.name)}</div><div class="desc">${esc(a.desc)}</div>
        ${state.achievements[a.id] ? '<div class="pill ok" style="margin-top:8px">Desbloqueado</div>' : '<div class="pill" style="margin-top:8px">Bloqueado</div>'}
      </div>`).join("")}
    </div>`;
};

/* ---------- SESIÓN DE REPASO DE VOCABULARIO ---------- */
function vocabPool(deckId) {
  const pool = [];
  const push = (w, deckName) => pool.push({ en: w.en, es: w.es, ipa: w.ipa, example: w.example, def: w.def, deck: deckName });
  VOCAB.decks.forEach(d => { if (!deckId || deckId === d.id) d.words.forEach(w => push(w, d.name)); });
  if (typeof TRAVEL_VOCAB !== "undefined") TRAVEL_VOCAB.decks.forEach(d => { if (!deckId || deckId === d.id) d.words.forEach(w => push(w, "✈️ " + d.name)); });
  return pool;
}
/* Normalización y comparación tolerante para el modo escritura */
function normAns(s) {
  return (s || "").toLowerCase().trim()
    .replace(/[.,;:!¡¿?"'()]/g, "")
    .replace(/\s+/g, " ")
    .replace(/^(to|a|an|the)\s+/, "");
}
function acceptableForms(en) {
  return en.split("/").map(x => normAns(x.replace(/\(.*?\)/g, ""))).filter(Boolean);
}
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}
function makeVocabQ(w, distractorPool, mode) {
  if (mode === "type") return { w, mode: "type", dir: "es2en", promptText: w.es, answerText: w.en };
  const dir = Math.random() < 0.5 ? "en2es" : "es2en";
  const answerText = dir === "en2es" ? w.es : w.en;
  const promptText = dir === "en2es" ? w.en : w.es;
  const others = distractorPool.filter(x => x.en !== w.en);
  const distract = [];
  let guard = 0;
  while (distract.length < 3 && guard++ < 200 && others.length) {
    const cand = others[Math.floor(Math.random() * others.length)];
    const val = dir === "en2es" ? cand.es : cand.en;
    if (val !== answerText && !distract.includes(val)) distract.push(val);
  }
  const options = [answerText, ...distract].sort(() => Math.random() - 0.5);
  return { w, mode: "choice", dir, promptText, answerText, options, answerIndex: options.indexOf(answerText) };
}
function buildVocabQuestions(basePool, len, mode) {
  const full = vocabPool();
  const shuffled = basePool.slice().sort(() => Math.random() - 0.5);
  const n = Math.min(len, basePool.length);
  return shuffled.slice(0, n).map(w => makeVocabQ(w, full, mode));
}
let vsess = null;
RENDER.vocabsession = (view) => {
  const decks = [
    ...VOCAB.decks.map(d => ({ id: d.id, name: d.name, n: d.words.length })),
    ...(typeof TRAVEL_VOCAB !== "undefined" ? TRAVEL_VOCAB.decks.map(d => ({ id: d.id, name: "✈️ " + d.name, n: d.words.length })) : [])
  ];
  const total = vocabPool().length;
  view.innerHTML = `<h1>🎓 Sesión de repaso de vocabulario</h1>
    <p class="subtitle">Repaso activo y con puntuación de tu vocabulario (laboral + viajes). Elige el modo, mantén la <b>racha</b> 🔥 y las palabras falladas se añaden a tu <b>Repaso (SRS)</b>.</p>
    <div class="card">
      <div class="grid grid-4" style="margin-bottom:12px">
        ${stat("Palabras", total)}
        ${stat("Sesiones", state.vocabSessions || 0)}
        ${stat("Mejor %", (state.vocabBest || 0) + "%")}
        ${stat("Mejor racha 🔥", state.vocabBestStreak || 0)}
      </div>
      <label class="small muted">Modo</label>
      <div class="row" id="vsMode" style="margin-bottom:10px">
        <button class="chip active" data-mode="choice">🔘 Elegir opción</button>
        <button class="chip" data-mode="type">✍️ Escribir (más exigente)</button>
      </div>
      <label class="small muted">Tema a repasar</label>
      <select id="vsDeck"><option value="">Todos los temas (${total} palabras)</option>${decks.map(d => `<option value="${d.id}">${esc(d.name)} (${d.n})</option>`).join("")}</select>
      <label class="small muted" style="display:block;margin-top:12px">Número de preguntas</label>
      <div class="row" id="vsLen">
        <button class="chip active" data-n="10">10</button>
        <button class="chip" data-n="15">15</button>
        <button class="chip" data-n="20">20</button>
      </div>
      <div class="small muted" id="vsModeHint" style="margin-top:10px">Modo escribir: te mostramos el significado en español y escribes la palabra en inglés (acepta variantes y detecta erratas "casi").</div>
      <button class="btn" id="vsStart" style="margin-top:14px">▶ Empezar sesión</button>
    </div>
    <div id="vsRun"></div>`;
  let len = 10, mode = "choice";
  $$("#vsLen .chip").forEach(c => c.onclick = () => { $$("#vsLen .chip").forEach(x => x.classList.remove("active")); c.classList.add("active"); len = +c.dataset.n; });
  $$("#vsMode .chip").forEach(c => c.onclick = () => { $$("#vsMode .chip").forEach(x => x.classList.remove("active")); c.classList.add("active"); mode = c.dataset.mode; });
  $("#vsStart").onclick = () => {
    const pool = vocabPool($("#vsDeck").value);
    if (pool.length < 4) { toast("Este tema necesita al menos 4 palabras."); return; }
    vsess = { mode, questions: buildVocabQuestions(pool, len, mode), i: 0, correct: 0, missed: [], streak: 0, bestStreak: 0, view };
    renderVocabQ();
  };
};
function vsStreakPill() {
  return `<span class="pill" id="vsStreak" style="border-color:#5a3a2a;color:var(--warn)">🔥 Racha: <b>${vsess.streak}</b>${vsess.bestStreak ? " · mejor: " + vsess.bestStreak : ""}</span>`;
}
function updateStreakPill() {
  const el = $("#vsStreak"); if (el) el.innerHTML = `🔥 Racha: <b>${vsess.streak}</b>${vsess.bestStreak ? " · mejor: " + vsess.bestStreak : ""}`;
}
function vocabRegister(ok, q) {
  if (ok) {
    vsess.correct++; vsess.streak++;
    if (vsess.streak > vsess.bestStreak) vsess.bestStreak = vsess.streak;
    if ([5, 10, 15, 20].includes(vsess.streak)) toast("🔥 ¡Racha de " + vsess.streak + "!");
  } else { vsess.streak = 0; vsess.missed.push(q.w); }
  updateStreakPill();
}
function vocabShowFeedback(headMsg) {
  const q = vsess.questions[vsess.i], fb = $("#vsFb");
  fb.style.display = "block"; fb.dataset.done = "1";
  fb.innerHTML = `${headMsg} · <b>${esc(q.w.en)}</b> <span class="muted">${esc(q.w.ipa)}</span> — ${esc(q.w.es)}<br><span class="small muted">Ej: ${esc(q.w.example)}</span> <button class="btn small secondary" id="vsFbSpeak">🔊</button>`;
  $("#vsFbSpeak").onclick = () => speak(q.w.en + ". " + q.w.example);
  $("#vsNext").style.display = "inline-block";
}
function renderVocabQ() {
  const host = $("#vsRun"), q = vsess.questions[vsess.i];
  const header = `<div class="spread"><span class="tag">Pregunta ${vsess.i + 1}/${vsess.questions.length} · Aciertos: ${vsess.correct}</span>${vsStreakPill()}</div>
    <div class="progress-bar" style="margin:8px 0"><div class="progress-fill" style="width:${Math.round(vsess.i / vsess.questions.length * 100)}%"></div></div>`;
  if (vsess.mode === "type") {
    host.innerHTML = `<div class="card">${header}
      <div class="small muted">Escribe en inglés:</div>
      <div style="font-size:26px;font-weight:800;margin:6px 0">${esc(q.promptText)}</div>
      <input id="vsTypeIn" placeholder="tu respuesta en inglés..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      <div class="feedback" id="vsFb" style="display:none"></div>
      <div class="row" style="margin-top:10px">
        <button class="btn" id="vsCheck">Comprobar</button>
        <button class="btn secondary" id="vsSkip">No lo sé</button>
        <button class="btn" id="vsNext" style="display:none">Siguiente ▶</button>
      </div></div>`;
    const inp = $("#vsTypeIn"); inp.focus();
    inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); if ($("#vsNext").style.display === "none") vocabCheckTyped(false); else $("#vsNext").click(); } });
    $("#vsCheck").onclick = () => vocabCheckTyped(false);
    $("#vsSkip").onclick = () => vocabCheckTyped(true);
  } else {
    const dirLabel = q.dir === "en2es" ? "¿Qué significa?" : "¿Cómo se dice en inglés?";
    host.innerHTML = `<div class="card">${header}
      <div class="small muted">${dirLabel}</div>
      <div style="font-size:26px;font-weight:800;margin:6px 0">${esc(q.promptText)} ${q.dir === "en2es" ? '<button class="btn small secondary" id="vsSpeak">🔊</button>' : ""}</div>
      <div id="vsOpts">${q.options.map((o, i) => `<div class="opt" data-oi="${i}">${esc(o)}</div>`).join("")}</div>
      <div class="feedback" id="vsFb" style="display:none"></div>
      <button class="btn" id="vsNext" style="display:none;margin-top:12px">Siguiente ▶</button></div>`;
    if (q.dir === "en2es") $("#vsSpeak").onclick = () => speak(q.w.en);
    $$("#vsOpts .opt").forEach((opt, oi) => opt.onclick = () => vocabAnswer(oi));
  }
  $("#vsNext").onclick = () => { vsess.i++; if (vsess.i >= vsess.questions.length) endVocabSession(); else renderVocabQ(); };
}
function vocabAnswer(oi) {
  const opts = $("#vsOpts");
  if (opts.dataset.done) return; opts.dataset.done = "1";
  const q = vsess.questions[vsess.i];
  $$(".opt", opts).forEach((o, i) => { if (i === q.answerIndex) o.classList.add("correct"); if (i === oi && i !== q.answerIndex) o.classList.add("wrong"); o.style.pointerEvents = "none"; });
  const ok = oi === q.answerIndex;
  vocabRegister(ok, q);
  vocabShowFeedback(ok ? "✅ ¡Correcto!" : "❌ Respuesta: <b>" + esc(q.answerText) + "</b>");
}
function vocabCheckTyped(skip) {
  const fb = $("#vsFb"), inp = $("#vsTypeIn");
  if (fb.dataset.done) return;
  const q = vsess.questions[vsess.i];
  const typed = normAns(inp.value);
  if (!skip && !typed) { toast("Escribe tu respuesta o pulsa 'No lo sé'."); return; }
  inp.disabled = true; $("#vsCheck").disabled = true; $("#vsSkip").disabled = true;
  const forms = acceptableForms(q.w.en);
  let best = { d: Infinity, f: "" };
  forms.forEach(f => { const d = levenshtein(typed, f); if (d < best.d) best = { d, f }; });
  const thr = best.f.length <= 4 ? 1 : 2;
  const exact = !skip && best.d === 0;
  const near = !skip && !exact && best.d <= thr;
  vocabRegister(exact, q);
  let head;
  if (exact) head = "✅ ¡Correcto!";
  else if (near) head = '🟡 Casi — la forma correcta es <b>' + esc(q.w.en) + "</b> (cuida la ortografía)";
  else if (skip) head = "⏭️ Respuesta: <b>" + esc(q.w.en) + "</b>";
  else head = "❌ Respuesta: <b>" + esc(q.w.en) + "</b>";
  vocabShowFeedback(head);
  $("#vsTypeIn").focus();
}
function endVocabSession() {
  const pct = Math.round(vsess.correct / vsess.questions.length * 100);
  vsess.missed.forEach(w => addToSRS("v:" + w.en));
  state.vocabSessions = (state.vocabSessions || 0) + 1;
  state.vocabBest = Math.max(state.vocabBest || 0, pct);
  state.vocabBestStreak = Math.max(state.vocabBestStreak || 0, vsess.bestStreak);
  touchStreak(); checkAchievements(); save();
  const host = $("#vsRun");
  host.innerHTML = `<div class="card" style="text-align:center">
    <div style="font-size:42px">${pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "💪"}</div>
    <h2 style="margin:6px 0">${vsess.correct}/${vsess.questions.length} · ${pct}%</h2>
    <div class="row" style="justify-content:center;margin-bottom:6px">
      <span class="pill">${vsess.mode === "type" ? "✍️ Modo escribir" : "🔘 Modo elegir"}</span>
      <span class="pill" style="color:var(--warn)">🔥 Mejor racha: ${vsess.bestStreak}</span>
    </div>
    <p class="small muted">${pct >= 80 ? "¡Excelente dominio del vocabulario!" : pct >= 60 ? "Bien. Repasa las que fallaste." : "Sigue practicando: repite la sesión pronto."}</p>
    ${vsess.missed.length ? `<div class="callout warn small" style="text-align:left"><b>Para reforzar (añadidas a tu Repaso SRS):</b><br>${vsess.missed.map(w => "<b>" + esc(w.en) + "</b> — " + esc(w.es)).join("<br>")}</div>` : '<div class="callout ok small">¡Sin errores! 🎉</div>'}
    <div class="row" style="justify-content:center;margin-top:12px">
      <button class="btn" id="vsAgain">🔁 Otra sesión</button>
      ${vsess.missed.length ? '<button class="btn secondary" id="vsMissed">Repasar solo las falladas</button>' : ""}
      <button class="btn secondary" id="vsToSrs">Ir a Repaso (SRS)</button>
    </div>
  </div>`;
  $("#vsAgain").onclick = () => RENDER.vocabsession(vsess.view);
  $("#vsToSrs").onclick = () => go("flashcards");
  if (vsess.missed.length) {
    const missed = vsess.missed.slice(), view = vsess.view, mode = vsess.mode;
    $("#vsMissed").onclick = () => { vsess = { mode, questions: buildVocabQuestions(missed, missed.length, mode), i: 0, correct: 0, missed: [], streak: 0, bestStreak: 0, view }; renderVocabQ(); };
  }
  toast("Sesión de vocabulario: " + pct + "%");
}

/* ---------- INGLÉS PARA VIAJES ---------- */
RENDER.travel = (view) => {
  const totalT = TRAVEL_SCENARIOS.length + TRAVEL_VOCAB.decks.length;
  const doneT = TRAVEL_SCENARIOS.filter(s => state.done[s.id]).length + TRAVEL_VOCAB.decks.filter(d => state.done["tdeck_" + d.id]).length;
  view.innerHTML = `<h1>✈️ Inglés para viajes</h1>
    <p class="subtitle">Todo lo que necesitas para moverte en inglés: aeropuerto, hotel, restaurantes, transporte, salud, compras y emergencias. Diálogos reales, frases con traducción y audio.</p>
    <div class="progress-bar" style="margin-bottom:6px"><div class="progress-fill" style="width:${Math.round(doneT / totalT * 100)}%"></div></div>
    <div class="small muted" style="margin-bottom:16px">${doneT}/${totalT} secciones estudiadas</div>
    <div class="lesson-nav" id="tnav">
      <div class="chip active" data-tab="scenarios">🎭 Situaciones (${TRAVEL_SCENARIOS.length})</div>
      <div class="chip" data-tab="sim">🎙️ Mini-simulador (${TRAVEL_SIM.length})</div>
      <div class="chip" data-tab="survival">🆘 Frases de supervivencia</div>
      <div class="chip" data-tab="vocab">🗂️ Vocabulario de viajes</div>
    </div>
    <div id="tbody"></div>`;
  const tabs = { scenarios: travelScenarios, sim: travelSimMenu, survival: travelSurvival, vocab: travelVocab };
  const openTab = (name) => {
    $$("#tnav .chip").forEach(c => c.classList.toggle("active", c.dataset.tab === name));
    tabs[name]($("#tbody"), view);
  };
  $$("#tnav .chip").forEach(c => c.onclick = () => openTab(c.dataset.tab));
  openTab("scenarios");
};
function travelScenarios(host, view) {
  host.innerHTML = `<div class="lesson-nav" id="scnav">${TRAVEL_SCENARIOS.map((s, i) =>
    `<div class="chip ${state.done[s.id] ? "done" : ""}" data-i="${i}">${s.icon} ${s.name}${state.done[s.id] ? " ✓" : ""}</div>`).join("")}</div>
    <div id="scbody"></div>`;
  const open = (i) => {
    $$("#scnav .chip").forEach((c, ci) => c.classList.toggle("active", ci === i));
    const s = TRAVEL_SCENARIOS[i];
    $("#scbody").innerHTML = `<div class="card">
      <div class="spread"><h2 style="margin:0">${s.icon} ${esc(s.name)}</h2></div>
      <div class="callout small">${esc(s.situation)}</div>
      <h3>🎭 Diálogo de ejemplo</h3>
      <div class="chat" style="max-height:none">${s.dialogue.map(d =>
        `<div class="bubble ${d.r === "You" ? "me" : "bot"}"><div class="meta">${esc(d.r)}</div>${esc(d.en)}
          <div class="small" style="opacity:.75;margin-top:4px">${esc(d.es)}</div></div>`).join("")}</div>
      <div class="row" style="margin-top:8px"><button class="btn small secondary" id="playDlg">🔊 Escuchar diálogo completo</button></div>
      <h3>🔑 Frases clave</h3>
      <div class="grid grid-2">${s.phrases.map(p =>
        `<div class="ex"><div class="en">${esc(p.en)} <button class="btn small secondary speak" data-t="${esc(p.en)}">🔊</button></div><div class="es">${esc(p.es)}</div></div>`).join("")}</div>
      <h3>💡 Consejos y notas culturales</h3>
      <ul class="small">${s.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      <div class="row" style="margin-top:14px">
        <button class="btn" data-done="${s.id}">✔ Marcar situación estudiada</button>
        <button class="btn secondary" id="addTravelSrs">＋ Frases a repaso (SRS)</button>
      </div>
    </div>`;
    $$(".speak", $("#scbody")).forEach(b => b.onclick = () => speak(b.dataset.t));
    $("#playDlg").onclick = () => speak(s.dialogue.map(d => d.en).join(". "));
    $("#addTravelSrs").onclick = () => { s.phrases.forEach(p => addToSRS("t:" + p.en)); toast("Frases añadidas a repaso"); };
    $(`[data-done="${s.id}"]`, $("#scbody")).onclick = () => { markDone(s.id, "Situación estudiada"); RENDER.travel(view); };
  };
  $$("#scnav .chip").forEach(c => c.onclick = () => open(+c.dataset.i));
  open(0);
}
/* ----- Mini-simulador de viajes: menú + conversación ----- */
function travelSimMenu(host, view) {
  host.innerHTML = `<div class="card">
    <h2 style="margin-top:0">🎙️ Mini-simulador de conversaciones</h2>
    <p class="small muted">Elige una situación. Yo hago de personaje (camarero, recepción, taxista...) y tú respondes por escrito. Recibirás feedback y una respuesta modelo en cada turno.</p>
    <div class="grid grid-2">
      ${TRAVEL_SIM.map(s => `<div class="card module-card" data-sim="${s.id}">
        <div style="font-size:26px">${s.icon}</div>
        <h3 style="margin:6px 0 2px">${esc(s.title)}</h3>
        <div class="small muted">${esc(s.role)}</div>
        <div class="small" style="margin-top:6px">${s.steps.length} turnos ${state.done["tsim_" + s.id] ? '· <span class="pill ok">✓ hecho</span>' : ""}</div>
      </div>`).join("")}
    </div></div>`;
  $$("[data-sim]", host).forEach(el => el.onclick = () => runTravelSim(el.dataset.sim, host, view));
}
let tsim = null;
function runTravelSim(id, host, view) {
  const flow = TRAVEL_SIM.find(s => s.id === id);
  tsim = { flow, i: 0, scores: [] };
  host.innerHTML = `<div class="card">
    <div class="spread"><h2 style="margin:0">${flow.icon} ${esc(flow.title)}</h2>
      <button class="btn small secondary" id="simBack">← Cambiar situación</button></div>
    <div class="callout small">${esc(flow.role)} Responde <b>escribiendo</b> o <b>hablando</b> (🎤). Puedes pedir una 💡 pista o escuchar 🔊 al personaje.</div>
    <div class="chat" id="tchat"></div>
    <textarea id="tsimIn" rows="2" placeholder="Escribe tu respuesta en inglés... o pulsa 🎤 Hablar" style="margin-top:10px"></textarea>
    <div class="row" style="margin-top:8px">
      <button class="btn" id="tsimSend">Responder ▶</button>
      <button class="btn secondary" id="tsimMic">🎤 Hablar</button>
      <button class="btn secondary" id="tsimHint">💡 Pista</button>
      <button class="btn secondary" id="tsimSample">👁 Ver respuesta modelo</button>
      <span class="small muted" id="tsimMeta"></span>
    </div>
    <div class="conf-badge" id="tsimConf" style="display:none;margin-top:8px"></div>
    <div class="small muted" style="margin-top:6px">🎤 requiere Chrome/Edge y abrir la app en <code>http://localhost</code> (no con doble clic al archivo).</div>
  </div>`;
  $("#simBack").onclick = () => { stopMic(); travelSimMenu(host, view); };
  $("#tsimSend").onclick = () => { stopMic(); tsimSend(view); };
  $("#tsimHint").onclick = () => tbot("💡 Hint: " + flow.steps[tsim.i].hint);
  $("#tsimSample").onclick = () => tbot("👁 Modelo: \"" + flow.steps[tsim.i].sample + "\"");
  $("#tsimIn").addEventListener("keydown", e => { if (e.key === "Enter" && e.ctrlKey) { stopMic(); tsimSend(view); } });
  attachMic($("#tsimMic"), $("#tsimIn"), $("#tsimConf"), "Viajes");
  tsimAsk();
}
function tsimAsk() {
  const step = tsim.flow.steps[tsim.i];
  tbot(step.bot, step.es);
  $("#tsimMeta").textContent = `Turno ${tsim.i + 1}/${tsim.flow.steps.length}`;
}
function tbot(en, es) {
  const c = $("#tchat"); if (!c) return;
  const b = document.createElement("div"); b.className = "bubble bot";
  b.innerHTML = `<div class="meta">Character</div>${esc(en)}${es ? `<div class="small" style="opacity:.7;margin-top:4px">${esc(es)}</div>` : ""} <button class="btn small secondary speak" data-t="${esc(en)}" style="margin-top:6px">🔊</button>`;
  c.appendChild(b); c.scrollTop = c.scrollHeight;
  $$(".speak", b).forEach(x => x.onclick = () => speak(x.dataset.t));
}
function tme(t) {
  const c = $("#tchat"); const b = document.createElement("div"); b.className = "bubble me";
  b.innerHTML = `<div class="meta">You</div>${esc(t)}`; c.appendChild(b); c.scrollTop = c.scrollHeight;
}
function tsimSend(view) {
  const ta = $("#tsimIn"); const t = ta.value.trim();
  if (!t) { toast("Escribe tu respuesta 🙂"); return; }
  tme(t); ta.value = "";
  const step = tsim.flow.steps[tsim.i];
  const low = t.toLowerCase();
  const matched = step.expect.some(k => low.includes(k));
  const words = t.split(/\s+/).filter(Boolean).length;
  let sc = 0;
  if (matched) sc += 2; if (words >= 4) sc += 1; if (/please|could|would|thank/i.test(t)) sc += 1;
  tsim.scores.push(sc);
  let fb;
  if (matched && words >= 3) fb = "✅ Great — that works perfectly here.";
  else if (matched) fb = "🙂 Good idea. Try a fuller sentence next time.";
  else fb = "🤔 Hmm, that's not quite what fits here.";
  if (!/please|thank|could|would/i.test(t) && sc < 4) fb += " Tip: adding 'please' / 'could you' sounds more polite.";
  fb += `\n💬 A natural answer: "${step.sample}"`;
  tbot(fb);
  tsim.i++;
  if (tsim.i >= tsim.flow.steps.length) { setTimeout(() => tsimEnd(view), 500); return; }
  setTimeout(tsimAsk, 500);
}
function tsimEnd(view) {
  const total = tsim.scores.reduce((a, b) => a + b, 0);
  const max = tsim.flow.steps.length * 4;
  const pct = Math.round(total / max * 100);
  const verdict = pct >= 70 ? "¡Muy bien! Te desenvuelves con soltura. 🎯" : pct >= 45 ? "Buen intento. Usa frases completas y más cortesía (please/could)." : "Sigue practicando: apóyate en las pistas y respuestas modelo.";
  markDone("tsim_" + tsim.flow.id, "Simulación completada");
  tbot(`— Fin de la conversación —\nPuntuación: ${pct}%\n${verdict}\n\nPrueba otra situación o repite esta para mejorar.`);
  toast("Simulación guardada ✔ (" + pct + "%)");
  const back = $("#simBack"); if (back) back.textContent = "← Elegir otra situación";
}

function travelSurvival(host) {
  host.innerHTML = `<div class="card">
    <h2 style="margin-top:0">🆘 Frases de supervivencia</h2>
    <p class="small muted">Las frases imprescindibles para cualquier viaje. Apréndelas de memoria: te sacan de casi cualquier apuro.</p>
    <div class="grid grid-2">${TRAVEL_SURVIVAL.map(p =>
      `<div class="ex"><div class="en">${esc(p.en)} <button class="btn small secondary speak" data-t="${esc(p.en)}">🔊</button></div><div class="es">${esc(p.es)}</div></div>`).join("")}</div>
    <button class="btn" id="survSrs" style="margin-top:14px">＋ Añadir todas a repaso (SRS)</button>
  </div>`;
  $$(".speak", host).forEach(b => b.onclick = () => speak(b.dataset.t));
  $("#survSrs").onclick = () => { TRAVEL_SURVIVAL.forEach(p => addToSRS("t:" + p.en)); toast("Añadidas a repaso"); };
}
function travelVocab(host, view) {
  host.innerHTML = `<div class="lesson-nav" id="tvnav">${TRAVEL_VOCAB.decks.map((d, i) =>
    `<div class="chip ${state.done["tdeck_" + d.id] ? "done" : ""}" data-i="${i}">${esc(d.name)} (${d.words.length})</div>`).join("")}</div>
    <div id="tvbody"></div>`;
  const open = (i) => {
    $$("#tvnav .chip").forEach((c, ci) => c.classList.toggle("active", ci === i));
    const d = TRAVEL_VOCAB.decks[i];
    $("#tvbody").innerHTML = `<div class="grid grid-2">${d.words.map(w => wordCard(w, d.id)).join("")}</div>
      <div class="row" style="margin-top:16px">
        <button class="btn secondary" id="tvAll">＋ Añadir tema a repaso (SRS)</button>
        <button class="btn" id="tvDone">✔ Marcar tema estudiado</button>
      </div>`;
    $$(".word .speak", $("#tvbody")).forEach(b => b.onclick = () => speak(b.dataset.t));
    $$(".word .add", $("#tvbody")).forEach(b => b.onclick = () => { addToSRS("v:" + b.dataset.k); toast("Añadido a repaso: " + b.dataset.k); });
    $("#tvAll").onclick = () => { d.words.forEach(w => addToSRS("v:" + w.en)); toast("Tema añadido a repaso"); };
    $("#tvDone").onclick = () => { markDone("tdeck_" + d.id, "Tema estudiado"); RENDER.travel(view); };
  };
  $$("#tvnav .chip").forEach(c => c.onclick = () => open(+c.dataset.i));
  open(0);
}

/* ============================================================
   ARRANQUE
   ============================================================ */
function closeSidebar() { $("#sidebar").classList.remove("open"); $("#overlay").classList.remove("show"); }
$("#hamburger").onclick = () => { $("#sidebar").classList.toggle("open"); $("#overlay").classList.toggle("show"); };
$("#overlay").onclick = closeSidebar;
$("#resetBtn").onclick = () => { if (confirm("¿Reiniciar TODO tu progreso? Esta acción no se puede deshacer.")) { localStorage.removeItem(LS_KEY); state = defaultState(); go("dashboard"); refreshChrome(); toast("Progreso reiniciado"); } };
$("#exportBtn").onclick = () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
  a.download = "business-english-progreso.json"; a.click();
  toast("Progreso exportado");
};

buildNav();
refreshChrome();
go("dashboard");
