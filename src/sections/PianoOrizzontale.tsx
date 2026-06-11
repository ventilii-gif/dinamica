import { useState, useMemo } from 'react'
import Graph from '../components/Graph'
import Quiz from '../components/Quiz'

const G = 9.8
const T_MAX = 10
const N_PTS = 100

function calcMotion(m: number, F: number, mu: number, v0: number) {
  const Fattr = mu * m * G
  const Fnet = F - Fattr
  const a = Fnet / m
  return { a, Fattr, Fnet }
}

function stateAt(a: number, v0: number, t: number) {
  if (v0 === 0 && a <= 0) return { v: 0, s: 0 }
  const tStop = a < 0 ? -v0 / a : Infinity
  if (t >= tStop) {
    const sStop = v0 * tStop + 0.5 * a * tStop * tStop
    return { v: 0, s: sStop }
  }
  return {
    v: v0 + a * t,
    s: v0 * t + 0.5 * a * t * t,
  }
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
    <svg viewBox={`0 0 ${W} ${H}`} className="sim-svg" style={{ background: 'rgba(0,0,0,0.4)' }}>
      {/* Ground */}
      <rect x={20} y={groundY} width={W - 40} height={4} rx="2" fill="rgba(255,255,255,0.12)" />
      {mu > 0 && [...Array(16)].map((_, i) => (
        <line key={i} x1={20 + i * 28} y1={groundY + 4} x2={12 + i * 28} y2={groundY + 14}
          stroke="rgba(255,213,79,0.2)" strokeWidth="1" />
      ))}

      {/* Friction label */}
      {mu > 0 && (
        <text x={W / 2} y={groundY + 24} textAnchor="middle" fill="rgba(255,213,79,0.5)" fontSize="9">
          μ = {mu.toFixed(2)}
        </text>
      )}

      {/* Block */}
      <rect x={bx} y={groundY - blockH} width={blockW} height={blockH}
        rx="5" fill="rgba(79,195,247,0.22)" stroke="#4fc3f7" strokeWidth="2" />
      <text x={bx + blockW / 2} y={groundY - blockH / 2 + 5}
        textAnchor="middle" fill="#4fc3f7" fontSize="12" fontWeight="700">{m}kg</text>

      {/* Applied force arrow */}
      {F > 0 && (
        <>
          <line x1={bx + blockW} y1={groundY - blockH / 2}
            x2={bx + blockW + fArrow} y2={groundY - blockH / 2}
            stroke="#ff7043" strokeWidth="3" markerEnd="url(#arrO)" />
          <text x={bx + blockW + fArrow / 2} y={groundY - blockH / 2 - 8}
            textAnchor="middle" fill="#ff7043" fontSize="10">F={F}N</text>
        </>
      )}

      {/* Friction arrow (opposite direction) */}
      {moving && Fattr > 0 && (
        <>
          <line x1={bx} y1={groundY - blockH / 2}
            x2={bx - aArrow} y2={groundY - blockH / 2}
            stroke="#ffd54f" strokeWidth="2.5" markerEnd="url(#arrF)" />
          <text x={bx - aArrow / 2} y={groundY - blockH / 2 - 8}
            textAnchor="middle" fill="#ffd54f" fontSize="10">Fₐ={Fattr.toFixed(1)}N</text>
        </>
      )}

      <defs>
        <marker id="arrO" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill="#ff7043" />
        </marker>
        <marker id="arrF" markerWidth="7" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="7,0 0,3.5 7,7" fill="#ffd54f" />
        </marker>
      </defs>

      {/* State */}
      <text x={W / 2} y={H - 12} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
        a={a.toFixed(2)} m/s² · v={v.toFixed(2)} m/s · s={s.toFixed(2)} m
      </text>
    </svg>
  )
}

