/* ============================================================
   Business English Pro — CONTENIDO PRINCIPAL
   Todo el contenido es texto en JS (sin fetch) para que
   funcione con doble clic (file://), sin servidor.
   ============================================================ */

const COURSE = {
  meta: {
    title: "Business English Pro",
    goal: "De un B1 medio (B1.1) a un B2 alto para empleabilidad y trabajo internacional. Empezamos repasando las bases de B1 y subimos de forma gradual.",
    weeks: 16
  },

  /* Orden del menú lateral. type indica qué motor usa app.js */
  modules: [
    { id: "dashboard",   icon: "🏠", title: "Inicio",              type: "dashboard" },
    { id: "aispeaking",  icon: "🤖", title: "Speaking con IA",       type: "aispeaking" },
    { id: "objectives",  icon: "🎯", title: "Objetivos y método",   type: "objectives" },
    { id: "grammar",     icon: "📐", title: "Gramática",            type: "lessons",  data: "GRAMMAR" },
    { id: "vocab",       icon: "🗂️", title: "Vocabulario",          type: "vocab" },
    { id: "vocabsession",icon: "🎓", title: "Repaso de vocabulario",type: "vocabsession" },
    { id: "listening",   icon: "🎧", title: "Listening",            type: "listening" },
    { id: "speaking",    icon: "🗣️", title: "Speaking (roles)",     type: "speaking" },
    { id: "writing",     icon: "✍️", title: "Writing",              type: "writing" },
    { id: "reading",     icon: "📖", title: "Reading",              type: "reading" },
    { id: "pronun",      icon: "🔊", title: "Pronunciación",        type: "lessons",  data: "PRONUNCIATION" },
    { id: "business",    icon: "💼", title: "Business English",     type: "lessons",  data: "BUSINESS" },
    { id: "interview",   icon: "🤝", title: "Entrevistas",          type: "interview" },
    { id: "simulator",   icon: "🎙️", title: "Simulador entrevista", type: "simulator" },
    { id: "corrector",   icon: "🩺", title: "Corrección inteligente",type: "corrector" },
    { id: "phrases",     icon: "💬", title: "Frases útiles",         type: "phrases" },
    { id: "travel",      icon: "✈️", title: "Inglés para viajes",     type: "travel" },
    { id: "flashcards",  icon: "🔁", title: "Repaso (SRS)",         type: "flashcards" },
    { id: "quizzes",     icon: "✅", title: "Evaluaciones",          type: "quizzes" },
    { id: "plan",        icon: "🗓️", title: "Plan 16 semanas",      type: "plan" },
    { id: "calendar",    icon: "📅", title: "Calendario",           type: "calendar" },
    { id: "stats",       icon: "📊", title: "Estadísticas",         type: "stats" },
    { id: "achievements",icon: "🏆", title: "Logros",               type: "achievements" }
  ]
};

/* ================= MÉTODO / OBJETIVOS ================= */
const METHOD = [
  { name:"Active Recall", how:"Cada lección termina en preguntas/quiz: recuperas de memoria en vez de releer. Refuerza la retención." },
  { name:"Spaced Repetition", how:"Las flashcards vuelven en intervalos crecientes (1, 3, 7, 16 días) según si aciertas. Módulo 'Repaso (SRS)'." },
  { name:"Comprehensible Input", how:"Listening y reading a tu nivel +1 (i+1): entiendes el 80–90% y aprendes lo nuevo por contexto." },
  { name:"Deliberate Practice", how:"Practicas justo lo que te cuesta (errores frecuentes de hispanohablantes) con feedback inmediato." },
  { name:"Shadowing", how:"Repites en voz alta imitando ritmo y entonación de un audio. Ejercicios en Pronunciación." },
  { name:"Task-Based Learning", how:"Aprendes resolviendo tareas reales: escribir un email, dirigir una daily, negociar." },
  { name:"Communicative Language Teaching", how:"Foco en comunicar significado, no en gramática aislada. Roleplays en Speaking." },
  { name:"Microlearning", how:"Sesiones de 30–60 min con bloques pequeños y concretos. Ver Plan de 16 semanas." },
  { name:"Aprendizaje contextual", how:"El vocabulario siempre viene con contexto empresarial y ejemplos reales." },
  { name:"Gamificación", how:"Barra de progreso, racha (streak), logros y estadísticas para mantener el hábito." }
];

