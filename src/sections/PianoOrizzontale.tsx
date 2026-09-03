import { useState, useMemo } from 'react'
import Graph from '../components/Graph'
import ModuleShell from '../components/ModuleShell'
import type { Exercise } from '../components/Esercizi'

const G = 9.8
const T_MAX = 10
const N_PTS = 100

function calcMotion(m: number, F: number, mu: number) {
  const Fattr = mu * m * G
  const Fnet = F - Fattr
  return { a: Fnet / m, Fattr, Fnet }
}

function stateAt(a: number, v0: number, t: number) {
  if (v0 === 0 && a <= 0) return { v: 0, s: 0 }
  const tStop = a < 0 ? -v0 / a : Infinity
  if (t >= tStop) return { v: 0, s: v0 * tStop + 0.5 * a * tStop * tStop }
  return { v: v0 + a * t, s: v0 * t + 0.5 * a * t * t }
}

function OrizScene({ m, F, mu, v0, t }: { m: number; F: number; mu: number; v0: number; t: number }) {
  const W = 500, H = 190
  const { a, Fattr } = calcMotion(m, F, mu)
  const { s, v } = stateAt(a, v0, t)
  const maxSEst = Math.max(1, v0 * T_MAX + 0.5 * Math.abs(a) * T_MAX * T_MAX)
  const groundY = 135
  const blockW = 50, blockH = 34
  const startX = 55
  const travelW = W - startX - blockW - 30
  const bx = startX + Math.min(Math.max(s / maxSEst, 0), 1) * travelW
  const fArrow = Math.min(80, (F / 100) * 80)
  const aArrow = Math.min(70, (Math.abs(Fattr) / 50) * 70)
  const moving = Math.abs(v) > 0.01

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sim-svg">
      <rect x={20} y={groundY} width={W - 40} height={4} rx="2" fill="var(--sim-ground)" />
      {mu > 0 && [...Array(16)].map((_, i) => (
        <line key={i} x1={20 + i * 28} y1={groundY + 4} x2={12 + i * 28} y2={groundY + 14}
          stroke="rgba(180,130,0,0.35)" strokeWidth="1" />
      ))}
      {mu > 0 && (
        <text x={W / 2} y={groundY + 24} textAnchor="middle" fill="var(--sim-text)" fontSize="9">
          μ = {mu.toFixed(2)}
        </text>
      )}
      <rect x={bx} y={groundY - blockH} width={blockW} height={blockH}
        rx="5" fill="rgba(37,99,235,0.12)" stroke="#2563eb" strokeWidth="2" />
      <text x={bx + blockW / 2} y={groundY - blockH / 2 + 5}
        textAnchor="middle" fill="#2563eb" fontSize="12" fontWeight="700">{m}kg</text>
      {F > 0 && (
        <>
          <line x1={bx + blockW} y1={groundY - blockH / 2}
            x2={bx + blockW + fArrow} y2={groundY - blockH / 2}
            stroke="#e05600" strokeWidth="3" markerEnd="url(#arrO)" />
          <text x={bx + blockW + fArrow / 2} y={groundY - blockH / 2 - 8}
            textAnchor="middle" fill="#e05600" fontSize="10">F={F}N</text>
        </>
      )}
      {moving && Fattr > 0 && (
        <>
          <line x1={bx} y1={groundY - blockH / 2}
            x2={bx - aArrow} y2={groundY - blockH / 2}
            stroke="#c98a00" strokeWidth="2.5" markerEnd="url(#arrF)" />
          <text x={bx - aArrow / 2} y={groundY - blockH / 2 - 8}
            textAnchor="middle" fill="#c98a00" fontSize="10">Fₐ={Fattr.toFixed(1)}N</text>
        </>
      )}
      <defs>
        <marker id="arrO" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill="#e05600" />
        </marker>
        <marker id="arrF" markerWidth="7" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="7,0 0,3.5 7,7" fill="#c98a00" />
        </marker>
      </defs>
      <text x={W / 2} y={H - 12} textAnchor="middle" fill="var(--sim-text)" fontSize="10">
        a={a.toFixed(2)} m/s² · v={v.toFixed(2)} m/s · s={s.toFixed(2)} m
      </text>
    </svg>
  )
}

