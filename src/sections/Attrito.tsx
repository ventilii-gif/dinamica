import { useState } from 'react'
import ModuleShell from '../components/ModuleShell'
import type { Exercise } from '../components/Esercizi'

const G = 9.8

function Curva({ m, muS, muD }: { m: number; muS: number; muD: number }) {
  const W = 460, H = 200
  const P = { top: 20, right: 20, bottom: 36, left: 54 }
  const iW = W - P.left - P.right, iH = H - P.top - P.bottom
  const N = m * G, FsMax = muS * N, Fk = muD * N
  const Fmax = Math.max(FsMax * 1.5, 10)
  const tx = (f: number) => P.left + (f / Fmax) * iW
  const ty = (f: number) => P.top + iH - (f / (FsMax * 1.1)) * iH
  const sp: string[] = []
  for (let i = 0; i <= 40; i++) { const f = (i/40)*FsMax; sp.push(`${i===0?'M':'L'}${tx(f).toFixed(1)},${ty(f).toFixed(1)}`) }
  const dx = tx(FsMax), dy1 = ty(FsMax), dy2 = ty(Fk)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <rect x={P.left} y={P.top} width={iW} height={iH} fill="var(--sim-bg)" rx="5" />
      <rect x={P.left} y={P.top} width={dx-P.left} height={iH} fill="rgba(46,158,79,0.08)" />
      <text x={P.left+(dx-P.left)/2} y={P.top+iH-6} textAnchor="middle" fill="#2e9e4f" fontSize="9">statico</text>
      <rect x={dx} y={P.top} width={P.left+iW-dx} height={iH} fill="rgba(224,86,0,0.08)" />
      <text x={dx+(P.left+iW-dx)/2} y={P.top+iH-6} textAnchor="middle" fill="#e05600" fontSize="9">cinetico</text>
      <path d={sp.join(' ')} fill="none" stroke="#2e9e4f" strokeWidth="2.5" />
      <path d={`M${dx.toFixed(1)},${dy1.toFixed(1)} L${dx.toFixed(1)},${dy2.toFixed(1)}`} fill="none" stroke="var(--sim-axis)" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d={`M${dx.toFixed(1)},${dy2.toFixed(1)} L${tx(Fmax).toFixed(1)},${dy2.toFixed(1)}`} fill="none" stroke="#e05600" strokeWidth="2.5" />
      <text x={dx+4} y={ty(FsMax)-4} fill="#2e9e4f" fontSize="9">μₛ·N={FsMax.toFixed(1)}N</text>
      <text x={dx+4} y={ty(Fk)+12} fill="#e05600" fontSize="9">μₖ·N={Fk.toFixed(1)}N</text>
      <line x1={P.left} y1={P.top+iH} x2={P.left+iW} y2={P.top+iH} stroke="var(--sim-axis)" strokeWidth="1" />
      <line x1={P.left} y1={P.top} x2={P.left} y2={P.top+iH} stroke="var(--sim-axis)" strokeWidth="1" />
      <text x={P.left+iW/2} y={H-4} textAnchor="middle" fill="var(--sim-text)" fontSize="10">Forza applicata F (N)</text>
      <text x={14} y={P.top+iH/2} textAnchor="middle" fill="var(--sim-text)" fontSize="10" transform={`rotate(-90,14,${P.top+iH/2})`}>F attrito (N)</text>
    </svg>
  )
}