/* ================= GRAMÁTICA (motor lessons) ================= */
const GRAMMAR = [
  {
    id:"f1", title:"Base B1: preguntas, negaciones y respuestas cortas", cefr:"B1",
    objectives:["Formar preguntas correctamente","Responder de forma natural en el trabajo"],
    body:`
      <p>Punto de partida (B1 medio). El error más común del hispanohablante es hacer preguntas sin auxiliar.</p>
      <table>
        <tr><th>Tipo</th><th>Estructura</th><th>Ejemplo</th></tr>
        <tr><td>Pregunta (presente)</td><td>Do/Does + sujeto + verbo</td><td><b>Do you</b> work remotely?</td></tr>
        <tr><td>Pregunta (pasado)</td><td>Did + sujeto + verbo base</td><td><b>Did you</b> finish it?</td></tr>
        <tr><td>Con pregunta-Wh</td><td>Wh + do/does/did + sujeto...</td><td><b>Where do</b> you work?</td></tr>
        <tr><td>Negación</td><td>don't / doesn't / didn't + base</td><td>I <b>don't</b> agree.</td></tr>
        <tr><td>Respuesta corta</td><td>Yes, I do. / No, I don't.</td><td>—</td></tr>
      </table>
      <div class="callout bad"><b>Error ES→EN:</b> "Where you work?" ❌ / "You have a minute?" ❌ → "Where <b>do</b> you work?" · "<b>Do</b> you have a minute?" ✅.</div>
      <div class="callout warn"><b>Tras did/does, verbo en base:</b> "Did you <b>went</b>?" ❌ → "Did you <b>go</b>?" ✅.</div>
    `,
    examples:[
      {en:"Do you have a minute to talk?", es:"¿Tienes un minuto para hablar?"},
      {en:"What time does the meeting start?", es:"¿A qué hora empieza la reunión?"},
      {en:"I didn't receive your email.", es:"No recibí tu correo."},
      {en:"Yes, I do. / No, I don't.", es:"Sí. / No. (respuesta corta natural)"}
    ],
    quiz:[
      {q:"'___ you work on weekends?'", options:["Are","Do","Have"], answer:1, explain:"Presente simple → auxiliar 'Do'."},
      {q:"'Where ___ she work?'", options:["does","is","do"], answer:0, explain:"3ª persona singular → 'does'."},
      {q:"'___ you finish the report?' (ayer)", options:["Do","Did","Are"], answer:1, explain:"Pasado → auxiliar 'Did'."},
      {q:"Correct:", options:["Did you went home?","Did you go home?","Did you going home?"], answer:1, explain:"Tras 'did', verbo en base: 'go'."}
    ]
  },
  {
    id:"f2", title:"Base B1: comparativos y superlativos", cefr:"B1",
    objectives:["Comparar opciones, personas y resultados","Evitar comparativos dobles"],
    body:`
      <table>
        <tr><th>Adjetivo</th><th>Comparativo</th><th>Superlativo</th></tr>
        <tr><td>Cortos (fast)</td><td>fast<b>er</b> than</td><td>the fast<b>est</b></td></tr>
        <tr><td>Largos (efficient)</td><td><b>more</b> efficient than</td><td>the <b>most</b> efficient</td></tr>
        <tr><td>Irregulares</td><td>good→<b>better</b>, bad→<b>worse</b></td><td>the <b>best</b> / the <b>worst</b></td></tr>
        <tr><td>Igualdad</td><td colspan="2"><b>as</b> fast <b>as</b> · not <b>as</b> expensive <b>as</b></td></tr>
      </table>
      <div class="callout bad"><b>Error típico:</b> "more better" ❌ → "better" ✅. "the most easiest" ❌ → "the easiest" ✅.</div>
    `,
    examples:[
      {en:"This tool is faster than the old one.", es:"Esta herramienta es más rápida que la anterior."},
      {en:"It's the most reliable option we have.", es:"Es la opción más fiable que tenemos."},
      {en:"Version B performs better than version A.", es:"La versión B rinde mejor que la A."},
      {en:"It's not as expensive as I expected.", es:"No es tan cara como esperaba."}
    ],
    quiz:[
      {q:"'This plan is ___ than that one.'", options:["more cheap","cheaper","cheapest"], answer:1, explain:"Adjetivo corto: cheap → cheaper."},
      {q:"'It's the ___ solution.'", options:["most efficient","more efficient","efficientest"], answer:0, explain:"Adjetivo largo superlativo: the most efficient."},
      {q:"Correct:", options:["more better","much better","most better"], answer:1, explain:"'better' ya es comparativo; se intensifica con 'much'."},
      {q:"'Our results are ___ good ___ last year.'", options:["as / as","more / than","so / that"], answer:0, explain:"Igualdad: as ... as."}
    ]
  },
  {
    id:"f3", title:"Base B1: preposiciones in / on / at (tiempo y lugar)", cefr:"B1",
    objectives:["Usar bien in/on/at","Fijar expresiones de tiempo frecuentes"],
    body:`
      <table>
        <tr><th></th><th>Tiempo</th><th>Lugar</th></tr>
        <tr><td><b>at</b></td><td>horas, puntos: at 3pm, at noon, at night</td><td>puntos: at the office, at home, at the door</td></tr>
        <tr><td><b>on</b></td><td>días/fechas: on Monday, on May 3rd</td><td>superficies: on the desk, on the wall</td></tr>
        <tr><td><b>in</b></td><td>meses/años/partes del día: in July, in 2025, in the morning</td><td>espacios: in the room, in London</td></tr>
      </table>
      <div class="callout bad"><b>Error ES→EN:</b> "in Monday" ❌ → "<b>on</b> Monday" ✅. "in 3 o'clock" ❌ → "<b>at</b> 3 o'clock" ✅.</div>
      <div class="callout ok"><b>Memoriza:</b> at night PERO in the morning/afternoon/evening.</div>
    `,
    examples:[
      {en:"The call is on Monday at 10 a.m.", es:"La llamada es el lunes a las 10."},
      {en:"I'll send it in the morning.", es:"Lo enviaré por la mañana."},
      {en:"She's at the office right now.", es:"Ella está en la oficina ahora mismo."},
      {en:"We launch in September.", es:"Lanzamos en septiembre."}
    ],
    quiz:[
      {q:"'The meeting is ___ Friday.'", options:["in","on","at"], answer:1, explain:"Días → on."},
      {q:"'Let's start ___ 9 o'clock.'", options:["at","on","in"], answer:0, explain:"Horas → at."},
      {q:"'We'll finish it ___ July.'", options:["on","at","in"], answer:2, explain:"Meses → in."},
      {q:"'I work best ___ the morning.'", options:["at","in","on"], answer:1, explain:"Partes del día → in (excepto 'at night')."}
    ]
  },
  {
    id:"f4", title:"Base B1: artículos y contables/incontables", cefr:"B1",
    objectives:["Usar a/an/the correctamente","Dominar los incontables típicos del trabajo"],
    body:`
      <table>
        <tr><th>Uso</th><th>Regla</th><th>Ejemplo</th></tr>
        <tr><td>a / an</td><td>algo no específico (singular contable)</td><td>I need <b>a</b> laptop / <b>an</b> update.</td></tr>
        <tr><td>the</td><td>algo específico o ya mencionado</td><td><b>The</b> report you sent.</td></tr>
        <tr><td>some / any</td><td>cantidad indefinida (afirm./neg.-preg.)</td><td>We have <b>some</b> time. / Any questions?</td></tr>
        <tr><td>much / many</td><td>much + incontable · many + contable</td><td><b>much</b> feedback · <b>many</b> emails</td></tr>
      </table>
      <div class="callout bad"><b>Incontables (sin -s, sin 'a'):</b> information, advice, feedback, news, equipment, software, research, work, money. "an information" ❌ → "some information" ✅.</div>
    `,
    examples:[
      {en:"Can you give me some feedback?", es:"¿Me puedes dar algo de feedback?"},
      {en:"I have too many meetings today.", es:"Tengo demasiadas reuniones hoy."},
      {en:"The information you sent was useful.", es:"La información que enviaste fue útil."},
      {en:"We don't have much time.", es:"No tenemos mucho tiempo."}
    ],
    quiz:[
      {q:"Correct:", options:["an advice","some advice","advices"], answer:1, explain:"'advice' es incontable: 'some advice'."},
      {q:"'I need ___ update on this.'", options:["a","an","the"], answer:1, explain:"Ante vocal 'update' /ʌ/ → 'an'."},
      {q:"'How ___ emails did you get?'", options:["much","many","some"], answer:1, explain:"emails = contable → many."},
      {q:"'We received ___ information.'", options:["many","an","some"], answer:2, explain:"information incontable → some."}
    ]
  },
  {
    id:"g1", title:"Present Simple vs. Present Continuous", cefr:"B1",
    objectives:["Distinguir rutinas de acciones en curso","Hablar de proyectos temporales en el trabajo"],
    body:`
      <p>En inglés laboral confundir estos dos tiempos suena a nivel bajo. Regla mental:</p>
      <table>
        <tr><th>Tiempo</th><th>Uso</th><th>Ejemplo laboral</th></tr>
        <tr><td>Present Simple</td><td>Rutinas, hechos, procesos permanentes</td><td>We <b>report</b> to the client every Friday.</td></tr>
        <tr><td>Present Continuous</td><td>Ahora mismo o proyecto temporal</td><td>I<b>'m working</b> on the Q3 migration this month.</td></tr>
      </table>
      <div class="callout warn"><b>Error típico ES→EN:</b> "I am working here since 2020" ❌ → usa Present Perfect: "I <b>have worked</b> here since 2020" ✅.</div>
      <div class="callout bad"><b>Verbos de estado</b> (know, want, need, understand, believe) NO van en continuous: "I am understanding" ❌ → "I understand" ✅.</div>
    `,
    examples:[
      {en:"I usually lead the daily stand-up.", es:"Normalmente dirijo la daily."},
      {en:"I'm covering for my manager this week.", es:"Estoy cubriendo a mi jefe esta semana."},
      {en:"Our company ships updates every two weeks.", es:"Nuestra empresa lanza actualizaciones cada dos semanas."},
      {en:"She's presenting to the client at 3 p.m. today.", es:"Ella presenta al cliente hoy a las 3."},
      {en:"I know what you mean.", es:"Sé a qué te refieres. (verbo de estado, no 'I'm knowing')."}
    ],
    quiz:[
      {q:"Choose: 'Right now I ___ a report for the client.'", options:["write","am writing","writes"], answer:1, explain:"'Right now' = acción en curso → present continuous."},
      {q:"Choose: 'Our team ___ every Monday.'", options:["is meeting","meet","meets"], answer:2, explain:"Rutina + sujeto singular 'team' → 'meets'."},
      {q:"'I ___ this decision' (opinión ahora).", options:["am understanding","understand","understands"], answer:1, explain:"'understand' es verbo de estado: no va en continuous."},
      {q:"'These days we ___ on a big migration.'", options:["work","are working","works"], answer:1, explain:"Proyecto temporal ('these days') → present continuous."},
      {q:"'He ___ to the office by train.' (rutina)", options:["is commuting","commutes","commute"], answer:1, explain:"Rutina + 3ª persona → 'commutes'."}
    ]
  },
  {
    id:"g2", title:"Present Perfect vs. Past Simple", cefr:"B1",
    objectives:["Hablar de experiencia laboral","Reportar resultados y logros en entrevistas"],
    body:`
      <p>Clave para entrevistas y CV. El hispanohablante suele sobre-usar el pasado simple.</p>
      <table>
        <tr><th>Present Perfect</th><th>Past Simple</th></tr>
        <tr><td>Experiencia sin fecha concreta</td><td>Acción terminada con tiempo concreto</td></tr>
        <tr><td>I <b>have managed</b> teams of 10+.</td><td>I <b>managed</b> a team in 2021.</td></tr>
        <tr><td>Efecto en el presente</td><td>Historia cerrada</td></tr>
      </table>
      <div class="callout"><b>Palabras señal:</b> just, already, yet, ever, never, since, for → present perfect. yesterday, last year, in 2020, ago → past simple.</div>
      <div class="callout warn"><b>Error ES→EN:</b> "I finished the task yet" ❌ → "I <b>haven't finished</b> the task yet" / "I've <b>already</b> finished it" ✅.</div>
    `,
    examples:[
      {en:"I've led three product launches.", es:"He liderado tres lanzamientos."},
      {en:"We launched the app last March.", es:"Lanzamos la app en marzo pasado."},
      {en:"I've already sent the proposal.", es:"Ya he enviado la propuesta."},
      {en:"Have you finished the report yet?", es:"¿Ya has terminado el informe?"},
      {en:"I worked at a startup for two years, then I moved to consulting.", es:"Trabajé en una startup dos años y luego pasé a consultoría."}
    ],
    quiz:[
      {q:"'___ you ever ___ remotely?'", options:["Did / work","Have / worked","Do / worked"], answer:1, explain:"Experiencia de vida → present perfect: 'Have you ever worked...'"},
      {q:"'We ___ the deadline last week.'", options:["have missed","missed","miss"], answer:1, explain:"'last week' = tiempo concreto → past simple."},
      {q:"'I ___ this client since 2019.'", options:["manage","managed","have managed"], answer:2, explain:"'since 2019' + sigue vigente → present perfect."},
      {q:"'She ___ the team in 2021.' (ya no)", options:["has joined","joined","joins"], answer:1, explain:"Fecha cerrada 'in 2021' → past simple."},
      {q:"'I haven't received a reply ___.'", options:["yet","ago","last week"], answer:0, explain:"'yet' acompaña al present perfect en negativas."}
    ]
  },
  {
    id:"g3", title:"Modales de cortesía y probabilidad", cefr:"B2",
    objectives:["Sonar diplomático en reuniones","Suavizar peticiones y desacuerdos"],
    body:`
      <p>La cortesía profesional en inglés se construye con modales. Ser directo puede sonar grosero.</p>
      <table>
        <tr><th>Directo (suena brusco)</th><th>Profesional (recomendado)</th></tr>
        <tr><td>Send me the file.</td><td><b>Could you</b> send me the file, please?</td></tr>
        <tr><td>I want a raise.</td><td>I <b>would like</b> to discuss my compensation.</td></tr>
        <tr><td>You are wrong.</td><td>I'm not sure I <b>would</b> agree with that.</td></tr>
        <tr><td>That's impossible.</td><td>That <b>might</b> be challenging.</td></tr>
      </table>
      <div class="callout ok"><b>Probabilidad:</b> will (100%) &gt; should (probable) &gt; may/might/could (posible). "It <b>should</b> be ready by Friday" = bastante seguro.</div>
    `,
    examples:[
      {en:"Would it be possible to move the meeting?", es:"¿Sería posible mover la reunión?"},
      {en:"We might need more time on this.", es:"Puede que necesitemos más tiempo."},
      {en:"I'm afraid I can't make it to the call.", es:"Me temo que no podré asistir a la llamada."},
      {en:"You could try restarting it first.", es:"Podrías probar reiniciándolo primero (sugerencia suave)."},
      {en:"That may not be the best approach.", es:"Puede que ese no sea el mejor enfoque (desacuerdo cortés)."}
    ],
    quiz:[
      {q:"Most polite request:", options:["Give me the numbers.","Could you share the numbers?","I need the numbers now."], answer:1, explain:"'Could you...?' es la petición estándar profesional."},
      {q:"'The build ___ be ready tonight (high confidence).'", options:["might","should","could"], answer:1, explain:"'should' = probable/bastante seguro."},
      {q:"Softest way to disagree:", options:["You're wrong.","I'm not sure I'd agree with that.","No."], answer:1, explain:"Suaviza el desacuerdo, muy profesional."},
      {q:"'We ___ finish today, but it's not certain.'", options:["will","might","must"], answer:1, explain:"'might' = posibilidad (~50%)."},
      {q:"Diplomatic 'no': ", options:["That's impossible.","That might be challenging.","Forget it."], answer:1, explain:"'challenging' suaviza una dificultad."}
    ]
  },
  {
    id:"g4", title:"Condicionales (0,1,2) en el trabajo", cefr:"B2",
    objectives:["Negociar con condiciones","Plantear hipótesis y consecuencias"],
    body:`
      <table>
        <tr><th>Tipo</th><th>Estructura</th><th>Uso laboral</th></tr>
        <tr><td>Zero</td><td>If + present, present</td><td>If a client complains, we escalate it.</td></tr>
        <tr><td>First</td><td>If + present, will</td><td>If we ship on time, we'll hit the target.</td></tr>
        <tr><td>Second</td><td>If + past, would</td><td>If we had more budget, we would hire.</td></tr>
      </table>
      <div class="callout"><b>Negociación:</b> "We <b>could</b> lower the price <b>if</b> you <b>signed</b> a 12-month contract." (second → suena flexible pero no comprometido).</div>
      <div class="callout warn"><b>Error ES→EN:</b> "If I would have time" ❌ → "If I <b>had</b> time, I <b>would</b>..." ✅.</div>
    `,
    examples:[
      {en:"If the demo goes well, we'll close the deal.", es:"Si la demo va bien, cerraremos el trato."},
      {en:"If I were the PM, I'd reprioritize the backlog.", es:"Si yo fuera el PM, repriorizaría el backlog."},
      {en:"If you pay upfront, we give you a 10% discount.", es:"Si pagas por adelantado, damos un 10% de descuento. (zero/first)"},
      {en:"If we had more engineers, we would deliver sooner.", es:"Si tuviéramos más ingenieros, entregaríamos antes."},
      {en:"We'd be happy to extend the trial if you needed more time.", es:"Con gusto extenderíamos la prueba si necesitaras más tiempo."}
    ],
    quiz:[
      {q:"'If we ___ the deadline, the client ___ upset.'", options:["miss / will be","will miss / is","missed / will be"], answer:0, explain:"First conditional: if + present, will."},
      {q:"'If I ___ you, I would ask for feedback.'", options:["am","were","was"], answer:1, explain:"Second conditional formal: 'If I were you'."},
      {q:"Zero conditional: 'If you heat ice, it ___.'", options:["will melt","melts","would melt"], answer:1, explain:"Verdad general: if + present, present."},
      {q:"'If we had the data, we ___ decide faster.'", options:["will","would","can"], answer:1, explain:"Second conditional: would en la consecuencia."},
      {q:"Correct: ", options:["If I would have time, I'd help.","If I had time, I'd help.","If I have had time, I help."], answer:1, explain:"Nunca 'would' en la cláusula 'if': 'If I had...'."}
    ]
  },
  {
    id:"g5", title:"Passive Voice para reportes", cefr:"B2",
    objectives:["Escribir minutas e informes","Sonar objetivo y profesional"],
    body:`
      <p>La pasiva es clave en reportes: pone el foco en la acción, no en quién la hizo.</p>
      <table>
        <tr><th>Activa</th><th>Pasiva (reporte)</th></tr>
        <tr><td>We completed the audit.</td><td>The audit <b>was completed</b>.</td></tr>
        <tr><td>The team will deploy it.</td><td>It <b>will be deployed</b> next week.</td></tr>
        <tr><td>Someone must review this.</td><td>This <b>must be reviewed</b>.</td></tr>
      </table>
      <div class="callout"><b>Estructura:</b> be (en el tiempo correcto) + participio pasado.</div>
    `,
    examples:[
      {en:"The proposal has been approved by the board.", es:"La propuesta ha sido aprobada por la junta."},
      {en:"Action items were assigned during the meeting.", es:"Las tareas se asignaron durante la reunión."}
    ],
    quiz:[
      {q:"Passive of 'The team will finish the report':", options:["The report will finish.","The report will be finished.","The report is finished."], answer:1, explain:"will + be + participio: 'will be finished'."},
      {q:"'The bug ___ yesterday.'", options:["was fixed","is fixed","fixed"], answer:0, explain:"Pasado pasivo: was + fixed."}
    ]
  },
  {
    id:"g6", title:"Reported Speech y verbos de reporte", cefr:"B2",
    objectives:["Resumir lo dicho en reuniones","Escribir follow-up emails"],
    body:`
      <p>Para minutas y follow-ups necesitas reportar lo que otros dijeron.</p>
      <table>
        <tr><th>Directo</th><th>Reportado</th></tr>
        <tr><td>"We will deliver on Friday."</td><td>They said (that) they <b>would</b> deliver on Friday.</td></tr>
        <tr><td>"I can help."</td><td>She said she <b>could</b> help.</td></tr>
      </table>
      <div class="callout ok"><b>Verbos útiles:</b> confirmed, mentioned, pointed out, suggested, agreed, raised concerns about, proposed.</div>
      <div class="ex"><span class="en">As discussed, the client <b>confirmed</b> the budget and <b>suggested</b> moving the launch to Q4.</span></div>
    `,
    examples:[
      {en:"He mentioned that the timeline was tight.", es:"Mencionó que el plazo estaba ajustado."},
      {en:"They agreed to revisit the pricing.", es:"Acordaron revisar los precios."}
    ],
    quiz:[
      {q:"Report: \"I will send it today.\"", options:["He said he will send it that day.","He said he would send it that day.","He says he sends it."], answer:1, explain:"will → would en reported speech."},
      {q:"Best reporting verb: 'She ___ a concern about the budget.'", options:["raised","talked","did"], answer:0, explain:"'raised a concern' es colocación natural."}
    ]
  },
  {
    id:"g7", title:"Conectores y linking words", cefr:"B2",
    objectives:["Unir ideas con fluidez","Sonar estructurado en presentaciones"],
    body:`
      <table>
        <tr><th>Función</th><th>Conectores</th></tr>
        <tr><td>Añadir</td><td>moreover, in addition, furthermore, on top of that</td></tr>
        <tr><td>Contraste</td><td>however, nevertheless, although, whereas, on the other hand</td></tr>
        <tr><td>Causa/efecto</td><td>therefore, as a result, consequently, due to, since</td></tr>
        <tr><td>Ejemplificar</td><td>for instance, such as, in particular</td></tr>
        <tr><td>Concluir</td><td>to sum up, in short, overall, all in all</td></tr>
      </table>
      <div class="callout warn"><b>Error ES→EN:</b> "Actually" NO significa "actualmente" → significa "en realidad". "Actualmente" = <b>currently / nowadays</b>.</div>
    `,
    examples:[
      {en:"The results were strong; however, costs increased.", es:"Los resultados fueron buenos; sin embargo, subieron los costos."},
      {en:"Due to the delay, we'll adjust the roadmap.", es:"Debido al retraso, ajustaremos el roadmap."}
    ],
    quiz:[
      {q:"'Actually' means:", options:["actualmente","en realidad","finalmente"], answer:1, explain:"False friend clásico: actually = en realidad."},
      {q:"Contrast connector:", options:["therefore","whereas","moreover"], answer:1, explain:"'whereas' marca contraste."}
    ]
  }
];