const quizQ = [
  { q: "Un blocco di 3 kg su piano orizzontale privo di attrito. Forza F = 12 N. L'accelerazione vale:", opts: ["36 m/s²", "4 m/s²", "0.25 m/s²", "12 m/s²"], correct: 1, exp: "a = F/m = 12/3 = 4 m/s². Senza attrito, tutta la forza produce accelerazione." },
  { q: "Con μ = 0.3 e m = 5 kg (g = 9.8 m/s²), la forza d'attrito cinetico vale:", opts: ["1.5 N", "14.7 N", "5 N", "0.3 N"], correct: 1, exp: "Fₐ = μ · m · g = 0.3 × 5 × 9.8 = 14.7 N." },
  { q: "Il coefficiente d'attrito cinetico dipende dall'area della superficie di contatto?", opts: ["Sì, più grande è l'area, più attrito c'è", "No, non dipende dall'area", "Dipende solo dalla velocità", "Sì, ma solo per superfici lucide"], correct: 1, exp: "Nel modello di Amontons-Coulomb l'attrito dipende da N e μ, NON dall'area." },
  { q: "Un blocco con v₀ = 12 m/s e a = −3 m/s². Dopo quanti secondi si ferma?", opts: ["3 s", "4 s", "6 s", "36 s"], correct: 1, exp: "t_stop = −v₀/a = −12/(−3) = 4 s." },
  { q: "La forza normale su un piano orizzontale vale:", opts: ["N = m·a", "N = F applicata", "N = m·g", "N = μ·m·g"], correct: 2, exp: "Sul piano orizzontale il blocco è in equilibrio verticale: N = P = m·g." },
  { q: "F = 25 N, m = 5 kg, μ = 0.3, g = 9.8 m/s². L'accelerazione vale:", opts: ["5 m/s²", "2.06 m/s²", "2.94 m/s²", "0.5 m/s²"], correct: 1, exp: "Fₐ = 14.7 N. Fnet = 25−14.7 = 10.3 N. a = 10.3/5 = 2.06 m/s²." },
  { q: "Con v₀ = 0 e a = 4 m/s², quanto spazio percorre il blocco in 3 s?", opts: ["6 m", "12 m", "18 m", "36 m"], correct: 2, exp: "s = ½·a·t² = ½ × 4 × 9 = 18 m." },
  { q: "Se la forza applicata è uguale alla forza d'attrito cinetico, allora:", opts: ["L'oggetto accelera", "L'oggetto decelera", "L'oggetto si muove a velocità costante", "L'oggetto si ferma subito"], correct: 2, exp: "Se F = Fₐ la forza netta è zero: a = 0, quindi MRU (1ª legge)." },
] as const

