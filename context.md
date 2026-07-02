# Context — Business English Pro

Documentación técnica y de contexto del proyecto. Sirve como guía para retomar el desarrollo (humano o asistido por IA).

## 1. Qué es

Plataforma web **interactiva y autónoma** para aprender **inglés de negocios y de viajes**, con el objetivo de llevar al usuario de un **B1 medio (B1.1) a un B2 alto**, con foco en empleabilidad, reuniones, entrevistas y comunicación profesional.

- **Sin backend, sin build, sin dependencias externas.** Todo es HTML/CSS/JS puro.
- **Funciona offline.** El contenido está embebido como objetos JS (no hay `fetch`), así que abre con doble clic (`file://`).
- **El progreso se guarda en el navegador** (`localStorage`, clave `bep_state_v1`).
- Idioma de la interfaz: **español**; el contenido de práctica está en **inglés**.

## 2. Cómo ejecutar

**Opción A — doble clic:** abre `index.html`. Funciona todo excepto el reconocimiento de voz.

**Opción B — servidor local (recomendada):** necesaria para el **micrófono** (la Web Speech API exige contexto seguro; `localhost` cuenta):

```bash
# En la carpeta del proyecto
python -m http.server 4321
# Abrir http://localhost:4321 en Chrome o Edge
```

## 3. Estructura de archivos

```
business-english-course/
├── index.html            # Shell: sidebar, topbar, barra de progreso; carga los scripts en orden
├── css/
│   └── styles.css         # Estilos (tema oscuro, responsivo, animaciones)
├── js/
│   ├── content.js         # Datos: gramática, vocabulario, business, listening, quizzes, logros, método
│   ├── content-extra.js   # Datos: entrevistas, frases, writing, reading, speaking, plan 16 semanas
│   ├── content-travel.js  # Datos: inglés de viajes (escenarios, vocab, supervivencia, mini-simulador)
│   └── app.js             # Motor: router, progreso, y todos los renderers/engines
└── context.md / README.md
```

**Orden de carga (importante):** en `index.html`, los `content-*.js` se cargan **antes** de `app.js`. Cualquier archivo de contenido nuevo debe añadirse como `<script>` antes de `app.js`.

## 4. Arquitectura

- **Datos separados de la lógica.** Los `content-*.js` definen constantes globales (`GRAMMAR`, `VOCAB`, `TRAVEL_SCENARIOS`, `PLAN`, etc.). `app.js` las consume.
- **Router simple:** `COURSE.modules` (en `content.js`) define el menú lateral. Cada módulo tiene un `type`; `RENDER[type](view, module)` pinta la vista. `go(id)` cambia de módulo.
- **Estado:** objeto `state` persistido en `localStorage`. `defaultState()` define el esquema; `load()` hace merge con lo guardado (los campos nuevos toman su valor por defecto sin migración).
- **Progreso global:** `totalTrackable()` y `doneCount()` calculan el `%`; `estLevel()` estima el nivel CEFR (suelo **B1.1**).

### ⚠️ Gotchas (errores ya resueltos, no repetir)
1. **`const` a nivel global NO se adjunta a `window`.** Por eso `app.js` mapea los datos de lecciones vía `const DATA = { GRAMMAR, PRONUNCIATION, BUSINESS }` y usa `DATA[m.data]`, nunca `window[m.data]`.
2. **Reconocimiento de voz solo en `http://localhost`** (o https), no en `file://`. La escritura funciona en todos lados.

## 5. Módulos (menú)

| Módulo | `type` | Motor / notas |
|---|---|---|
| Inicio | `dashboard` | Resumen, "continuar", tarjetas de módulos |
| Objetivos y método | `objectives` | Metodologías basadas en evidencia |
| Gramática | `lessons` (`GRAMMAR`) | 4 lecciones "Base B1" (`f1–f4`) + 7 (`g1–g7`), con mini-quiz |
| Vocabulario | `vocab` | 5 mazos laborales con IPA, audio, error típico |
| Repaso de vocabulario | `vocabsession` | Juego con puntuación; modos elegir/escribir; racha 🔥 |
| Listening | `listening` | Enlaces a **canales oficiales reales** de YouTube |
| Speaking (roles) | `speaking` | 6 roleplays con modelo y audio |
| Writing | `writing` | 5 tareas con versión nativa + checklist |
| Reading | `reading` | Textos reales + preguntas |
| Pronunciación | `lessons` (`PRONUNCIATION`) | Sonidos, connected speech, stress |
| Business English | `lessons` (`BUSINESS`) | Meetings, negociación, presentaciones, Agile |
| Entrevistas | `interview` | Preguntas con ejemplos B1/B2/natural |
| Simulador entrevista | `simulator` | Dificultad adaptativa + feedback + voz |
| Speaking con IA | `aispeaking` | Conversación libre con **Google Gemini** (BYOK, ver sección 6) + voz |
| Corrección inteligente | `corrector` | Heurísticas (false friends, incontables…) + nivel CEFR + voz |
| Frases útiles | `phrases` | Biblioteca con buscador |
| Inglés para viajes | `travel` | 14 escenarios, mini-simulador, vocab, supervivencia |
| Repaso (SRS) | `flashcards` | Repetición espaciada (intervalos 1-3-7-16-35 días) |
| Evaluaciones | `quizzes` | 4 tests (gramática, business, vocab, viajes) |
| Plan 16 semanas | `plan` | Día a día con checkboxes |
| Calendario | `calendar` | Registro de estudio + racha |
| Estadísticas | `stats` | Progreso, pronunciación hablada (voz), recomendaciones |
| Logros | `achievements` | Gamificación |