/* ================= PRONUNCIACIÓN (motor lessons) ================= */
const PRONUNCIATION = [
  {
    id:"p1", title:"Sonidos difíciles para hispanohablantes", cefr:"B1",
    objectives:["Distinguir sonidos que no existen en español"],
    body:`
      <table>
        <tr><th>Sonido</th><th>Problema</th><th>Truco</th><th>Ejemplos</th></tr>
        <tr><td>/ɪ/ vs /iː/</td><td>ship vs sheep</td><td>/ɪ/ corto y relajado</td><td>live/leave, bit/beat</td></tr>
        <tr><td>/æ/</td><td>no existe en ES</td><td>boca más abierta que 'e'</td><td>cat, manage, staff</td></tr>
        <tr><td>/θ/ /ð/</td><td>th → 'z' o 'd'</td><td>lengua entre los dientes</td><td>think, the, month</td></tr>
        <tr><td>/v/ vs /b/</td><td>se fusionan</td><td>/v/ = dientes + labio inferior</td><td>very/berry, invoice</td></tr>
        <tr><td>/h/</td><td>se omite</td><td>soplo suave</td><td>have, hire, whole</td></tr>
      </table>
      <div class="callout warn"><b>Palabras trampa:</b> "focus" NO empieza como la palabra vulgar; cuida la vocal /oʊ/. "beach/bitch", "sheet/shit" → alarga la /iː/.</div>
    `,
    examples:[{en:"I'd like to manage a bigger team.", es:"Practica /æ/ en 'manage' y /ɪ/ en 'bigger'."}],
    quiz:[
      {q:"'th' in 'think' is:", options:["/z/","/θ/","/t/"], answer:1, explain:"Lengua entre los dientes, sin voz: /θ/."},
      {q:"Which has the long /iː/?", options:["ship","sheep","sit"], answer:1, explain:"sheep = /iː/ larga."}
    ]
  },
  {
    id:"p2", title:"Connected speech, linking y weak forms", cefr:"B2",
    objectives:["Sonar natural, no robótico","Entender a nativos hablando rápido"],
    body:`
      <p>Los nativos no separan las palabras. Unir sonidos te hace sonar fluido.</p>
      <table>
        <tr><th>Fenómeno</th><th>Escrito</th><th>Suena como</th></tr>
        <tr><td>Linking C+V</td><td>an email</td><td>a-nemail</td></tr>
        <tr><td>Weak forms</td><td>a cup of tea</td><td>a cup <b>ə</b> tea</td></tr>
        <tr><td>Contracciones</td><td>I would have</td><td>I'd've</td></tr>
        <tr><td>Reducción</td><td>going to / want to</td><td>gonna / wanna (informal)</td></tr>
      </table>
      <div class="callout ok"><b>Shadowing:</b> pon un audio, písalo con 1 segundo de retraso e imita el ritmo. 5 min/día = mejora enorme.</div>
    `,
    examples:[{en:"What do you want to do about it?", es:"Suena: 'Whaddya wanna do about it?' (informal)."}],
    quiz:[
      {q:"'a cup of tea' — 'of' sounds like:", options:["/ɒv/ fuerte","/ə/ débil","no suena"], answer:1, explain:"Weak form: 'of' se reduce a /ə/."},
      {q:"Shadowing is:", options:["traducir","imitar audio en voz alta con retraso","leer en silencio"], answer:1, explain:"Repetir imitando ritmo y entonación."}
    ]
  },
  {
    id:"p3", title:"Word stress e intonation", cefr:"B2",
    objectives:["Acentuar la sílaba correcta","Usar entonación para sonar profesional"],
    body:`
      <div class="callout warn"><b>El acento cambia el significado:</b> 'REcord (sustantivo) vs re'CORD (verbo); 'PRESent vs pre'SENT.</div>
      <table>
        <tr><th>Regla</th><th>Ejemplo</th></tr>
        <tr><td>-tion / -sion → acento antes</td><td>presenTAtion, deCIsion</td></tr>
        <tr><td>-ic → acento antes</td><td>straTEgic, speCIFic</td></tr>
        <tr><td>Entonación ascendente = pregunta/duda</td><td>Ready? ↗</td></tr>
        <tr><td>Descendente = afirmación segura</td><td>It's done. ↘</td></tr>
      </table>
    `,
    examples:[{en:"I'd like to PREsent our strategy.", es:"Verbo 'present' se acentúa preSENT; sustantivo PREsent."}],
    quiz:[
      {q:"Stress in 'presentation':", options:["pre-SEN-ta-tion","pre-sen-TA-tion","PRE-sen-ta-tion"], answer:1, explain:"-tion → acento en la sílaba anterior: presenTAtion."},
      {q:"Confident statement uses:", options:["rising ↗","falling ↘","flat"], answer:1, explain:"Entonación descendente = seguridad."}
    ]
  }
];