function Blocco({ m, muS, muD, Fapp }: { m: number; muS: number; muD: number; Fapp: number }) {
  const W = 460, H = 160
  const N = m * G, FsMax = muS * N, Fk = muD * N
  const moving = Fapp > FsMax
  const Fa = moving ? Fk : Math.min(Fapp, FsMax)
  const gy = 110, bw = 60, bh = 40
  const bx = W/2 - bw/2
  const sc = (f: number) => Math.min(100, (f/Math.max(FsMax*1.5,1))*100)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sim-svg">
      <rect x={20} y={gy} width={W-40} height={5} rx="2" fill="var(--sim-ground)" />
      {[...Array(14)].map((_,i) => <line key={i} x1={20+i*30} y1={gy+5} x2={12+i*30} y2={gy+14} stroke="var(--sim-ground-hatch)" strokeWidth="1" />)}
      <rect x={bx} y={gy-bh} width={bw} height={bh} rx="6"
        fill={moving?'rgba(224,86,0,0.15)':'rgba(37,99,235,0.12)'}
        stroke={moving?'#e05600':'#2563eb'} strokeWidth="2" />
      <text x={bx+bw/2} y={gy-bh/2+5} textAnchor="middle" fill={moving?'#e05600':'#2563eb'} fontSize="12" fontWeight="700">{m}kg</text>
      {Fapp > 0 && (
        <>
          <line x1={bx+bw} y1={gy-bh/2} x2={bx+bw+sc(Fapp)} y2={gy-bh/2} stroke="#c98a00" strokeWidth="3" markerEnd="url(#mA)" />
          <text x={bx+bw+sc(Fapp)/2} y={gy-bh/2-8} textAnchor="middle" fill="#c98a00" fontSize="10">F={Fapp.toFixed(1)}N</text>
        </>
      )}
      {Fa > 0 && (
        <>
          <line x1={bx} y1={gy-bh/2} x2={bx-sc(Fa)} y2={gy-bh/2} stroke={moving?'#e05600':'#2e9e4f'} strokeWidth="3" markerEnd={moving?'url(#mK)':'url(#mS)'} />
          <text x={bx-sc(Fa)/2} y={gy-bh/2-8} textAnchor="middle" fill={moving?'#e05600':'#2e9e4f'} fontSize="10">Fₐ={Fa.toFixed(1)}N</text>
        </>
      )}
      <defs>
        <marker id="mA" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="#c98a00" /></marker>
        <marker id="mS" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="#2e9e4f" /></marker>
        <marker id="mK" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="#e05600" /></marker>
      </defs>
      <text x={W/2} y={H-8} textAnchor="middle" fontSize="12" fontWeight="700" fill={moving?'#e05600':'#2e9e4f'}>
        {moving?'▶ IN MOTO (attrito cinetico)':'■ FERMO (attrito statico)'}
      </text>
    </svg>
  )
}

const quizQ = [
  { q: "L'attrito statico massimo dipende da:", opts: ["La velocità del blocco","La forza normale e μₛ","L'area di contatto","La temperatura"], correct: 1, exp: "Fₛ,max = μₛ · N: dipende solo dal coefficiente statico e dalla normale." },
  { q: "Quando un oggetto comincia a scivolare, la forza d'attrito:", opts: ["Aumenta di colpo","Rimane invariata","Diminuisce passando da μₛ a μₖ","Diventa zero"], correct: 2, exp: "Si passa dall'attrito statico a quello cinetico e, poiché μₖ < μₛ, la forza cala." },
  { q: "μₛ e μₖ per la stessa coppia di superfici: quale relazione vale?", opts: ["μₛ = μₖ sempre","μₛ < μₖ","μₛ > μₖ","Dipende dalla velocità"], correct: 2, exp: "μₛ > μₖ: serve più forza per avviare il moto che per mantenerlo." },
  { q: "Su quale coppia di superfici il coefficiente d'attrito cinetico è tipicamente più alto?", opts: ["Ghiaccio su ghiaccio","Vetro su vetro","Gomma su asfalto asciutto","Acciaio lubrificato"], correct: 2, exp: "Gomma su asfalto asciutto ha μₖ ≈ 0,7–0,8, il valore più alto fra questi." },
  { q: "N = 80 N e μₛ = 0,35. Qual è la massima forza applicabile senza far muovere il blocco?", opts: ["0,35 N","80 N","28 N","229 N"], correct: 2, exp: "Fₛ,max = μₛ · N = 0,35 × 80 = 28 N." },
  { q: "Il coefficiente d'attrito cinetico dipende dalla velocità del blocco?", opts: ["Sì, cresce con la velocità","No, nel modello di Coulomb è costante","Sì, diminuisce con la velocità","Solo oltre certi valori"], correct: 1, exp: "Nel modello di Coulomb, usato a scuola, μₖ è indipendente dalla velocità." },
  { q: "F applicata = 18 N, Fₛ,max = 25 N. Quanto vale la forza d'attrito statico?", opts: ["25 N","0 N","18 N","7 N"], correct: 2, exp: "L'attrito statico è reattivo: vale quanto basta per l'equilibrio, cioè 18 N." },
  { q: "Se la massa raddoppia (F resta uguale), l'attrito cinetico:", opts: ["Rimane uguale","Si dimezza","Raddoppia","Quadruplica"], correct: 2, exp: "Fₖ = μₖ · m · g: raddoppiando m raddoppia N e quindi anche Fₖ." },
] as const

