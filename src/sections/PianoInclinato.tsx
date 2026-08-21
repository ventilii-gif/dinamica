import { useState, useMemo } from 'react'
import Graph from '../components/Graph'
import ModuleShell from '../components/ModuleShell'
import type { Exercise } from '../components/Esercizi'

const G = 9.8, T_MAX = 8, N_PTS = 80

function calcInclined(theta: number, m: number, mu: number) {
  const rad = (theta * Math.PI) / 180
  const sinT = Math.sin(rad), cosT = Math.cos(rad)
  const N = m * G * cosT
  return { aDown: G * (sinT - mu * cosT), N, Fpar: m * G * sinT, Fattr: mu * N }
}

function stateAt(a: number, v0: number, t: number) {
  if (a >= 0 && v0 >= 0) return { v: v0 + a * t, s: v0 * t + 0.5 * a * t * t }
  if (a < 0 && v0 > 0) {
    const ts = v0 / (-a)
    if (t >= ts) return { v: 0, s: v0 * ts + 0.5 * a * ts * ts }
  }
  if (a > 0 && v0 < 0) {
    const ts = (-v0) / a
    if (t >= ts) return { v: 0, s: v0 * ts + 0.5 * a * ts * ts }
  }
  return { v: v0 + a * t, s: v0 * t + 0.5 * a * t * t }
}