/* ================= BUSINESS ENGLISH (motor lessons) ================= */
const BUSINESS = [
  {
    id:"b1", title:"Meetings: abrir, participar y cerrar", cefr:"B2",
    objectives:["Dirigir y participar en reuniones","Interrumpir con cortesía"],
    body:`
      <table>
        <tr><th>Momento</th><th>Frases</th></tr>
        <tr><td>Abrir</td><td>Thanks for joining. Let's get started. Today we'll cover three things.</td></tr>
        <tr><td>Dar la palabra</td><td>Over to you, Ana. What are your thoughts on this?</td></tr>
        <tr><td>Interrumpir</td><td>Sorry to jump in, but... Can I add something here?</td></tr>
        <tr><td>Pedir aclaración</td><td>Just to make sure I understand... Could you clarify what you mean by...?</td></tr>
        <tr><td>Cerrar</td><td>Let's wrap up. To recap the action items... I'll send the minutes.</td></tr>
      </table>
      <div class="callout ok"><b>Reuniones online:</b> "You're on mute." · "You're breaking up." · "Can everyone see my screen?" · "Let's take this offline."</div>
    `,
    examples:[{en:"Let's park that and move on to the next point.", es:"Dejemos eso aparcado y sigamos con el siguiente punto."}],
    quiz:[
      {q:"Polite way to interrupt:", options:["Stop, listen to me.","Sorry to jump in, but...","You're wrong."], answer:1, explain:"'Sorry to jump in' es la fórmula estándar."},
      {q:"'Let's take this offline' means:", options:["desconectarse","hablarlo aparte después","apagar cámaras"], answer:1, explain:"Discutir un tema fuera de la reunión."}
    ]
  },
  {
    id:"b2", title:"Small talk profesional y networking", cefr:"B1",
    objectives:["Romper el hielo","Construir relaciones sin sonar forzado"],
    body:`
      <table>
        <tr><th>Situación</th><th>Frases naturales</th></tr>
        <tr><td>Iniciar</td><td>How's your week going? · How are things on your end?</td></tr>
        <tr><td>Networking</td><td>What do you do? · What brought you to this event? · What are you working on these days?</td></tr>
        <tr><td>Mantener</td><td>Oh nice, tell me more. · That sounds interesting. · How did you get into that?</td></tr>
        <tr><td>Cerrar</td><td>It was great talking to you. · Let's stay in touch. · I'll connect with you on LinkedIn.</td></tr>
      </table>
      <div class="callout warn"><b>Evita</b> traducir "¿Qué tal?" como "What such?". Usa "How's it going?" / "How are you doing?".</div>
    `,
    examples:[{en:"We should grab a coffee sometime.", es:"Deberíamos tomar un café algún día (invitación casual)."}],
    quiz:[
      {q:"Natural networking opener:", options:["What such?","What do you do?","Who are you?"], answer:1, explain:"'What do you do?' pregunta por la profesión."},
      {q:"Polite way to end a chat:", options:["Bye, I go.","It was great talking to you.","I leave now."], answer:1, explain:"Cierre natural y cálido."}
    ]
  },
  {
    id:"b3", title:"Presentations: estructura que convence", cefr:"B2",
    objectives:["Estructurar una presentación","Guiar a la audiencia con señales"],
    body:`
      <p><b>Estructura clásica:</b> Hook → Agenda → Body (3 puntos) → Recap → Call to action.</p>
      <table>
        <tr><th>Sección</th><th>Signpost language</th></tr>
        <tr><td>Intro</td><td>Today I'd like to walk you through... · By the end, you'll know...</td></tr>
        <tr><td>Transición</td><td>Let's move on to... · That brings me to... · Now, turning to...</td></tr>
        <tr><td>Datos</td><td>As you can see... · The key takeaway here is... · This shows that...</td></tr>
        <tr><td>Cierre</td><td>To sum up... · So, what does this mean for us? · Happy to take questions.</td></tr>
      </table>
    `,
    examples:[{en:"The key takeaway is that we grew 30% year over year.", es:"La idea clave es que crecimos 30% interanual."}],
    quiz:[
      {q:"Signpost for a transition:", options:["The end.","That brings me to my next point.","I don't know."], answer:1, explain:"Transición fluida entre secciones."},
      {q:"'Key takeaway' means:", options:["comida para llevar","idea principal","conclusión negativa"], answer:1, explain:"El mensaje que la audiencia debe recordar."}
    ]
  },
  {
    id:"b4", title:"Negotiation: pedir, ceder y cerrar", cefr:"B2",
    objectives:["Negociar plazos, precios y alcance","Sonar flexible sin comprometerte"],
    body:`
      <table>
        <tr><th>Objetivo</th><th>Lenguaje</th></tr>
        <tr><td>Proponer</td><td>What if we...? · How about we...? · We'd be happy to... provided that...</td></tr>
        <tr><td>Condicionar</td><td>We could do X, but only if you Y. · That works for us as long as...</td></tr>
        <tr><td>Rechazar suave</td><td>I'm afraid that won't work for us. · That's a bit outside our range.</td></tr>
        <tr><td>Ganar tiempo</td><td>Let me check with my team and get back to you.</td></tr>
        <tr><td>Cerrar</td><td>So, are we agreed on...? · Let's put that in writing.</td></tr>
      </table>
      <div class="callout ok"><b>Regla de oro:</b> nunca des algo sin pedir algo a cambio. "If you..., then we...".</div>
    `,
    examples:[{en:"We can offer a discount provided that you commit to a year.", es:"Podemos ofrecer descuento siempre que te comprometas a un año."}],
    quiz:[
      {q:"Soft rejection:", options:["No.","I'm afraid that won't work for us.","That's stupid."], answer:1, explain:"'I'm afraid...' suaviza la negativa."},
      {q:"Conditional offer:", options:["We could do X only if you Y.","Take it or leave it.","Whatever you want."], answer:0, explain:"Intercambio condicionado, base de la negociación."}
    ]
  },
  {
    id:"b5", title:"Email etiquette y registro", cefr:"B2",
    objectives:["Elegir el tono correcto","Estructurar correos claros"],
    body:`
      <table>
        <tr><th>Formal</th><th>Neutro / habitual</th><th>Informal (equipo)</th></tr>
        <tr><td>Dear Mr. Lee,</td><td>Hi James,</td><td>Hey team,</td></tr>
        <tr><td>I am writing to...</td><td>I wanted to check in about...</td><td>Quick one about...</td></tr>
        <tr><td>I would be grateful if...</td><td>Could you...?</td><td>Can you...?</td></tr>
        <tr><td>Kind regards,</td><td>Best,</td><td>Cheers,</td></tr>
      </table>
      <div class="callout"><b>Estructura:</b> 1) Motivo 2) Detalle 3) Acción clara + plazo 4) Cierre. Un email = una petición clara.</div>
      <div class="callout warn"><b>Error ES→EN:</b> no empieces "I am writing you to inform that..." en cada correo; suena rígido. Ve al grano: "Quick update on...".</div>
    `,
    examples:[{en:"Just following up on my last email — any update?", es:"Retomando mi correo anterior, ¿alguna novedad?"}],
    quiz:[
      {q:"Neutral email opener:", options:["To whom it may concern","Hi James, I wanted to check in about...","Hey you"], answer:1, explain:"Tono profesional habitual."},
      {q:"Best closing for a colleague:", options:["Yours faithfully","Best,","Bye bye"], answer:1, explain:"'Best,' es estándar y versátil."}
    ]
  },
  {
    id:"b6", title:"Agile, Scrum y project management", cefr:"B2",
    objectives:["Participar en ceremonias ágiles","Reportar estado de proyectos"],
    body:`
      <table>
        <tr><th>Término</th><th>Significado</th></tr>
        <tr><td>Sprint</td><td>Ciclo de trabajo (1–4 semanas)</td></tr>
        <tr><td>Backlog</td><td>Lista priorizada de tareas pendientes</td></tr>
        <tr><td>Stand-up / daily</td><td>Reunión breve diaria de sincronización</td></tr>
        <tr><td>Blocker</td><td>Impedimento que frena una tarea</td></tr>
        <tr><td>Retro (retrospective)</td><td>Reunión para mejorar el proceso</td></tr>
        <tr><td>Stakeholder</td><td>Parte interesada / involucrada</td></tr>
        <tr><td>KPI</td><td>Indicador clave de rendimiento</td></tr>
      </table>
      <div class="callout ok"><b>Daily en 3 frases:</b> "Yesterday I... Today I'll... My blocker is..."</div>
    `,
    examples:[{en:"I'm blocked on the API; I need access from DevOps.", es:"Estoy bloqueado con la API; necesito acceso de DevOps."}],
    quiz:[
      {q:"A 'blocker' is:", options:["una tarea fácil","un impedimento","un jefe"], answer:1, explain:"Algo que te impide avanzar."},
      {q:"Stakeholder means:", options:["accionista solamente","parte interesada/involucrada","empleado nuevo"], answer:1, explain:"Cualquier parte con interés en el proyecto."}
    ]
  }
];

