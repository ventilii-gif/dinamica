import { useState, useMemo } from 'react'
import Graph from '../components/Graph'
import Quiz from '../components/Quiz'

const G = 9.8
const T_MAX = 8
const N_PTS = 80

function calcInclined(theta: number, m: number, mu: number, v0: number) {
  const rad = (theta * Math.PI) / 180
  const sinT = Math.sin(rad)
  const cosT = Math.cos(rad)
  const N = m * G * cosT
  const Fpar = m * G * sinT           // down the slope
  const Fattr = mu * N                // kinetic friction
  // Friction opposes velocity (or opposes tendency to move)
  // If object moves or tends to move DOWN: friction acts UP
  // sign convention: positive = down the slope
  const aDown = G * (sinT - mu * cosT)
  return { aDown, N, Fpar, Fattr, sinT, cosT }
}

function stateAt(a: number, v0: number, t: number) {
  // v positive = moving down the slope
  if (a >= 0 && v0 >= 0) {
    return { v: v0 + a * t, s: v0 * t + 0.5 * a * t * t }
  }
  if (a < 0 && v0 > 0) {
    const tStop = v0 / (-a)
    if (t >= tStop) return { v: 0, s: v0 * tStop + 0.5 * a * tStop * tStop }
    return { v: v0 + a * t, s: v0 * t + 0.5 * a * t * t }
  }
  if (a > 0 && v0 < 0) {
    const tStop = (-v0) / a
    if (t >= tStop) return { v: 0, s: v0 * tStop + 0.5 * a * tStop * tStop }
    return { v: v0 + a * t, s: v0 * t + 0.5 * a * t * t }
  }
  return { v: v0, s: v0 * t }
}