const esercizi: Exercise[] = [
  {
    q: 'Un armadio di 60 kg poggia sul pavimento. I coefficienti d’attrito sono μₛ = 0,45 e μₖ = 0,30. Calcola: (a) la forza minima per iniziare a spostarlo; (b) la forza necessaria a mantenerlo in moto a velocità costante. (g = 9,8 m/s²)',
    hints: [
      'Su un piano orizzontale la forza normale bilancia il peso: N = m·g.',
      'Per iniziare il moto devi superare l’attrito statico massimo: F > μₛ·N.',
      'Per la velocità costante l’accelerazione è nulla, quindi la forza applicata deve uguagliare esattamente l’attrito cinetico: F = μₖ·N.',
    ],
    solution: 'N = m·g = 60 × 9,8 = 588 N\n\n(a) Fₛ,max = μₛ·N = 0,45 × 588 = 264,6 N\nServe una forza appena superiore a 264,6 N per avviare il moto.\n\n(b) Fₖ = μₖ·N = 0,30 × 588 = 176,4 N\nBastano 176,4 N per mantenerlo in moto uniforme.\n\nUna volta partito serve circa il 33% di forza in meno: è l’esperienza comune di spingere un mobile pesante.',
  },
  {
    q: 'Su un blocco di 8 kg fermo (μₛ = 0,5) viene applicata una forza orizzontale che cresce gradualmente: prima 20 N, poi 35 N, infine 45 N. Indica per ciascun valore se il blocco si muove e quanto vale la forza d’attrito.',
    hints: [
      'Calcola una sola volta la soglia Fₛ,max = μₛ·m·g e confrontala con i tre valori.',
      'Finché F ≤ Fₛ,max il blocco resta fermo e l’attrito statico eguaglia la forza applicata.',
      'Appena F supera la soglia il blocco parte: da quel momento l’attrito diventa cinetico e assume un valore fisso.',
    ],
    solution: 'Fₛ,max = 0,5 × 8 × 9,8 = 39,2 N\n\n• F = 20 N < 39,2 N → FERMO, attrito statico = 20 N\n• F = 35 N < 39,2 N → FERMO, attrito statico = 35 N\n• F = 45 N > 39,2 N → SI MUOVE, l’attrito diventa cinetico (μₖ·N, minore di 39,2 N)\n\nFinché il blocco è fermo l’attrito “insegue” la forza applicata; superata la soglia diventa costante.',
  },
  {
    q: 'Una moneta è appoggiata su un libro. Inclinando lentamente il libro, la moneta inizia a scivolare quando l’inclinazione raggiunge 22°. Quanto vale il coefficiente d’attrito statico fra moneta e copertina?',
    hints: [
      'All’angolo limite la componente del peso lungo il piano eguaglia esattamente l’attrito statico massimo.',
      'Scrivi m·g·sinθ = μₛ·m·g·cosθ e semplifica m e g.',
      'Ottieni μₛ = tanθ: basta calcolare la tangente di 22°.',
    ],
    solution: 'All’angolo limite: m·g·sinθ = μₛ·m·g·cosθ\nμₛ = tanθ = tan22° ≈ 0,40\n\nIl coefficiente vale circa 0,40. Questo è un metodo sperimentale semplice e affidabile per misurare μₛ: non servono né dinamometri né la massa dell’oggetto, basta un goniometro.',
  },
  {
    q: 'Un’auto di 1400 kg è ferma su una strada in salita con pendenza 12°. Il freno a mano agisce solo sulle ruote posteriori, sulle quali grava il 40% del peso. Sapendo che μₛ = 0,7 fra gomma e asfalto, verifica se l’auto resta ferma.',
    hints: [
      'Calcola la componente del peso che tende a far scendere l’auto lungo la strada: F∥ = m·g·sinθ.',
      'La normale totale è N = m·g·cosθ, ma solo il 40% grava sulle ruote frenate: usa 0,40·N.',
      'Confronta l’attrito statico massimo disponibile (μₛ × 0,40·N) con F∥: se è maggiore, l’auto resta ferma.',
    ],
    solution: 'F∥ = m·g·sin12° = 1400 × 9,8 × 0,208 ≈ 2854 N\nN = m·g·cos12° = 1400 × 9,8 × 0,978 ≈ 13418 N\nNormale sulle ruote frenate = 0,40 × 13418 ≈ 5367 N\nAttrito massimo = 0,7 × 5367 ≈ 3757 N\n\nPoiché 3757 N > 2854 N, l’auto RESTA FERMA.\n\nIl margine però non è ampio: su asfalto bagnato (μ ≈ 0,4) l’attrito scenderebbe a circa 2147 N e l’auto scivolerebbe.',
  },
  {
    q: 'Molti manuali affermano che l’attrito non dipende dall’area di contatto. Perché allora le auto da corsa montano pneumatici molto larghi? Spiega il motivo fisico.',
    hints: [
      'Ricorda che il modello Fₐ = μ·N è un’approssimazione valida per superfici rigide e carichi moderati.',
      'Chiediti che cosa succede alla pressione sul terreno (forza per unità di superficie) quando l’area aumenta a parità di peso.',
      'Considera che la gomma è deformabile: oltre all’attrito “classico” interviene anche l’adesione molecolare e l’incastro con le asperità.',
    ],
    solution: 'Il modello di Coulomb (Fₐ = μ·N, indipendente dall’area) vale bene per solidi rigidi, ma la gomma non lo è.\n\nCon pneumatici larghi:\n• la pressione al suolo diminuisce, la gomma si deforma meno e non “strappa”;\n• aumenta la superficie di adesione molecolare, che non rientra nel modello semplice;\n• il calore generato si distribuisce su più superficie, evitando il degrado della mescola;\n• l’usura è più uniforme e il grip resta costante più a lungo.\n\nNon è quindi il μ a cambiare: cambiano le condizioni fisiche che rendono valido (o no) il modello.',
  },
  {
    q: 'Una cassa è appoggiata sul cassone di un camion; il coefficiente d’attrito statico fra cassa e cassone è μₛ = 0,4. Qual è la massima decelerazione che il camion può avere in frenata senza che la cassa scivoli in avanti? (g = 9,8 m/s²)',
    hints: [
      'In frenata l’unica forza orizzontale che può rallentare la cassa è l’attrito statico del cassone.',
      'L’attrito statico disponibile ha un massimo: Fₛ,max = μₛ·N = μₛ·m·g.',
      'Al limite serve tutto l’attrito per decelerare la cassa: μₛ·m·g = m·a. La massa si semplifica.',
    ],
    solution: 'Perché la cassa deceleri insieme al camion serve una forza F = m·a, fornita dall’attrito.\nMassimo attrito disponibile: Fₛ,max = μₛ·m·g\nAl limite: μₛ·m·g = m·a ⇒ a = μₛ·g = 0,4 × 9,8 = 3,92 m/s²\n\nSe il camion frena più bruscamente di 3,92 m/s² la cassa scivola in avanti. Il risultato non dipende dalla massa: vale per qualunque oggetto con quel μₛ.',
  },
  {
    q: 'Un libro di 0,8 kg è tenuto fermo contro una parete verticale premendolo con una forza orizzontale. Se μₛ = 0,5 fra libro e parete, qual è la forza minima con cui devi premere perché il libro non scivoli? (g = 9,8 m/s²)',
    hints: [
      'Sul libro agiscono tre forze: il peso (verso il basso), la normale della parete (orizzontale) e l’attrito (verticale). Che cosa deve reggere il peso?',
      'L’attrito verticale deve eguagliare il peso: Fₐ = m·g. Ma non può superare μₛ·N.',
      'La normale è proprio la tua spinta: N = F. Imponi μₛ·F ≥ m·g e ricava F.',
    ],
    solution: 'Il libro non cade se l’attrito verticale regge il peso:\nFₐ = m·g = 0,8 × 9,8 = 7,84 N\nMa Fₐ ≤ μₛ·N e la normale è la spinta: N = F.\nCondizione: μₛ·F ≥ m·g ⇒ F ≥ m·g/μₛ = 7,84/0,5 = 15,68 N\n\nServe premere con almeno 15,68 N, circa il doppio del peso del libro. Qui l’attrito agisce in verticale: la sua direzione dipende dal moto imminente, non da un asse prefissato.',
  },
]

