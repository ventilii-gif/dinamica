export type Lang = 'it' | 'en'

export const i18n = {
  it: {
    langBtn: ['IT', 'EN'],
    nav: {
      home: '🏠 Home',
      spaceTime: '⏱️ Spazio-Tempo',
      dynamics: '⚡ Dinamica',
      invariants: '🔷 Invarianti',
      minkowski: '📐 Minkowski',
    },
    home: {
      title: 'Relatività Speciale',
      subtitle: 'Il tempo rallenta, le lunghezze si accorciano, la massa si trasforma in energia. Einstein aveva ragione.',
      cards: [
        { icon: '⏱️', title: 'Spazio e Tempo', sub: 'Dilatazione temporale e contrazione delle lunghezze' },
        { icon: '⚡', title: 'Dinamica Relativistica', sub: 'E = mc² e il momento relativistico' },
        { icon: '🔷', title: 'Invarianti', sub: "L'intervallo spaziotemporale che non cambia mai" },
        { icon: '📐', title: 'Diagrammi di Minkowski', sub: 'Visualizza lo spazio-tempo con gli occhi di Einstein' },
      ],
      quote: '"La distinzione tra passato, presente e futuro è solo un\'illusione ostinatamente persistente."',
      quoteBy: '— Albert Einstein',
    },
    spaceTime: {
      title: '⏱️ Spazio e Tempo Relativistici',
      sec1Title: 'I Postulati di Einstein (1905)',
      sec1Text: "La relatività speciale si basa su due soli postulati:\n1. Le leggi della fisica sono identiche in tutti i sistemi di riferimento inerziali.\n2. La velocità della luce nel vuoto (c ≈ 3×10⁸ m/s) è costante in tutti i sistemi inerziali, indipendentemente dalla sorgente o dall'osservatore.",
      sec1Tip: "💡 Il secondo postulato è rivoluzionario: un razzo che va a 0.9c e accende i fari NON vede la luce viaggiare a 1.9c, ma esattamente a c. Questo rompe la meccanica galileiana.",
      sec2Title: 'Il Fattore di Lorentz γ',
      sec2Text: 'Tutto ruota attorno al fattore γ (gamma), che dipende solo da β = v/c:',
      sec2Formula1: 'β = v/c      (β ∈ [0, 1))',
      sec2Formula2: 'γ = 1 / √(1 - β²)      (γ ≥ 1, γ→∞ quando β→1)',
      sec3Title: 'Dilatazione del Tempo',
      sec3Text: "Un orologio in moto rispetto a te batte più lentamente. Se sull'orologio in moto passa un tempo proprio Δτ (tempo misurato sul razzo), tu misuri:",
      sec3Formula: 'Δt = γ · Δτ     (Δt > Δτ sempre, poiché γ ≥ 1)',
      sec3Tip: '💡 Il tempo "proprio" (proprio = "suo", di quell\'oggetto) è sempre il più breve. È il tempo misurato da un orologio solidale con l\'oggetto.',
      sec4Title: 'Contrazione delle Lunghezze',
      sec4Text: "Un oggetto in moto appare più corto nella direzione del moto. Se la lunghezza propria è L₀ (misurata a riposo), un osservatore rispetto al quale si muove vede:",
      sec4Formula: 'L = L₀ / γ     (L < L₀ sempre)',
      sec4Tip: '⚠️ La contrazione avviene solo nella direzione del moto. Le dimensioni trasversali restano invariate.',
      ex1Title: '🌌 Esempio: I Muoni Cosmici',
      ex1Text: "I raggi cosmici nell'alta atmosfera producono particelle chiamate muoni a ~15 km di quota. I muoni hanno vita media propria di 2.2 μs: senza relatività percorrerebbero solo ~660 m prima di decadere. Eppure li rileviamo in abbondanza al suolo! Come?\n\nA v ≈ 0.998c → γ ≈ 15. Per noi sulla Terra, la loro vita media è Δt = 15 × 2.2 μs = 33 μs → percorrono ~10 km e arrivano al suolo.\nDal punto di vista del muone: la distanza 15 km si contrae a 15 km/15 = 1 km, percorribile in 2.2 μs a quella velocità.",
      ex2Title: '🎬 Interstellar: il Pianeta di Miller',
      ex2Text: "Nel film, il pianeta orbita vicino a un buco nero enorme (Gargantua). La gravità estrema rallenta il tempo (relatività GENERALE): 1 ora sul pianeta = 7 anni sulla Terra. Cooper torna dalla spedizione e trova la figlia quasi più vecchia di lui. Questo non è fantascienza: il GPS ha bisogno di correzioni relativistiche ogni giorno.",
      simTitle: '🔬 Simulazione: Orologio in Volo',
      simBeta: 'Velocità β = v/c',
      simBetaDesc: 'Muovi il cursore per cambiare la velocità del razzo',
      readGamma: 'Fattore γ',
      readDt: 'Δt (Terra)',
      readDtau: 'Δτ (Razzo)',
      readL: 'Lunghezza L',
      readL0: 'Lunghezza propria L₀ = 100 m',
      simNote: '→ Per ogni secondo passato sul razzo, sulla Terra passano γ secondi.',
      quiz: {
        title: '🎯 Quiz: Spazio e Tempo',
        questions: [
          {
            q: 'Un razzo viaggia a β = 0.6 (γ = 1.25). Sul razzo passano 10 secondi. Quanti secondi passano sulla Terra?',
            opts: ['8 secondi', '10 secondi', '12.5 secondi', '6 secondi'],
            correct: 2,
            exp: 'Δt = γ · Δτ = 1.25 × 10 s = 12.5 s. Il tempo sulla Terra è sempre maggiore del tempo proprio del razzo.'
          },
          {
            q: "Una navicella lunga 200 m (a riposo) viaggia a β = 0.866 (γ = 2). Un osservatore a Terra vede la navicella lunga:",
            opts: ['400 m', '200 m', '100 m', '141 m'],
            correct: 2,
            exp: 'L = L₀/γ = 200/2 = 100 m. La lunghezza si dimezza perché γ = 2.'
          },
          {
            q: 'I muoni cosmici sopravvivono fino al suolo terrestre grazie a:',
            opts: ['Un errore nelle misure sperimentali', 'La dilatazione del loro tempo di vita (per noi)', 'Una forza speciale dei raggi cosmici', 'Il fatto che vanno più lentamente di c'],
            correct: 1,
            exp: 'Per un osservatore terrestre, il tempo di vita del muone è dilatato di un fattore γ ≫ 1. È una conferma sperimentale diretta della relatività speciale.'
          }
        ]
      }
    },
    dynamics: {
      title: '⚡ Dinamica Relativistica',
      sec1Title: 'Il Momento Relativistico',
      sec1Text: "In meccanica classica p = mv. Ma a velocità relativistiche, questa formula viola la conservazione del momento. La versione corretta è:",
      sec1Formula: 'p = γ · m · v      (m = massa invariante a riposo)',
      sec1Tip: '💡 La massa m è sempre la stessa (massa a riposo). Non esiste la "massa relativistica": è il momento che cresce con γ, non la massa.',
      sec2Title: "L'Energia Totale e E = mc²",
      sec2Text: 'L\'energia totale di una particella è:',
      sec2Formula1: 'E = γ · m · c²',
      sec2Text2: 'A riposo (v=0, γ=1) rimane l\'energia a riposo:',
      sec2Formula2: 'E₀ = m · c²',
      sec2Text3: "L'energia cinetica è la differenza:",
      sec2Formula3: 'K = E - E₀ = (γ - 1) · m · c²',
      sec2Tip: '⚠️ Per v ≪ c, K ≈ ½mv² (limite classico). La formula relativistica include l\'energia di massa.',
      sec3Title: 'La Relazione Invariante',
      sec3Text: 'Questa è forse la formula più bella della fisica relativistica:',
      sec3Formula: 'E² = (p·c)² + (m·c²)²',
      sec3Tip: '💡 Per un fotone: m=0, quindi E = pc. Per una particella ferma: p=0, quindi E = mc². Bella, vero?',
      sec4Title: '⚛️ Esempio: il LHC al CERN',
      sec4Text: "Il Large Hadron Collider accelera protoni (m = 938 MeV/c²) a 6.5 TeV di energia. Calcoliamo γ:\nγ = E/(mc²) = 6500 GeV / 0.938 GeV ≈ 6930\nLa velocità: β = √(1 - 1/γ²) ≈ 0.999999999 c\nI protoni si muovono al 99.9999999% della velocità della luce! Il loro momento relativistico è ~6930 volte quello classico.",
      ex2Title: '💣 E = mc²: l\'Energia Nucleare',
      ex2Text: "1 grammo di materia convertita al 100% in energia vale:\nE = mc² = 0.001 kg × (3×10⁸)² = 9×10¹³ J\nEquivale a ~21 kton TNT (la bomba di Hiroshima era ~15 kton). Nelle reazioni nucleari si converte solo una piccola frazione di massa, ma è sufficiente per quantità enormi di energia.",
      simTitle: '🔬 Simulazione: Acceleratore di Particelle',
      simEnergy: 'Energia cinetica K (in unità di mc²)',
      simEnergyDesc: 'K/mc² da 0 a 20',
      readBeta: 'Velocità β',
      readGamma: 'Fattore γ',
      readMomentum: 'Momento p (mc)',
      readEnergy: 'Energia totale E (mc²)',
      cLimit: '→ Anche con energia infinita non si può raggiungere c',
      quiz: {
        title: '🎯 Quiz: Dinamica Relativistica',
        questions: [
          {
            q: 'Un elettrone a riposo ha energia E₀ = 0.511 MeV. Con γ = 10, la sua energia totale è:',
            opts: ['0.511 MeV', '5.11 MeV', '51.1 MeV', '511 MeV'],
            correct: 1,
            exp: 'E = γ·mc² = 10 × 0.511 MeV = 5.11 MeV. La formula E = γmc² moltiplica l\'energia a riposo per γ.'
          },
          {
            q: 'Perché nessun oggetto massivo può raggiungere la velocità della luce?',
            opts: [
              'Perché c è la velocità massima imposta dalla natura',
              'Perché servirebbe energia infinita (γ→∞ quando v→c)',
              'Perché a quella velocità la massa diventerebbe zero',
              'Entrambe A e B sono corrette'
            ],
            correct: 3,
            exp: 'Sia A che B sono corretti e equivalenti: c è il limite fisico perché E = γmc² → ∞ quando v→c, quindi richiederebbe energia infinita.'
          },
          {
            q: 'Per un fotone (m=0), la relazione E²=(pc)²+(mc²)² diventa:',
            opts: ['E = mc²', 'E = pc', 'E = ½mv²', 'E = 0'],
            correct: 1,
            exp: 'Con m=0: E² = (pc)² → E = pc. Un fotone ha energia proporzionale al suo momento. Da qui λ = h/p (fotone come onda e particella).'
          }
        ]
      }
    },
    invariants: {
      title: '🔷 Invarianti Relativistici',
      sec1Title: "L'Intervallo Spaziotemporale",
      sec1Text: "Due eventi nello spazio-tempo sono separati da una distanza spaziale Δx e un intervallo temporale Δt. La fisica classica li tratta separatamente. La relatività li unisce in un unico invariante:",
      sec1Formula: 's² = c²·Δt² − Δx²      (invariante di Lorentz)',
      sec1Tip: '💡 "Invariante" significa che s² ha lo stesso valore in tutti i sistemi inerziali. Mentre Δt e Δx cambiano col sistema di riferimento, s² no.',
      sec2Title: 'Tre Tipi di Separazione',
      sec2Time: 'Di tipo tempo (time-like): s² > 0',
      sec2TimeText: 'I due eventi possono essere connessi da un oggetto (o segnale) che va più lento di c. Esiste un sistema dove avvengono nello stesso luogo (diversi istanti). C\'è un ordine causale assoluto.',
      sec2Space: 'Di tipo spazio (space-like): s² < 0',
      sec2SpaceText: 'Nessun segnale può connettere i due eventi (troppo lontani in spazio). L\'ordine temporale dipende dall\'osservatore. Non c\'è connessione causale.',
      sec2Light: 'Di tipo luce (light-like): s² = 0',
      sec2LightText: 'I due eventi possono essere connessi esattamente dalla luce. La luce percorre esattamente la distanza Δx nel tempo Δt.',
      sec3Title: 'Il Tempo Proprio',
      sec3Text: 'Per eventi time-like, il tempo proprio τ è il tempo misurato da un orologio che si trova in entrambi gli eventi:',
      sec3Formula: 'τ = √(s²) / c = √(Δt² − Δx²/c²)',
      sec3Tip: '💡 Il tempo proprio è sempre minore del tempo coordinato: τ ≤ Δt. Questa è la dilatazione temporale vista come invariante.',
      sec4Title: 'I Quadrivettori',
      sec4Text: 'In relatività, posizione e impulso diventano quadrivettori (4 componenti):',
      sec4Formula1: 'x^μ = (ct, x, y, z)      quadrivettore posizione',
      sec4Formula2: 'p^μ = (E/c, pₓ, p_y, p_z)      quadrivettore impulso',
      sec4Text2: 'Il "quadrato" del quadrivettore impulso è invariante:',
      sec4Formula3: 'p^μ p_μ = (E/c)² − p² = (mc)²',
      sec4Tip: '💡 Questo è esattamente la relazione E² = (pc)² + (mc²)² vista nella sezione precedente!',
      ex1Title: '🚀 Esempio: Viaggio verso Proxima Centauri',
      ex1Text: "Proxima Centauri dista ~4.24 anni luce. Un'astronave parte a β = 0.99 (γ ≈ 7.1). Sulla Terra passano ~4.3 anni. Per gli astronauti (tempo proprio):\nτ = Δt/γ ≈ 4.3/7.1 ≈ 0.6 anni = ~7 mesi\nL'intervallo spaziotemporale è invariante: sul razzo vedono la distanza contratta a ~0.6 a.l., percorribile in ~7 mesi a β=0.99.",
      simTitle: '🔬 Simulazione: Intervallo Spaziotemporale',
      simNote: 'Posiziona due eventi nello spazio-tempo e calcola l\'invariante',
      event1: 'Evento A',
      event2: 'Evento B',
      coordX: 'Posizione x (a.l.)',
      coordT: 'Tempo t (anni)',
      resultTitle: 'Intervallo s²',
      timelike: 'Tipo Tempo',
      spacelike: 'Tipo Spazio',
      lightlike: 'Tipo Luce',
      properTime: 'Tempo proprio τ',
      properDist: 'Distanza propria d',
      quiz: {
        title: '🎯 Quiz: Invarianti',
        questions: [
          {
            q: 'Due eventi con c·Δt = 3 m e Δx = 5 m. Qual è l\'intervallo s²?',
            opts: ['s² = 34 m²', 's² = −16 m²', 's² = 16 m²', 's² = −34 m²'],
            correct: 1,
            exp: 's² = c²Δt² − Δx² = 9 − 25 = −16 m². Negativo → tipo spazio: i due eventi non possono essere connessi causalmente.'
          },
          {
            q: 'L\'intervallo spaziotemporale s² tra due eventi è uguale a 25 m² (positivo). Qual è il tipo?',
            opts: ['Tipo luce', 'Tipo spazio', 'Tipo tempo', 'Non è possibile determinarlo'],
            correct: 2,
            exp: 's² > 0 → tipo tempo. Esiste un sistema di riferimento dove i due eventi avvengono nello stesso luogo, e τ = √(s²)/c è il tempo proprio tra di essi.'
          },
          {
            q: 'Il tempo proprio di un oggetto è:',
            opts: [
              'Il tempo misurato da un osservatore fermo rispetto alla Terra',
              'Il tempo misurato da un orologio solidale con l\'oggetto',
              'Sempre maggiore del tempo coordinato',
              'Uguale al tempo coordinato solo se v = 0'
            ],
            correct: 1,
            exp: 'Il tempo proprio è il tempo misurato da un orologio che accompagna l\'oggetto. È sempre ≤ al tempo coordinato (τ ≤ Δt), con uguaglianza solo se l\'oggetto è fermo.'
          }
        ]
      }
    },
    minkowski: {
      title: '📐 Diagrammi di Minkowski',
      sec1Title: 'Il Diagramma Spaziotemporale',
      sec1Text: "Un diagramma di Minkowski rappresenta lo spazio-tempo con l'asse orizzontale per la posizione x e l'asse verticale per il tempo (moltiplicato per c). Ogni punto è un evento. La storia di un oggetto è una linea del mondo.",
      sec1Tip: '💡 La luce viaggia a 45° (la stessa quantità di x e ct per unità). Niente può inclinare la propria linea del mondo oltre i 45°.',
      sec2Title: 'Il Cono di Luce',
      sec2Text: "Le due rette a 45° disegnano il cono di luce. Il futuro (ct > 0) contiene tutti gli eventi raggiungibili dal presente. Il passato (ct < 0) contiene tutti gli eventi che possono influenzare il presente. La regione esterna è 'altrove': né passato né futuro assoluto.",
      sec3Title: 'Trasformazione di Lorentz nel Diagramma',
      sec3Text: "Quando si passa a un sistema S' in moto a velocità v = βc, gli assi si inclinano entrambi verso il cono di luce di un angolo α = arctan(β):\n• L'asse ct' è la linea del mondo dell'origine di S' (inclinata di α rispetto a ct)\n• L'asse x' è inclinato di α rispetto a x\n• Il cono di luce non cambia mai (è lo stesso per tutti)",
      sec3Tip: "💡 Attenzione: gli assi x' e ct' si avvicinano simmetricamente al cono di luce. Non si tratta di una rotazione ordinaria ma di una 'rotazione iperbolica' (Boost di Lorentz).",
      sec4Title: '⚗️ Paradosso dei Gemelli nel Diagramma',
      sec4Text: "Gemello A resta sulla Terra (linea del mondo verticale). Gemello B parte a v = 0.8c, torna. Nel diagramma, la linea del mondo di B è una V. Il tempo proprio di B è √(s²) lungo la sua traiettoria, che è MINORE del tempo del gemello A. Questo non è un paradosso: le situazioni non sono simmetriche. B ha accelerato, A no.",
      simTitle: '🔬 Diagramma di Minkowski Interattivo',
      simNote: 'Usa il cursore per cambiare la velocità del sistema S\'. Clicca sul diagramma per posizionare eventi (max 3).',
      simBeta: 'Velocità S\': β = v/c',
      toggleGrid: 'Mostra griglia S\'',
      toggleEvents: 'Mostra coordinazione eventi',
      clearEvents: 'Cancella eventi',
      eventsTitle: 'Coordinate degli eventi',
      evHeader: ['Evento', 'x (S)', 'ct (S)', 'x\' (S\')', 'ct\' (S\')'],
      hint: 'Clicca sul diagramma per aggiungere eventi',
      axes: {
        x: 'asse x (S)',
        ct: 'asse ct (S)',
        xp: "asse x' (S')",
        ctp: "asse ct' (S')",
        light: 'cono di luce',
        gridS: "griglia S'",
      },
      quiz: {
        title: '🎯 Quiz: Diagrammi di Minkowski',
        questions: [
          {
            q: 'Nel diagramma di Minkowski, la luce viaggia a:',
            opts: ['Verticale (solo asse ct)', 'Orizzontale (solo asse x)', '45° (uguale variazione di x e ct)', 'Qualsiasi angolo'],
            correct: 2,
            exp: 'c=1 in unità naturali → per ogni unità di ct, la luce percorre 1 unità di x. Questo dà esattamente 45°. È il cono di luce.'
          },
          {
            q: "Quando il sistema S' si muove a v = 0.9c rispetto a S, l'asse ct' nel diagramma di S:",
            opts: [
              'Rimane verticale',
              'Si inclina di arctan(0.9) verso il cono di luce',
              'Diventa orizzontale',
              'Ruota di 90°'
            ],
            correct: 1,
            exp: "L'asse ct' è la linea del mondo dell'origine di S'. Questa ha x = vt → x = 0.9·ct nel diagramma, cioè un'inclinazione arctan(0.9) dalla verticale."
          },
          {
            q: 'Nel paradosso dei gemelli, il gemello che torna dall\'astronave è più giovane perché:',
            opts: [
              'Ha subito accelerazioni che non subisce il gemello fermo',
              'La sua linea del mondo è più lunga nel diagramma',
              "Il suo percorso nello spazio-tempo ha tempo proprio minore",
              'Entrambe A e C sono corrette'
            ],
            correct: 3,
            exp: "Entrambe corrette. L'accelerazione rompe la simmetria (solo B accelera) e il tempo proprio lungo la traiettoria di B è minore perché la 'distanza spaziotemporale' di una V è minore di una linea retta."
          }
        ]
      }
    }
  },

  en: {
    langBtn: ['IT', 'EN'],
    nav: {
      home: '🏠 Home',
      spaceTime: '⏱️ Space-Time',
      dynamics: '⚡ Dynamics',
      invariants: '🔷 Invariants',
      minkowski: '📐 Minkowski',
    },
    home: {
      title: 'Special Relativity',
      subtitle: 'Time slows down, lengths shrink, mass converts to energy. Einstein was right.',
      cards: [
        { icon: '⏱️', title: 'Space and Time', sub: 'Time dilation and length contraction' },
        { icon: '⚡', title: 'Relativistic Dynamics', sub: 'E = mc² and relativistic momentum' },
        { icon: '🔷', title: 'Invariants', sub: 'The spacetime interval that never changes' },
        { icon: '📐', title: 'Minkowski Diagrams', sub: 'Visualize spacetime through Einstein\'s eyes' },
      ],
      quote: '"The distinction between past, present and future is only a stubbornly persistent illusion."',
      quoteBy: '— Albert Einstein',
    },
    spaceTime: {
      title: '⏱️ Relativistic Space and Time',
      sec1Title: "Einstein's Postulates (1905)",
      sec1Text: "Special relativity rests on just two postulates:\n1. The laws of physics are the same in all inertial reference frames.\n2. The speed of light in vacuum (c ≈ 3×10⁸ m/s) is constant in all inertial frames, regardless of the source or observer.",
      sec1Tip: "💡 The second postulate is revolutionary: a rocket travelling at 0.9c and turning on its headlights does NOT see light moving at 1.9c, but exactly c. This breaks Galilean mechanics.",
      sec2Title: 'The Lorentz Factor γ',
      sec2Text: 'Everything revolves around the factor γ (gamma), which depends only on β = v/c:',
      sec2Formula1: 'β = v/c      (β ∈ [0, 1))',
      sec2Formula2: 'γ = 1 / √(1 - β²)      (γ ≥ 1, γ→∞ as β→1)',
      sec3Title: 'Time Dilation',
      sec3Text: "A clock moving relative to you ticks more slowly. If the moving clock measures proper time Δτ (the time measured on the rocket), you measure:",
      sec3Formula: 'Δt = γ · Δτ     (Δt > Δτ always, since γ ≥ 1)',
      sec3Tip: '💡 "Proper time" is the time measured by a clock travelling with the object. It is always the shortest time.',
      sec4Title: 'Length Contraction',
      sec4Text: "A moving object appears shorter in the direction of motion. If the proper length is L₀ (measured at rest), an observer relative to whom it moves sees:",
      sec4Formula: 'L = L₀ / γ     (L < L₀ always)',
      sec4Tip: '⚠️ Contraction only occurs along the direction of motion. Transverse dimensions remain unchanged.',
      ex1Title: '🌌 Example: Cosmic Muons',
      ex1Text: "Cosmic rays in the upper atmosphere produce muons at ~15 km altitude. Muons have a proper mean lifetime of 2.2 μs: without relativity they would travel only ~660 m before decaying. Yet we detect them abundantly at ground level! How?\n\nAt v ≈ 0.998c → γ ≈ 15. For us on Earth, their lifetime is Δt = 15 × 2.2 μs = 33 μs → they travel ~10 km and reach the ground.\nFrom the muon's viewpoint: the 15 km distance is contracted to 15 km/15 = 1 km, crossable in 2.2 μs at that speed.",
      ex2Title: '🎬 Interstellar: Miller\'s Planet',
      ex2Text: "In the film, the planet orbits close to a massive black hole (Gargantua). The extreme gravity slows time (GENERAL relativity): 1 hour on the planet = 7 years on Earth. Cooper returns from the expedition to find his daughter almost older than him. This isn't sci-fi: GPS requires relativistic corrections every day.",
      simTitle: '🔬 Simulation: Clock in Flight',
      simBeta: 'Speed β = v/c',
      simBetaDesc: 'Move the slider to change the rocket\'s speed',
      readGamma: 'Lorentz factor γ',
      readDt: 'Δt (Earth)',
      readDtau: 'Δτ (Rocket)',
      readL: 'Length L',
      readL0: 'Proper length L₀ = 100 m',
      simNote: '→ For every second on the rocket, γ seconds pass on Earth.',
      quiz: {
        title: '🎯 Quiz: Space and Time',
        questions: [
          {
            q: 'A rocket travels at β = 0.6 (γ = 1.25). 10 seconds pass on the rocket. How many seconds pass on Earth?',
            opts: ['8 seconds', '10 seconds', '12.5 seconds', '6 seconds'],
            correct: 2,
            exp: 'Δt = γ · Δτ = 1.25 × 10 s = 12.5 s. Time on Earth is always greater than the rocket\'s proper time.'
          },
          {
            q: 'A spaceship 200 m long (at rest) travels at β = 0.866 (γ = 2). An Earth observer sees the ship as:',
            opts: ['400 m', '200 m', '100 m', '141 m'],
            correct: 2,
            exp: 'L = L₀/γ = 200/2 = 100 m. The length halves because γ = 2.'
          },
          {
            q: 'Cosmic muons survive to ground level because of:',
            opts: ['Measurement errors', 'Time dilation of their lifetime (as seen by us)', 'A special force from cosmic rays', 'The fact that they go slower than c'],
            correct: 1,
            exp: 'For a ground observer, the muon\'s lifetime is dilated by a factor γ ≫ 1. This is direct experimental confirmation of special relativity.'
          }
        ]
      }
    },
    dynamics: {
      title: '⚡ Relativistic Dynamics',
      sec1Title: 'Relativistic Momentum',
      sec1Text: "In classical mechanics p = mv. But at relativistic speeds, this formula violates conservation of momentum. The correct version is:",
      sec1Formula: 'p = γ · m · v      (m = invariant rest mass)',
      sec1Tip: '💡 The mass m is always the same (rest mass). There is no "relativistic mass": it is momentum that grows with γ, not mass.',
      sec2Title: 'Total Energy and E = mc²',
      sec2Text: 'The total energy of a particle is:',
      sec2Formula1: 'E = γ · m · c²',
      sec2Text2: 'At rest (v=0, γ=1) we get the rest energy:',
      sec2Formula2: 'E₀ = m · c²',
      sec2Text3: 'Kinetic energy is the difference:',
      sec2Formula3: 'K = E - E₀ = (γ - 1) · m · c²',
      sec2Tip: '⚠️ For v ≪ c, K ≈ ½mv² (classical limit). The relativistic formula includes the mass-energy.',
      sec3Title: 'The Invariant Relation',
      sec3Text: 'This is perhaps the most beautiful formula in relativistic physics:',
      sec3Formula: 'E² = (p·c)² + (m·c²)²',
      sec3Tip: '💡 For a photon: m=0, so E = pc. For a particle at rest: p=0, so E = mc². Beautiful, right?',
      sec4Title: '⚛️ Example: The LHC at CERN',
      sec4Text: "The Large Hadron Collider accelerates protons (m = 938 MeV/c²) to 6.5 TeV of energy. Let's compute γ:\nγ = E/(mc²) = 6500 GeV / 0.938 GeV ≈ 6930\nThe velocity: β = √(1 - 1/γ²) ≈ 0.999999999 c\nProtons move at 99.9999999% the speed of light! Their relativistic momentum is ~6930× the classical value.",
      ex2Title: '💣 E = mc²: Nuclear Energy',
      ex2Text: "1 gram of matter fully converted to energy:\nE = mc² = 0.001 kg × (3×10⁸)² = 9×10¹³ J\nEquivalent to ~21 kilotons TNT (the Hiroshima bomb was ~15 kt). Nuclear reactions convert only a tiny fraction of mass, but it's enough for enormous energy.",
      simTitle: '🔬 Simulation: Particle Accelerator',
      simEnergy: 'Kinetic energy K (in units of mc²)',
      simEnergyDesc: 'K/mc² from 0 to 20',
      readBeta: 'Speed β',
      readGamma: 'Lorentz factor γ',
      readMomentum: 'Momentum p (mc)',
      readEnergy: 'Total energy E (mc²)',
      cLimit: '→ Even with infinite energy you cannot reach c',
      quiz: {
        title: '🎯 Quiz: Relativistic Dynamics',
        questions: [
          {
            q: 'An electron at rest has energy E₀ = 0.511 MeV. With γ = 10, its total energy is:',
            opts: ['0.511 MeV', '5.11 MeV', '51.1 MeV', '511 MeV'],
            correct: 1,
            exp: 'E = γ·mc² = 10 × 0.511 MeV = 5.11 MeV. The formula E = γmc² multiplies the rest energy by γ.'
          },
          {
            q: 'Why can no massive object reach the speed of light?',
            opts: [
              'Because c is the maximum speed set by nature',
              'Because it would require infinite energy (γ→∞ as v→c)',
              'Because the mass would become zero at that speed',
              'Both A and B are correct'
            ],
            correct: 3,
            exp: 'Both A and B are correct and equivalent: c is the physical limit because E = γmc² → ∞ as v→c, which would require infinite energy.'
          },
          {
            q: 'For a photon (m=0), the relation E²=(pc)²+(mc²)² becomes:',
            opts: ['E = mc²', 'E = pc', 'E = ½mv²', 'E = 0'],
            correct: 1,
            exp: 'With m=0: E² = (pc)² → E = pc. A photon\'s energy is proportional to its momentum. This gives λ = h/p (photon as both wave and particle).'
          }
        ]
      }
    },
    invariants: {
      title: '🔷 Relativistic Invariants',
      sec1Title: 'The Spacetime Interval',
      sec1Text: "Two spacetime events are separated by a spatial distance Δx and a time interval Δt. Classical physics treats them separately. Relativity combines them into a single invariant:",
      sec1Formula: 's² = c²·Δt² − Δx²      (Lorentz invariant)',
      sec1Tip: '💡 "Invariant" means s² has the same value in all inertial frames. While Δt and Δx change with reference frame, s² does not.',
      sec2Title: 'Three Types of Separation',
      sec2Time: 'Time-like: s² > 0',
      sec2TimeText: 'The two events can be connected by an object (or signal) slower than c. There exists a frame where they happen at the same place (different times). There is an absolute causal order.',
      sec2Space: 'Space-like: s² < 0',
      sec2SpaceText: 'No signal can connect the two events (too far apart in space). The temporal order depends on the observer. No causal connection.',
      sec2Light: 'Light-like: s² = 0',
      sec2LightText: 'The two events can be connected exactly by light. Light covers exactly distance Δx in time Δt.',
      sec3Title: 'Proper Time',
      sec3Text: 'For time-like events, proper time τ is the time measured by a clock present at both events:',
      sec3Formula: 'τ = √(s²) / c = √(Δt² − Δx²/c²)',
      sec3Tip: '💡 Proper time is always less than or equal to coordinate time: τ ≤ Δt. This is time dilation viewed as an invariant.',
      sec4Title: 'Four-Vectors',
      sec4Text: 'In relativity, position and momentum become four-vectors (4 components):',
      sec4Formula1: 'x^μ = (ct, x, y, z)      position four-vector',
      sec4Formula2: 'p^μ = (E/c, pₓ, p_y, p_z)      momentum four-vector',
      sec4Text2: 'The "square" of the momentum four-vector is invariant:',
      sec4Formula3: 'p^μ p_μ = (E/c)² − p² = (mc)²',
      sec4Tip: '💡 This is exactly the relation E² = (pc)² + (mc²)² from the previous section!',
      ex1Title: '🚀 Example: Trip to Proxima Centauri',
      ex1Text: "Proxima Centauri is ~4.24 light-years away. A spaceship leaves at β = 0.99 (γ ≈ 7.1). On Earth ~4.3 years pass. For the astronauts (proper time):\nτ = Δt/γ ≈ 4.3/7.1 ≈ 0.6 years = ~7 months\nThe spacetime interval is invariant: on the rocket the distance is contracted to ~0.6 ly, crossable in ~7 months at β=0.99.",
      simTitle: '🔬 Simulation: Spacetime Interval',
      simNote: 'Place two events in spacetime and compute the invariant',
      event1: 'Event A',
      event2: 'Event B',
      coordX: 'Position x (light-years)',
      coordT: 'Time t (years)',
      resultTitle: 'Interval s²',
      timelike: 'Time-like',
      spacelike: 'Space-like',
      lightlike: 'Light-like',
      properTime: 'Proper time τ',
      properDist: 'Proper distance d',
      quiz: {
        title: '🎯 Quiz: Invariants',
        questions: [
          {
            q: 'Two events with c·Δt = 3 m and Δx = 5 m. What is the interval s²?',
            opts: ['s² = 34 m²', 's² = −16 m²', 's² = 16 m²', 's² = −34 m²'],
            correct: 1,
            exp: 's² = c²Δt² − Δx² = 9 − 25 = −16 m². Negative → space-like: the two events cannot be causally connected.'
          },
          {
            q: 'The spacetime interval s² between two events is 25 m² (positive). What type is it?',
            opts: ['Light-like', 'Space-like', 'Time-like', 'Cannot be determined'],
            correct: 2,
            exp: 's² > 0 → time-like. There exists a reference frame where the two events occur at the same place, and τ = √(s²)/c is the proper time between them.'
          },
          {
            q: 'The proper time of an object is:',
            opts: [
              'The time measured by an observer at rest on Earth',
              'The time measured by a clock co-moving with the object',
              'Always greater than coordinate time',
              'Equal to coordinate time only if v = 0'
            ],
            correct: 1,
            exp: 'Proper time is the time measured by a clock travelling with the object. It is always ≤ coordinate time (τ ≤ Δt), with equality only if the object is at rest.'
          }
        ]
      }
    },
    minkowski: {
      title: '📐 Minkowski Diagrams',
      sec1Title: 'The Spacetime Diagram',
      sec1Text: "A Minkowski diagram represents spacetime with the horizontal axis for position x and the vertical axis for time (multiplied by c). Every point is an event. The history of an object is a worldline.",
      sec1Tip: '💡 Light travels at 45° (equal amounts of x and ct per unit). Nothing can tilt its worldline beyond 45°.',
      sec2Title: 'The Light Cone',
      sec2Text: "The two 45° lines draw the light cone. The future (ct > 0) contains all events reachable from the present. The past (ct < 0) contains all events that can influence the present. The outer region is 'elsewhere': neither absolute past nor future.",
      sec3Title: 'Lorentz Transformation in the Diagram',
      sec3Text: "When switching to a frame S' moving at velocity v = βc, both axes tilt toward the light cone by angle α = arctan(β):\n• The ct' axis is the worldline of S''s origin (tilted by α from ct)\n• The x' axis is tilted by α from x\n• The light cone never changes (it's the same for everyone)",
      sec3Tip: "💡 Note: the x' and ct' axes approach the light cone symmetrically. This is not an ordinary rotation but a 'hyperbolic rotation' (Lorentz boost).",
      sec4Title: "⚗️ Twin Paradox in the Diagram",
      sec4Text: "Twin A stays on Earth (vertical worldline). Twin B travels at v = 0.8c and returns. In the diagram, B's worldline is a V-shape. B's proper time is √(s²) along their trajectory, which is LESS than A's time. This is not a paradox: the situations are not symmetric. B accelerated; A did not.",
      simTitle: '🔬 Interactive Minkowski Diagram',
      simNote: "Use the slider to change S' velocity. Click on the diagram to place events (max 3).",
      simBeta: "S' velocity: β = v/c",
      toggleGrid: "Show S' grid",
      toggleEvents: 'Show event coordinates',
      clearEvents: 'Clear events',
      eventsTitle: 'Event coordinates',
      evHeader: ['Event', 'x (S)', 'ct (S)', "x' (S')", "ct' (S')"],
      hint: 'Click on the diagram to add events',
      axes: {
        x: 'x axis (S)',
        ct: 'ct axis (S)',
        xp: "x' axis (S')",
        ctp: "ct' axis (S')",
        light: 'light cone',
        gridS: "S' grid",
      },
      quiz: {
        title: '🎯 Quiz: Minkowski Diagrams',
        questions: [
          {
            q: 'In a Minkowski diagram, light travels at:',
            opts: ['Vertical (ct axis only)', 'Horizontal (x axis only)', '45° (equal change in x and ct)', 'Any angle'],
            correct: 2,
            exp: 'c=1 in natural units → for every unit of ct, light covers 1 unit of x. This gives exactly 45°. This is the light cone.'
          },
          {
            q: "When frame S' moves at v = 0.9c relative to S, the ct' axis in S's diagram:",
            opts: [
              'Remains vertical',
              "Tilts by arctan(0.9) toward the light cone",
              'Becomes horizontal',
              'Rotates by 90°'
            ],
            correct: 1,
            exp: "The ct' axis is S''s origin worldline. This has x = vt → x = 0.9·ct in the diagram, i.e., a tilt of arctan(0.9) from vertical."
          },
          {
            q: 'In the twin paradox, the twin returning from the rocket is younger because:',
            opts: [
              'They experienced accelerations that the stationary twin did not',
              'Their worldline is longer in the diagram',
              'Their spacetime path has less proper time',
              'Both A and C are correct'
            ],
            correct: 3,
            exp: "Both correct. Acceleration breaks the symmetry (only B accelerates) and the proper time along B's V-shaped path is less because the 'spacetime length' of a V is less than a straight line."
          }
        ]
      }
    }
  }
} as const
