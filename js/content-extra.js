/* ============================================================
   Business English Pro — CONTENIDO EXTRA
   Entrevistas, frases, writing, reading, speaking, plan 16 sem.
   ============================================================ */

/* ================= ENTREVISTAS (motor interview) ================= */
const INTERVIEW = {
  questions: [
    {
      q:"Tell me about yourself.",
      looksFor:"Un resumen profesional enfocado, no tu biografía. Presente → pasado relevante → futuro (por qué este puesto).",
      structure:"Fórmula Present-Past-Future: 1) Qué haces ahora, 2) Logro/experiencia clave, 3) Por qué quieres este rol.",
      errors:["Contar tu vida personal","Ser demasiado largo (>2 min)","Traducir 'Soy una persona responsable' literal y genérico"],
      b1:"I am a developer. I work in a company. I like programming and I am responsible.",
      b2:"I'm a backend developer with three years' experience building APIs. Currently I lead a small team at a fintech, where I improved our response time by 40%. I'm now looking for a role where I can grow into architecture — which is why this position caught my eye.",
      natural:"So, a bit about me — I'm a backend developer, and over the past three years I've focused on scalable APIs. Right now I'm leading a team at a fintech startup, and one thing I'm proud of is cutting our API latency by 40%. I'm keen to take on more architectural work, and that's exactly what drew me to this role.",
      variants:["Walk me through your background.","Give me a quick overview of your experience."]
    },
    {
      q:"Why should we hire you?",
      looksFor:"Ajuste entre tus fortalezas y las necesidades del puesto. Evidencia, no adjetivos vacíos.",
      structure:"1) La necesidad del rol, 2) tu fortaleza que la cubre, 3) prueba con un resultado.",
      errors:["Decir 'because I need the job'","Listar adjetivos sin pruebas","Compararte negativamente con otros"],
      b1:"Because I am a good worker and I learn fast. I need this job.",
      b2:"You need someone who can ship reliable features fast. I've done exactly that — in my last role I delivered a payments module two weeks early with zero critical bugs. I bring both technical skill and a delivery mindset.",
      natural:"From the job description, it sounds like you need someone who can move fast without breaking things. That's my sweet spot — last year I shipped a payments module ahead of schedule with no critical bugs. I think I'd hit the ground running here.",
      variants:["What makes you a good fit?","Why are you the right person for this role?"]
    },
    {
      q:"What is your greatest strength?",
      looksFor:"Una fortaleza relevante para el puesto + ejemplo concreto.",
      structure:"Nombra la fortaleza → contexto → resultado.",
      errors:["Elegir una fortaleza irrelevante","No dar ejemplo","Sonar arrogante sin datos"],
      b1:"My strength is that I am organized and I work hard.",
      b2:"My greatest strength is problem-solving under pressure. When our production system went down last quarter, I stayed calm, isolated the issue, and restored service in under an hour.",
      natural:"I'd say it's staying cool under pressure. A good example — when prod went down last quarter, I was the one who kept the team focused, tracked down the root cause, and we were back up within the hour.",
      variants:["What are you best at?","What do you bring to a team?"]
    },
    {
      q:"What is your greatest weakness?",
      looksFor:"Autoconocimiento + acción de mejora. Nunca una debilidad fatal para el rol.",
      structure:"Debilidad real pero manejable → qué haces para mejorarla.",
      errors:["'I'm a perfectionist' (cliché)","Decir 'I have no weaknesses'","Confesar algo descalificante"],
      b1:"My weakness is my English. And I am a perfectionist.",
      b2:"I used to struggle with delegating — I wanted to do everything myself. I've been working on it by trusting my team with ownership, and it's made us faster overall.",
      natural:"Honestly, delegating didn't come naturally to me at first — I'd take on too much. But I've consciously worked on handing over ownership, and the team's actually more productive for it.",
      variants:["What are you working on improving?","Tell me about an area for growth."]
    },
    {
      q:"Tell me about a time you handled a conflict. (STAR)",
      looksFor:"Método STAR: Situation, Task, Action, Result. Madurez y comunicación.",
      structure:"S: contexto · T: tu responsabilidad · A: qué hiciste · R: resultado medible.",
      errors:["Hablar mal de excompañeros","Saltar directo al resultado sin contexto","No mostrar tu rol concreto"],
      b1:"One time a colleague was angry, but I talked with him and it was ok.",
      b2:"(Situation) On a tight project, a colleague and I disagreed on the approach. (Task) I needed to keep us on schedule. (Action) I set up a quick call, listened to his concerns, and we agreed on a hybrid solution. (Result) We delivered on time and our working relationship improved.",
      natural:"Sure. We were on a tight deadline and a teammate and I clashed over the technical approach. Rather than let it fester, I grabbed 15 minutes with him, heard him out, and we landed on a middle-ground solution. We shipped on time — and honestly worked better together afterwards.",
      variants:["Describe a difficult situation with a coworker.","How do you handle disagreements?"]
    },
    {
      q:"Where do you see yourself in five years?",
      looksFor:"Ambición realista alineada con la empresa. Ganas de crecer, no de irte.",
      structure:"Dirección de crecimiento → cómo el rol te acerca → valor para la empresa.",
      errors:["'I want your job'","'I don't know'","Planes que no encajan con la empresa"],
      b1:"In five years I want a better job and more money.",
      b2:"In five years I'd like to have grown into a senior or lead role, mentoring others and owning larger projects. This position is a strong step in that direction because of the scope you offer.",
      natural:"I'd love to be in a senior or lead position — owning bigger pieces of work and helping junior folks grow. This role feels like a natural runway toward that, which is a big part of the appeal.",
      variants:["What are your career goals?","What's next for you professionally?"]
    },
    {
      q:"What are your salary expectations?",
      looksFor:"Rango informado y flexibilidad. Investigación de mercado.",
      structure:"Da un rango basado en investigación → muestra flexibilidad → redirige al valor.",
      errors:["Dar una cifra exacta muy pronto","Decir 'whatever you offer'","Pedir sin justificar"],
      b1:"I want a good salary, maybe more than now.",
      b2:"Based on my research for this role and market, I'm looking at a range of X to Y. That said, I'm flexible and open to discussing the whole package.",
      natural:"From what I've seen for similar roles, I'd expect somewhere in the range of X to Y. But I'm flexible — I care more about the overall fit and the opportunity than a specific number.",
      variants:["What compensation are you looking for?","What are your salary requirements?"]
    },
    {
      q:"Do you have any questions for us?",
      looksFor:"Interés genuino y preparación. Nunca digas 'no'.",
      structure:"Pregunta sobre equipo, éxito en el rol, o retos actuales.",
      errors:["'No, I'm good'","Preguntar solo por vacaciones/salario","Preguntas cuya respuesta ya está en la web"],
      b1:"No, I have no questions. Or, how many holidays?",
      b2:"Yes — what does success look like in this role in the first six months? And how would you describe the team culture?",
      natural:"Definitely a couple. What would a successful first six months look like for whoever takes this on? And I'd love to hear how you'd describe the team's culture day to day.",
      variants:["Is there anything you'd like to ask?","What questions do you have?"]
    }
  ],
  /* Banco para el simulador: preguntas por dificultad */
  simulatorBank:{
    easy:[
      "Tell me a little about yourself.",
      "What do you do in your current job?",
      "Why are you interested in this position?",
      "What are your main strengths?",
      "What do you enjoy most about your work?"
    ],
    medium:[
      "Why should we hire you over other candidates?",
      "Tell me about a challenge you faced and how you solved it.",
      "What's your greatest weakness, and how are you working on it?",
      "Describe your ideal working environment.",
      "How do you prioritize when everything is urgent?"
    ],
    hard:[
      "Tell me about a time you failed. What did you learn? (Use STAR)",
      "Describe a conflict with a manager and how you handled it.",
      "How would you convince a resistant stakeholder to adopt your idea?",
      "Where do you see yourself in five years, and how does this role fit?",
      "What are your salary expectations, and how did you arrive at that number?"
    ]
  },
  /* Consejos que el simulador muestra según palabras detectadas en la respuesta */
  feedbackRules:[
    {test:(t)=>t.split(/\s+/).filter(Boolean).length < 25, msg:"Tu respuesta es corta. En una entrevista real, apunta a 45–90 segundos (60–150 palabras). Añade un ejemplo concreto."},
    {test:(t)=>!/\b(I|I'm|I've|my|me)\b/i.test(t), msg:"Usa la primera persona y ejemplos personales ('In my role I...'). Los reclutadores quieren TU experiencia."},
    {test:(t)=>!/\b(result|increased|reduced|improved|delivered|led|achieved|grew|saved|%|percent)\b/i.test(t), msg:"Añade un RESULTADO medible (%, tiempo, dinero). Ej: 'reduced load time by 40%'. Es lo que más impacta."},
    {test:(t)=>/\bactually\b/i.test(t) && /\bcurrently\b/i.test(t)===false, msg:"Recuerda: 'actually' = en realidad; 'actualmente' = currently/nowadays."},
    {test:(t)=>/\bpeoples\b|\binformations\b|\badvices\b/i.test(t), msg:"Incontables: 'people/information/advice' no llevan -s."},
    {test:(t)=>/\bi am agree\b/i.test(t), msg:"'I am agree' ❌ → 'I agree' ✅ (agree es verbo, no adjetivo)."},
    {test:(t)=>/\bexplain me\b/i.test(t), msg:"'explain me' ❌ → 'explain to me' ✅."}
  ]
};

