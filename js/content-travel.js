/* ============================================================
   Business English Pro — MÓDULO INGLÉS PARA VIAJES
   Escenarios reales, diálogos, frases de supervivencia y vocab.
   Integrado con flashcards (SRS), audio y progreso.
   ============================================================ */

/* ---------- ESCENARIOS (diálogos + frases + tips) ---------- */
const TRAVEL_SCENARIOS = [
  {
    id:"t_airport", icon:"🛫", name:"Aeropuerto y vuelos",
    situation:"Facturación (check-in), control de seguridad, embarque, retrasos y equipaje.",
    dialogue:[
      {r:"Agent", en:"Good morning. May I see your passport and booking, please?", es:"Buenos días. ¿Me muestra su pasaporte y su reserva, por favor?"},
      {r:"You", en:"Sure, here you go.", es:"Claro, aquí tiene."},
      {r:"Agent", en:"Are you checking any bags today?", es:"¿Va a facturar alguna maleta hoy?"},
      {r:"You", en:"Just one, and this is my carry-on.", es:"Solo una, y este es mi equipaje de mano."},
      {r:"Agent", en:"Would you prefer a window or an aisle seat?", es:"¿Prefiere ventana o pasillo?"},
      {r:"You", en:"A window seat, please. What gate does it leave from?", es:"Ventana, por favor. ¿De qué puerta sale?"},
      {r:"Agent", en:"Gate 22. Boarding starts at 10:15. Enjoy your flight!", es:"Puerta 22. El embarque empieza a las 10:15. ¡Buen vuelo!"}
    ],
    phrases:[
      {en:"I'd like to check in for my flight to London.", es:"Quiero facturar para mi vuelo a Londres."},
      {en:"Is the flight on time?", es:"¿El vuelo va a tiempo?"},
      {en:"My flight has been delayed / cancelled.", es:"Mi vuelo se ha retrasado / cancelado."},
      {en:"Where is the baggage claim?", es:"¿Dónde está la recogida de equipaje?"},
      {en:"My luggage didn't arrive.", es:"Mi equipaje no llegó."},
      {en:"Is there a fee for extra baggage?", es:"¿Hay cargo por equipaje extra?"},
      {en:"Do I need to take my laptop out?", es:"¿Tengo que sacar mi portátil?"},
      {en:"Where can I find a connecting flight?", es:"¿Dónde encuentro un vuelo de conexión?"}
    ],
    tips:["'Carry-on' = equipaje de mano; 'checked bag' = maleta facturada.","En seguridad te dirán: 'liquids in a clear bag', 'take off your belt/shoes', 'laptops out'.","'Boarding pass' = tarjeta de embarque; 'gate' = puerta; 'layover'/'stopover' = escala."]
  },
  {
    id:"t_immigration", icon:"🛂", name:"Inmigración y aduana",
    situation:"Control de pasaportes y aduana al llegar a otro país.",
    dialogue:[
      {r:"Officer", en:"What's the purpose of your visit?", es:"¿Cuál es el motivo de su visita?"},
      {r:"You", en:"Tourism. I'm here on holiday.", es:"Turismo. Estoy de vacaciones."},
      {r:"Officer", en:"How long are you planning to stay?", es:"¿Cuánto tiempo planea quedarse?"},
      {r:"You", en:"Two weeks.", es:"Dos semanas."},
      {r:"Officer", en:"Where are you staying?", es:"¿Dónde se aloja?"},
      {r:"You", en:"At the Central Hotel downtown.", es:"En el Hotel Central, en el centro."},
      {r:"Officer", en:"Do you have anything to declare?", es:"¿Tiene algo que declarar?"},
      {r:"You", en:"No, nothing to declare.", es:"No, nada que declarar."}
    ],
    phrases:[
      {en:"I'm here on business / on holiday / visiting family.", es:"Vengo por negocios / de vacaciones / a visitar familia."},
      {en:"I'll be staying for ten days.", es:"Me quedaré diez días."},
      {en:"Here is my return ticket.", es:"Aquí está mi billete de vuelta."},
      {en:"I have nothing to declare.", es:"No tengo nada que declarar."},
      {en:"It's for personal use.", es:"Es para uso personal."},
      {en:"Could you speak more slowly, please?", es:"¿Podría hablar más despacio, por favor?"}
    ],
    tips:["Respuestas cortas y claras. No bromees con aduanas.","Ten a mano: pasaporte, dirección del hotel, billete de vuelta.","'Purpose of visit' = motivo del viaje; 'to declare' = declarar."]
  },
  {
    id:"t_hotel", icon:"🏨", name:"Hotel y alojamiento",
    situation:"Reserva, check-in, pedir cosas, resolver problemas y check-out.",
    dialogue:[
      {r:"You", en:"Hi, I have a reservation under the name García.", es:"Hola, tengo una reserva a nombre de García."},
      {r:"Reception", en:"Let me check... yes, a double room for three nights.", es:"Déjeme comprobar... sí, una habitación doble por tres noches."},
      {r:"You", en:"Is breakfast included?", es:"¿El desayuno está incluido?"},
      {r:"Reception", en:"Yes, from 7 to 10 in the main hall.", es:"Sí, de 7 a 10 en el salón principal."},
      {r:"You", en:"Great. What time is check-out?", es:"Genial. ¿A qué hora es la salida?"},
      {r:"Reception", en:"Check-out is at 11 a.m. Here's your key card.", es:"La salida es a las 11. Aquí tiene su tarjeta."}
    ],
    phrases:[
      {en:"I'd like to book a room for two nights.", es:"Quiero reservar una habitación por dos noches."},
      {en:"Do you have any rooms available?", es:"¿Tienen habitaciones disponibles?"},
      {en:"Could I have a late check-out?", es:"¿Podría tener una salida tardía?"},
      {en:"The air conditioning isn't working.", es:"El aire acondicionado no funciona."},
      {en:"Could you send someone to fix it?", es:"¿Podrían mandar a alguien a arreglarlo?"},
      {en:"Is there Wi-Fi? What's the password?", es:"¿Hay wifi? ¿Cuál es la contraseña?"},
      {en:"Could I leave my luggage here after check-out?", es:"¿Podría dejar mi equipaje aquí tras la salida?"},
      {en:"There seems to be a mistake on my bill.", es:"Parece que hay un error en mi factura."}
    ],
    tips:["'Single/double/twin room' = individual/doble cama grande/dos camas.","'Amenities' = servicios; 'housekeeping' = limpieza; 'front desk/reception' = recepción.","Para quejarte con educación: 'I'm afraid there's a problem with...'."]
  },
  {
    id:"t_restaurant", icon:"🍽️", name:"Restaurantes y cafeterías",
    situation:"Reservar, pedir, alergias/dieta, pagar y propina.",
    dialogue:[
      {r:"Waiter", en:"Hi! A table for how many?", es:"¡Hola! ¿Mesa para cuántos?"},
      {r:"You", en:"For two, please.", es:"Para dos, por favor."},
      {r:"Waiter", en:"Can I get you something to drink?", es:"¿Les traigo algo de beber?"},
      {r:"You", en:"Just water for now. Could we see the menu?", es:"Solo agua por ahora. ¿Podemos ver el menú?"},
      {r:"Waiter", en:"Of course. Are you ready to order?", es:"Claro. ¿Listos para pedir?"},
      {r:"You", en:"Yes. I'll have the grilled salmon. Does it contain nuts?", es:"Sí. Voy a tomar el salmón a la parrilla. ¿Lleva frutos secos?"},
      {r:"Waiter", en:"No, it doesn't. Anything else?", es:"No, no lleva. ¿Algo más?"},
      {r:"You", en:"That's all, thanks. Could we get the bill?", es:"Eso es todo, gracias. ¿Nos trae la cuenta?"}
    ],
    phrases:[
      {en:"Could we have a table by the window?", es:"¿Podríamos tener una mesa junto a la ventana?"},
      {en:"What do you recommend?", es:"¿Qué recomienda?"},
      {en:"I'll have the... / I'd like the...", es:"Voy a tomar el... / Quisiera el..."},
      {en:"I'm allergic to nuts / gluten / shellfish.", es:"Soy alérgico a los frutos secos / gluten / mariscos."},
      {en:"I'm vegetarian / vegan. Do you have options?", es:"Soy vegetariano / vegano. ¿Tienen opciones?"},
      {en:"Could I get this without onions?", es:"¿Me lo pueden poner sin cebolla?"},
      {en:"The bill / check, please.", es:"La cuenta, por favor."},
      {en:"Can we split the bill?", es:"¿Podemos dividir la cuenta?"},
      {en:"Is service included?", es:"¿El servicio está incluido?"}
    ],
    tips:["EE. UU.: propina 15–20% casi obligatoria. Reino Unido: 10–12%. Muchos países europeos: incluida.","'The bill' (UK) = 'the check' (US) = la cuenta.","'Starter/appetizer' = entrante; 'main course' = plato principal; 'dessert' = postre."]
  },
  {
    id:"t_transport", icon:"🚕", name:"Transporte (taxi, tren, bus, metro)",
    situation:"Comprar billetes, taxis/ride-share, transporte público.",
    dialogue:[
      {r:"You", en:"Hi, how much is it to the airport?", es:"Hola, ¿cuánto cuesta al aeropuerto?"},
      {r:"Driver", en:"About 25 dollars, depending on traffic.", es:"Unos 25 dólares, según el tráfico."},
      {r:"You", en:"Okay. Could you use the meter, please?", es:"Vale. ¿Puede usar el taxímetro, por favor?"},
      {r:"Driver", en:"Sure. Any bags in the trunk?", es:"Claro. ¿Maletas en el maletero?"},
      {r:"You", en:"Yes, two. Could you drop me at Terminal 1?", es:"Sí, dos. ¿Puede dejarme en la Terminal 1?"}
    ],
    phrases:[
      {en:"One ticket to the city centre, please.", es:"Un billete al centro, por favor."},
      {en:"Which platform does the train leave from?", es:"¿De qué andén sale el tren?"},
      {en:"Does this bus go to the museum?", es:"¿Este autobús va al museo?"},
      {en:"How often do the trains run?", es:"¿Con qué frecuencia pasan los trenes?"},
      {en:"Where do I change lines?", es:"¿Dónde hago transbordo?"},
      {en:"Could you tell me when to get off?", es:"¿Puede avisarme cuándo bajar?"},
      {en:"Is this seat taken?", es:"¿Está ocupado este asiento?"},
      {en:"Keep the change.", es:"Quédese con el cambio."}
    ],
    tips:["'Return ticket' (UK) / 'round-trip' (US) = ida y vuelta; 'single'/'one-way' = solo ida.","Metro: 'line', 'platform', 'transfer/change'. Bus: 'stop', 'fare', 'get on/off'.","Con apps (Uber): 'pickup point', 'drop-off', 'the driver is 3 minutes away'."]
  },
  {
    id:"t_directions", icon:"🧭", name:"Pedir y entender direcciones",
    situation:"Perderte y preguntar el camino en la calle.",
    dialogue:[
      {r:"You", en:"Excuse me, how do I get to the train station?", es:"Disculpe, ¿cómo llego a la estación de tren?"},
      {r:"Local", en:"Go straight ahead and turn left at the lights.", es:"Siga recto y gire a la izquierda en el semáforo."},
      {r:"You", en:"Is it far?", es:"¿Está lejos?"},
      {r:"Local", en:"About a ten-minute walk. It's on your right.", es:"Unos diez minutos a pie. Está a su derecha."},
      {r:"You", en:"Thank you so much!", es:"¡Muchísimas gracias!"}
    ],
    phrases:[
      {en:"Excuse me, where is the nearest ATM / pharmacy / toilet?", es:"Disculpe, ¿dónde está el cajero / la farmacia / el baño más cercano?"},
      {en:"How do I get to...?", es:"¿Cómo llego a...?"},
      {en:"Is it within walking distance?", es:"¿Se puede ir andando?"},
      {en:"Could you show me on the map?", es:"¿Puede mostrármelo en el mapa?"},
      {en:"I think I'm lost.", es:"Creo que estoy perdido."},
      {en:"Am I going the right way?", es:"¿Voy por buen camino?"}
    ],
    tips:["Direcciones: go straight (recto), turn left/right (girar), on the corner (en la esquina), next to (al lado de), opposite (enfrente), between (entre), around the corner (a la vuelta).","'Block' (US) = manzana; 'roundabout' (UK) = rotonda; 'crossroads/intersection' = cruce."]
  },
  {
    id:"t_shopping", icon:"🛍️", name:"Compras y regateo",
    situation:"Comprar ropa/souvenirs, tallas, probadores, pagar y regatear.",
    dialogue:[
      {r:"Staff", en:"Hi, can I help you find anything?", es:"Hola, ¿le ayudo a encontrar algo?"},
      {r:"You", en:"I'm just browsing, thanks. Actually, do you have this in a medium?", es:"Solo estoy mirando, gracias. Bueno, ¿tienen esto en talla mediana?"},
      {r:"Staff", en:"Let me check. Would you like to try it on?", es:"Déjeme mirar. ¿Quiere probárselo?"},
      {r:"You", en:"Yes, where are the fitting rooms?", es:"Sí, ¿dónde están los probadores?"},
      {r:"Staff", en:"Just over there. How will you be paying?", es:"Justo ahí. ¿Cómo va a pagar?"},
      {r:"You", en:"By card. Do you take contactless?", es:"Con tarjeta. ¿Aceptan sin contacto?"}
    ],
    phrases:[
      {en:"How much is this?", es:"¿Cuánto cuesta esto?"},
      {en:"Do you have this in a different size / colour?", es:"¿Tienen esto en otra talla / color?"},
      {en:"Can I try it on?", es:"¿Puedo probármelo?"},
      {en:"That's a bit too expensive. Can you give me a discount?", es:"Es un poco caro. ¿Me puede hacer un descuento?"},
      {en:"Do you take cash / card?", es:"¿Aceptan efectivo / tarjeta?"},
      {en:"Can I have a receipt, please?", es:"¿Me da un recibo, por favor?"},
      {en:"Can I get a refund / exchange this?", es:"¿Puedo devolverlo / cambiarlo?"},
      {en:"I'll take it.", es:"Me lo llevo."}
    ],
    tips:["Regateo: normal en mercados y bazares, NO en tiendas de precio fijo.","'It's a rip-off' = es un timo/carísimo; 'a bargain' = una ganga; 'on sale' = en oferta.","'Fitting room / changing room' = probador; 'receipt' = recibo (ojo: se pronuncia /rɪˈsiːt/, la 'p' es muda)."]
  },
  {
    id:"t_money", icon:"💳", name:"Dinero, cajeros y banco",
    situation:"Sacar dinero, cambiar divisa y problemas con tarjetas.",
    dialogue:[
      {r:"You", en:"Hi, I'd like to exchange some euros for dollars.", es:"Hola, quisiera cambiar euros por dólares."},
      {r:"Teller", en:"Sure. How much would you like to exchange?", es:"Claro. ¿Cuánto desea cambiar?"},
      {r:"You", en:"Two hundred euros. What's the exchange rate?", es:"Doscientos euros. ¿Cuál es el tipo de cambio?"},
      {r:"Teller", en:"It's 1.08, and there's a small commission.", es:"Es 1.08, y hay una pequeña comisión."}
    ],
    phrases:[
      {en:"Where's the nearest ATM / cash machine?", es:"¿Dónde está el cajero más cercano?"},
      {en:"My card was declined.", es:"Mi tarjeta fue rechazada."},
      {en:"The machine kept my card.", es:"El cajero se tragó mi tarjeta."},
      {en:"What's the exchange rate today?", es:"¿Cuál es el tipo de cambio hoy?"},
      {en:"Is there a commission / fee?", es:"¿Hay comisión?"},
      {en:"Could I get some smaller notes / change?", es:"¿Me da billetes más pequeños / cambio?"},
      {en:"I'd like to report a lost card.", es:"Quiero reportar una tarjeta perdida."}
    ],
    tips:["Avisa a tu banco antes de viajar para que no bloquee la tarjeta.","'Notes/bills' = billetes; 'coins' = monedas; 'change' = cambio/vuelto.","Los cajeros suelen preguntar: 'with or without conversion?' → elige SIN conversión (pagas mejor tipo)."]
  },
  {
    id:"t_health", icon:"⚕️", name:"Salud, farmacia y emergencias",
    situation:"Farmacia, médico y situaciones de emergencia.",
    dialogue:[
      {r:"Pharmacist", en:"Hi, how can I help?", es:"Hola, ¿en qué puedo ayudar?"},
      {r:"You", en:"I have a bad headache and a sore throat.", es:"Tengo un fuerte dolor de cabeza y de garganta."},
      {r:"Pharmacist", en:"Do you have a fever?", es:"¿Tiene fiebre?"},
      {r:"You", en:"A little. Do I need a prescription for anything?", es:"Un poco. ¿Necesito receta para algo?"},
      {r:"Pharmacist", en:"No, this is available over the counter.", es:"No, esto se vende sin receta."}
    ],
    phrases:[
      {en:"I don't feel well.", es:"No me siento bien."},
      {en:"I have a headache / stomachache / a cough / a cold.", es:"Tengo dolor de cabeza / de estómago / tos / un resfriado."},
      {en:"Do you have something for...?", es:"¿Tiene algo para...?"},
      {en:"I need to see a doctor.", es:"Necesito ver a un médico."},
      {en:"Is there a hospital nearby?", es:"¿Hay un hospital cerca?"},
      {en:"Call an ambulance!", es:"¡Llame a una ambulancia!"},
      {en:"It's an emergency.", es:"Es una emergencia."},
      {en:"I'm allergic to penicillin.", es:"Soy alérgico a la penicilina."},
      {en:"Here is my travel insurance.", es:"Aquí está mi seguro de viaje."}
    ],
    tips:["Emergencias: 911 (EE. UU./Canadá), 999 (Reino Unido), 112 (Europa y muchos países).","'Over the counter' = sin receta; 'prescription' = receta; 'pharmacy/chemist's (UK)/drugstore (US)' = farmacia.","Lleva el nombre genérico de tus medicinas, no la marca local."]
  },
  {
    id:"t_sightseeing", icon:"📸", name:"Turismo y actividades",
    situation:"Entradas, tours, horarios y fotos.",
    dialogue:[
      {r:"You", en:"Hi, two tickets for the museum, please.", es:"Hola, dos entradas para el museo, por favor."},
      {r:"Staff", en:"Sure. Would you like the audio guide?", es:"Claro. ¿Quieren la audioguía?"},
      {r:"You", en:"Yes, in English please. What time does it close?", es:"Sí, en inglés por favor. ¿A qué hora cierra?"},
      {r:"Staff", en:"At 6 p.m. Last entry is at 5.", es:"A las 18:00. La última entrada es a las 17:00."}
    ],
    phrases:[
      {en:"How much is the entrance fee?", es:"¿Cuánto cuesta la entrada?"},
      {en:"Is there a discount for students?", es:"¿Hay descuento para estudiantes?"},
      {en:"What time does it open / close?", es:"¿A qué hora abre / cierra?"},
      {en:"Are there any guided tours?", es:"¿Hay visitas guiadas?"},
      {en:"Could you take a photo of us?", es:"¿Nos puede sacar una foto?"},
      {en:"Is photography allowed?", es:"¿Se permite hacer fotos?"},
      {en:"What's worth seeing around here?", es:"¿Qué merece la pena ver por aquí?"}
    ],
    tips:["'Sightseeing' = hacer turismo; 'landmark' = lugar emblemático; 'must-see' = imperdible.","'Entrance/admission fee' = precio de entrada; 'free admission' = entrada gratis.","Pregunta por la 'city pass' para ahorrar en varias atracciones."]
  },
  {
    id:"t_smalltalk", icon:"💬", name:"Conocer gente y small talk",
    situation:"Conversar con locales y otros viajeros.",
    dialogue:[
      {r:"Traveller", en:"Hey, where are you from?", es:"Oye, ¿de dónde eres?"},
      {r:"You", en:"I'm from Colombia. And you?", es:"Soy de Colombia. ¿Y tú?"},
      {r:"Traveller", en:"Canada. Is this your first time here?", es:"De Canadá. ¿Es tu primera vez aquí?"},
      {r:"You", en:"Yes! It's amazing. Any recommendations?", es:"¡Sí! Es increíble. ¿Alguna recomendación?"},
      {r:"Traveller", en:"You have to try the street food near the market.", es:"Tienes que probar la comida callejera cerca del mercado."}
    ],
    phrases:[
      {en:"Where are you from?", es:"¿De dónde eres?"},
      {en:"How long have you been travelling?", es:"¿Cuánto llevas viajando?"},
      {en:"Is this your first time here?", es:"¿Es tu primera vez aquí?"},
      {en:"What brings you here?", es:"¿Qué te trae por aquí?"},
      {en:"Do you have any recommendations?", es:"¿Tienes alguna recomendación?"},
      {en:"It was nice meeting you!", es:"¡Un placer conocerte!"},
      {en:"Do you want to grab a drink / coffee?", es:"¿Quieres tomar algo / un café?"}
    ],
    tips:["Temas seguros: viajes, comida, deportes, planes. Evita política y religión con desconocidos.","'Grab a coffee/drink' = tomar algo (muy casual y amistoso).","Mostrar interés: 'Oh really? Tell me more!' mantiene la conversación viva."]
  },
  {
    id:"t_problems", icon:"🆘", name:"Problemas y quejas",
    situation:"Objetos perdidos, robos, cancelaciones y quejas.",
    dialogue:[
      {r:"You", en:"Excuse me, I think I left my bag on the train.", es:"Disculpe, creo que dejé mi bolso en el tren."},
      {r:"Staff", en:"What did it look like?", es:"¿Cómo era?"},
      {r:"You", en:"It's a black backpack with a laptop inside.", es:"Es una mochila negra con un portátil dentro."},
      {r:"Staff", en:"Let me check the lost and found.", es:"Déjeme mirar en objetos perdidos."}
    ],
    phrases:[
      {en:"I've lost my passport / wallet / phone.", es:"He perdido mi pasaporte / cartera / teléfono."},
      {en:"My bag was stolen.", es:"Me robaron el bolso."},
      {en:"I'd like to report a theft.", es:"Quiero denunciar un robo."},
      {en:"Where is the lost and found?", es:"¿Dónde están los objetos perdidos?"},
      {en:"I need to contact my embassy.", es:"Necesito contactar con mi embajada."},
      {en:"This is not what I ordered / booked.", es:"Esto no es lo que pedí / reservé."},
      {en:"I'd like a refund, please.", es:"Quisiera un reembolso, por favor."},
      {en:"Could I speak to the manager?", es:"¿Podría hablar con el encargado?"}
    ],
    tips:["Para quejarte con firmeza pero educado: 'I'm sorry, but this isn't acceptable. I'd like...'.","'Lost and found' (US) / 'lost property' (UK) = objetos perdidos.","Guarda copias digitales de tu pasaporte y seguro por si acaso."]
  },
  {
    id:"t_sim", icon:"📶", name:"Teléfono, SIM e internet",
    situation:"Comprar SIM/eSIM, datos y wifi.",
    dialogue:[
      {r:"You", en:"Hi, I'd like a SIM card with data for two weeks.", es:"Hola, quiero una SIM con datos para dos semanas."},
      {r:"Staff", en:"Sure. How many gigabytes do you need?", es:"Claro. ¿Cuántos gigas necesita?"},
      {r:"You", en:"Around 10 GB should be fine. Does it include calls?", es:"Unos 10 GB estaría bien. ¿Incluye llamadas?"},
      {r:"Staff", en:"Yes, and it works right away.", es:"Sí, y funciona de inmediato."}
    ],
    phrases:[
      {en:"Do you sell prepaid SIM cards?", es:"¿Venden tarjetas SIM prepago?"},
      {en:"How much data does it include?", es:"¿Cuántos datos incluye?"},
      {en:"Is there free Wi-Fi here?", es:"¿Hay wifi gratis aquí?"},
      {en:"What's the Wi-Fi password?", es:"¿Cuál es la contraseña del wifi?"},
      {en:"My internet isn't working.", es:"Mi internet no funciona."},
      {en:"Does this plan work abroad?", es:"¿Este plan funciona en el extranjero?"}
    ],
    tips:["'Data' = datos; 'top up' = recargar; 'coverage' = cobertura; 'roaming' = itinerancia.","Una eSIM (Airalo, Holafly…) evita ir a la tienda: se activa por QR.","'Prepaid' = prepago; 'unlimited data' = datos ilimitados."]
  },
  {
    id:"t_car", icon:"🚗", name:"Alquilar un coche",
    situation:"Recoger, seguro, combustible y devolución.",
    dialogue:[
      {r:"Agent", en:"Hello, do you have a reservation?", es:"Hola, ¿tiene reserva?"},
      {r:"You", en:"Yes, under Martínez. I'd like full insurance, please.", es:"Sí, a nombre de Martínez. Quiero seguro a todo riesgo, por favor."},
      {r:"Agent", en:"Great. It's a manual — is that okay?", es:"Perfecto. Es manual, ¿le parece bien?"},
      {r:"You", en:"Actually, do you have an automatic?", es:"En realidad, ¿tienen automático?"},
      {r:"Agent", en:"Let me check. You'll return it with a full tank.", es:"Déjeme ver. Debe devolverlo con el depósito lleno."}
    ],
    phrases:[
      {en:"I'd like to rent a car for a week.", es:"Quiero alquilar un coche por una semana."},
      {en:"Is insurance included?", es:"¿El seguro está incluido?"},
      {en:"Is it automatic or manual?", es:"¿Es automático o manual?"},
      {en:"Where do I return the car?", es:"¿Dónde devuelvo el coche?"},
      {en:"Do I need to return it with a full tank?", es:"¿Tengo que devolverlo con el depósito lleno?"},
      {en:"Where's the nearest petrol / gas station?", es:"¿Dónde está la gasolinera más cercana?"},
      {en:"Is there a mileage limit?", es:"¿Hay límite de kilometraje?"}
    ],
    tips:["'Petrol' (UK) / 'gas' (US) = gasolina; 'boot' (UK) / 'trunk' (US) = maletero.","'Full tank' = depósito lleno; 'mileage' = kilometraje; 'toll' = peaje.","En muchos países se conduce por la izquierda (UK, Australia): ¡ojo!"]
  }
];

