import { useState, useMemo } from 'react'
import Graph from '../components/Graph'
import Quiz from '../components/Quiz'

const G = 9.8
const T_MAX = 8
const N_PTS = 80

function calcInclined(theta: number, m: number, mu: number, _v0: number) {
  const rad = (theta * Math.PI) / 180
  const sinT = Math.sin(rad)
  const cosT = Math.cos(rad)
  const N = m * G * cosT
  const Fpar = m * G * sinT
  const Fattr = mu * N
  const aDown = G * (sinT - mu * cosT)
  return { aDown, N, Fpar, Fattr, sinT, cosT }
}

function stateAt(a: number, v0: number, t: number) {
  if (a >= 0 && v0 >= 0) return { v: v0 + a * t, s: v0 * t + 0.5 * a * t * t }
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
  const ox = 30, oy = H - 30
  const hyp = W - 80
  const ex = ox + hyp
  const ey = oy - hyp * Math.tan(rad)
  const maxS = Math.max(1, Math.abs(v0) * T_MAX + 0.5 * Math.abs(aDown) * T_MAX * T_MAX)
  const frac = Math.max(0, Math.min(s / maxS, 0.85))
  const bLen = 36
  const cx = ox + hyp * (0.1 + frac * 0.75)
  const cy = oy - (cx - ox) * Math.tan(rad)
  const nx = -Math.sin(rad), ny = -Math.cos(rad)
  const cos = Math.cos(rad), sin = Math.sin(rad)
  const corners = [
    [cx - bLen/2*cos + bLen/2*nx, cy + bLen/2*sin + bLen/2*ny],
    [cx + bLen/2*cos + bLen/2*nx, cy - bLen/2*sin + bLen/2*ny],
    [cx + bLen/2*cos - bLen/6*nx, cy - bLen/2*sin - bLen/6*ny],
    [cx - bLen/2*cos - bLen/6*nx, cy + bLen/2*sin - bLen/6*ny],
  ]
  const poly = corners.map(c => `${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(' ')
  const blockCX = cx + bLen/6*nx
  const blockCY = cy + bLen/6*ny
  const weightScale = 35, normScale = 28, frScale = 22
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sim-svg">
      <polygon points={`${ox},${oy} ${ex},${ey} ${ex},${oy}`} fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
      {mu > 0 && [...Array(10)].map((_, i) => {
        const px = ox + hyp*(0.05 + i*0.09)
        const py = oy - (px-ox)*Math.tan(rad)
        return <line key={i} x1={px} y1={py} x2={px+6*sin} y2={py+6*cos} stroke="rgba(180,130,0,0.2)" strokeWidth="1" />
      })}
      <path d={`M ${ox+30},${oy} A 30,30 0 0,0 ${ox+30*Math.cos(rad)},${oy-30*Math.sin(rad)}`} fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
      <text x={ox+38} y={oy-10} fill="rgba(0,0,0,0.45)" fontSize="11">{theta}°</text>
      <polygon points={poly} fill="rgba(37,99,235,0.12)" stroke="#2563eb" strokeWidth="2" />
      <text x={blockCX} y={blockCY+4} textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="700">{m}kg</text>
      <line x1={blockCX} y1={blockCY} x2={blockCX} y2={blockCY+weightScale} stroke="#c62828" strokeWidth="2.5" markerEnd="url(#arrW)" />
      <text x={blockCX+6} y={blockCY+weightScale/2} fill="#c62828" fontSize="9">P</text>
      <line x1={blockCX} y1={blockCY} x2={blockCX+nx*normScale} y2={blockCY+ny*normScale} stroke="#2e7d32" strokeWidth="2.5" markerEnd="url(#arrN)" />
      <text x={blockCX+nx*normScale+4} y={blockCY+ny*normScale-4} fill="#2e7d32" fontSize="9">N</text>
      <line x1={blockCX} y1={blockCY} x2={blockCX+cos*frScale} y2={blockCY-sin*frScale} stroke="#1565c0" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrP)" />
      <text x={blockCX+cos*frScale+4} y={blockCY-sin*frScale} fill="#1565c0" fontSize="8">F∥</text>
      {mu > 0 && aDown !== 0 && (
        <>
          <line x1={blockCX} y1={blockCY} x2={blockCX-cos*frScale*0.8} y2={blockCY+sin*frScale*0.8} stroke="#e05600" strokeWidth="2" markerEnd="url(#arrFr)" />
          <text x={blockCX-cos*frScale-4} y={blockCY+sin*frScale+10} fill="#e05600" fontSize="8">Fₐ</text>
        </>
      )}
      <defs>
        <marker id="arrW" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto"><polygon points="0,0 6,0 3,6" fill="#c62828" /></marker>
        <marker id="arrN" markerWidth="6" markerHeight="6" refX="3" refY="0" orient="auto"><polygon points="0,6 6,6 3,0" fill="#2e7d32" /></marker>
        <marker id="arrP" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0,0 6,3 0,6" fill="#1565c0" /></marker>
        <marker id="arrFr" markerWidth="6" markerHeight="6" refX="0" refY="3" orient="auto"><polygon points="6,0 0,3 6,6" fill="#e05600" /></marker>
      </defs>
      <text x={W/2} y={H-8} textAnchor="middle" fill="rgba(0,0,0,0.4)" fontSize="10">
        a = {aDown.toFixed(2)} m/s² · N = {N.toFixed(1)} N · F∥ = {Fpar.toFixed(1)} N · Fₐ = {Fattr.toFixed(1)} N
      </text>
    </svg>
  )
}

const quizQ = [
  { q: "Su un piano inclinato di 30° senza attrito (g = 9.8 m/s²), l'accelerazione è:", opts: ["9.8 m/s²","4.9 m/s²","8.49 m/s²","0 m/s²"], correct: 1, exp: "a = g·sin30° = 9.8×0.5 = 4.9 m/s²." },
  { q: "La forza normale su un piano inclinato di angolo θ e massa m vale:", opts: ["N = m·g","N = m·g·sinθ","N = m·g·cosθ","N = m·g·tanθ"], correct: 2, exp: "La componente perpendicolare al piano del peso è m·g·cosθ." },
  { q: "Con θ = 45°, μ = 0.5, g = 9.8 m/s². L'accelerazione lungo il piano vale:", opts: ["4.9 m/s²","3.46 m/s²","0 m/s²","2.4 m/s²"], correct: 1, exp: "a = g(sin45° − μ·cos45°) = 9.8×0.707×0.5 = 3.46 m/s²." },
  { q: "Se sinθ < μ·cosθ, allora il blocco su un piano inclinato:", opts: ["Accelera verso il basso","Non si muove da solo","Rimbalza","Levita"], correct: 1, exp: "La condizione equivale a tanθ < μ: l'attrito trattiene il blocco." },
  { q: "Blocco su piano a 37° (sin37°=0.6, cos37°=0.8), μ=0.25, g=9.8 m/s². L'accelerazione vale:", opts: ["3.92 m/s²","5.88 m/s²","1.96 m/s²","0 m/s²"], correct: 0, exp: "a = g(0.6 − 0.25×0.8) = 9.8×0.4 = 3.92 m/s²." },
  { q: "La componente del peso parallela al piano (F∥ = m·g·sinθ) aumenta quando:", opts: ["L'angolo θ diminuisce","La massa diminuisce","L'angolo θ aumenta","Il coefficiente di attrito aumenta"], correct: 2, exp: "sinθ cresce con θ (per 0° < θ < 90°)." },
  { q: "Per trattenere un blocco su un piano inclinato di angolo θ, serve che μ sia almeno:", opts: ["μ ≥ sinθ","μ ≥ cosθ","μ ≥ tanθ","μ ≥ g·sinθ"], correct: 2, exp: "Equilibrio: μ·m·g·cosθ ≥ m·g·sinθ ⇒ μ ≥ tanθ." },
  { q: "Con v₀ = 0 e a = 5 m/s² lungo il piano, la velocità dopo 4 s vale:", opts: ["5 m/s","10 m/s","20 m/s","80 m/s"], correct: 2, exp: "v = v₀ + a·t = 0 + 5×4 = 20 m/s." },
] as const

export default function PianoInclinato() {
  const [theta, setTheta] = useState(30)
  const [m, setM] = useState(5)
  const [mu, setMu] = useState(0.1)
  const [v0, setV0] = useState(0)
  const [t, setT] = useState(0)
  const { aDown, N, Fpar, Fattr } = useMemo(() => calcInclined(theta, m, mu, v0), [theta, m, mu, v0])
  const { v, s } = useMemo(() => stateAt(aDown, v0, t), [aDown, v0, t])
  const ptsV = useMemo(() => Array.from({ length: N_PTS+1 }, (_, i) => { const ti = i*T_MAX/N_PTS; return [ti, stateAt(aDown,v0,ti).v] as [number,number] }), [aDown, v0])
  const ptsS = useMemo(() => Array.from({ length: N_PTS+1 }, (_, i) => { const ti = i*T_MAX/N_PTS; return [ti, stateAt(aDown,v0,ti).s] as [number,number] }), [aDown, v0])
  const canMove = (Fpar - Fattr) > 0.001
  return (
    <>
      <div className="card">
        <h2>Moto su Piano Inclinato</h2>
        <h3>Decomposizione del peso</h3>
        <p>Su un piano inclinato di angolo θ, il peso P = m·g si scompone in:</p>
        <div className="formula">F∥ = m·g·sinθ (verso il basso del piano)</div>
        <div className="formula highlight">Forza normale: N = m·g·cosθ</div>
        <h3>Accelerazione senza attrito</h3>
        <div className="formula highlight">a = g·sinθ</div>
        <div className="info-box tip">L'accelerazione non dipende dalla massa!</div>
        <h3>Accelerazione con attrito cinetico</h3>
        <div className="formula highlight">a = g·(sinθ − μ_c·cosθ)</div>
        <div className="info-box warn">Se μ ≥ tanθ, l'attrito supera la componente parallela e il blocco non scivola.</div>
        <div className="info-box example">
          <strong>Esempio:</strong> θ = 30°, μ = 0.2 ⇒ a = 9.8(0.5 − 0.173) = 3.2 m/s².
        </div>
      </div>
      <div className="sim-card">
        <h2>Simulazione — Piano Inclinato</h2>
        <div className="ctrl-row"><span className="ctrl-label">Angolo θ</span><input type="range" min="1" max="60" step="1" value={theta} onChange={e => setTheta(+e.target.value)} /><span className="ctrl-value">{theta}°</span></div>
        <div className="ctrl-row"><span className="ctrl-label">Massa m</span><input type="range" min="1" max="20" step="0.5" value={m} onChange={e => setM(+e.target.value)} /><span className="ctrl-value">{m} kg</span></div>
        <div className="ctrl-row"><span className="ctrl-label">Attrito μ_c</span><input type="range" min="0" max="0.8" step="0.01" value={mu} onChange={e => setMu(+e.target.value)} /><span className="ctrl-value">{mu.toFixed(2)}</span></div>
        <div className="ctrl-row"><span className="ctrl-label">v₀ (giù = +)</span><input type="range" min="-10" max="10" step="0.5" value={v0} onChange={e => setV0(+e.target.value)} /><span className="ctrl-value">{v0.toFixed(1)} m/s</span></div>
        <div className="ctrl-row"><span className="ctrl-label">Tempo t</span><input type="range" min="0" max={T_MAX} step="0.1" value={t} onChange={e => setT(+e.target.value)} /><span className="ctrl-value">{t.toFixed(1)} s</span></div>
        {!canMove && v0 === 0 && <div className="info-box warn" style={{marginBottom:'0.5rem'}}>Blocco fermo: tanθ = {Math.tan((theta*Math.PI)/180).toFixed(2)} &lt; μ = {mu.toFixed(2)}</div>}
        <InclinedScene theta={theta} m={m} mu={mu} v0={v0} t={t} />
        <div className="readouts">
          <div className="readout"><span className="readout-label">Accelerazione</span><span className="readout-value">{aDown.toFixed(2)} m/s²</span></div>
          <div className="readout"><span className="readout-label">Velocità v(t)</span><span className="readout-value">{v.toFixed(2)} m/s</span></div>
          <div className="readout"><span className="readout-label">Spazio s(t)</span><span className="readout-value">{s.toFixed(2)} m</span></div>
          <div className="readout"><span className="readout-label">Forza normale N</span><span className="readout-value">{N.toFixed(1)} N</span></div>
          <div className="readout"><span className="readout-label">F∥ = mg·sinθ</span><span className="readout-value">{Fpar.toFixed(1)} N</span></div>
          <div className="readout"><span className="readout-label">Attrito Fₐ</span><span className="readout-value">{Fattr.toFixed(1)} N</span></div>
        </div>
        <div style={{marginTop:'1rem',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem'}}>
          <div><div style={{fontSize:'0.8rem',color:'var(--muted)',marginBottom:'4px'}}>v(t)</div><Graph points={ptsV} xLabel="t (s)" yLabel="v (m/s)" color="#2563eb" xMax={T_MAX} /></div>
          <div><div style={{fontSize:'0.8rem',color:'var(--muted)',marginBottom:'4px'}}>s(t)</div><Graph points={ptsS} xLabel="t (s)" yLabel="s (m)" color="#2e7d32" xMax={T_MAX} /></div>
        </div>
      </div>
      <Quiz title="Quiz — Piano Inclinato" questions={quizQ} />
    </>
  )
}