function InclinedScene({ theta, m, mu, v0, t }: { theta: number; m: number; mu: number; v0: number; t: number }) {
  const W = 500, H = 210
  const rad = (theta * Math.PI) / 180
  const { aDown, N, Fpar, Fattr } = calcInclined(theta, m, mu, v0)
  const { s } = stateAt(aDown, v0, t)

  // Draw inclined plane
  const ox = 30, oy = H - 30
  const hyp = W - 80
  const ex = ox + hyp
  const ey = oy - hyp * Math.tan(rad)

  // Block position along slope (clamped)
  const maxS = Math.max(1, Math.abs(v0) * T_MAX + 0.5 * Math.abs(aDown) * T_MAX * T_MAX)
  const frac = Math.max(0, Math.min(s / maxS, 0.85))
  const bLen = 36, bHalf = bLen / 2
  // Center of block on slope
  const cx = ox + hyp * (0.1 + frac * 0.75)
  const cy = oy - (cx - ox) * Math.tan(rad)

  // Perpendicular direction to slope (upward normal)
  const nx = -Math.sin(rad), ny = -Math.cos(rad)
  // Block corners (tilted rectangle)
  const cos = Math.cos(rad), sin = Math.sin(rad)
  const corners = [
    [cx - bLen / 2 * cos + bLen / 2 * nx, cy + bLen / 2 * sin + bLen / 2 * ny],
    [cx + bLen / 2 * cos + bLen / 2 * nx, cy - bLen / 2 * sin + bLen / 2 * ny],
    [cx + bLen / 2 * cos - bLen / 6 * nx, cy - bLen / 2 * sin - bLen / 6 * ny],
    [cx - bLen / 2 * cos - bLen / 6 * nx, cy + bLen / 2 * sin - bLen / 6 * ny],
  ]
  const poly = corners.map(c => `${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(' ')
  const blockCX = cx + bLen / 6 * nx
  const blockCY = cy + bLen / 6 * ny

  // Force arrows from block center
  const sc = 18 // scale
  const weightScale = 35
  const normScale = 28
  const frScale = 22

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sim-svg" style={{ background: 'rgba(0,0,0,0.4)' }}>
      {/* Inclined surface */}
      <polygon points={`${ox},${oy} ${ex},${ey} ${ex},${oy}`}
        fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      {/* Friction lines on slope */}
      {mu > 0 && [...Array(10)].map((_, i) => {
        const px = ox + hyp * (0.05 + i * 0.09)
        const py = oy - (px - ox) * Math.tan(rad)
        const off = 6
        return <line key={i}
          x1={px} y1={py}
          x2={px + off * sin} y2={py + off * cos}
          stroke="rgba(255,213,79,0.25)" strokeWidth="1" />
      })}

      {/* Angle arc */}
      <path d={`M ${ox + 30},${oy} A 30,30 0 0,0 ${ox + 30 * Math.cos(rad)},${oy - 30 * Math.sin(rad)}`}
        fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <text x={ox + 38} y={oy - 10} fill="rgba(255,255,255,0.5)" fontSize="11">{theta}°</text>

      {/* Block */}
      <polygon points={poly} fill="rgba(79,195,247,0.22)" stroke="#4fc3f7" strokeWidth="2" />
      <text x={blockCX} y={blockCY + 4} textAnchor="middle" fill="#4fc3f7" fontSize="11" fontWeight="700">{m}kg</text>

      {/* Weight (down) */}
      <line x1={blockCX} y1={blockCY} x2={blockCX} y2={blockCY + weightScale}
        stroke="#ff5252" strokeWidth="2.5" markerEnd="url(#arrW)" />
      <text x={blockCX + 6} y={blockCY + weightScale / 2} fill="#ff5252" fontSize="9">P</text>

      {/* Normal force (perpendicular up) */}
      <line x1={blockCX} y1={blockCY}
        x2={blockCX + nx * normScale} y2={blockCY + ny * normScale}
        stroke="#69f0ae" strokeWidth="2.5" markerEnd="url(#arrN)" />
      <text x={blockCX + nx * normScale + 4} y={blockCY + ny * normScale - 4} fill="#69f0ae" fontSize="9">N</text>

      {/* F_par (down slope) */}
      <line x1={blockCX} y1={blockCY}
        x2={blockCX + cos * frScale} y2={blockCY - sin * frScale}
        stroke="#ffd54f" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrP)" />
      <text x={blockCX + cos * frScale + 4} y={blockCY - sin * frScale} fill="#ffd54f" fontSize="8">F∥</text>

      {/* Friction (up slope if moving down, else 0) */}
      {mu > 0 && aDown !== 0 && (
        <>
          <line x1={blockCX} y1={blockCY}
            x2={blockCX - cos * frScale * 0.8} y2={blockCY + sin * frScale * 0.8}
            stroke="#ff7043" strokeWidth="2" markerEnd="url(#arrFr)" />
          <text x={blockCX - cos * frScale - 4} y={blockCY + sin * frScale + 10} fill="#ff7043" fontSize="8">Fₐ</text>
        </>
      )}

      <defs>
        <marker id="arrW" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto"><polygon points="0,0 6,0 3,6" fill="#ff5252" /></marker>
        <marker id="arrN" markerWidth="6" markerHeight="6" refX="3" refY="0" orient="auto"><polygon points="0,6 6,6 3,0" fill="#69f0ae" /></marker>
        <marker id="arrP" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0,0 6,3 0,6" fill="#ffd54f" /></marker>
        <marker id="arrFr" markerWidth="6" markerHeight="6" refX="0" refY="3" orient="auto"><polygon points="6,0 0,3 6,6" fill="#ff7043" /></marker>
      </defs>

      <text x={W / 2} y={H - 8} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
        a = {aDown.toFixed(2)} m/s² · N = {N.toFixed(1)} N · F∥ = {Fpar.toFixed(1)} N · Fₐ = {Fattr.toFixed(1)} N
      </text>
    </svg>
  )
}

const quizQ = [
  {
    q: "Su un piano inclinato di 30° senza attrito (g = 9.8 m/s²), l'accelerazione è:",
    opts: ["9.8 m/s²", "4.9 m/s²", "8.49 m/s²", "0 m/s²"],
    correct: 1,
    exp: "a = g·sin30° = 9.8×0.5 = 4.9 m/s². La metà di g, indipendentemente dalla massa."
  },
  {
    q: "La forza normale su un piano inclinato di angolo θ e massa m vale:",
    opts: ["N = m·g", "N = m·g·sinθ", "N = m·g·cosθ", "N = m·g·tanθ"],
    correct: 2,
    exp: "La componente perpendicolare al piano del peso è m·g·cosθ, e la normale la bilancia."
  },
  {
    q: "Con θ = 45°, μ = 0.5, g = 9.8 m/s². L'accelerazione lungo il piano vale:",
    opts: ["4.9 m/s²", "3.46 m/s²", "0 m/s²", "2.4 m/s²"],
    correct: 2,
    exp: "a = g(sin45° − μ·cos45°) = 9.8(0.707 − 0.5×0.707) = 9.8×0.707×0.5 = 3.46 m/s². Ma con μ = sinθ/cosθ = tanθ = 1 sarebbe a=0. Qui: a = 9.8×(0.707−0.354) = 3.46 m/s²."
  },
  {
    q: "Se sinθ < μ·cosθ, allora il blocco su un piano inclinato:",
    opts: ["Accelera verso il basso", "Non si muove da solo", "Rimbalza", "Levita"],
    correct: 1,
    exp: "La condizione sinθ < μ·cosθ equivale a tanθ < μ: l'attrito è abbastanza grande da trattenere il blocco. Non si muove spontaneamente."
  },
  {
    q: "Blocco su piano a 37° (sin37°=0.6, cos37°=0.8), μ=0.25, g=9.8 m/s². L'accelerazione vale:",
    opts: ["3.92 m/s²", "5.88 m/s²", "1.96 m/s²", "0 m/s²"],
    correct: 0,
    exp: "a = g(sin37° − μ·cos37°) = 9.8(0.6 − 0.25×0.8) = 9.8(0.6−0.2) = 9.8×0.4 = 3.92 m/s²."
  },
  {
    q: "La componente del peso parallela al piano (F∥ = m·g·sinθ) aumenta quando:",
    opts: ["L'angolo θ diminuisce", "La massa diminuisce", "L'angolo θ aumenta", "Il coefficiente di attrito aumenta"],
    correct: 2,
    exp: "F∥ = m·g·sinθ. Poiché sinθ cresce con θ (per 0° < θ < 90°), la componente parallela aumenta all'aumentare dell'inclinazione."
  },
  {
    q: "Per trattenere un blocco su un piano inclinato di angolo θ, serve che μ sia almeno:",
    opts: ["μ ≥ sinθ", "μ ≥ cosθ", "μ ≥ tanθ", "μ ≥ g·sinθ"],
    correct: 2,
    exp: "La condizione di equilibrio è Fₐ ≥ F∥, cioè μ·m·g·cosθ ≥ m·g·sinθ ⇒ μ ≥ tanθ."
  },
  {
    q: "Con v₀ = 0 e a = 5 m/s² lungo il piano inclinato, la velocità dopo 4 s vale:",
    opts: ["5 m/s", "10 m/s", "20 m/s", "80 m/s"],
    correct: 2,
    exp: "v = v₀ + a·t = 0 + 5×4 = 20 m/s."
  },
] as const

export default function PianoInclinato() {
  const [theta, setTheta] = useState(30)
  const [m, setM] = useState(5)
  const [mu, setMu] = useState(0.1)
  const [v0, setV0] = useState(0)
  const [t, setT] = useState(0)

  const { aDown, N, Fpar, Fattr } = useMemo(() => calcInclined(theta, m, mu, v0), [theta, m, mu, v0])
  const { v, s } = useMemo(() => stateAt(aDown, v0, t), [aDown, v0, t])

  const ptsV = useMemo(() => {
    const step = T_MAX / N_PTS
    return Array.from({ length: N_PTS + 1 }, (_, i) => {
      const ti = i * step
      return [ti, stateAt(aDown, v0, ti).v] as [number, number]
    })
  }, [aDown, v0])

  const ptsS = useMemo(() => {
    const step = T_MAX / N_PTS
    return Array.from({ length: N_PTS + 1 }, (_, i) => {
      const ti = i * step
      return [ti, stateAt(aDown, v0, ti).s] as [number, number]
    })
  }, [aDown, v0])

  const canMove = (Fpar - Fattr) > 0.001

  return (
    <>
      {/* TEORIA */}
      <div className="card">
        <h2>↗️ Moto su Piano Inclinato</h2>

        <h3>Decomposizione del peso</h3>
        <p>
          Su un piano inclinato di angolo θ, il peso P = m·g si scompone in:
        </p>
        <div className="formula">Componente parallela al piano: F∥ = m·g·sinθ (verso il basso del piano)</div>
        <div className="formula">Componente perpendicolare: F⊥ = m·g·cosθ (verso il piano)</div>
        <div className="formula highlight">Forza normale: N = m·g·cosθ</div>

        <h3>Accelerazione senza attrito</h3>
        <p>Senza attrito, la sola forza orizzontale è F∥:</p>
        <div className="formula highlight">a = g·sinθ</div>
        <div className="info-box tip">
          <span className="info-box-icon">💡</span>
          <span>L'accelerazione non dipende dalla massa! Galileo lo dimostrò (secondo la leggenda) dalla Torre di Pisa.</span>
        </div>

        <h3>Accelerazione con attrito cinetico</h3>
        <p>L'attrito cinetico è Fₐ = μ_c · N = μ_c · m · g · cosθ (risale il piano).</p>
        <div className="formula highlight">a = g·(sinθ − μ_c·cosθ)</div>
        <div className="info-box warn">
          <span className="info-box-icon">⚠️</span>
          <span>Se μ_c · cosθ ≥ sinθ (cioè μ ≥ tanθ), l'attrito supera la componente parallela e il blocco non scivola.</span>
        </div>

        <h3>Con velocità iniziale v₀ ≠ 0</h3>
        <p>
          Se si lancia il blocco <em>in salita</em> (v₀ positivo verso l'alto), decelera con
          a = −g·(sinθ + μ_c·cosθ) (sia F∥ sia l'attrito frenano).
          Si ferma e poi eventualmente ridiscende.
        </p>
        <div className="info-box example">
          <span className="info-box-icon">📝</span>
          <span>
            <strong>Esempio:</strong> θ = 30°, μ = 0.2, g = 9.8 m/s².
            a = 9.8(0.5 − 0.2×0.866) = 9.8(0.5−0.173) = 3.2 m/s².
            Partendo da fermo, dopo 3 s: v = 9.6 m/s, s = 14.4 m.
          </span>
        </div>
      </div>

      {/* SIMULAZIONE */}
      <div className="sim-card">
        <h2>🔬 Simulazione — Piano Inclinato</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>
          Le frecce mostrano le forze sul blocco. Positivo = giù per il piano.
        </p>

        <div className="ctrl-row">
          <span className="ctrl-label">Angolo θ</span>
          <input type="range" min="1" max="60" step="1" value={theta} onChange={e => setTheta(+e.target.value)} />
          <span className="ctrl-value">{theta}°</span>
        </div>
        <div className="ctrl-row">
          <span className="ctrl-label">Massa m</span>
          <input type="range" min="1" max="20" step="0.5" value={m} onChange={e => setM(+e.target.value)} />
          <span className="ctrl-value">{m} kg</span>
        </div>
        <div className="ctrl-row">
          <span className="ctrl-label">Attrito μ_c</span>
          <input type="range" min="0" max="0.8" step="0.01" value={mu} onChange={e => setMu(+e.target.value)} />
          <span className="ctrl-value">{mu.toFixed(2)}</span>
        </div>
        <div className="ctrl-row">
          <span className="ctrl-label">v₀ (giù = +)</span>
          <input type="range" min="-10" max="10" step="0.5" value={v0} onChange={e => setV0(+e.target.value)} />
          <span className="ctrl-value">{v0.toFixed(1)} m/s</span>
        </div>
        <div className="ctrl-row">
          <span className="ctrl-label">Tempo t</span>
          <input type="range" min="0" max={T_MAX} step="0.1" value={t} onChange={e => setT(+e.target.value)} />
          <span className="ctrl-value">{t.toFixed(1)} s</span>
        </div>

        {!canMove && v0 === 0 && (
          <div className="info-box warn" style={{ marginBottom: '0.5rem' }}>
            <span className="info-box-icon">🛑</span>
            <span>Blocco fermo: l'attrito statico bilancia la componente parallela. tanθ = {Math.tan((theta * Math.PI) / 180).toFixed(2)} &lt; μ = {mu.toFixed(2)}</span>
          </div>
        )}

        <InclinedScene theta={theta} m={m} mu={mu} v0={v0} t={t} />

        <div className="readouts">
          <div className="readout">
            <span className="readout-label">Accelerazione</span>
            <span className="readout-value">{aDown.toFixed(2)} m/s²</span>
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
            <span className="readout-label">Forza normale N</span>
            <span className="readout-value">{N.toFixed(1)} N</span>
          </div>
          <div className="readout">
            <span className="readout-label">F∥ = mg·sinθ</span>
            <span className="readout-value">{Fpar.toFixed(1)} N</span>
          </div>
          <div className="readout">
            <span className="readout-label">Attrito Fₐ</span>
            <span className="readout-value">{Fattr.toFixed(1)} N</span>
          </div>
        </div>

        <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '4px' }}>v(t) — velocità</div>
            <Graph points={ptsV} xLabel="t (s)" yLabel="v (m/s)" color="#4fc3f7" xMax={T_MAX} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '4px' }}>s(t) — posizione lungo il piano</div>
            <Graph points={ptsS} xLabel="t (s)" yLabel="s (m)" color="#69f0ae" xMax={T_MAX} />
          </div>
        </div>
      </div>

      <Quiz title="🧠 Quiz — Piano Inclinato" questions={quizQ} />
    </>
  )
}