/* ---------- VOCABULARIO DE VIAJES (integrado en flashcards) ---------- */
const TRAVEL_VOCAB = {
  decks: [
    {
      id:"tv_airport", name:"Aeropuerto y vuelos",
      words:[
        {en:"boarding pass", ipa:"/ˈbɔːdɪŋ pɑːs/", es:"tarjeta de embarque", def:"Document that lets you board.", example:"Have your boarding pass ready.", syn:"—", ant:"—", error:"No 'boarding ticket'.", ctx:"Aeropuerto."},
        {en:"gate", ipa:"/ɡeɪt/", es:"puerta de embarque", def:"Where you board the plane.", example:"The flight leaves from gate 12.", syn:"—", ant:"—", error:"'gate' aquí no es 'verja'.", ctx:"Aeropuerto."},
        {en:"layover", ipa:"/ˈleɪəʊvə/", es:"escala", def:"A stop between flights.", example:"We have a two-hour layover in Paris.", syn:"stopover", ant:"direct flight", error:"'escala' no es 'scale'.", ctx:"Vuelos con conexión."},
        {en:"carry-on", ipa:"/ˈkæri ɒn/", es:"equipaje de mano", def:"Bag you take on board.", example:"This is my only carry-on.", syn:"hand luggage", ant:"checked bag", error:"No 'hand baggage bag'.", ctx:"Facturación."},
        {en:"delayed", ipa:"/dɪˈleɪd/", es:"retrasado", def:"Later than scheduled.", example:"Our flight is delayed.", syn:"late", ant:"on time", error:"No 'retarded'.", ctx:"Estado del vuelo."},
        {en:"aisle seat", ipa:"/aɪl siːt/", es:"asiento de pasillo", def:"Seat next to the aisle.", example:"I prefer an aisle seat.", syn:"—", ant:"window seat", error:"'aisle' tiene 's' muda: /aɪl/.", ctx:"Elección de asiento."}
      ]
    },
    {
      id:"tv_hotel", name:"Hotel y alojamiento",
      words:[
        {en:"check-in", ipa:"/ˈtʃɛk ɪn/", es:"registro de entrada", def:"Arriving and registering.", example:"Check-in is at 3 p.m.", syn:"—", ant:"check-out", error:"'to check in' (verbo) vs 'check-in' (sustantivo).", ctx:"Hotel/aeropuerto."},
        {en:"vacancy", ipa:"/ˈveɪkənsi/", es:"habitación disponible", def:"An available room.", example:"Do you have any vacancies?", syn:"availability", ant:"no vacancy", error:"'vacancy' también = vacante laboral.", ctx:"Alojamiento."},
        {en:"amenities", ipa:"/əˈmiːnətiz/", es:"servicios/comodidades", def:"Facilities offered.", example:"The hotel has great amenities.", syn:"facilities", ant:"—", error:"No 'amenidades'.", ctx:"Hotel."},
        {en:"housekeeping", ipa:"/ˈhaʊskiːpɪŋ/", es:"servicio de limpieza", def:"Room cleaning service.", example:"Housekeeping comes at noon.", syn:"—", ant:"—", error:"—", ctx:"Hotel."},
        {en:"deposit", ipa:"/dɪˈpɒzɪt/", es:"depósito/fianza", def:"Money held as security.", example:"They took a $50 deposit.", syn:"—", ant:"—", error:"No confundir con 'depósito' de tanque.", ctx:"Reservas."},
        {en:"key card", ipa:"/kiː kɑːd/", es:"tarjeta llave", def:"Card to open the room.", example:"Your key card doesn't work.", syn:"—", ant:"—", error:"—", ctx:"Hotel."}
      ]
    },
    {
      id:"tv_food", name:"Comida y restaurantes",
      words:[
        {en:"the bill / the check", ipa:"/bɪl/ /tʃɛk/", es:"la cuenta", def:"What you pay at the end.", example:"Could we have the bill?", syn:"—", ant:"—", error:"UK 'bill' / US 'check'.", ctx:"Restaurante."},
        {en:"tip", ipa:"/tɪp/", es:"propina", def:"Extra money for service.", example:"Should we leave a tip?", syn:"gratuity", ant:"—", error:"No 'tips' cuando es una sola.", ctx:"Pago."},
        {en:"starter / appetizer", ipa:"/ˈstɑːtə/ /ˈæpɪtaɪzə/", es:"entrante", def:"First small course.", example:"I'll have the soup as a starter.", syn:"—", ant:"main course", error:"UK 'starter' / US 'appetizer'.", ctx:"Menú."},
        {en:"takeaway / takeout", ipa:"/ˈteɪkəweɪ/ /ˈteɪkaʊt/", es:"para llevar", def:"Food to go.", example:"Is this for takeaway?", syn:"to go", ant:"eat in", error:"UK 'takeaway' / US 'takeout'.", ctx:"Comida rápida."},
        {en:"still / sparkling water", ipa:"/stɪl/ /ˈspɑːklɪŋ/", es:"agua sin/con gas", def:"Non-fizzy / fizzy water.", example:"Still or sparkling?", syn:"—", ant:"—", error:"No 'water with gas'.", ctx:"Bebidas."},
        {en:"rare / medium / well-done", ipa:"/reə/ /ˈmiːdiəm/ /wɛl dʌn/", es:"poco hecho / al punto / bien hecho", def:"How meat is cooked.", example:"I'd like my steak medium.", syn:"—", ant:"—", error:"No 'well cooked' → 'well-done'.", ctx:"Pedir carne."}
      ]
    },
    {
      id:"tv_transport", name:"Transporte y direcciones",
      words:[
        {en:"round-trip / return", ipa:"/raʊnd trɪp/ /rɪˈtɜːn/", es:"ida y vuelta", def:"There and back ticket.", example:"A round-trip ticket, please.", syn:"—", ant:"one-way/single", error:"US 'round-trip' / UK 'return'.", ctx:"Billetes."},
        {en:"platform", ipa:"/ˈplætfɔːm/", es:"andén", def:"Where you board a train.", example:"The train leaves from platform 4.", syn:"track (US)", ant:"—", error:"No 'peron'.", ctx:"Estación."},
        {en:"fare", ipa:"/feə/", es:"tarifa/pasaje", def:"Price of a journey.", example:"The bus fare is two dollars.", syn:"—", ant:"—", error:"'fare' (pasaje) ≠ 'fair' (justo).", ctx:"Transporte."},
        {en:"to get off", ipa:"/ɡɛt ɒf/", es:"bajarse", def:"Leave a vehicle.", example:"Get off at the next stop.", syn:"—", ant:"get on", error:"'get off' (bajar) vs 'get on' (subir).", ctx:"Bus/tren."},
        {en:"roundabout", ipa:"/ˈraʊndəbaʊt/", es:"rotonda", def:"Circular road junction.", example:"Take the second exit at the roundabout.", syn:"traffic circle (US)", ant:"—", error:"—", ctx:"Conducir."},
        {en:"one-way street", ipa:"/wʌn weɪ striːt/", es:"calle de sentido único", def:"Traffic flows one direction.", example:"It's a one-way street.", syn:"—", ant:"—", error:"—", ctx:"Conducir/direcciones."}
      ]
    },
    {
      id:"tv_money", name:"Dinero y compras",
      words:[
        {en:"cash", ipa:"/kæʃ/", es:"efectivo", def:"Physical money.", example:"Do you take cash?", syn:"—", ant:"card", error:"No 'money' a secas para efectivo.", ctx:"Pago."},
        {en:"change", ipa:"/tʃeɪndʒ/", es:"cambio/vuelto", def:"Money returned / coins.", example:"Keep the change.", syn:"—", ant:"—", error:"'change' también = cambiar.", ctx:"Pago."},
        {en:"receipt", ipa:"/rɪˈsiːt/", es:"recibo", def:"Proof of payment.", example:"Can I have a receipt?", syn:"—", ant:"—", error:"La 'p' es muda: /rɪˈsiːt/.", ctx:"Compras."},
        {en:"refund", ipa:"/ˈriːfʌnd/", es:"reembolso", def:"Money given back.", example:"I'd like a refund.", syn:"—", ant:"—", error:"No 'refound'.", ctx:"Devoluciones."},
        {en:"bargain", ipa:"/ˈbɑːɡɪn/", es:"ganga / regatear", def:"A good deal / to negotiate.", example:"That's a real bargain!", syn:"deal", ant:"rip-off", error:"'bargain' = ganga y también regatear.", ctx:"Compras/mercados."},
        {en:"rip-off", ipa:"/ˈrɪp ɒf/", es:"timo/robo (caro)", def:"Something overpriced.", example:"Ten dollars? What a rip-off!", syn:"—", ant:"bargain", error:"Informal.", ctx:"Quejas de precio."}
      ]
    },
    {
      id:"tv_health", name:"Salud y emergencias",
      words:[
        {en:"pharmacy / chemist's", ipa:"/ˈfɑːməsi/ /ˈkɛmɪsts/", es:"farmacia", def:"Where you buy medicine.", example:"Is there a pharmacy nearby?", syn:"drugstore (US)", ant:"—", error:"UK 'chemist's'.", ctx:"Salud."},
        {en:"prescription", ipa:"/prɪˈskrɪpʃən/", es:"receta médica", def:"Doctor's order for medicine.", example:"You need a prescription for that.", syn:"—", ant:"over the counter", error:"No 'recipe' (eso es receta de cocina).", ctx:"Farmacia."},
        {en:"over the counter", ipa:"/ˌəʊvə ðə ˈkaʊntə/", es:"sin receta", def:"Sold without prescription.", example:"It's available over the counter.", syn:"—", ant:"prescription", error:"—", ctx:"Farmacia."},
        {en:"painkiller", ipa:"/ˈpeɪnkɪlə/", es:"analgésico", def:"Medicine for pain.", example:"Do you have any painkillers?", syn:"—", ant:"—", error:"—", ctx:"Salud."},
        {en:"insurance", ipa:"/ɪnˈʃʊərəns/", es:"seguro", def:"Financial coverage.", example:"Here's my travel insurance.", syn:"—", ant:"—", error:"No 'assurance'.", ctx:"Emergencias."},
        {en:"emergency", ipa:"/ɪˈmɜːdʒənsi/", es:"emergencia", def:"Serious urgent situation.", example:"It's an emergency!", syn:"—", ant:"—", error:"Acento en la 2ª sílaba.", ctx:"Urgencias."}
      ]
    }
  ]
};