/* ================= FRASES ÚTILES (motor phrases) ================= */
const PHRASES = [
  { category:"Meetings", items:[
    {en:"Let's get the ball rolling.", es:"Empecemos / pongámonos en marcha.", when:"Abrir una reunión con energía.", avoid:"Contextos muy formales/legales.", formality:"Neutral"},
    {en:"Can we circle back to that?", es:"¿Podemos retomar eso luego?", when:"Posponer un tema sin descartarlo.", avoid:"Si el tema es urgente.", formality:"Neutral"},
    {en:"Let's take this offline.", es:"Hablémoslo aparte después.", when:"Un tema se desvía o es muy específico.", avoid:"Si todos necesitan la info.", formality:"Neutral"},
    {en:"I'll circle back with the details.", es:"Vuelvo con los detalles.", when:"Comprometer un seguimiento.", avoid:"—", formality:"Neutral"},
    {en:"Just to play devil's advocate...", es:"Solo por llevar la contraria (constructivamente)...", when:"Cuestionar una idea sin atacar.", avoid:"Si la relación es tensa.", formality:"Neutral"}
  ]},
  { category:"Emails", items:[
    {en:"I hope this email finds you well.", es:"Espero que estés bien.", when:"Apertura formal/neutral.", avoid:"Emails muy rápidos internos.", formality:"Formal"},
    {en:"Just a quick note to...", es:"Solo una nota rápida para...", when:"Mensajes internos breves.", avoid:"Clientes muy formales.", formality:"Informal"},
    {en:"Please find attached...", es:"Adjunto encontrarás...", when:"Enviar documentos.", avoid:"—", formality:"Formal"},
    {en:"Let me know if you have any questions.", es:"Avísame si tienes dudas.", when:"Cierre estándar útil.", avoid:"—", formality:"Neutral"},
    {en:"Apologies for the delay in getting back to you.", es:"Disculpa la demora en responder.", when:"Respondes tarde.", avoid:"—", formality:"Neutral/Formal"}
  ]},
  { category:"Interviews", items:[
    {en:"That's a great question.", es:"Esa es una gran pregunta (te da 2s para pensar).", when:"Ganar tiempo con elegancia.", avoid:"Usarla en cada pregunta.", formality:"Neutral"},
    {en:"In my previous role, I...", es:"En mi puesto anterior, yo...", when:"Introducir experiencia.", avoid:"—", formality:"Formal"},
    {en:"I'm particularly drawn to this role because...", es:"Me atrae especialmente este puesto porque...", when:"Mostrar interés genuino.", avoid:"—", formality:"Formal"},
    {en:"To give you a concrete example...", es:"Para darte un ejemplo concreto...", when:"Respaldar con evidencia (STAR).", avoid:"—", formality:"Neutral"}
  ]},
  { category:"Presentations", items:[
    {en:"Let me walk you through this.", es:"Déjame explicarte esto paso a paso.", when:"Presentar un proceso/dato.", avoid:"—", formality:"Neutral"},
    {en:"The key takeaway is...", es:"La idea clave es...", when:"Resaltar el mensaje principal.", avoid:"—", formality:"Neutral"},
    {en:"Let's dive into the numbers.", es:"Vayamos a los números.", when:"Transición a datos.", avoid:"Audiencia muy formal.", formality:"Neutral"},
    {en:"I'm happy to take any questions.", es:"Con gusto respondo preguntas.", when:"Cierre de presentación.", avoid:"—", formality:"Neutral/Formal"}
  ]},
  { category:"Small Talk", items:[
    {en:"How's your week going so far?", es:"¿Qué tal va tu semana?", when:"Romper el hielo.", avoid:"—", formality:"Informal"},
    {en:"Any plans for the weekend?", es:"¿Planes para el finde?", when:"Charla ligera viernes.", avoid:"Con desconocidos muy formales.", formality:"Informal"},
    {en:"It's been a busy one, hasn't it?", es:"Ha sido movidito, ¿verdad?", when:"Empatizar.", avoid:"—", formality:"Informal"}
  ]},
  { category:"Phone / Video Calls", items:[
    {en:"You're breaking up a bit.", es:"Se te corta un poco.", when:"Problema de conexión.", avoid:"—", formality:"Neutral"},
    {en:"Sorry, you're on mute.", es:"Perdona, estás en silencio.", when:"Clásico de videollamadas.", avoid:"—", formality:"Neutral"},
    {en:"Could you repeat that? I didn't catch it.", es:"¿Puedes repetir? No lo capté.", when:"Pedir repetición.", avoid:"—", formality:"Neutral"},
    {en:"Can everyone see my screen?", es:"¿Todos ven mi pantalla?", when:"Compartir pantalla.", avoid:"—", formality:"Neutral"}
  ]},
  { category:"Negotiation", items:[
    {en:"Would you be open to...?", es:"¿Estarías dispuesto a...?", when:"Proponer con tacto.", avoid:"—", formality:"Formal"},
    {en:"That's a bit outside our budget.", es:"Eso se sale un poco de nuestro presupuesto.", when:"Rechazar precio suave.", avoid:"—", formality:"Neutral"},
    {en:"Let's meet in the middle.", es:"Busquemos un punto medio.", when:"Proponer compromiso.", avoid:"—", formality:"Neutral"},
    {en:"I'll need to run this by my team.", es:"Tengo que consultarlo con mi equipo.", when:"Ganar tiempo.", avoid:"—", formality:"Neutral"}
  ]},
  { category:"Feedback", items:[
    {en:"One thing that really worked well was...", es:"Algo que funcionó muy bien fue...", when:"Feedback positivo específico.", avoid:"—", formality:"Neutral"},
    {en:"Have you considered...?", es:"¿Has considerado...?", when:"Sugerir sin imponer.", avoid:"—", formality:"Neutral"},
    {en:"One area to build on would be...", es:"Un aspecto a mejorar sería...", when:"Feedback constructivo suave.", avoid:"—", formality:"Formal"}
  ]},
  { category:"Problem Solving", items:[
    {en:"Let's get to the root of this.", es:"Vayamos a la raíz del problema.", when:"Análisis de causa.", avoid:"—", formality:"Neutral"},
    {en:"What are our options here?", es:"¿Qué opciones tenemos?", when:"Abrir soluciones.", avoid:"—", formality:"Neutral"},
    {en:"As a workaround, we could...", es:"Como solución temporal, podríamos...", when:"Proponer parche.", avoid:"—", formality:"Neutral"}
  ]},
  { category:"Leadership", items:[
    {en:"Let's align on priorities.", es:"Alineémonos en prioridades.", when:"Dirigir al equipo.", avoid:"—", formality:"Neutral"},
    {en:"I trust your judgment on this.", es:"Confío en tu criterio en esto.", when:"Delegar y empoderar.", avoid:"—", formality:"Neutral"},
    {en:"Let's keep this on our radar.", es:"Mantengámoslo en el radar.", when:"Seguimiento sin urgencia.", avoid:"—", formality:"Neutral"}
  ]}
];