function Teoria() {
  return (
    <div className="card">
      <h2>Attrito Statico e Dinamico</h2>

      <h3>Attrito statico</h3>
      <p>
        Finché un oggetto è fermo, l&apos;attrito <em>statico</em> si oppone alla forza applicata
        assumendo esattamente il valore necessario a mantenere l&apos;equilibrio, fino a un massimo:
      </p>
      <div className="formula highlight">F_applicata ≤ Fₛ,max = μₛ · N</div>

      <h3>Attrito cinetico (dinamico)</h3>
      <p>Una volta in moto, l&apos;attrito diventa <em>cinetico</em>: valore costante e minore del massimo statico.</p>
      <div className="formula highlight">Fₖ = μₖ · N &nbsp; con &nbsp; μₖ &lt; μₛ</div>
      <div className="info-box warn">
        Serve più forza per <em>avviare</em> il moto che per <em>mantenerlo</em>: per questo è più facile
        spingere un armadio già in movimento che farlo partire.
      </div>

      <h3>Il grafico a “gomito”</h3>
      <p>
        Nella zona statica la forza d&apos;attrito cresce proporzionalmente a quella applicata (retta a 45°);
        al momento del distacco cala bruscamente al valore cinetico e poi resta costante.
      </p>

      <h3>Valori tipici di μ</h3>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'0.4rem',marginTop:'0.5rem',fontSize:'0.85rem'}}>
        {[['Ghiaccio / Ghiaccio','0,03','0,02'],['Legno / Legno','0,4','0,3'],['Gomma / Asfalto','0,8','0,7'],['Acciaio / Acciaio','0,74','0,57'],['Teflon / Teflon','0,04','0,04']].map(([mat,us,uk]) => (
          <div key={mat} style={{padding:'0.4rem 0.6rem',background:'var(--soft)',borderRadius:6,border:'1px solid var(--border)'}}>
            <div style={{color:'var(--text)',fontWeight:600,fontSize:'0.8rem'}}>{mat}</div>
            <div style={{color:'var(--muted)',fontSize:'0.75rem'}}>μₛ = {us} · μₖ = {uk}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Simulazione() {
  const [m, setM] = useState(5)
  const [muS, setMuS] = useState(0.5)
  const [muD, setMuD] = useState(0.35)
  const [Fapp, setFapp] = useState(0)

  const N = m * G, FsMax = muS * N, Fk = muD * N
  const moving = Fapp > FsMax
  const muDMax = Math.max(0.05, muS - 0.05)

  return (
    <div className="sim-card">
      <h2>Simulazione — Attrito Statico e Cinetico</h2>
      <div className="ctrl-row"><span className="ctrl-label">Massa m</span><input type="range" min="1" max="20" step="0.5" value={m} onChange={e => setM(+e.target.value)} /><span className="ctrl-value">{m} kg</span></div>
      <div className="ctrl-row"><span className="ctrl-label">μ statico (μₛ)</span><input type="range" min="0.05" max="1.0" step="0.01" value={muS} onChange={e => { const v=+e.target.value; setMuS(v); if(muD>=v) setMuD(+(v-0.05).toFixed(2)) }} /><span className="ctrl-value">{muS.toFixed(2)}</span></div>
      <div className="ctrl-row"><span className="ctrl-label">μ cinetico (μₖ)</span><input type="range" min="0.01" max={muDMax} step="0.01" value={muD} onChange={e => setMuD(+e.target.value)} /><span className="ctrl-value">{muD.toFixed(2)}</span></div>
      <div className="ctrl-row"><span className="ctrl-label">Forza applicata</span><input type="range" min="0" max={FsMax*1.6} step="0.5" value={Fapp} onChange={e => setFapp(+e.target.value)} /><span className="ctrl-value">{Fapp.toFixed(1)} N</span></div>

      <Blocco m={m} muS={muS} muD={muD} Fapp={Fapp} />

      <div style={{marginTop:'0.75rem'}}>
        <div style={{fontSize:'0.8rem',color:'var(--muted)',marginBottom:'6px'}}>Curva attrito — verde: zona statica, arancione: zona cinetica</div>
        <Curva m={m} muS={muS} muD={muD} />
      </div>

      <div className="readouts" style={{marginTop:'0.75rem'}}>
        <div className="readout"><span className="readout-label">Forza normale N</span><span className="readout-value">{N.toFixed(1)} N</span></div>
        <div className="readout"><span className="readout-label">Fₛ,max</span><span className="readout-value">{FsMax.toFixed(1)} N</span></div>
        <div className="readout"><span className="readout-label">Fₖ = μₖ·N</span><span className="readout-value">{Fk.toFixed(1)} N</span></div>
        <div className="readout"><span className="readout-label">Stato</span><span className="readout-value" style={{color:moving?'var(--red)':'var(--green)'}}>{moving?'In moto':'Fermo'}</span></div>
      </div>
    </div>
  )
}

export default function Attrito() {
  return (
    <ModuleShell
      theory={<Teoria />}
      sim={<Simulazione />}
      exercises={esercizi}
      quizTitle="Quiz — Attrito Statico e Dinamico"
      quizQuestions={quizQ}
    />
  )
}
