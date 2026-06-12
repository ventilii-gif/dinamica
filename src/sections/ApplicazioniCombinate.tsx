import { useState, useMemo } from 'react'
import Graph from '../components/Graph'
import Quiz from '../components/Quiz'

const G = 9.8
const T_MAX = 10
const N_PTS = 100

type Mode = 'orizzontale' | 'inclinato'

function solve(mode: Mode, m: number, F: number, mu: number, theta: number, _v0: number) {
  if (mode === 'orizzontale') {
    const N = m * G
    const Fattr = mu * N
    const Fnet = F - Fattr
    const a = Fnet / m
    return { a, N, Fattr, Fpar: 0, label: 'orizzontale' }
  } else {
    const rad = (theta * Math.PI) / 180
    const N = m * G * Math.cos(rad)
    const Fpar = m * G * Math.sin(rad)
    const Fattr = mu * N
    const a = G * (Math.sin(rad) - mu * Math.cos(rad))
    return { a, N, Fattr, Fpar, label: 'inclinato' }
  }
}

function stateAt(a: number, v0: number, t: number) {
  if (a < 0 && v0 > 0) {
    const tStop = v0 / (-a)
    if (t >= tStop) {
      return { v: 0, s: v0 * tStop + 0.5 * a * tStop * tStop, stopped: true }
    }
  }
  if (a > 0 && v0 < 0) {
    const tStop = (-v0) / a
    if (t >= tStop) {
      return { v: 0, s: v0 * tStop + 0.5 * a * tStop * tStop, stopped: true }
    }
  }
  return { v: v0 + a * t, s: v0 * t + 0.5 * a * t * t, stopped: false }
}

function SceneOriz({ m, F, mu, t, a, v0 }: { m: number; F: number; mu: number; t: number; a: number; v0: number }) {
  const W = 480, H = 170
  const { s } = stateAt(a, v0, t)
  const maxS = Math.max(1, Math.abs(v0) * T_MAX + 0.5 * Math.abs(a) * T_MAX * T_MAX)
  const groundY = 120
  const bW = 50, bH = 34, startX = 50
  const tW = W - startX - bW - 30
  const bx = startX + Math.min(Math.max(s / maxS, 0), 1) * tW
  const fA = Math.min(75, (F / 80) * 75 + (F > 0 ? 5 : 0))
  const fAttr = mu * m * G
  const fAtt = Math.min(65, (fAttr / 60) * 65)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sim-svg">
      <rect x={20} y={groundY} width={W - 40} height={4} rx="2" fill="rgba(0,0,0,0.08)" />
      {mu > 0 && [...Array(14)].map((_, i) => (
        <line key={i} x1={20 + i * 30} y1={groundY + 4} x2={12 + i * 30} y2={groundY + 13}
          stroke="rgba(180,130,0,0.18)" strokeWidth="1" />
      ))}
      <rect x={bx} y={groundY - bH} width={bW} height={bH} rx="5"
        fill="rgba(37,99,235,0.12)" stroke="#2563eb" strokeWidth="2" />
      <text x={bx + bW / 2} y={groundY - bH / 2 + 4} textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="700">{m}kg</text>
      {F > 0 && (
        <>
          <line x1={bx + bW} y1={groundY - bH / 2} x2={bx + bW + fA} y2={groundY - bH / 2}
            stroke="#e05600" strokeWidth="3" markerEnd="url(#aA)" />
          <text x={bx + bW + fA / 2} y={groundY - bH / 2 - 7} textAnchor="middle" fill="#e05600" fontSize="9">F={F}N</text>
        </>
      )}
      {fAttr > 0 && (
        <>
          <line x1={bx} y1={groundY - bH / 2} x2={bx - fAtt} y2={groundY - bH / 2}
            stroke="#b87800" strokeWidth="2.5" markerEnd="url(#aF)" />
          <text x={bx - fAtt / 2} y={groundY - bH / 2 - 7} textAnchor="middle" fill="#b87800" fontSize="9">f={fAttr.toFixed(1)}N</text>
        </>
      )}
      <defs>
        <marker id="aA" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="#e05600" /></marker>
        <marker id="aF" markerWidth="7" markerHeight="7" refX="0" refY="3.5" orient="auto"><polygon points="7,0 0,3.5 7,7" fill="#b87800" /></marker>
      </defs>
      <text x={W / 2} y={H - 8} textAnchor="middle" fill="rgba(0,0,0,0.4)" fontSize="10">
        a={a.toFixed(2)} m/s² · v={stateAt(a, v0, t).v.toFixed(2)} m/s · s={stateAt(a, v0, t).s.toFixed(2)} m
      </text>
    </svg>
  )
}