/* ================= VOCABULARIO (motor vocab) ================= */
const VOCAB = {
  decks: [
    {
      id:"v_meetings", name:"Reuniones y videollamadas",
      words:[
        {en:"agenda", ipa:"/əˈdʒɛndə/", es:"orden del día", def:"List of topics for a meeting.", example:"Let's stick to the agenda.", syn:"schedule", ant:"—", error:"No es 'agenda' de contactos (eso es 'address book').", ctx:"Se envía antes de la reunión."},
        {en:"minutes", ipa:"/ˈmɪnɪts/", es:"acta / minuta", def:"Written record of a meeting.", example:"I'll send the minutes after the call.", syn:"notes", ant:"—", error:"Aquí no significa 'minutos' de tiempo.", ctx:"Se comparten tras la reunión."},
        {en:"to wrap up", ipa:"/ˌræp ˈʌp/", es:"cerrar / finalizar", def:"To finish something.", example:"Let's wrap up in five minutes.", syn:"conclude", ant:"start", error:"Phrasal verb; no lo traduzcas literal.", ctx:"Cierre de reuniones."},
        {en:"on the same page", ipa:"/ɒn ðə seɪm peɪdʒ/", es:"estar de acuerdo", def:"To have a shared understanding.", example:"Let's make sure we're on the same page.", syn:"aligned", ant:"—", error:"Expresión idiomática.", ctx:"Confirmar entendimiento común."},
        {en:"to follow up", ipa:"/ˈfɒləʊ ʌp/", es:"dar seguimiento", def:"To check on progress after.", example:"I'll follow up with the client.", syn:"check in", ant:"—", error:"'follow up' (verbo) vs 'follow-up' (adjetivo/sustantivo).", ctx:"Correos posteriores."}
      ]
    },
    {
      id:"v_tech", name:"Tecnología / IT",
      words:[
        {en:"deployment", ipa:"/dɪˈplɔɪmənt/", es:"despliegue / puesta en producción", def:"Releasing software to users.", example:"The deployment is scheduled for tonight.", syn:"release", ant:"rollback", error:"No 'deploy' como sustantivo en registro formal.", ctx:"Ingeniería / DevOps."},
        {en:"bug", ipa:"/bʌɡ/", es:"error / fallo", def:"A defect in software.", example:"We found a critical bug in production.", syn:"defect, issue", ant:"—", error:"No 'error' siempre; 'bug' es el término natural.", ctx:"QA y desarrollo."},
        {en:"scope", ipa:"/skəʊp/", es:"alcance", def:"The extent of a project.", example:"That's out of scope for this sprint.", syn:"range", ant:"—", error:"'scope creep' = aumento no controlado del alcance.", ctx:"Gestión de proyectos."},
        {en:"to troubleshoot", ipa:"/ˈtrʌblʃuːt/", es:"diagnosticar/solucionar problemas", def:"To find and fix problems.", example:"Let me troubleshoot the connection.", syn:"debug", ant:"—", error:"Un solo verbo, no 'trouble shoot'.", ctx:"Soporte técnico."},
        {en:"requirement", ipa:"/rɪˈkwaɪəmənt/", es:"requisito", def:"Something needed for a project.", example:"Let's gather the requirements first.", syn:"spec", ant:"—", error:"No confundir con 'requirent'; ojo pronunciación.", ctx:"Análisis y planificación."}
      ]
    },
    {
      id:"v_hr", name:"Recursos Humanos y entrevistas",
      words:[
        {en:"to hire", ipa:"/haɪə/", es:"contratar", def:"To employ someone.", example:"We're hiring two developers.", syn:"recruit", ant:"to fire / lay off", error:"'hire' (contratar) ≠ 'fire' (despedir).", ctx:"Reclutamiento."},
        {en:"onboarding", ipa:"/ˈɒnbɔːdɪŋ/", es:"incorporación (de nuevos empleados)", def:"Process of integrating new hires.", example:"Onboarding takes about two weeks.", syn:"induction", ant:"offboarding", error:"No 'in-boarding'.", ctx:"Primeros días en la empresa."},
        {en:"performance review", ipa:"/pəˈfɔːməns rɪˈvjuː/", es:"evaluación de desempeño", def:"Assessment of an employee's work.", example:"My performance review is next Friday.", syn:"appraisal", ant:"—", error:"No 'performation'.", ctx:"RRHH periódico."},
        {en:"notice period", ipa:"/ˈnəʊtɪs ˈpɪəriəd/", es:"periodo de preaviso", def:"Time between resigning and leaving.", example:"I have a one-month notice period.", syn:"—", ant:"—", error:"Muy usado al negociar entrada.", ctx:"Cambio de empleo."},
        {en:"benefits", ipa:"/ˈbɛnɪfɪts/", es:"prestaciones / beneficios", def:"Non-salary compensation.", example:"The benefits include health insurance.", syn:"perks", ant:"—", error:"'benefits' (laborales) ≠ 'profits' (ganancias).", ctx:"Paquete de compensación."}
      ]
    },
    {
      id:"v_finance", name:"Finanzas y ventas",
      words:[
        {en:"revenue", ipa:"/ˈrɛvənjuː/", es:"ingresos", def:"Total income from sales.", example:"Revenue grew 20% last quarter.", syn:"income, turnover", ant:"expenses", error:"'revenue' (ingresos) ≠ 'profit' (beneficio neto).", ctx:"Reportes financieros."},
        {en:"forecast", ipa:"/ˈfɔːkɑːst/", es:"previsión / pronóstico", def:"A prediction of future figures.", example:"The sales forecast looks strong.", syn:"projection", ant:"—", error:"No 'forecasting' como sustantivo aquí.", ctx:"Planificación."},
        {en:"lead", ipa:"/liːd/", es:"cliente potencial", def:"A potential customer.", example:"We got 50 new leads this month.", syn:"prospect", ant:"—", error:"En ventas 'lead' = prospecto, no 'líder'.", ctx:"Ventas / marketing."},
        {en:"to close a deal", ipa:"/kləʊz ə diːl/", es:"cerrar un trato", def:"To finalize a sale.", example:"We closed the deal yesterday.", syn:"seal the deal", ant:"—", error:"Colocación fija.", ctx:"Ventas."},
        {en:"quarter", ipa:"/ˈkwɔːtə/", es:"trimestre", def:"Three-month business period (Q1–Q4).", example:"We'll hit our target this quarter.", syn:"—", ant:"—", error:"Q1 = enero–marzo.", ctx:"Reporting."}
      ]
    },
    {
      id:"v_softskills", name:"Liderazgo y soft skills",
      words:[
        {en:"to delegate", ipa:"/ˈdɛlɪɡeɪt/", es:"delegar", def:"To assign tasks to others.", example:"A good manager knows how to delegate.", syn:"assign", ant:"micromanage", error:"No 'to delegate to do' — 'delegate a task to someone'.", ctx:"Liderazgo."},
        {en:"stakeholder", ipa:"/ˈsteɪkhəʊldə/", es:"parte interesada", def:"Anyone with interest in a project.", example:"We need buy-in from all stakeholders.", syn:"—", ant:"—", error:"No 'steakholder'.", ctx:"Gestión."},
        {en:"buy-in", ipa:"/ˈbaɪ ɪn/", es:"apoyo / aceptación", def:"Support and agreement.", example:"We need leadership buy-in.", syn:"support", ant:"—", error:"Sustantivo, no 'to buy in' aquí.", ctx:"Gestión del cambio."},
        {en:"to take ownership", ipa:"/teɪk ˈəʊnəʃɪp/", es:"asumir responsabilidad", def:"To take full responsibility.", example:"She took ownership of the issue.", syn:"be accountable", ant:"—", error:"Muy valorado en entrevistas.", ctx:"Cultura de responsabilidad."},
        {en:"proactive", ipa:"/prəʊˈæktɪv/", es:"proactivo", def:"Acting in advance.", example:"Be proactive about risks.", syn:"—", ant:"reactive", error:"Palabra clave en entrevistas.", ctx:"Descripción personal."}
      ]
    }
  ]
};