## 6. Funciones clave (en `app.js`)

- **SRS flashcards:** `allCards()` (une vocab laboral + viajes + frases de viaje), `dueCards()`, `addToSRS(key)`. Claves: `v:<en>` para palabras, `t:<en>` para frases de viaje.
- **Simulador de entrevista:** `startSim`/`nextQuestion`/`simSend` con dificultad adaptativa (`INTERVIEW.simulatorBank` y `feedbackRules`).
- **Mini-simulador de viajes:** `runTravelSim`/`tsimSend` (conversación guiada por `TRAVEL_SIM`, feedback por keywords).
- **Corrector:** `analyzeText` + `CORR_RULES` (reglas regex deterministas).
- **Voz:** `attachMic(btn, textarea, confEl, srcLabel)` (Web Speech API, `en-US`), indicador de confianza `showConfidence`, historial en `state.speechReadings`, resumen en Estadísticas (`renderSpeechSection`/`speechStats`).
- **Repaso de vocabulario:** `RENDER.vocabsession`, `buildVocabQuestions`/`makeVocabQ`/`vocabPool`; modo escritura con corrección tolerante (`normAns`/`acceptableForms`/`levenshtein`); racha (`vocabRegister`/`vsStreakPill`).
- **Speaking con IA (Gemini):** `RENDER.aispeaking` + `callGemini(apiKey, model, systemPrompt, history)` — llama directo (fetch, sin backend) a `generativelanguage.googleapis.com` con la clave del usuario (BYOK, `state.geminiKey`, guardada solo en `localStorage`, nunca en un servidor propio porque no existe). Escenarios en `AI_SCENARIOS`; prompt de sistema en `aiSystemPrompt()`; flujo de turnos en `aiRequestReply`/`aiEnd` (feedback final en español + nivel CEFR). Reutiliza `attachMic`/`speak` para voz. Modelo por defecto `gemini-2.0-flash`, override opcional en `state.geminiModel`.

## 7. Cómo extender

- **Nueva lección de gramática/pronunciación/business:** añade un objeto `{id, title, cefr, objectives, body, examples, quiz}` al array correspondiente en `content.js`. Se lista y renderiza solo.
- **Nuevo mazo de vocabulario:** añade a `VOCAB.decks` (o `TRAVEL_VOCAB.decks`). Entra automáticamente en flashcards y en el repaso de vocabulario.
- **Nuevo módulo:** añade una entrada a `COURSE.modules` con un `type` nuevo y define `RENDER.<type>`.
- **Nuevo logro:** añade a `ACHIEVEMENTS` (`content.js`) y su comprobación en `checkAchievements()` (`app.js`).
- **Nuevo escenario de Speaking con IA:** añade `{id, label, prompt}` a `AI_SCENARIOS` (`app.js`). `prompt` es la instrucción en inglés que define el rol de la IA; se inyecta en `aiSystemPrompt()`.
- **BYOK (Bring Your Own Key):** la app no tiene backend, así que no puede ocultar ninguna clave de API. El patrón usado (clave del usuario en `state.geminiKey`, solo en `localStorage`, llamada `fetch()` directa desde el navegador) es el único viable aquí. Si se añade otro proveedor de IA, seguir el mismo patrón y avisar claramente en la UI de que la clave es visible en las herramientas de desarrollador del propio usuario.

## 8. Metodología aplicada

Active Recall, Spaced Repetition, Comprehensible Input, Deliberate Practice, Shadowing, Task-Based Learning, Communicative Language Teaching, Microlearning, aprendizaje contextual y gamificación. Cada una se explica en el módulo "Objetivos y método".

## 9. Estado del contenido

- **Listening:** se enlaza a canales/handles **oficiales y estables** de YouTube (BBC Learning English, Business English Pod, Oxford Online English, TED, HBR…), no a vídeos concretos (para no romper enlaces).
- El contenido se puede ampliar en profundidad (más lecciones, vocabulario por sector, preguntas) sin tocar el motor.
