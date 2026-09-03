import type { Exercise } from '../components/Esercizi'

export const esercizi: Exercise[] = [
  {
    q: 'Una slitta di 25 kg viene trainata su neve orizzontale (mu = 0,12) con una fune orizzontale. Si vuole che parta da ferma e raggiunga 4 m/s in 5 s. Che forza deve esercitare chi la traina? (g = 9,8 m/s^2)',
    hints: [
      'Il problema fornisce velocita e tempo: ricava prima l accelerazione richiesta con a = dv / dt.',
      'Scrivi la seconda legge lungo l orizzontale: F - Fa = m*a, dove Fa = mu*m*g.',
      'Isola F: la forza serve sia a vincere l attrito sia a produrre l accelerazione, quindi F = m*a + mu*m*g.',
    ],
    solution: 'a = dv/dt = 4/5 = 0,8 m/s^2\nFa = mu*m*g = 0,12 x 25 x 9,8 = 29,4 N\nF = m*a + Fa = 25 x 0,8 + 29,4 = 20 + 29,4 = 49,4 N\n\nDei 49,4 N necessari, 29,4 N servono solo a vincere l attrito e appena 20 N a produrre l accelerazione.',
  },
  {
    q: 'Uno sciatore di 70 kg parte da fermo su una pista inclinata di 18 gradi con mu = 0,10. Calcola l accelerazione, la velocita dopo 6 s e lo spazio percorso. (sin18 = 0,309 - cos18 = 0,951)',
    hints: [
      'Sul piano inclinato usa a = g*(sin(theta) - mu*cos(theta)): nota che la massa non compare.',
      'Sostituisci i valori numerici di seno e coseno forniti dal testo.',
      'Con v0 = 0 applica poi v = a*t e s = 0,5*a*t^2.',
    ],
    solution: 'a = g(sin18 - mu*cos18) = 9,8 x (0,309 - 0,10 x 0,951)\na = 9,8 x (0,309 - 0,095) = 9,8 x 0,214 = 2,10 m/s^2\nv = a*t = 2,10 x 6 = 12,6 m/s (circa 45 km/h)\ns = 0,5*a*t^2 = 0,5 x 2,10 x 36 = 37,8 m\n\nLa massa dello sciatore non serve: pesante o leggero, scende con la stessa accelerazione.',
  },
  {
    q: 'Un cassone di 40 kg viene spinto su un piano inclinato di 15 gradi con una forza parallela al piano di 200 N diretta verso l alto. Il coefficiente d attrito e mu = 0,20. Calcola l accelerazione. (sin15 = 0,259 - cos15 = 0,966)',
    hints: [
      'Il cassone sale, quindi l attrito e diretto verso il basso del piano, come la componente del peso.',
      'Lungo il piano: F - m*g*sin(theta) - mu*m*g*cos(theta) = m*a. Calcola i tre termini separatamente.',
      'Ricorda che la normale su un piano inclinato vale N = m*g*cos(theta), non m*g.',
    ],
    solution: 'N = m*g*cos15 = 40 x 9,8 x 0,966 = 378,7 N\nFa = mu*N = 0,20 x 378,7 = 75,7 N (verso il basso del piano)\nFpar = m*g*sin15 = 40 x 9,8 x 0,259 = 101,5 N (verso il basso del piano)\n\nF_netta = 200 - 101,5 - 75,7 = 22,8 N\na = 22,8/40 = 0,57 m/s^2\n\nIl cassone sale accelerando lentamente. Se la spinta scendesse sotto 177,2 N il cassone decelererebbe.',
  },
  {
    q: 'Un blocco di 3 kg viene lanciato in salita su un piano inclinato di 30 gradi con velocita iniziale di 9 m/s. Il coefficiente d attrito e mu = 0,25. Calcola quanto spazio percorre prima di fermarsi e verifica se poi ridiscende. (sin30 = 0,5 - cos30 = 0,866)',
    hints: [
      'In salita peso e attrito frenano entrambi: a = -g*(sin(theta) + mu*cos(theta)). Attenzione al segno piu.',
      'Trova lo spazio con v^2 = v0^2 + 2*a*s imponendo v = 0.',
      'Per la ridiscesa confronta tan(theta) con mu: se tan(theta) > mu il blocco riparte, altrimenti resta fermo.',
    ],
    solution: 'SALITA: a = -g(sin30 + mu*cos30) = -9,8 x (0,5 + 0,25 x 0,866)\na = -9,8 x (0,5 + 0,217) = -9,8 x 0,717 = -7,02 m/s^2\ns = v0^2/(2|a|) = 81/14,04 = 5,77 m\n\nRIDISCESA: tan30 = 0,577 e mu = 0,25\nPoiche 0,577 > 0,25 il blocco RIDISCENDE.\nIn discesa a = g(sin30 - mu*cos30) = 9,8 x 0,283 = 2,77 m/s^2\n\nNota: in discesa l accelerazione e molto minore che in salita, perche ora l attrito si oppone al peso invece di sommarsi.',
  },
  {
    q: 'Verifica energetica: un blocco di 5 kg parte da fermo su un piano orizzontale liscio spinto da una forza costante di 20 N. Dopo aver percorso 8 m, calcola la velocita usando prima la cinematica e poi il teorema dell energia cinetica, confrontando i risultati.',
    hints: [
      'Via cinematica: trova a = F/m e usa v^2 = v0^2 + 2*a*s con v0 = 0.',
      'Via energetica: il lavoro della forza netta vale W = F*s ed e uguale alla variazione di energia cinetica.',
      'Imposta W = 0,5*m*v^2 - 0 e ricava v. I due metodi devono dare lo stesso risultato.',
    ],
    solution: 'VIA CINEMATICA\na = F/m = 20/5 = 4 m/s^2\nv^2 = 2*a*s = 2 x 4 x 8 = 64  =>  v = 8 m/s\n\nVIA ENERGETICA\nW = F*s = 20 x 8 = 160 J\nW = 0,5*m*v^2  =>  160 = 0,5 x 5 x v^2 = 2,5*v^2\nv^2 = 64  =>  v = 8 m/s\n\nI due metodi coincidono, come deve essere. Il metodo energetico e spesso piu rapido quando non interessa il tempo.',
  },
  {
    q: 'Un blocco scende da fermo lungo un piano inclinato liscio di 30 gradi per 5 m, poi prosegue su un tratto orizzontale con coefficiente d attrito mu = 0,25. Quanto spazio percorre sul tratto orizzontale prima di fermarsi? (g = 9,8 m/s^2)',
    hints: [
      'Il problema ha due fasi: prima la discesa senza attrito, poi la frenata orizzontale. Studiale separatamente.',
      'Fase 1: con a = g*sin30 trova la velocita in fondo al piano usando v^2 = 2*a*s1.',
      'Fase 2: quella velocita viene annullata dall attrito. Col metodo energetico 0,5*m*v^2 = mu*m*g*s2 la massa si semplifica.',
    ],
    solution: 'FASE 1 - piano liscio\na1 = g*sin30 = 9,8 x 0,5 = 4,9 m/s^2\nv^2 = 2*a1*s1 = 2 x 4,9 x 5 = 49  =>  v = 7 m/s\n\nFASE 2 - tratto orizzontale con attrito\n0,5*m*v^2 = mu*m*g*s2  =>  s2 = v^2/(2*mu*g)\ns2 = 49/(2 x 0,25 x 9,8) = 49/4,9 = 10 m\n\nIl blocco percorre 10 m prima di fermarsi. La massa non compare in nessuna delle due fasi.',
  },
  {
    q: 'Un blocco di 4 kg e appoggiato su un tavolo orizzontale (mu = 0,20) ed e collegato, tramite una fune che passa su una carrucola sul bordo, a un secondo blocco di 3 kg appeso nel vuoto. Trova l accelerazione del sistema e la tensione della fune. (g = 9,8 m/s^2)',
    hints: [
      'I due blocchi sono legati dalla stessa fune: hanno la stessa accelerazione a e la stessa tensione T.',
      'Blocco appeso (3 kg): m2*g - T = m2*a. Blocco sul tavolo (4 kg): T - mu*m1*g = m1*a.',
      'Somma le due equazioni per eliminare T: m2*g - mu*m1*g = (m1+m2)*a, poi ricava a e infine T.',
    ],
    solution: 'Somma delle due equazioni:\nm2*g - mu*m1*g = (m1+m2)*a\na = g*(m2 - mu*m1)/(m1+m2) = 9,8 x (3 - 0,20 x 4)/7\na = 9,8 x (3 - 0,8)/7 = 9,8 x 2,2/7 = 3,08 m/s^2\n\nTensione (dal blocco appeso): T = m2*(g - a) = 3 x (9,8 - 3,08) = 3 x 6,72 = 20,16 N\n\nVerifica sul tavolo: T - mu*m1*g = 20,16 - 0,20 x 4 x 9,8 = 20,16 - 7,84 = 12,32 N = m1*a = 4 x 3,08 = 12,32 N. Coincide.',
  },
]