/* ================= LISTENING (motor listening) =================
   Enlaces a CANALES/PLAYLISTS OFICIALES reales y estables
   (no vídeos inventados). Verifica y elige dentro del canal. */
const LISTENING = [
  {channel:"BBC Learning English", url:"https://www.youtube.com/@bbclearningenglish", level:"B1–B2", topic:"General + 'English at Work'", focus:"Vocabulario laboral y pronunciación en episodios cortos."},
  {channel:"Business English Pod", url:"https://www.youtube.com/@BusinessEnglishPod", level:"B1–C1", topic:"Meetings, negotiation, interviews", focus:"El canal más enfocado a inglés corporativo real."},
  {channel:"Oxford Online English", url:"https://www.youtube.com/@oxfordonlineenglish", level:"B1–B2", topic:"Business English, interviews, presentations", focus:"Lecciones estructuradas con diálogos de oficina."},
  {channel:"English with Lucy", url:"https://www.youtube.com/@EnglishwithLucy", level:"B1–B2", topic:"Pronunciación británica, phrasal verbs", focus:"Acento y expresiones naturales."},
  {channel:"Speak English With Vanessa", url:"https://www.youtube.com/@SpeakEnglishWithVanessa", level:"B1–B2", topic:"Conversación y confianza al hablar", focus:"Fluidez y expresiones cotidianas."},
  {channel:"Rachel's English", url:"https://www.youtube.com/@rachelsenglish", level:"B1–C1", topic:"Pronunciación americana, connected speech", focus:"Ideal para shadowing y linking."},
  {channel:"mmmEnglish", url:"https://www.youtube.com/@mmmEnglish", level:"B1–B2", topic:"Gramática hablada y pronunciación", focus:"Explicaciones claras para intermedios."},
  {channel:"engVid", url:"https://www.youtube.com/@engvidEnglish", level:"A2–C1", topic:"Gramática, vocabulario, IELTS", focus:"Muchos profesores; busca 'business english'."},
  {channel:"Learn English With TV Series", url:"https://www.youtube.com/@LearnEnglishWithTVSeries", level:"B1–B2", topic:"Inglés real de series y películas", focus:"Comprensión de habla rápida y modismos."},
  {channel:"TED", url:"https://www.youtube.com/@TED", level:"B2–C1", topic:"Charlas profesionales", focus:"Escucha con subtítulos; imita a los ponentes."},
  {channel:"TED-Ed", url:"https://www.youtube.com/@TEDEd", level:"B1–B2", topic:"Explicaciones cortas", focus:"Ideal para comprensión guiada."},
  {channel:"Harvard Business Review", url:"https://www.youtube.com/@harvardbusinessreview", level:"B2–C1", topic:"Liderazgo y management", focus:"Vocabulario ejecutivo real."},
  {channel:"Google Careers", url:"https://www.youtube.com/@lifeatgoogle", level:"B2", topic:"Consejos de entrevista reales", focus:"Cómo son las entrevistas en grandes empresas."}
];