const esercizi: Exercise[] = [
  {
    q: 'Una cassa di 20 kg viene trascinata su un pavimento orizzontale con una forza di 90 N. Il coefficiente di attrito dinamico è μ = 0,25. Calcola la forza d’attrito, la forza netta e l’accelerazione. (g = 9,8 m/s²)',
    hints: [
      'Sul piano orizzontale il blocco non accelera verticalmente: la normale bilancia il peso, quindi N = m·g.',
      'Calcola l’attrito con Fₐ = μ·N e sottrailo alla forza applicata per ottenere la forza netta.',
      'Infine usa la seconda legge di Newton: a = F_netta / m.',
    ],
    solution: 'N = m·g = 20 × 9,8 = 196 N\nFₐ = μ·N = 0,25 × 196 = 49 N\nF_netta = 90 − 49 = 41 N\na = 41/20 = 2,05 m/s²\n\nLa cassa accelera di circa 2,05 m/s² nel verso della forza applicata.',
  },
  {
    q: 'Un disco da hockey scivola sul ghiaccio a 14 m/s e si ferma dopo 40 m. Determina il coefficiente di attrito dinamico fra disco e ghiaccio. (g = 9,8 m/s²)',
    hints: [
      'L’unica forza orizzontale è l’attrito, che frena il disco: l’accelerazione è negativa e vale a = −μ·g (la massa si semplifica).',
      'Non conosci il tempo, ma conosci spazio e velocità: usa la terza equazione cinematica v² = v₀² + 2·a·s con v = 0.',
      'Ricava prima il modulo dell’accelerazione, poi ottieni μ dividendo per g.',
    ],
    solution: '0 = v₀² + 2·a·s  ⇒  a = −v₀²/(2s) = −(14²)/(2 × 40) = −196/80 = −2,45 m/s²\n|a| = μ·g  ⇒  μ = 2,45/9,8 = 0,25\n\nIl coefficiente d’attrito vale 0,25. Nota che la massa non serve: si semplifica nei calcoli.',
  },
  {
    q: 'Un blocco di 6 kg è spinto con una forza orizzontale di 15 N ma resta fermo. Sapendo che μₛ = 0,4, verifica se può muoversi e calcola quanto vale in quell’istante la forza d’attrito statico.',
    hints: [
      'Calcola prima il valore massimo che l’attrito statico può raggiungere: Fₛ,max = μₛ·m·g.',
      'Confronta la forza applicata con questo massimo: se F < Fₛ,max il blocco resta fermo.',
      'Attenzione: l’attrito statico non vale sempre il massimo, ma solo quanto basta per l’equilibrio.',
    ],
    solution: 'Fₛ,max = μₛ·m·g = 0,4 × 6 × 9,8 = 23,52 N\nPoiché 15 N < 23,52 N il blocco NON si muove.\n\nEssendo fermo, l’equilibrio impone Fₐ = F applicata = 15 N.\n\nL’attrito statico è “reattivo”: assume il valore minimo necessario a mantenere l’equilibrio, fino al suo massimo di 23,52 N.',
  },
  {
    q: 'Un’automobile di 1200 kg viaggia a 20 m/s e frena bloccando le ruote su asfalto asciutto (μ = 0,8). Calcola lo spazio di frenata. Come cambierebbe su asfalto bagnato con μ = 0,4?',
    hints: [
      'In frenata l’unica forza orizzontale è l’attrito: la decelerazione vale a = −μ·g e non dipende dalla massa.',
      'Usa v² = v₀² + 2·a·s imponendo v = 0, cioè s = v₀²/(2·μ·g).',
      'Ripeti il calcolo con il nuovo μ e osserva come varia lo spazio quando μ si dimezza.',
    ],
    solution: 'Asfalto asciutto: a = −0,8 × 9,8 = −7,84 m/s²\ns = v₀²/(2|a|) = 400/15,68 ≈ 25,5 m\n\nAsfalto bagnato: a = −0,4 × 9,8 = −3,92 m/s²\ns = 400/7,84 ≈ 51,0 m\n\nDimezzando μ lo spazio di frenata RADDOPPIA. La massa non compare: un’auto pesante e una leggera frenano nello stesso spazio.',
  },
  {
    q: 'Su un blocco di 10 kg che scivola su un piano con μ = 0,2 agisce una forza orizzontale di 19,6 N nel verso del moto. Che tipo di moto ne risulta? Motiva la risposta.',
    hints: [
      'Calcola separatamente la forza applicata e la forza d’attrito dinamico Fₐ = μ·m·g.',
      'Confronta i due valori per ottenere la forza netta agente sul blocco.',
      'Ricorda la prima legge di Newton: che cosa accade a un corpo in moto quando la forza netta è nulla?',
    ],
    solution: 'Fₐ = μ·m·g = 0,2 × 10 × 9,8 = 19,6 N\nF applicata = 19,6 N\nF_netta = 19,6 − 19,6 = 0 N  ⇒  a = 0\n\nIl blocco si muove di MOTO RETTILINEO UNIFORME: mantiene costante la velocità che aveva. È l’applicazione diretta della prima legge di Newton: forza netta nulla non significa corpo fermo, ma velocità costante.',
  },
  {
    q: 'Una cassa di 20 kg è tirata su un pavimento orizzontale da una fune inclinata di 30° sopra l’orizzontale, con tensione T = 50 N. Il coefficiente d’attrito dinamico è μ = 0,15. Calcola la forza normale e l’accelerazione della cassa. (g = 9,8 m/s²; sin30° = 0,5; cos30° = 0,866)',
    hints: [
      'Scomponi la tensione in due componenti: orizzontale T·cos30° (che trascina) e verticale T·sin30° (che solleva).',
      'La componente verticale ALLEGGERISCE la cassa: N = m·g − T·sin30°, non più semplicemente m·g.',
      'Lungo l’orizzontale: T·cos30° − μ·N = m·a.',
    ],
    solution: 'Componenti della tensione:\nT_x = T·cos30° = 50 × 0,866 = 43,3 N\nT_y = T·sin30° = 50 × 0,5 = 25 N\n\nForza normale (ridotta dalla componente verticale):\nN = m·g − T_y = 20 × 9,8 − 25 = 196 − 25 = 171 N\n\nAttrito: Fₐ = μ·N = 0,15 × 171 = 25,65 N\nAccelerazione: a = (T_x − Fₐ)/m = (43,3 − 25,65)/20 ≈ 0,88 m/s²\n\nTirare obliquamente verso l’alto riduce la normale e quindi l’attrito: ecco perché conviene sollevare un po’ il carico mentre lo si traina.',
  },
  {
    q: 'Un blocco di 8 kg, fermo su un pavimento con μ = 0,30, viene spinto con una forza orizzontale di 40 N per 3 s; poi la forza viene tolta. Calcola la velocità raggiunta all’istante in cui la spinta cessa e per quanto tempo il blocco continua a scivolare prima di fermarsi. (g = 9,8 m/s²)',
    hints: [
      'Il moto ha due fasi. Fase 1 (con la spinta): a₁ = (F − μ·m·g)/m; la velocità finale è v = a₁·t.',
      'Quando la forza viene tolta resta solo l’attrito, che frena: a₂ = −μ·g.',
      'Nella fase 2 il tempo di arresto si ricava da v = |a₂|·t′, imponendo velocità finale nulla.',
    ],
    solution: 'FASE 1 — con la spinta\nFₐ = μ·m·g = 0,30 × 8 × 9,8 = 23,52 N\na₁ = (40 − 23,52)/8 = 16,48/8 = 2,06 m/s²\nv = a₁·t = 2,06 × 3 = 6,18 m/s\n\nFASE 2 — solo attrito\na₂ = −μ·g = −0,30 × 9,8 = −2,94 m/s²\nt′ = v/|a₂| = 6,18/2,94 ≈ 2,10 s\n\nIl blocco raggiunge 6,18 m/s e poi scivola ancora per circa 2,1 s prima di fermarsi.',
  },
]