/* ---------- FRASES DE SUPERVIVENCIA (esenciales) ---------- */
const TRAVEL_SURVIVAL = [
  {en:"Excuse me...", es:"Disculpe..."},
  {en:"Sorry, I don't speak much English.", es:"Perdón, no hablo mucho inglés."},
  {en:"Could you speak more slowly, please?", es:"¿Podría hablar más despacio, por favor?"},
  {en:"Could you repeat that, please?", es:"¿Podría repetir, por favor?"},
  {en:"How do you say... in English?", es:"¿Cómo se dice... en inglés?"},
  {en:"What does... mean?", es:"¿Qué significa...?"},
  {en:"Can you help me, please?", es:"¿Puede ayudarme, por favor?"},
  {en:"Where is the toilet / restroom?", es:"¿Dónde está el baño?"},
  {en:"How much is it?", es:"¿Cuánto cuesta?"},
  {en:"I don't understand.", es:"No entiendo."},
  {en:"Just a moment, please.", es:"Un momento, por favor."},
  {en:"Thank you so much!", es:"¡Muchísimas gracias!"},
  {en:"No worries. / It's fine.", es:"No pasa nada. / Está bien."},
  {en:"Where can I find...?", es:"¿Dónde puedo encontrar...?"},
  {en:"Is it safe around here?", es:"¿Es seguro por aquí?"},
  {en:"Could you write it down, please?", es:"¿Puede escribirlo, por favor?"}
];