/* Preguntas de comprensión genéricas reutilizables para cualquier vídeo */
const LISTENING_TASKS = [
  "Escúchalo 1 vez sin subtítulos: ¿cuál es la idea principal?",
  "Escúchalo con subtítulos en inglés: anota 5 palabras nuevas.",
  "¿Qué 2 expresiones/colocaciones podrías usar en tu trabajo?",
  "Elige 30 segundos y haz shadowing (imita ritmo y entonación).",
  "Resume el vídeo en 3 frases en inglés y añádelo a tus flashcards."
];

/* ================= QUIZZES / EVALUACIONES (motor quizzes) ================= */
const QUIZZES = [
  {
    id:"quiz_grammar", title:"Test de Gramática (B1→B2)",
    questions:[
      {q:"I ___ here since 2021.", options:["work","am working","have worked"], answer:2, explain:"since → present perfect."},
      {q:"If we ___ the budget, we would hire more.", options:["have","had","will have"], answer:1, explain:"Second conditional: if + past."},
      {q:"The report ___ yesterday.", options:["was sent","is sent","sends"], answer:0, explain:"Pasado pasivo."},
      {q:"Could you ___ the meeting to 3pm?", options:["move","moving","moved"], answer:0, explain:"Modal + infinitivo sin 'to'."},
      {q:"'Actually' means:", options:["actualmente","en realidad","recientemente"], answer:1, explain:"False friend: actually = en realidad."},
      {q:"She ___ that she would help.", options:["say","said","says"], answer:1, explain:"Reported speech en pasado."},
      {q:"'Have you ever ___ abroad?'", options:["work","worked","working"], answer:1, explain:"Experiencia de vida → present perfect + participio."},
      {q:"We ___ the app last March.", options:["have launched","launched","launch"], answer:1, explain:"'last March' = tiempo concreto → past simple."},
      {q:"Most polite: ", options:["Send me the file.","Could you send me the file, please?","I want the file."], answer:1, explain:"'Could you...?' es la petición profesional estándar."},
      {q:"'If I ___ you, I'd ask for a raise.'", options:["am","was","were"], answer:2, explain:"Second conditional formal: 'If I were you'."},
      {q:"The bug ___ by the team already.", options:["has been fixed","fixed","is fix"], answer:0, explain:"Present perfect pasivo: has been + participio."},
      {q:"'I am agree with you' →", options:["es correcto","I agree with you","I am agreeing"], answer:1, explain:"'agree' es verbo: 'I agree', no 'I am agree'."},
      {q:"We'll hit the target ___ we ship on time.", options:["if","unless","despite"], answer:0, explain:"First conditional con 'if'."},
      {q:"Contraste: 'Sales rose, ___, costs went up too.'", options:["therefore","however","moreover"], answer:1, explain:"'however' marca contraste."}
    ]
  },
  {
    id:"quiz_business", title:"Test de Business English",
    questions:[
      {q:"Polite interruption:", options:["Stop talking.","Sorry to jump in, but...","Listen to me."], answer:1, explain:"Fórmula de cortesía."},
      {q:"'Let's take this offline' means:", options:["desconectar","hablarlo aparte","apagar cámara"], answer:1, explain:"Discutir después/aparte."},
      {q:"A KPI is a:", options:["reunión","indicador clave","documento legal"], answer:1, explain:"Key Performance Indicator."},
      {q:"Soft rejection in negotiation:", options:["No way.","I'm afraid that won't work for us.","Never."], answer:1, explain:"Rechazo diplomático."},
      {q:"'Buy-in' means:", options:["compra","apoyo/aceptación","presupuesto"], answer:1, explain:"Apoyo del equipo/dirección."},
      {q:"A 'blocker' in Agile is:", options:["una tarea fácil","un impedimento","un jefe"], answer:1, explain:"Algo que frena tu trabajo."},
      {q:"'The key takeaway is...' introduces:", options:["una despedida","la idea principal","una pregunta"], answer:1, explain:"El mensaje central de la presentación."},
      {q:"Signpost for a transition:", options:["The end.","That brings me to my next point.","I don't know."], answer:1, explain:"Guía a la audiencia entre secciones."},
      {q:"Best neutral email closing:", options:["Yours faithfully","Best,","Bye bye"], answer:1, explain:"'Best,' es versátil y profesional."},
      {q:"'Let's align on priorities' means:", options:["ponernos de acuerdo en prioridades","alinear la mesa","cancelar prioridades"], answer:0, explain:"Llegar a un entendimiento común."},
      {q:"Conditional offer in a deal:", options:["Take it or leave it.","We could do X provided that you Y.","Whatever you want."], answer:1, explain:"Intercambio condicionado."},
      {q:"'Stakeholder' means:", options:["accionista solo","parte interesada","empleado nuevo"], answer:1, explain:"Cualquier parte con interés en el proyecto."}
    ]
  },
  {
    id:"quiz_vocab", title:"Test de Vocabulario laboral",
    questions:[
      {q:"'Revenue' is:", options:["beneficio neto","ingresos","gastos"], answer:1, explain:"Ingresos totales."},
      {q:"A 'lead' in sales is:", options:["líder","cliente potencial","producto"], answer:1, explain:"Prospecto/cliente potencial."},
      {q:"'Onboarding' is:", options:["despido","incorporación de nuevos empleados","reunión"], answer:1, explain:"Integración de nuevos empleados."},
      {q:"'Out of scope' means:", options:["fuera del alcance","sin presupuesto","urgente"], answer:0, explain:"No incluido en el proyecto."},
      {q:"'To wrap up' means:", options:["envolver","cerrar/finalizar","empezar"], answer:1, explain:"Terminar algo."},
      {q:"'Deadline' is:", options:["línea muerta","fecha límite","reunión final"], answer:1, explain:"Fecha tope de entrega."},
      {q:"'To hire' means:", options:["despedir","contratar","ascender"], answer:1, explain:"'hire' = contratar; 'fire' = despedir."},
      {q:"'Forecast' is:", options:["previsión/pronóstico","factura","contrato"], answer:0, explain:"Predicción de cifras futuras."},
      {q:"'To take ownership' means:", options:["comprar algo","asumir responsabilidad","tomar vacaciones"], answer:1, explain:"Responsabilizarte de algo de principio a fin."},
      {q:"'Notice period' is:", options:["periodo de preaviso","hora de descanso","periodo de prueba"], answer:0, explain:"Tiempo entre renunciar y salir."},
      {q:"'Benefits' (laborales) are:", options:["ganancias","prestaciones","impuestos"], answer:1, explain:"Compensación no salarial (seguro, etc.)."},
      {q:"'Deployment' is:", options:["despido","despliegue/puesta en producción","reunión"], answer:1, explain:"Poner software a disposición de usuarios."}
    ]
  },
  {
    id:"quiz_travel", title:"Test de Inglés para viajes ✈️",
    questions:[
      {q:"'Carry-on' is:", options:["maleta facturada","equipaje de mano","carrito"], answer:1, explain:"Equipaje que llevas a bordo."},
      {q:"A 'layover' is:", options:["una escala","un retraso","un asiento"], answer:0, explain:"Parada entre vuelos de conexión."},
      {q:"In a restaurant, 'the bill' / 'the check' is:", options:["el menú","la cuenta","la propina"], answer:1, explain:"Lo que pagas al final (UK bill / US check)."},
      {q:"'I'm allergic to nuts' means:", options:["me gustan los frutos secos","soy alérgico a los frutos secos","quiero frutos secos"], answer:1, explain:"Frase clave para alergias."},
      {q:"'Round-trip / return' ticket is:", options:["solo ida","ida y vuelta","primera clase"], answer:1, explain:"Billete de ida y vuelta."},
      {q:"At the ATM, 'my card was declined' means:", options:["me dieron dinero","rechazaron mi tarjeta","cambié divisa"], answer:1, explain:"La tarjeta no fue aceptada."},
      {q:"'Over the counter' (pharmacy) means:", options:["con receta","sin receta","gratis"], answer:1, explain:"Se vende sin prescripción médica."},
      {q:"Asking directions: 'Go straight and ___ left.'", options:["turn","return","go up"], answer:0, explain:"'turn left/right' = girar."},
      {q:"'Keep the change' means:", options:["dame el cambio","quédese con el vuelto","no tengo cambio"], answer:1, explain:"Le dices al taxista/camarero que se quede el vuelto."},
      {q:"European emergency number:", options:["911","112","999"], answer:1, explain:"112 en Europa (911 EE.UU., 999 Reino Unido)."},
      {q:"'Is breakfast included?' asks about:", options:["el precio total","si el desayuno viene incluido","la hora de salida"], answer:1, explain:"Pregunta habitual en el check-in."},
      {q:"'A bargain' is:", options:["una ganga","un timo","una queja"], answer:0, explain:"Algo barato/buen precio ('rip-off' = lo contrario)."}
    ]
  }
];