function Teoria() {
  return (
    <div className="card">
      <h2>Moto su Piano Orizzontale</h2>

      <h3>Senza attrito</h3>
      <p>Se la superficie è priva di attrito, l&apos;unica forza orizzontale è quella applicata F. Dalla 2ª legge:</p>
      <div className="formula highlight">a = F / m</div>
      <p>Il moto è uniformemente accelerato. Partendo da velocità iniziale v₀:</p>
      <div className="formula">v(t) = v₀ + a·t</div>
      <div className="formula">s(t) = v₀·t + ½·a·t²</div>
      <div className="formula">v² = v₀² + 2·a·s</div>

      <h3>Con attrito cinetico</h3>
      <p>L&apos;attrito cinetico si oppone al moto: Fₐ = μ_c · N = μ_c · m · g.</p>
      <div className="formula highlight">Fᵗᵒᵗ = F − μ_c · m · g</div>
      <div className="formula highlight">a = (F − μ_c · m · g) / m</div>
      <div className="info-box warn">
        Se F &lt; μ_s · m · g (l&apos;attrito statico supera la forza applicata), il blocco non si muove affatto.
      </div>

      <h3>Moto con velocità iniziale v₀ ≠ 0 e decelerazione</h3>
      <p>Se non c&apos;è forza applicata ma c&apos;è attrito, il blocco decelera: a = −μ_c · g.</p>
      <div className="formula">t_stop = v₀ / (μ_c · g)</div>
      <div className="formula">s_stop = v₀² / (2 · μ_c · g)</div>
      <div className="info-box example">
        <strong>Esempio:</strong> v₀ = 10 m/s, μ = 0.4, g = 9.8 m/s².
        a = −3.92 m/s². Si ferma dopo t ≈ 2.6 s, avendo percorso s = 12.8 m.
      </div>
    </div>
  )
}