function Scene({ theta, m, mu, v0, t }: { theta: number; m: number; mu: number; v0: number; t: number }) {
  const W = 500, H = 210
  const rad = (theta * Math.PI) / 180
  const { aDown, N, Fpar, Fattr } = calcInclined(theta, m, mu)
  const { s } = stateAt(aDown, v0, t)
  const ox = 30, oy = H - 30, hyp = W - 80
  const ex = ox + hyp, ey = oy - hyp * Math.tan(rad)
  const maxS = Math.max(1, Math.abs(v0) * T_MAX + 0.5 * Math.abs(aDown) * T_MAX * T_MAX)
  const frac = Math.max(0, Math.min(s / maxS, 0.85))
  const bLen = 36
  const cx = ox + hyp * (0.1 + frac * 0.75)
  const cy = oy - (cx - ox) * Math.tan(rad)
  const cos = Math.cos(rad), sin = Math.sin(rad)
  const nx = -sin, ny = -cos
  const pts = [
    [cx - bLen/2*cos + bLen/2*nx, cy + bLen/2*sin + bLen/2*ny],
    [cx + bLen/2*cos + bLen/2*nx, cy - bLen/2*sin + bLen/2*ny],
    [cx + bLen/2*cos - bLen/6*nx, cy - bLen/2*sin - bLen/6*ny],
    [cx - bLen/2*cos - bLen/6*nx, cy + bLen/2*sin - bLen/6*ny],
  ].map(c => `${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(' ')
  const bx = cx + bLen/6*nx, by = cy + bLen/6*ny
  const wS = 35, nS = 28, fS = 22

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sim-svg">
      <polygon points={`${ox},${oy} ${ex},${ey} ${ex},${oy}`} fill="var(--sim-surface)" stroke="var(--sim-surface-stroke)" strokeWidth="1.5" />
      {mu > 0 && [...Array(10)].map((_, i) => {
        const px = ox + hyp * (0.05 + i * 0.09)
        const py = oy - (px - ox) * Math.tan(rad)
        return <line key={i} x1={px} y1={py} x2={px + 6*sin} y2={py + 6*cos} stroke="rgba(180,130,0,0.4)" strokeWidth="1" />
      })}
      <path d={`M ${ox+30},${oy} A 30,30 0 0,0 ${ox+30*cos},${oy-30*sin}`} fill="none" stroke="var(--sim-axis)" strokeWidth="1" />
      <text x={ox+38} y={oy-10} fill="var(--sim-text)" fontSize="11">{theta}°</text>
      <polygon points={pts} fill="rgba(37,99,235,0.12)" stroke="#2563eb" strokeWidth="2" />
      <text x={bx} y={by+4} textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="700">{m}kg</text>
      {/* Peso P: sempre verticale verso il basso */}
      <line x1={bx} y1={by} x2={bx} y2={by+wS} stroke="#e04848" strokeWidth="2.5" markerEnd="url(#mArrow)" />
      <text x={bx+6} y={by+wS/2} fill="#e04848" fontSize="9">P</text>
      {/* Normale N: perpendicolare al piano, verso l'esterno */}
      <line x1={bx} y1={by} x2={bx+nx*nS} y2={by+ny*nS} stroke="#2e9e4f" strokeWidth="2.5" markerEnd="url(#mArrowN)" />
      <text x={bx+nx*nS+4} y={by+ny*nS-4} fill="#2e9e4f" fontSize="9">N</text>
      {/* F∥: componente del peso lungo il piano, verso il BASSO del piano */}
      <line x1={bx} y1={by} x2={bx-cos*fS} y2={by+sin*fS} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#mArrowP)" />
      <text x={bx-cos*fS-12} y={by+sin*fS+8} fill="#3b82f6" fontSize="8">F∥</text>
      {/* Attrito Fₐ: risale il piano, opponendosi alla discesa */}
      {mu > 0 && aDown !== 0 && (
        <>
          <line x1={bx} y1={by} x2={bx+cos*fS*0.8} y2={by-sin*fS*0.8} stroke="#e05600" strokeWidth="2" markerEnd="url(#mArrowF)" />
          <text x={bx+cos*fS+2} y={by-sin*fS-2} fill="#e05600" fontSize="8">Fₐ</text>
        </>
      )}
      <defs>
        <marker id="mArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="#e04848" /></marker>
        <marker id="mArrowN" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="#2e9e4f" /></marker>
        <marker id="mArrowP" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="#3b82f6" /></marker>
        <marker id="mArrowF" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="#e05600" /></marker>
      </defs>
      <text x={W/2} y={H-8} textAnchor="middle" fill="var(--sim-text)" fontSize="10">
        a = {aDown.toFixed(2)} m/s² · N = {N.toFixed(1)} N · F∥ = {Fpar.toFixed(1)} N · Fₐ = {Fattr.toFixed(1)} N
      </text>
    </svg>
  )
}

const quizQ = [
  { q: "Su un piano inclinato di 30° senza attrito (g = 9.8 m/s²), l'accelerazione è:", opts: ["9.8 m/s²","4.9 m/s²","8.49 m/s²","0 m/s²"], correct: 1, exp: "a = g·sin30° = 9.8×0.5 = 4.9 m/s²." },
  { q: "La forza normale su un piano inclinato di angolo θ e massa m vale:", opts: ["N = m·g","N = m·g·sinθ","N = m·g·cosθ","N = m·g·tanθ"], correct: 2, exp: "La componente del peso perpendicolare al piano è m·g·cosθ e la normale la bilancia." },
  { q: "Con θ = 45°, μ = 0.5, g = 9.8 m/s². L'accelerazione lungo il piano vale:", opts: ["4.9 m/s²","3.46 m/s²","0 m/s²","2.4 m/s²"], correct: 1, exp: "a = g(sin45° − μ·cos45°) = 9.8×0.707×0.5 = 3.46 m/s²." },
  { q: "Se sinθ < μ·cosθ, allora il blocco sul piano inclinato:", opts: ["Accelera verso il basso","Non si muove da solo","Rimbalza","Sale spontaneamente"], correct: 1, exp: "La condizione equivale a tanθ < μ: l'attrito è sufficiente a trattenere il blocco." },
  { q: "Blocco su piano a 37° (sin=0.6, cos=0.8), μ=0.25, g=9.8 m/s². L'accelerazione vale:", opts: ["3.92 m/s²","5.88 m/s²","1.96 m/s²","0 m/s²"], correct: 0, exp: "a = 9.8(0.6 − 0.25×0.8) = 9.8×0.4 = 3.92 m/s²." },
  { q: "La componente del peso parallela al piano (F∥ = m·g·sinθ) aumenta quando:", opts: ["L'angolo θ diminuisce","La massa diminuisce","L'angolo θ aumenta","L'attrito aumenta"], correct: 2, exp: "sinθ cresce al crescere di θ fra 0° e 90°." },
  { q: "Per trattenere un blocco su un piano inclinato di angolo θ, serve che μ sia almeno:", opts: ["μ ≥ sinθ","μ ≥ cosθ","μ ≥ tanθ","μ ≥ g·sinθ"], correct: 2, exp: "Equilibrio: μ·m·g·cosθ ≥ m·g·sinθ ⇒ μ ≥ tanθ." },
  { q: "Con v₀ = 0 e a = 5 m/s² lungo il piano, la velocità dopo 4 s vale:", opts: ["5 m/s","10 m/s","20 m/s","80 m/s"], correct: 2, exp: "v = v₀ + a·t = 0 + 5×4 = 20 m/s." },
] as const

const esercizi: Exercise[] = [
  {
    q: 'Un blocco di 5 kg viene lasciato libero su un piano inclinato liscio di 30°. Calcola la forza normale, l’accelerazione e la velocità dopo 2 s. (g = 9,8 m/s²)',
    hints: [
      'Scomponi il peso lungo due assi: uno parallelo al piano e uno perpendicolare ad esso.',
      'La normale bilancia solo la componente perpendicolare: N = m·g·cosθ. Lungo il piano agisce F∥ = m·g·sinθ.',
      'Il piano è liscio, quindi a = g·sinθ; poi applica v = v₀ + a·t con v₀ = 0.',
    ],
    solution: 'N = m·g·cos30° = 5 × 9,8 × 0,866 ≈ 42,4 N\na = g·sin30° = 9,8 × 0,5 = 4,9 m/s²\nv = a·t = 4,9 × 2 = 9,8 m/s\n\nNota: l’accelerazione non dipende dalla massa. Un blocco di 50 kg scenderebbe con la stessa accelerazione.',
  },
  {
    q: 'Uno scivolo è inclinato di 25° e il coefficiente d’attrito dinamico vale μ = 0,15. Calcola l’accelerazione di un bambino che scende e lo spazio percorso in 3 s partendo da fermo.',
    hints: [
      'Due forze agiscono lungo il piano: la componente del peso F∥ (che spinge in giù) e l’attrito (che risale il piano).',
      'La formula complessiva è a = g·(sinθ − μ·cosθ): anche qui la massa si semplifica.',
      'Usa sin25° ≈ 0,423 e cos25° ≈ 0,906, poi applica s = ½·a·t².',
    ],
    solution: 'a = g(sin25° − μ·cos25°) = 9,8 × (0,423 − 0,15 × 0,906)\na = 9,8 × (0,423 − 0,136) = 9,8 × 0,287 ≈ 2,81 m/s²\ns = ½·a·t² = ½ × 2,81 × 9 ≈ 12,7 m\n\nSenza attrito l’accelerazione sarebbe stata 4,15 m/s²: l’attrito la riduce di circa un terzo.',
  },
  {
    q: 'Determina l’angolo massimo di un piano inclinato su cui una cassa resta ferma, sapendo che il coefficiente di attrito statico è μₛ = 0,6.',
    hints: [
      'La cassa è in equilibrio finché la componente del peso lungo il piano non supera l’attrito statico massimo.',
      'Scrivi la condizione limite: m·g·sinθ = μₛ·m·g·cosθ. La massa e g si semplificano.',
      'Dividendo entrambi i membri per cosθ ottieni tanθ = μₛ: usa l’arcotangente.',
    ],
    solution: 'All’equilibrio limite: m·g·sinθ = μₛ·m·g·cosθ\ntanθ = μₛ = 0,6\nθ = arctan(0,6) ≈ 31°\n\nPer angoli minori di 31° la cassa resta ferma; oltre inizia a scivolare. Questo angolo si chiama “angolo di attrito” o angolo limite.',
  },
  {
    q: 'Un carrello viene lanciato in salita lungo un piano inclinato di 20° con velocità iniziale di 8 m/s. L’attrito è trascurabile. Quanto tempo impiega a fermarsi e quanto spazio percorre lungo il piano?',
    hints: [
      'In salita la componente del peso lungo il piano è diretta verso il basso, quindi frena il carrello: a = −g·sinθ.',
      'Il carrello si ferma quando v = 0: ricava il tempo da v = v₀ + a·t.',
      'Per lo spazio puoi usare s = v₀²/(2|a|) oppure sostituire il tempo trovato in s = v₀·t + ½·a·t².',
    ],
    solution: 'a = −g·sin20° = −9,8 × 0,342 ≈ −3,35 m/s²\nt = v₀/|a| = 8/3,35 ≈ 2,39 s\ns = v₀²/(2|a|) = 64/6,70 ≈ 9,55 m\n\nSenza attrito il carrello ridiscende poi con la stessa accelerazione in modulo, tornando al punto di partenza con velocità di 8 m/s.',
  },
  {
    q: 'Su un piano inclinato di 40° con μ = 0,84 un blocco viene appoggiato e lasciato andare. Prevedi che cosa succede, giustificando con i calcoli. (sin40° = 0,643 – cos40° = 0,766)',
    hints: [
      'Confronta la condizione di equilibrio tanθ ≤ μ con i dati del problema.',
      'Calcola tan40° = sin40°/cos40° e confrontalo con il valore di μ.',
      'Se i due valori sono quasi uguali, che cosa vale l’accelerazione? Prova a calcolarla con a = g(sinθ − μ·cosθ).',
    ],
    solution: 'tan40° = 0,643/0,766 ≈ 0,84 = μ\n\nSiamo esattamente al caso limite. Verifica con l’accelerazione:\na = g(sin40° − μ·cos40°) = 9,8 × (0,643 − 0,84 × 0,766) = 9,8 × (0,643 − 0,643) = 0\n\nIl blocco resta FERMO in equilibrio precario: l’attrito bilancia esattamente la componente del peso. Basterebbe un angolo appena maggiore, o una lieve vibrazione, per farlo scivolare.',
  },
]

function Teoria() {
  return (
    <div className="card">
      <h2>Moto su Piano Inclinato</h2>

      <h3>Decomposizione del peso</h3>
      <p>Su un piano inclinato di angolo θ, il peso P = m·g si scompone in due componenti perpendicolari fra loro:</p>
      <div className="formula">Parallela al piano: F∥ = m·g·sinθ (verso il basso del piano)</div>
      <div className="formula">Perpendicolare al piano: F⊥ = m·g·cosθ</div>
      <div className="formula highlight">Forza normale: N = m·g·cosθ</div>

      <h3>Accelerazione senza attrito</h3>
      <p>Senza attrito la sola forza lungo il piano è F∥, quindi:</p>
      <div className="formula highlight">a = g·sinθ</div>
      <div className="info-box tip">L&apos;accelerazione non dipende dalla massa! Fu Galileo, studiando proprio i piani inclinati, a scoprirlo.</div>

      <h3>Accelerazione con attrito cinetico</h3>
      <p>L&apos;attrito cinetico vale Fₐ = μ_c · N = μ_c · m · g · cosθ e risale il piano opponendosi alla discesa:</p>
      <div className="formula highlight">a = g·(sinθ − μ_c·cosθ)</div>
      <div className="info-box warn">
        Se μ ≥ tanθ l&apos;attrito supera la componente parallela e il blocco non scivola: è la condizione di equilibrio.
      </div>

      <h3>Con velocità iniziale v₀ ≠ 0</h3>
      <p>
        Lanciando il blocco <em>in salita</em>, sia F∥ sia l&apos;attrito lo frenano: a = −g·(sinθ + μ_c·cosθ).
        Il blocco rallenta, si ferma e può poi ridiscendere se μ &lt; tanθ.
      </p>
      <div className="info-box example">
        <strong>Esempio:</strong> θ = 30°, μ = 0,2 ⇒ a = 9,8 × (0,5 − 0,173) = 3,2 m/s².
        Da fermo, dopo 3 s: v = 9,6 m/s e s = 14,4 m.
      </div>
    </div>
  )
}

function Simulazione() {
  const [theta, setTheta] = useState(30)
  const [m, setM] = useState(5)
  const [mu, setMu] = useState(0.1)
  const [v0, setV0] = useState(0)
  const [t, setT] = useState(0)

  const { aDown, N, Fpar, Fattr } = useMemo(() => calcInclined(theta, m, mu), [theta, m, mu])
  const { v, s } = useMemo(() => stateAt(aDown, v0, t), [aDown, v0, t])
  const ptsV = useMemo(() => Array.from({ length: N_PTS+1 }, (_, i) => { const ti = i*T_MAX/N_PTS; return [ti, stateAt(aDown, v0, ti).v] as [number, number] }), [aDown, v0])
  const ptsS = useMemo(() => Array.from({ length: N_PTS+1 }, (_, i) => { const ti = i*T_MAX/N_PTS; return [ti, stateAt(aDown, v0, ti).s] as [number, number] }), [aDown, v0])
  const canMove = (Fpar - Fattr) > 0.001

  return (
    <div className="sim-card">
      <h2>Simulazione — Piano Inclinato</h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>
        Le frecce mostrano le forze sul blocco. Positivo = giù per il piano.
      </p>
      <div className="ctrl-row"><span className="ctrl-label">Angolo θ</span><input type="range" min="1" max="60" step="1" value={theta} onChange={e => setTheta(+e.target.value)} /><span className="ctrl-value">{theta}°</span></div>
      <div className="ctrl-row"><span className="ctrl-label">Massa m</span><input type="range" min="1" max="20" step="0.5" value={m} onChange={e => setM(+e.target.value)} /><span className="ctrl-value">{m} kg</span></div>
      <div className="ctrl-row"><span className="ctrl-label">Attrito μ_c</span><input type="range" min="0" max="0.8" step="0.01" value={mu} onChange={e => setMu(+e.target.value)} /><span className="ctrl-value">{mu.toFixed(2)}</span></div>
      <div className="ctrl-row"><span className="ctrl-label">v₀ (giù = +)</span><input type="range" min="-10" max="10" step="0.5" value={v0} onChange={e => setV0(+e.target.value)} /><span className="ctrl-value">{v0.toFixed(1)} m/s</span></div>
      <div className="ctrl-row"><span className="ctrl-label">Tempo t</span><input type="range" min="0" max={T_MAX} step="0.1" value={t} onChange={e => setT(+e.target.value)} /><span className="ctrl-value">{t.toFixed(1)} s</span></div>
      {!canMove && v0 === 0 && (
        <div className="info-box warn" style={{ marginBottom: '0.5rem' }}>
          Blocco fermo: tanθ = {Math.tan((theta*Math.PI)/180).toFixed(2)} &lt; μ = {mu.toFixed(2)}
        </div>
      )}
      <Scene theta={theta} m={m} mu={mu} v0={v0} t={t} />
      <div className="readouts">
        <div className="readout"><span className="readout-label">Accelerazione</span><span className="readout-value">{aDown.toFixed(2)} m/s²</span></div>
        <div className="readout"><span className="readout-label">Velocità v(t)</span><span className="readout-value">{v.toFixed(2)} m/s</span></div>
        <div className="readout"><span className="readout-label">Spazio s(t)</span><span className="readout-value">{s.toFixed(2)} m</span></div>
        <div className="readout"><span className="readout-label">Forza normale N</span><span className="readout-value">{N.toFixed(1)} N</span></div>
        <div className="readout"><span className="readout-label">F∥ = mg·sinθ</span><span className="readout-value">{Fpar.toFixed(1)} N</span></div>
        <div className="readout"><span className="readout-label">Attrito Fₐ</span><span className="readout-value">{Fattr.toFixed(1)} N</span></div>
      </div>
      <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div><div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '4px' }}>v(t) — velocità</div><Graph points={ptsV} xLabel="t (s)" yLabel="v (m/s)" color="#2563eb" xMax={T_MAX} /></div>
        <div><div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '4px' }}>s(t) — posizione</div><Graph points={ptsS} xLabel="t (s)" yLabel="s (m)" color="#2e7d32" xMax={T_MAX} /></div>
      </div>
    </div>
  )
}

export default function PianoInclinato() {
  return (
    <ModuleShell
      theory={<Teoria />}
      sim={<Simulazione />}
      exercises={esercizi}
      quizTitle="Quiz — Piano Inclinato"
      quizQuestions={quizQ}
    />
  )
}