/* ================= LOGROS (motor achievements) ================= */
const ACHIEVEMENTS = [
  {id:"first_step", emoji:"👣", name:"Primer paso", desc:"Completa tu primera lección."},
  {id:"grammar_master", emoji:"📐", name:"Gramática sólida", desc:"Completa todas las lecciones de gramática."},
  {id:"word_collector", emoji:"🗂️", name:"Coleccionista", desc:"Repasa 25 flashcards."},
  {id:"vocab_champ", emoji:"🎓", name:"Campeón de vocabulario", desc:"Saca 90%+ en una sesión de repaso de vocabulario."},
  {id:"quiz_ace", emoji:"🎯", name:"Puntería", desc:"Saca 80%+ en un quiz."},
  {id:"interview_ready", emoji:"🤝", name:"Listo para la entrevista", desc:"Completa una sesión del simulador."},
  {id:"ai_talker", emoji:"🤖", name:"Charlando con la IA", desc:"Completa una conversación con el simulador de Speaking con IA."},
  {id:"clear_voice", emoji:"🎙️", name:"Voz clara", desc:"Confianza media ≥80% en 5+ sesiones de voz."},
  {id:"writer", emoji:"✍️", name:"Redactor pro", desc:"Practica 3 ejercicios de writing."},
  {id:"streak_7", emoji:"🔥", name:"Constancia", desc:"Estudia 7 días (racha)."},
  {id:"halfway", emoji:"⛰️", name:"A mitad de camino", desc:"Alcanza 50% del curso."},
  {id:"graduate", emoji:"🎓", name:"B2 alcanzado", desc:"Completa 100% del curso."}
];