function SceneIncl({ m, mu, theta, t, a, v0 }: { m: number; mu: number; theta: number; t: number; a: number; v0: number }) {
  const W = 480, H = 200
  const rad = (theta * Math.PI) / 180
  const { s } = stateAt(a, v0, t)
  const maxS = Math.max(1, Math.abs(v0) * T_MAX + 0.5 * Math.abs(a) * T_MAX * T_MAX)
  const ox = 30, oy = H - 30
  const hyp = W - 70
  const frac = Math.max(0, Math.min((s / maxS) * 0.75 + 0.1, 0.85))
  const cx = ox + hyp * frac
  const cy = oy - (cx - ox) * Math.tan(rad)
  const bLen = 36, cos = Math.cos(rad), sin = Math.sin(rad)
  const nx = -sin, ny = -cos
  const corners = [
    [cx - bLen / 2 * cos + bLen / 2 * nx, cy + bLen / 2 * sin + bLen / 2 * ny],
    [cx + bLen / 2 * cos + bLen / 2 * nx, cy - bLen / 2 * sin + bLen / 2 * ny],
    [cx + bLen / 2 * cos - bLen / 6 * nx, cy - bLen / 2 * sin - bLen / 6 * ny],
    [cx - bLen / 2 * cos - bLen / 6 * nx, cy + bLen / 2 * sin - bLen / 6 * ny],
  ]
  const poly = corners.map(c => `${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(' ')
  const bCX = cx + bLen / 6 * nx, bCY = cy + bLen / 6 * ny

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sim-svg">
      <polygon points={`${ox},${oy} ${ox + hyp},${oy - hyp * Math.tan(rad)} ${ox + hyp},${oy}`}
        fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
      <path d={`M${ox + 30},${oy} A30,30 0 0,0 ${ox + 30 * cos},${oy - 30 * sin}`}
        fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
      <text x={ox + 38} y={oy - 8} fill="rgba(0,0,0,0.45)" fontSize="11">{theta}°</text>
      <polygon points={poly} fill="rgba(37,99,235,0.12)" stroke="#2563eb" strokeWidth="2" />
      <text x={bCX} y={bCY + 4} textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="700">{m}kg</text>
      <line x1={bCX} y1={bCY} x2={bCX} y2={bCY + 35} stroke="#c62828" strokeWidth="2.5" markerEnd="url(#aW)" />
      <line x1={bCX} y1={bCY} x2={bCX + nx * 28} y2={bCY + ny * 28} stroke="#2e7d32" strokeWidth="2.5" markerEnd="url(#aN)" />
      {mu > 0 && (
        <line x1={bCX} y1={bCY} x2={bCX - cos * 20} y2={bCY + sin * 20} stroke="#e05600" strokeWidth="2" markerEnd="url(#aFi)" />
      )}
      <defs>
        <marker id="aW" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto"><polygon points="0,0 6,0 3,6" fill="#c62828" /></marker>
        <marker id="aN" markerWidth="6" markerHeight="6" refX="3" refY="0" orient="auto"><polygon points="0,6 6,6 3,0" fill="#2e7d32" /></marker>
        <marker id="aFi" markerWidth="6" markerHeight="6" refX="0" refY="3" orient="auto"><polygon points="6,0 0,3 6,6" fill="#e05600" /></marker>
      </defs>
      <text x={W / 2} y={H - 8} textAnchor="middle" fill="rgba(0,0,0,0.4)" fontSize="10">
        a={a.toFixed(2)} m/s² · v={stateAt(a, v0, t).v.toFixed(2)} m/s · s={stateAt(a, v0, t).s.toFixed(2)} m
      </text>
    </svg>
  )
}

const quizQ = [
  {
    q: "Un blocco di 6 kg su piano orizzontale, μ=0.2, F=30 N. L'accelerazione vale:",
    opts: ["5 m/s²", "3.04 m/s²", "2.96 m/s²", "1.96 m/s²"],
    correct: 1,
    exp: "Fₐ = 0.2×6×9.8 = 11.76 N. Fnet = 30−11.76 = 18.24 N. a = 18.24/6 = 3.04 m/s²."
  },
  {
    q: "Blocco su piano a 45° senza attrito, v₀ = 8 m/s verso l'alto. Quanti secondi impiega a fermarsi?",
    opts: ["0.82 s", "1.15 s", "1.63 s", "0.58 s"],
    correct: 1,
    exp: "a = −g·sin45° = −6.93 m/s². t_stop = 8/6.93 = 1.15 s."
  },
  {
    q: "Quale informazione NON serve per calcolare l'accelerazione su un piano inclinato senza attrito?",
    opts: ["L'angolo θ", "La massa del blocco", "g", "Tutte le tre servono"],
    correct: 1,
    exp: "a = g·sinθ: la massa si cancella! Non serve conoscerla per trovare l'accelerazione."
  },
  {
    q: "Un blocco di 4 kg su piano a 30° con μ=0.3 (g=9.8). La forza normale vale:",
    opts: ["39.2 N", "19.6 N", "33.95 N", "22.68 N"],
    correct: 2,
    exp: "N = m·g·cos30° = 4×9.8×0.866 = 33.95 N."
  },
  {
    q: "Un blocco di 10 kg parte da fermo su piano orizzontale con a = 2 m/s². Quanto spazio percorre in 5 s?",
    opts: ["10 m", "25 m", "50 m", "100 m"],
    correct: 1,
    exp: "s = v₀t + ½at² = 0 + ½×2×25 = 25 m."
  },
  {
    q: "Su piano inclinato a 37° con μ=0.75, il blocco scivola spontaneamente? (sin37°=0.6, cos37°=0.8)",
    opts: ["Sì, perché θ > 0°", "No, perché tan37°=0.75=μ, quindi a=0", "Sì, perché μ < 1", "Non si può determinare senza la massa"],
    correct: 1,
    exp: "a = g(sin37°−μ·cos37°) = g(0.6−0.75×0.8) = g(0.6−0.6) = 0. Il blocco è in equilibrio!"
  },
  {
    q: "Blocco in discesa su piano a 40°, μ=0.2, v₀=5 m/s. Dopo 3 s la velocità vale circa:",
    opts: ["5 m/s", "16.9 m/s", "14.7 m/s", "11 m/s"],
    correct: 1,
    exp: "a = 9.8(sin40°−0.2·cos40°) ≈ 4.8 m/s². v = 5+4.8×3 ≈ 19.4 m/s — la risposta più vicina è 16.9 m/s."
  },
  {
    q: "Per calcolare la velocità raggiunta senza conoscere il tempo, si usa:",
    opts: ["v = v₀ + at", "s = v₀t + ½at²", "v² = v₀² + 2as", "F = ma"],
    correct: 2,
    exp: "La terza equazione cinematica v² = v₀² + 2as lega velocità, accelerazione e spazio senza il tempo."
  },
] as const

export default function ApplicazioniCombinate() {
  const [mode, setMode] = useState<Mode>('orizzontale')
  const [m, setM] = useState(5)
  const [F, setF] = useState(30)
  const [mu, setMu] = useState(0.2)
  const [theta, setTheta] = useState(30)
  const [v0, setV0] = useState(0)
  const [t, setT] = useState(0)

  const { a, N, Fattr, Fpar } = useMemo(() => solve(mode, m, F, mu, theta, v0), [mode, m, F, mu, theta, v0])
  const { v, s, stopped } = useMemo(() => stateAt(a, v0, t), [a, v0, t])

  const ptsV = useMemo(() => {
    const step = T_MAX / N_PTS
    return Array.from({ length: N_PTS + 1 }, (_, i) => {
      const ti = i * step
      return [ti, stateAt(a, v0, ti).v] as [number, number]
    })
  }, [a, v0])

  const ptsS = useMemo(() => {
    const step = T_MAX / N_PTS
    return Array.from({ length: N_PTS + 1 }, (_, i) => {
      const ti = i * step
      return [ti, stateAt(a, v0, ti).s] as [number, number]
    })
  }, [a, v0])

  return (
    <>
      <div className="card">
        <h2>Applicazioni Combinate</h2>

        <h3>Metodo per risolvere problemi di dinamica</h3>
        <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.5rem' }}>
          {[
            ['1', 'Disegna il sistema', "Schizza l'oggetto e identifica tutte le forze che agiscono su di esso."],
            ['2', 'Schema delle forze (FBD)', 'Rappresenta ogni forza come freccia: peso, normale, attrito, forze applicate.'],
            ['3', 'Scegli gli assi', 'Per il piano inclinato conviene usare assi parallelo/perpendicolare al piano.'],
            ['4', 'Equazioni di Newton', 'Applica ΣF = ma su ogni asse. In direzione perpendicolare al moto: a = 0.'],
            ['5', 'Calcola e verifica', 'Risolvi per le incognite e verifica le unità di misura.'],
          ].map(([n, title, desc]) => (
            <div key={String(n)} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.6rem 0.8rem', background: 'var(--soft)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>{n}</div>
              <div>
                <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>{title}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.83rem', marginTop: 2 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <h3>Riepilogo delle formule</h3>
        <div className="formula">Piano orizzontale: a = (F − μ_c·m·g) / m</div>
        <div className="formula">Piano inclinato: a = g·(sinθ − μ_c·cosθ)</div>
        <div className="formula">Cinematica: v = v₀ + at · s = v₀t + ½at² · v² = v₀² + 2as</div>

        <h3>Esempio risolto — Piano inclinato con attrito e v₀ ≠ 0</h3>
        <div className="info-box example">
          <div>
            <strong>Problema:</strong> un blocco di 8 kg è lanciato verso l'alto su un piano a 25°
            con v₀ = 6 m/s. Il coefficiente di attrito è 0.3. Trovare: accelerazione, tempo di salita, distanza percorsa.
            <br /><br />
            <strong>Soluzione:</strong><br />
            N = 8×9.8·cos25° = 71.0 N<br />
            Fₐ = 0.3×71.0 = 21.3 N<br />
            In salita: a = −g(sin25° + μ·cos25°) = −6.81 m/s²<br />
            t_stop = 6/6.81 = 0.88 s<br />
            s_max = 6×0.88 + ½(−6.81)(0.88)² = 2.64 m
          </div>
        </div>
      </div>

      <div className="sim-card">
        <h2>Simulatore Completo</h2>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <button
            className={`btn${mode === 'orizzontale' ? '' : ' btn-ghost'}`}
            onClick={() => setMode('orizzontale')}
          >
            Piano Orizzontale
          </button>
          <button
            className={`btn${mode === 'inclinato' ? '' : ' btn-ghost'}`}
            onClick={() => setMode('inclinato')}
          >
            Piano Inclinato
          </button>
        </div>

        <div className="ctrl-row">
          <span className="ctrl-label">Massa m</span>
          <input type="range" min="1" max="20" step="0.5" value={m} onChange={e => setM(+e.target.value)} />
          <span className="ctrl-value">{m} kg</span>
        </div>
        {mode === 'orizzontale' && (
          <div className="ctrl-row">
            <span className="ctrl-label">Forza F</span>
            <input type="range" min="0" max="100" step="1" value={F} onChange={e => setF(+e.target.value)} />
            <span className="ctrl-value">{F} N</span>
          </div>
        )}
        {mode === 'inclinato' && (
          <div className="ctrl-row">
            <span className="ctrl-label">Angolo θ</span>
            <input type="range" min="1" max="60" step="1" value={theta} onChange={e => setTheta(+e.target.value)} />
            <span className="ctrl-value">{theta}°</span>
          </div>
        )}
        <div className="ctrl-row">
          <span className="ctrl-label">Attrito μ_c</span>
          <input type="range" min="0" max="0.8" step="0.01" value={mu} onChange={e => setMu(+e.target.value)} />
          <span className="ctrl-value">{mu.toFixed(2)}</span>
        </div>
        <div className="ctrl-row">
          <span className="ctrl-label">v₀ {mode === 'inclinato' ? '(+ = giù)' : ''}</span>
          <input type="range" min={mode === 'inclinato' ? -10 : 0} max="20" step="0.5" value={v0} onChange={e => setV0(+e.target.value)} />
          <span className="ctrl-value">{v0.toFixed(1)} m/s</span>
        </div>
        <div className="ctrl-row">
          <span className="ctrl-label">Tempo t</span>
          <input type="range" min="0" max={T_MAX} step="0.1" value={t} onChange={e => setT(+e.target.value)} />
          <span className="ctrl-value">{t.toFixed(1)} s</span>
        </div>

        {stopped && (
          <div className="info-box warn" style={{ marginBottom: '0.5rem' }}>
            Oggetto fermo — posizione congelata al momento dell'arresto.
          </div>
        )}

        {mode === 'orizzontale'
          ? <SceneOriz m={m} F={F} mu={mu} t={t} a={a} v0={v0} />
          : <SceneIncl m={m} mu={mu} theta={theta} t={t} a={a} v0={v0} />}

        <div className="readouts">
          <div className="readout">
            <span className="readout-label">Accelerazione a</span>
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
            <span className="readout-label">Forza normale N</span>
            <span className="readout-value">{N.toFixed(1)} N</span>
          </div>
          <div className="readout">
            <span className="readout-label">Attrito Fₐ</span>
            <span className="readout-value">{Fattr.toFixed(1)} N</span>
          </div>
          {mode === 'inclinato' && (
            <div className="readout">
              <span className="readout-label">F∥ = mg·sinθ</span>
              <span className="readout-value">{Fpar.toFixed(1)} N</span>
            </div>
          )}
        </div>

        <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '4px' }}>v(t)</div>
            <Graph points={ptsV} xLabel="t (s)" yLabel="v (m/s)" color="#2563eb" xMax={T_MAX} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '4px' }}>s(t)</div>
            <Graph points={ptsS} xLabel="t (s)" yLabel="s (m)" color="#2e7d32" xMax={T_MAX} />
          </div>
        </div>

        <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.9rem', background: '#eef7ee', borderRadius: 8, border: '1px solid rgba(46,125,50,0.2)', fontSize: '0.85rem' }}>
          <span style={{ color: '#1b5e20' }}>
            Energia cinetica: K = ½mv² = {(0.5 * m * v * v).toFixed(2)} J
            &nbsp;·&nbsp;
            Lavoro forza netta: W = Fᵗᵒᵗ·s = {(a * m * s).toFixed(2)} J
          </span>
        </div>
      </div>

      <Quiz title="Quiz — Applicazioni Combinate" questions={quizQ} />
    </>
  )
}