/* ============================================================
   MINI-SIMULADOR DE CONVERSACIONES DE VIAJE
   Tú respondes por texto; el personaje reacciona según tu turno.
   'expect' = palabras/ideas esperadas (para el feedback).
   'sample' = respuesta modelo. 'hint' = pista.
   ============================================================ */
const TRAVEL_SIM = [
  {
    id:"sim_restaurant", icon:"🍽️", title:"Pedir en un restaurante", role:"Eres el cliente; yo soy el camarero.",
    steps:[
      { bot:"Good evening! Welcome. A table for how many?", es:"¡Buenas noches! Bienvenido. ¿Mesa para cuántos?",
        expect:["two","2","one","1","for","table","people","just me"], hint:"Di para cuántas personas: 'A table for two, please.'",
        sample:"A table for two, please." },
      { bot:"Perfect, follow me. Can I get you something to drink?", es:"Perfecto, sígame. ¿Le traigo algo de beber?",
        expect:["water","wine","beer","coke","juice","drink","still","sparkling","please"], hint:"Pide una bebida: 'Could I have some water, please?'",
        sample:"Could I have some sparkling water, please?" },
      { bot:"Great. Are you ready to order, or do you need a few minutes?", es:"Genial. ¿Listo para pedir o necesita unos minutos?",
        expect:["i'll have","i will have","i'd like","i would like","order","recommend","minutes","the"], hint:"Pide un plato ('I'll have the...') o pregunta '¿Qué recomienda?'",
        sample:"What do you recommend? Actually, I'll have the grilled chicken." },
      { bot:"Excellent choice. Any allergies I should know about?", es:"Excelente elección. ¿Alguna alergia que deba saber?",
        expect:["allergic","allergy","no","nut","gluten","shellfish","nothing","none"], hint:"Di si eres alérgico a algo o 'No, nothing, thanks.'",
        sample:"I'm allergic to nuts, but otherwise no." },
      { bot:"Noted. Anything else for now?", es:"Anotado. ¿Algo más por ahora?",
        expect:["no","that's all","that's it","nothing","thanks","thank you","side","bread"], hint:"Cierra el pedido: 'That's all for now, thanks.'",
        sample:"That's all for now, thank you." },
      { bot:"Enjoy your meal! ... Later: How was everything? Would you like anything else?", es:"¡Que aproveche! ... Después: ¿Qué tal todo? ¿Desea algo más?",
        expect:["bill","check","pay","delicious","great","no","dessert","card","cash"], hint:"Pide la cuenta: 'Could we have the bill, please?'",
        sample:"Everything was delicious. Could we have the bill, please?" }
    ]
  },
  {
    id:"sim_hotel", icon:"🏨", title:"Check-in en el hotel", role:"Eres el huésped; yo soy la recepción.",
    steps:[
      { bot:"Good afternoon, welcome to the Grand Hotel. How can I help you?", es:"Buenas tardes, bienvenido. ¿En qué puedo ayudar?",
        expect:["reservation","booking","check in","check-in","name","room","under"], hint:"Di que tienes una reserva: 'I have a reservation under...'",
        sample:"Hi, I have a reservation under the name García." },
      { bot:"Let me check... Yes, a double room for three nights. Could I see your passport?", es:"Déjeme comprobar... Sí, habitación doble por tres noches. ¿Me muestra su pasaporte?",
        expect:["here","sure","yes","passport","of course","go"], hint:"Entrega el pasaporte: 'Sure, here you go.'",
        sample:"Sure, here you go." },
      { bot:"Thank you. Is breakfast included in your rate?", es:"Gracias. ¿El desayuno está incluido en su tarifa?",
        expect:["is breakfast","included","what time","breakfast","yes","no","cost","extra"], hint:"Pregunta por el desayuno: '¿Está incluido? ¿A qué hora?'",
        sample:"Is breakfast included? And what time is it served?" },
      { bot:"It's included, from 7 to 10. Do you need anything else?", es:"Está incluido, de 7 a 10. ¿Necesita algo más?",
        expect:["wifi","wi-fi","password","late check","check-out","luggage","room","quiet","help"], hint:"Pide algo: wifi, check-out tardío, guardar equipaje...",
        sample:"Yes, what's the Wi-Fi password? And could I have a late check-out?" },
      { bot:"Of course. Here's your key card. Room 305, on the third floor. Enjoy your stay!", es:"Claro. Aquí su tarjeta. Habitación 305, tercer piso. ¡Disfrute su estancia!",
        expect:["thank","thanks","cheers","great","appreciate"], hint:"Agradece: 'Thank you very much!'",
        sample:"Thank you very much!" }
    ]
  },
  {
    id:"sim_taxi", icon:"🚕", title:"Tomar un taxi", role:"Eres el pasajero; yo soy el conductor.",
    steps:[
      { bot:"Hello! Where are you headed?", es:"¡Hola! ¿A dónde va?",
        expect:["to","airport","hotel","station","centre","center","downtown","street","address"], hint:"Di tu destino: 'To the airport, please.'",
        sample:"To the Central Hotel downtown, please." },
      { bot:"Sure. How much is it? — well, about 20 dollars. Hop in!", es:"Claro. ¿Cuánto es? — pues, unos 20 dólares. ¡Suba!",
        expect:["meter","how much","fixed","price","ok","okay","fine","use the meter"], hint:"Confirma precio o pide taxímetro: 'Could you use the meter?'",
        sample:"Could you use the meter, please?" },
      { bot:"No problem. Any bags for the trunk?", es:"Sin problema. ¿Maletas para el maletero?",
        expect:["yes","two","one","no","bag","suitcase","trunk","just"], hint:"Di cuántas maletas: 'Yes, two bags, please.'",
        sample:"Yes, two bags, please." },
      { bot:"We're almost there. This is the fastest route with the traffic today.", es:"Ya casi llegamos. Esta es la ruta más rápida con el tráfico de hoy.",
        expect:["how long","thanks","ok","great","time","minutes","fine"], hint:"Puedes preguntar '¿Cuánto falta?' o agradecer.",
        sample:"Great, thanks. How long until we get there?" },
      { bot:"Here we are! That's 20 dollars.", es:"¡Aquí estamos! Son 20 dólares.",
        expect:["here","change","keep the change","card","receipt","thanks","pay"], hint:"Paga y pide recibo o di 'Keep the change.'",
        sample:"Here you go — keep the change. Could I get a receipt?" }
    ]
  },
  {
    id:"sim_airport", icon:"🛫", title:"Facturación en el aeropuerto", role:"Eres el pasajero; yo soy el agente.",
    steps:[
      { bot:"Good morning! May I see your passport and booking, please?", es:"¡Buenos días! ¿Su pasaporte y reserva, por favor?",
        expect:["here","sure","yes","of course","go","passport"], hint:"Entrégalos: 'Sure, here you go.'",
        sample:"Sure, here you go." },
      { bot:"Thank you. Are you checking any bags today?", es:"Gracias. ¿Va a facturar maletas hoy?",
        expect:["one","two","yes","no","bag","carry-on","checking","suitcase","just"], hint:"Di cuántas maletas facturas y cuál es de mano.",
        sample:"Just one, and this is my carry-on." },
      { bot:"Okay. Would you prefer a window or an aisle seat?", es:"Bien. ¿Prefiere ventana o pasillo?",
        expect:["window","aisle","either","don't mind","please"], hint:"Elige asiento: 'A window seat, please.'",
        sample:"A window seat, please." },
      { bot:"Done. Here's your boarding pass. Any questions?", es:"Listo. Aquí su tarjeta de embarque. ¿Alguna pregunta?",
        expect:["gate","what gate","boarding","time","where","delayed","on time","security"], hint:"Pregunta por la puerta o la hora: 'What gate does it leave from?'",
        sample:"Yes, what gate does it leave from, and is the flight on time?" },
      { bot:"Gate 22, boarding at 10:15, and yes, it's on time. Have a great flight!", es:"Puerta 22, embarque a las 10:15, y sí, a tiempo. ¡Buen vuelo!",
        expect:["thank","thanks","great","cheers"], hint:"Agradece: 'Thank you!'",
        sample:"Thank you so much!" }
    ]
  },
  {
    id:"sim_pharmacy", icon:"⚕️", title:"En la farmacia", role:"No te sientes bien; yo soy el farmacéutico.",
    steps:[
      { bot:"Hi there, how can I help you today?", es:"Hola, ¿en qué puedo ayudarle hoy?",
        expect:["headache","stomach","cough","cold","sore","throat","fever","pain","don't feel","something for"], hint:"Describe tu síntoma: 'I have a headache and a sore throat.'",
        sample:"I don't feel well. I have a headache and a sore throat." },
      { bot:"I'm sorry to hear that. Do you have a fever?", es:"Lo siento. ¿Tiene fiebre?",
        expect:["yes","no","little","bit","slightly","temperature"], hint:"Responde sobre la fiebre: 'A little, yes.' / 'No, I don't.'",
        sample:"A little, yes." },
      { bot:"Okay. How long have you had these symptoms?", es:"Bien. ¿Cuánto lleva con estos síntomas?",
        expect:["day","days","since","yesterday","today","two","week","this morning"], hint:"Di desde cuándo: 'Since yesterday.' / 'For two days.'",
        sample:"Since yesterday, so about a day." },
      { bot:"I can recommend this. Do you have any allergies?", es:"Puedo recomendarle esto. ¿Tiene alguna alergia?",
        expect:["allergic","no","penicillin","none","nothing","not that"], hint:"Di si eres alérgico: 'I'm allergic to penicillin.' o 'No allergies.'",
        sample:"No allergies that I know of." },
      { bot:"Great. This is available over the counter. Anything else?", es:"Genial. Esto se vende sin receta. ¿Algo más?",
        expect:["how much","how often","take","no","thanks","that's all","dosage","when"], hint:"Pregunta cómo tomarlo o cuánto cuesta: 'How often should I take it?'",
        sample:"How often should I take it? And how much is it?" }
    ]
  }
];