/* ================= WRITING (motor writing) ================= */
const WRITING = [
  {
    id:"w1", title:"Follow-up email tras una reunión", cefr:"B2",
    prompt:"Escribe un correo de seguimiento a un cliente tras una reunión: agradece, resume 2 acuerdos y propón siguiente paso con fecha.",
    tips:["Asunto claro","Un objetivo por correo","Termina con una acción y plazo concretos"],
    model:`Subject: Follow-up — Next steps from today's call

Hi Sarah,

Thanks for taking the time to meet today. It was great to align on the project scope.

To recap what we agreed:
• Your team will share the brand assets by Thursday.
• We'll deliver the first prototype by June 20.

As a next step, I've booked a 30-minute review for June 21 — feel free to adjust if another time works better.

Let me know if you have any questions in the meantime.

Best,
[Your name]`
  },
  {
    id:"w2", title:"Pedir una extensión de plazo", cefr:"B2",
    prompt:"Escribe a tu manager pidiendo 2 días más para una entrega, explicando el motivo y ofreciendo un plan.",
    tips:["Sé directo pero profesional","Da una razón, no una excusa","Ofrece una solución, no solo el problema"],
    model:`Subject: Request to extend the report deadline

Hi David,

I wanted to flag that I'll need two extra days for the Q3 report. During the analysis I found some data inconsistencies that need verifying to keep the numbers reliable.

My plan is to finish the checks tomorrow and deliver the full report by Thursday EOD. If the current deadline is firm, I can share a partial draft on Tuesday and flag the pending sections.

Happy to discuss. Thanks for understanding.

Best,
[Your name]`
  },
  {
    id:"w3", title:"Mensaje de Slack/Teams reportando un blocker", cefr:"B1",
    prompt:"Escribe un mensaje breve de Slack para tu equipo reportando que estás bloqueado y qué necesitas.",
    tips:["Corto y accionable","Di exactamente qué necesitas y de quién","Sin saludos largos en chat de equipo"],
    model:`Hey team 👋 quick blocker: I can't deploy to staging — looks like a permissions issue on the CI pipeline. @DevOps could someone grant me access or point me to the right person? Happy to hop on a quick call if that's faster. Thanks!`
  },
  {
    id:"w4", title:"Resumen profesional para LinkedIn / CV", cefr:"B2",
    prompt:"Escribe un resumen profesional de 3–4 líneas para tu perfil, con rol, especialidad, un logro y lo que buscas.",
    tips:["Empieza con tu rol y años de experiencia","Incluye 1 logro cuantificado","Termina con tu objetivo/valor"],
    model:`Backend developer with 3+ years building scalable APIs for fintech products. I specialize in performance optimization — recently cut API latency by 40% and improved reliability to 99.9% uptime. Passionate about clean architecture and mentoring. Currently open to senior roles where I can own systems end to end.`
  },
  {
    id:"w5", title:"Cover letter — párrafo de apertura", cefr:"B2",
    prompt:"Escribe el primer párrafo de una carta de presentación para un puesto que te entusiasme.",
    tips:["Evita 'I am writing to apply for...' genérico","Conecta tu motivación con la empresa","Muestra que investigaste"],
    model:`When I saw that [Company] is scaling its payments platform across new markets, I knew I had to apply. As a backend developer who has spent the last three years making financial systems faster and more reliable, I'm excited by the chance to help build infrastructure that thousands of businesses depend on every day.`
  }
];
/* Checklist de auto-corrección para writing */
const WRITING_CHECKLIST = [
  "¿Un solo objetivo claro por mensaje?",
  "¿Asunto/primera línea concreta?",
  "¿Verbos de acción y plazos (by Friday, EOD)?",
  "¿Tono adecuado al destinatario (formal/neutral/informal)?",
  "¿Sin false friends? (actually, assist, sensible, eventually)",
  "¿Cierre con acción clara + despedida apropiada?"
];