const quizQ = [
  {
    q: "Un blocco di 3 kg su piano orizzontale privo di attrito. Forza F = 12 N. L'accelerazione vale:",
    opts: ["36 m/s²", "4 m/s²", "0.25 m/s²", "12 m/s²"],
    correct: 1,
    exp: "a = F/m = 12/3 = 4 m/s². Senza attrito, tutta la forza produce accelerazione."
  },
  {
    q: "Con μ = 0.3 e m = 5 kg (g = 9.8 m/s²), la forza d'attrito cinetico vale:",
    opts: ["1.5 N", "14.7 N", "5 N", "0.3 N"],
    correct: 1,
    exp: "Fₐ = μ · N = μ · m · g = 0.3 × 5 × 9.8 = 14.7 N."
  },
  {
    q: "Il coefficiente d'attrito cinetico dipende dall'area della superficie di contatto?",
    opts: ["Sì, più grande è l'area, più attrito c'è", "No, non dipende dall'area", "Dipende solo dalla velocità", "Sì, ma solo per superfici lucide"],
    correct: 1,
    exp: "Il modello di Amontons-Coulomb dice che l'attrito dipende da N e μ, NON dall'area. Un pneumatico largo non frena meglio per questo motivo (cambia il grip, non il μ)."
  },
  {
    q: "Un blocco con v₀ = 12 m/s e a = −3 m/s². Dopo quanti secondi si ferma?",
    opts: ["3 s", "4 s", "6 s", "36 s"],
    correct: 1,
    exp: "t_stop = −v₀/a = −12/(−3) = 4 s."
  },
  {
    q: "La forza normale su un piano orizzontale vale:",
    opts: ["N = m·a", "N = F applicata", "N = m·g", "N = μ·m·g"],
    correct: 2,
    exp: "Sul piano orizzontale, il blocco è in equilibrio verticale: N = P = m·g."
  },
  {
    q: "F = 25 N, m = 5 kg, μ = 0.3, g = 9.8 m/s². L'accelerazione vale:",
    opts: ["5 m/s²", "2.06 m/s²", "2.94 m/s²", "0.5 m/s²"],
    correct: 1,
    exp: "Fₐ = 0.3×5×9.8 = 14.7 N. Fnet = 25−14.7 = 10.3 N. a = 10.3/5 = 2.06 m/s²."
  },
  {
    q: "Con v₀ = 0 e a = 4 m/s², quanto spazio percorre il blocco in 3 s?",
    opts: ["6 m", "12 m", "18 m", "36 m"],
    correct: 2,
    exp: "s = v₀·t + ½·a·t² = 0 + ½×4×9 = 18 m."
  },
  {
    q: "Se la forza applicata è uguale alla forza d'attrito cinetico, allora:",
    opts: ["L'oggetto accelera", "L'oggetto decelera", "L'oggetto si muove a velocità costante", "L'oggetto si ferma subito"],
    correct: 2,
    exp: "Se F = Fₐ, la forza netta è zero: a = 0. Il blocco si muove in MRU (1ª legge di Newton)."
  },
] as const