function Simulazione() {
  const [m, setM] = useState(5)
  const [F, setF] = useState(30)
  const [mu, setMu] = useState(0.2)
  const [v0, setV0] = useState(0)
  const [t, setT] = useState(0)

  const { a, Fattr, Fnet } = useMemo(() => calcMotion(m, F, mu), [m, F, mu])
  const { v, s } = useMemo(() => stateAt(a, v0, t), [a, v0, t])

  const tStop = a < 0 && v0 > 0 ? -v0 / a : a === 0 && v0 === 0 ? 0 : T_MAX
  const tEnd = Math.min(T_MAX, tStop < Infinity ? tStop + 1 : T_MAX)

  const ptsV = useMemo(() => Array.from({ length: N_PTS + 1 }, (_, i) => {
    const ti = i * tEnd / N_PTS
    return [ti, stateAt(a, v0, ti).v] as [number, number]
  }), [a, v0, tEnd])

  const ptsS = useMemo(() => Array.from({ length: N_PTS + 1 }, (_, i) => {
    const ti = i * tEnd / N_PTS
    return [ti, stateAt(a, v0, ti).s] as [number, number]
  }), [a, v0, tEnd])

  return (
    <div className="sim-card">
      <h2>Simulazione — Piano Orizzontale</h2>

      <div className="ctrl-row">
        <span className="ctrl-label">Massa m</span>
        <input type="range" min="1" max="20" step="0.5" value={m} onChange={e => setM(+e.target.value)} />
        <span className="ctrl-value">{m} kg</span>
      </div>
      <div className="ctrl-row">
        <span className="ctrl-label">Forza F</span>
        <input type="range" min="0" max="100" step="1" value={F} onChange={e => setF(+e.target.value)} />
        <span className="ctrl-value">{F} N</span>
      </div>
      <div className="ctrl-row">
        <span className="ctrl-label">Attrito μ_c</span>
        <input type="range" min="0" max="0.8" step="0.01" value={mu} onChange={e => setMu(+e.target.value)} />
        <span className="ctrl-value">{mu.toFixed(2)}</span>
      </div>
      <div className="ctrl-row">
        <span className="ctrl-label">Vel. iniziale v₀</span>
        <input type="range" min="0" max="20" step="0.5" value={v0} onChange={e => setV0(+e.target.value)} />
        <span className="ctrl-value">{v0.toFixed(1)} m/s</span>
      </div>
      <div className="ctrl-row">
        <span className="ctrl-label">Tempo t</span>
        <input type="range" min="0" max={T_MAX} step="0.1" value={t} onChange={e => setT(+e.target.value)} />
        <span className="ctrl-value">{t.toFixed(1)} s</span>
      </div>

      <OrizScene m={m} F={F} mu={mu} v0={v0} t={t} />

      <div className="readouts">
        <div className="readout"><span className="readout-label">Accelerazione</span><span className="readout-value">{a.toFixed(2)} m/s²</span></div>
        <div className="readout"><span className="readout-label">Velocità v(t)</span><span className="readout-value">{v.toFixed(2)} m/s</span></div>
        <div className="readout"><span className="readout-label">Spazio s(t)</span><span className="readout-value">{s.toFixed(2)} m</span></div>
        <div className="readout"><span className="readout-label">Forza attrito</span><span className="readout-value">{Fattr.toFixed(1)} N</span></div>
        <div className="readout"><span className="readout-label">Forza netta</span><span className="readout-value">{Fnet.toFixed(1)} N</span></div>
        <div className="readout"><span className="readout-label">Forza normale N</span><span className="readout-value">{(m * G).toFixed(1)} N</span></div>
      </div>

      <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '4px' }}>v(t) — velocità</div>
          <Graph points={ptsV} xLabel="t (s)" yLabel="v (m/s)" color="#2563eb" xMax={tEnd} />
        </div>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '4px' }}>s(t) — posizione</div>
          <Graph points={ptsS} xLabel="t (s)" yLabel="s (m)" color="#2e7d32" xMax={tEnd} />
        </div>
      </div>
    </div>
  )
}

export default function PianoOrizzontale() {
  return (
    <ModuleShell
      theory={<Teoria />}
      sim={<Simulazione />}
      exercises={esercizi}
      quizTitle="Quiz — Piano Orizzontale"
      quizQuestions={quizQ}
    />
  )
}