/* ================= READING (motor reading) ================= */
const READING = [
  {
    id:"r1", title:"Job posting: Backend Developer (B1–B2)", type:"Anuncio de empleo",
    text:`We're looking for a Backend Developer to join our growing engineering team. In this role, you'll design and maintain scalable APIs, collaborate with cross-functional teams, and take ownership of features from concept to deployment.

Requirements:
• 2+ years of experience with Node.js or Python
• Strong understanding of databases and REST APIs
• Excellent communication skills and a proactive mindset

Nice to have: experience with cloud platforms (AWS/GCP) and Agile environments.

We offer competitive compensation, flexible remote work, and a strong learning culture.`,
    questions:[
      {q:"How many years of experience are required?", options:["1+","2+","5+"], answer:1, explain:"'2+ years of experience'."},
      {q:"'Take ownership of features' means:", options:["comprar funciones","responsabilizarte de funciones","borrar funciones"], answer:1, explain:"Asumir responsabilidad de principio a fin."},
      {q:"'Nice to have' skills are:", options:["obligatorias","deseables pero no obligatorias","prohibidas"], answer:1, explain:"Deseables, suman pero no son requisito."}
    ],
    vocab:["scalable = escalable","cross-functional = multidisciplinar","proactive mindset = mentalidad proactiva","competitive compensation = salario competitivo"]
  },
  {
    id:"r2", title:"Business news snippet (B2)", type:"Noticia empresarial",
    text:`The company reported strong quarterly results, with revenue up 18% year over year, driven by growth in its subscription business. However, rising operating costs squeezed margins, and executives warned that the next quarter could be more challenging due to economic headwinds.

The CEO emphasized a focus on efficiency, announcing plans to streamline operations and reallocate resources toward high-growth areas.`,
    questions:[
      {q:"Revenue went:", options:["down 18%","up 18%","flat"], answer:1, explain:"'revenue up 18% year over year'."},
      {q:"'Economic headwinds' means:", options:["buen viento económico","factores económicos adversos","viento fuerte"], answer:1, explain:"Dificultades/obstáculos económicos."},
      {q:"'Streamline operations' means:", options:["hacer más eficientes las operaciones","cerrar la empresa","contratar más gente"], answer:0, explain:"Optimizar y simplificar procesos."}
    ],
    vocab:["year over year = interanual","margins = márgenes","to squeeze = presionar/reducir","to reallocate = reasignar"]
  },
  {
    id:"r3", title:"Slack thread real de un equipo (B1)", type:"Comunicación interna",
    text:`Ana: Morning all! The client pushed the demo to Thursday. Can we still make it?
Tom: Should be fine on my end. I'll have the frontend ready by Wednesday.
Ana: Great. @Luis how's the API looking?
Luis: Almost there. One blocker — waiting on the payment gateway credentials. Following up now.
Ana: Perfect. Let's sync at 4 to make sure we're all on the same page.`,
    questions:[
      {q:"When is the demo now?", options:["Wednesday","Thursday","Monday"], answer:1, explain:"'pushed the demo to Thursday'."},
      {q:"What is Luis's blocker?", options:["falta el frontend","espera credenciales del gateway de pago","no tiene tiempo"], answer:1, explain:"'waiting on the payment gateway credentials'."},
      {q:"'On the same page' means:", options:["en la misma página web","de acuerdo/alineados","en la misma oficina"], answer:1, explain:"Tener un entendimiento común."}
    ],
    vocab:["to push (a date) = posponer/mover","on my end = por mi parte","blocker = impedimento","to sync = sincronizarse/reunirse"]
  }
];