export default function PianoOrizzontale() {
  const [m, setM] = useState(5)
  const [F, setF] = useState(30)
  const [mu, setMu] = useState(0.2)
  const [v0, setV0] = useState(0)
  const [t, setT] = useState(0)

  const { a, Fattr, Fnet } = useMemo(() => calcMotion(m, F, mu), [m, F, mu])
  const { v, s } = useMemo(() => stateAt(a, v0, t), [a, v0, t])

  const tStop = a < 0 && v0 > 0 ? -v0 / a : a === 0 && v0 === 0 ? 0 : T_MAX
  const tEnd = Math.min(T_MAX, tStop < Infinity ? tStop + 1 : T_MAX)

  const ptsV = useMemo(() => {
    const step = tEnd / N_PTS
    return Array.from({ length: N_PTS + 1 }, (_, i) => {
      const ti = i * step
      return [ti, stateAt(a, v0, ti).v] as [number, number]
    })
  }, [a, v0, tEnd])

  const ptsS = useMemo(() => {
    const step = tEnd / N_PTS
    return Array.from({ length: N_PTS + 1 }, (_, i) => {
      const ti = i * step
      return [ti, stateAt(a, v0, ti).s] as [number, number]
    })
  }, [a, v0, tEnd])

  return (
    <>
      {/* TEORIA */}
      <div className="card">
        <h2>➡️ Moto su Piano Orizzontale</h2>

        <h3>Senza attrito</h3>
        <p>Se la superficie è priva di attrito, l'unica forza orizzontale è quella applicata F. Dalla 2ª legge:</p>
        <div className="formula highlight">a = F / m</div>
        <p>Il moto è uniformemente accelerato. Partendo da velocità iniziale v₀:</p>
        <div className="formula">v(t) = v₀ + a·t</div>
        <div className="formula">s(t) = v₀·t + ½·a·t²</div>
        <div className="formula">v² = v₀² + 2·a·s</div>

        <h3>Con attrito cinetico</h3>
        <p>
          L'attrito cinetico si oppone al moto: Fₐ = μ_c · N = μ_c · m · g.
          La forza netta e l'accelerazione diventano:
        </p>
        <div className="formula highlight">Fₜᵒₜ = F − μ_c · m · g</div>
        <div className="formula highlight">a = (F − μ_c · m · g) / m</div>
        <div className="info-box warn">
          <span className="info-box-icon">⚠️</span>
          <span>Se F &lt; μ_s · m · g (attrito statico supera la forza applicata), il blocco non si muove affatto.</span>
        </div>

        <h3>Moto con velocità iniziale v₀ ≠ 0 e decelerazione</h3>
        <p>
          Se non c'è forza applicata ma c'è attrito, il blocco decelera: a = −μ_c · g.
          Si ferma quando v = 0, cioè al tempo:
        </p>
        <div className="formula">t_stop = v₀ / (μ_c · g)</div>
        <div className="formula">s_stop = v₀² / (2 · μ_c · g)</div>
        <div className="info-box example">
          <span className="info-box-icon">📝</span>
          <span>
            <strong>Esempio:</strong> un blocco con v₀ = 10 m/s, μ = 0.4, g = 9.8 m/s².
            a = −3.92 m/s². Si ferma dopo t = 10/3.92 ≈ 2.6 s, avendo percorso s = 12.8 m.
          </span>
        </div>
      </div>

      {/* SIMULAZIONE */}
      <div className="sim-card">
        <h2>🔬 Simulazione — Piano Orizzontale</h2>

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
          <div className="readout">
            <span className="readout-label">Accelerazione</span>
            <span className="readout-value">{a.toFixed(2)} m/s²</span>
          </div>
          <div className="readout">
            <span className="readout-label">Velocità v(t)</span>
            <span className="readout-value">{v.toFixed(2)} m/s</span>
          </div>
          <div className="readout">
            <span className="readout-label">Spazio s(t)</span>
            <span className="readout-value">{s.toFixed(2)} m</span>
          </div>
          <div className="readout">
            <span className="readout-label">Forza attrito</span>
            <span className="readout-value">{Fattr.toFixed(1)} N</span>
          </div>
          <div className="readout">
            <span className="readout-label">Forza netta</span>
            <span className="readout-value">{Fnet.toFixed(1)} N</span>
          </div>
          <div className="readout">
            <span className="readout-label">Forza normale N</span>
            <span className="readout-value">{(m * G).toFixed(1)} N</span>
          </div>
        </div>

        <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '4px' }}>v(t) — velocità</div>
            <Graph points={ptsV} xLabel="t (s)" yLabel="v (m/s)" color="#4fc3f7" xMax={tEnd} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '4px' }}>s(t) — posizione</div>
            <Graph points={ptsS} xLabel="t (s)" yLabel="s (m)" color="#69f0ae" xMax={tEnd} />
          </div>
        </div>
      </div>

      <Quiz title="🧠 Quiz — Piano Orizzontale" questions={quizQ} />
    </>
  )
}