/* ================= SPEAKING (motor speaking) ================= */
const SPEAKING = [
  {
    id:"s1", scenario:"Daily stand-up", role:"Reportas tu estado al equipo",
    prompts:["Di qué hiciste ayer","Di qué harás hoy","Menciona un blocker (real o inventado)"],
    usefulPhrases:["Yesterday I finished...","Today I'm going to focus on...","I'm blocked on... I need... from..."],
    model:"Yesterday I wrapped up the login API and wrote the tests. Today I'll start on the password-reset flow. One blocker — I'm waiting on the email service credentials from DevOps."
  },
  {
    id:"s2", scenario:"One-on-one con tu manager", role:"Hablas de tu progreso y necesidades",
    prompts:["Comparte un logro reciente","Menciona un reto","Pide algo que necesitas para crecer"],
    usefulPhrases:["Something I'm proud of is...","One challenge I'm facing is...","It would really help if I could..."],
    model:"Something I'm proud of this month is reducing our build time by 30%. One challenge is that I'd like more exposure to architecture decisions. It would really help if I could shadow the design reviews."
  },
  {
    id:"s3", scenario:"Explicar un proyecto a un cliente", role:"Presentas el estado de forma clara",
    prompts:["Resume el objetivo","Explica el progreso","Indica los siguientes pasos y fecha"],
    usefulPhrases:["The goal of this project is...","So far, we've completed...","The next step is... by..."],
    model:"The goal of this project is to migrate your data to the new platform with zero downtime. So far, we've completed the test migration successfully. The next step is the live migration, scheduled for next Saturday night."
  },
  {
    id:"s4", scenario:"Manejar un cliente molesto", role:"Resuelves una queja con calma",
    prompts:["Reconoce el problema","Discúlpate apropiadamente","Ofrece una solución y plazo"],
    usefulPhrases:["I completely understand your frustration.","I'm sorry for the inconvenience.","Here's what I'll do to fix this..."],
    model:"I completely understand your frustration, and I'm sorry for the inconvenience this has caused. Here's what I'll do: I'll escalate this to our team right now and get back to you with a fix by end of day."
  },
  {
    id:"s5", scenario:"Defender tu idea en una reunión", role:"Argumentas con diplomacia",
    prompts:["Presenta tu propuesta","Respáldala con un dato","Reconoce otra opinión y responde"],
    usefulPhrases:["I'd like to propose...","The data suggests that...","I see your point, however..."],
    model:"I'd like to propose we prioritize the mobile app. The data suggests 60% of our users are on mobile. I see the point about desktop being easier to build, however, the mobile impact would be far greater."
  },
  {
    id:"s6", scenario:"Networking en un evento", role:"Te presentas y conectas",
    prompts:["Preséntate en una frase","Pregunta por la otra persona","Cierra proponiendo mantener el contacto"],
    usefulPhrases:["Hi, I'm... I work in...","What about you? What do you do?","Let's stay in touch — are you on LinkedIn?"],
    model:"Hi, I'm Carlos — I'm a backend developer at a fintech startup. What about you, what do you do? ... Oh, that sounds fascinating. Let's stay in touch — are you on LinkedIn?"
  }
];

/* ================= PLAN 16 SEMANAS (motor plan) ================= */
const PLAN = {
  intro:"16 semanas · ~5 días/semana. Elige tu duración diaria (30/45/60 min). Cada día combina input (listening/reading), estudio (gramática/vocab) y output (speaking/writing). Marca cada día como completado para avanzar tu progreso y tu racha.",
  weeks:[
    {week:1, focus:"Base B1: cimientos + presentarte", days:[
      {day:"Lun", min:"30–60", tasks:["Gramática: Base B1 – preguntas y negaciones","Vocab: Reuniones (5 palabras)","Speaking: Daily stand-up (grábate)"]},
      {day:"Mar", min:"30–60", tasks:["Gramática: Base B1 – comparativos/superlativos","Frases: Meetings (5)","Repaso de vocabulario (sesión de 10)"]},
      {day:"Mié", min:"30–60", tasks:["Gramática: Base B1 – in/on/at","Writing: Slack blocker","Corrector: revisa tu texto"]},
      {day:"Jue", min:"30–60", tasks:["Gramática: Base B1 – artículos e incontables","Vocab: Tecnología (5)","Speaking: 'Tell me about yourself'"]},
      {day:"Vie", min:"30–60", tasks:["Quiz de Gramática (base)","Repaso de vocabulario","Listening: BBC Learning English"]}
    ]},
    {week:2, focus:"Cortesía profesional + emails", days:[
      {day:"Lun", min:"30–60", tasks:["Gramática: Modales de cortesía","Business: Email etiquette","Writing: Follow-up email"]},
      {day:"Mar", min:"30–60", tasks:["Frases: Emails (5)","Vocab: RRHH (5)","Flashcards"]},
      {day:"Mié", min:"30–60", tasks:["Listening: Business English Pod","Speaking: One-on-one","Corrector"]},
      {day:"Jue", min:"30–60", tasks:["Reading: Slack thread","Pronunciación: sonidos difíciles","Shadowing 5 min"]},
      {day:"Vie", min:"30–60", tasks:["Quiz de Vocabulario","Writing: pedir extensión","Flashcards"]}
    ]},
    {week:3, focus:"Reuniones + small talk", days:[
      {day:"Lun", min:"30–60", tasks:["Business: Meetings","Frases: Meetings + Small talk","Speaking: defender tu idea"]},
      {day:"Mar", min:"30–60", tasks:["Vocab: Finanzas/ventas","Listening: TED (con subtítulos)","Flashcards"]},
      {day:"Mié", min:"30–60", tasks:["Gramática: Conectores","Writing: resumen LinkedIn","Corrector"]},
      {day:"Jue", min:"30–60", tasks:["Reading: Business news","Pronunciación: connected speech","Shadowing"]},
      {day:"Vie", min:"30–60", tasks:["Quiz de Business","Speaking: networking","Flashcards"]}
    ]},
    {week:4, focus:"Repaso + primera autoevaluación", days:[
      {day:"Lun", min:"30–60", tasks:["Repaso flashcards (todas las vencidas)","Gramática: repaso débiles","Speaking: proyecto a cliente"]},
      {day:"Mar", min:"30–60", tasks:["Los 3 quizzes seguidos","Revisa recomendaciones del sistema"]},
      {day:"Mié", min:"30–60", tasks:["Simulador de entrevista (fácil)","Writing: cover letter apertura"]},
      {day:"Jue", min:"30–60", tasks:["Listening libre 15 min","Frases: repaso 3 categorías"]},
      {day:"Vie", min:"30–60", tasks:["Autoevaluación: ¿qué mejoró?","Ajusta el plan a tus puntos débiles"]}
    ]},
    {week:5, focus:"Condicionales + negociación", days:[
      {day:"Lun–Vie", min:"30–60", tasks:["Gramática: Condicionales","Business: Negotiation","Frases: Negotiation","Speaking: cliente molesto","Vocab + flashcards diario"]}
    ]},
    {week:6, focus:"Pasiva + reportes/minutas", days:[
      {day:"Lun–Vie", min:"30–60", tasks:["Gramática: Passive voice","Business: reporting/PM","Writing: minuta de reunión","Reading: Business news","Flashcards diario"]}
    ]},
    {week:7, focus:"Reported speech + presentaciones", days:[
      {day:"Lun–Vie", min:"30–60", tasks:["Gramática: Reported speech","Business: Presentations","Speaking: presenta un tema 2 min","Frases: Presentations","Shadowing diario"]}
    ]},
    {week:8, focus:"Repaso intermedio + simulador medio", days:[
      {day:"Lun–Vie", min:"30–60", tasks:["Simulador entrevista (medio)","Repaso de todos los quizzes","Flashcards vencidas","Writing libre + corrector","Autoevaluación de nivel"]}
    ]},
    {week:9, focus:"Vocabulario avanzado por sector", days:[
      {day:"Lun–Vie", min:"30–60", tasks:["Vocab: todos los decks, repaso profundo","Reading técnico de tu sector","Speaking: explica tu trabajo 3 min","Flashcards diario"]}
    ]},
    {week:10, focus:"Fluidez y naturalidad", days:[
      {day:"Lun–Vie", min:"30–60", tasks:["Shadowing 10 min/día (Rachel's English)","Frases: aprende 3 nuevas/día","Speaking: roleplays s1–s6","Corrector de tus grabaciones transcritas"]}
    ]},
    {week:11, focus:"Entrevistas en profundidad", days:[
      {day:"Lun–Vie", min:"30–60", tasks:["Módulo Entrevistas: 2 preguntas/día","Escribe tus respuestas B2 personalizadas","Simulador (medio→difícil)","Listening: Google Careers"]}
    ]},
    {week:12, focus:"Repaso + simulador difícil", days:[
      {day:"Lun–Vie", min:"30–60", tasks:["Simulador (difícil)","STAR: prepara 5 historias tuyas","Quizzes de repaso","Flashcards vencidas"]}
    ]},
    {week:13, focus:"Writing profesional intensivo", days:[
      {day:"Lun–Vie", min:"30–60", tasks:["1 ejercicio writing/día + corrector","CV y cover letter completos","LinkedIn optimizado","Follow-up emails variados"]}
    ]},
    {week:14, focus:"Speaking bajo presión", days:[
      {day:"Lun–Vie", min:"30–60", tasks:["Roleplays difíciles (conflicto, negociación)","Presenta 5 min sin notas","Simulador difícil diario","Autoevaluación de fluidez"]}
    ]},
    {week:15, focus:"Integración total", days:[
      {day:"Lun–Vie", min:"30–60", tasks:["Día completo tipo trabajo: email + daily + reunión + reporte","Todo en inglés","Listening avanzado (HBR)","Flashcards vencidas"]}
    ]},
    {week:16, focus:"Simulación final + evaluación B2", days:[
      {day:"Lun", min:"60", tasks:["Simulador de entrevista completo (difícil)"]},
      {day:"Mar", min:"60", tasks:["Los 3 quizzes: objetivo 85%+"]},
      {day:"Mié", min:"60", tasks:["Writing: email + reporte evaluados con checklist"]},
      {day:"Jue", min:"60", tasks:["Speaking: presentación de 5 min grabada"]},
      {day:"Vie", min:"60", tasks:["Proyecto final: entrevista simulada de principio a fin","Celebra: ¡nivel B2! 🎓"]}
    ]}
  ]
};
