import { useState, useMemo } from 'react'
import Graph from '../components/Graph'
import Quiz from '../components/Quiz'

const G = 9.8
const T_MAX = 8
const N_PTS = 80

function scene(m: number, F: number, t: number) {
  const a = F / m
  const v = a * t
  const s = 0.5 * a * t * t
  return { a, v, s }
}

function NewtonScene({ m, F, t }: { m: number; F: number; t: number }) {
  const W = 500, H = 180
  const { s, a } = scene(m, F, t)
  const maxS = 0.5 * (F / m) * T_MAX * T_MAX
  const blockW = 54, blockH = 36
  const groundY = 130
  const startX = 60
  const travelW = W - startX - blockW - 40
  const bx = startX + Math.min(s / Math.max(maxS, 0.001), 1) * travelW
  const arrowLen = Math.min(90, (F / 100) * 90 + 8)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sim-svg">
      <line x1={20} y1={groundY} x2={W - 20} y2={groundY} stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
      {[...Array(18)].map((_, i) => (
        <line key={i} x1={20 + i * 26} y1={groundY} x2={14 + i * 26} y2={groundY + 10}
          stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
      ))}
      <rect x={bx} y={groundY - blockH} width={blockW} height={blockH}
        rx="5" fill="rgba(37,99,235,0.12)" stroke="#2563eb" strokeWidth="2" />
      <text x={bx + blockW / 2} y={groundY - blockH / 2 + 5}
        textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="700">{m} kg</text>
      {F > 0 && (
        <>
          <line x1={bx + blockW} y1={groundY - blockH / 2}
            x2={bx + blockW + arrowLen} y2={groundY - blockH / 2}
            stroke="#e05600" strokeWidth="3" markerEnd="url(#arrN)" />
          <text x={bx + blockW + arrowLen / 2} y={groundY - blockH / 2 - 8}
            textAnchor="middle" fill="#e05600" fontSize="11" fontWeight="600">F = {F} N</text>
        </>
      )}
      <defs>
        <marker id="arrN" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill="#e05600" />
        </marker>
      </defs>
      <line x1={bx + blockW / 2} y1={groundY - blockH}
        x2={bx + blockW / 2} y2={groundY - blockH - 35}
        stroke="rgba(46,125,50,0.7)" strokeWidth="2" />
      <text x={bx + blockW / 2 + 6} y={groundY - blockH - 18}
        fill="rgba(46,125,50,0.8)" fontSize="9">N</text>
      <text x={W / 2} y={H - 12} textAnchor="middle" fill="rgba(0,0,0,0.4)" fontSize="11">
        a = {a.toFixed(2)} m/s² · v = {scene(m, F, t).v.toFixed(2)} m/s · s = {scene(m, F, t).s.toFixed(2)} m
      </text>
    </svg>
  )
}

const quizQ = [
  {
    q: "Un oggetto in moto rettilineo uniforme (MRU) è soggetto a:",
    opts: ["Una forza nella direzione del moto", "Nessuna forza netta", "Una forza contraria al moto", "Una forza verticale"],
    correct: 1,
    exp: "La 1ª legge di Newton dice che un corpo mantiene il suo stato di moto se la forza NETTA su di lui è zero. Il MRU è esattamente questo caso."
  },
  {
    q: "Se la massa di un corpo raddoppia e la forza netta rimane uguale, l'accelerazione:",
    opts: ["Raddoppia", "Rimane uguale", "Si dimezza", "Diventa zero"],
    correct: 2,
    exp: "Dalla 2ª legge: a = F/m. Se m raddoppia con F costante, a si dimezza."
  },
  {
    q: "L'unità di misura della forza nel Sistema Internazionale è:",
    opts: ["Joule (J)", "Watt (W)", "Newton (N)", "Pascal (Pa)"],
    correct: 2,
    exp: "Il Newton è definito come la forza che imprime un'accelerazione di 1 m/s² a una massa di 1 kg. 1 N = 1 kg·m/s²."
  },
  {
    q: "La forza peso di un oggetto di 4 kg sulla Terra (g = 9.8 m/s²) vale:",
    opts: ["4 N", "9.8 N", "39.2 N", "13.8 N"],
    correct: 2,
    exp: "P = m·g = 4 × 9.8 = 39.2 N."
  },
  {
    q: "La 3ª legge di Newton afferma che le forze di azione e reazione:",
    opts: ["Agiscono sullo stesso corpo", "Si annullano sempre", "Agiscono su corpi diversi", "Hanno la stessa direzione"],
    correct: 2,
    exp: "Azione e reazione sono uguali e contrarie ma agiscono su corpi DIVERSI. Per questo non si annullano mai."
  },
  {
    q: "Un blocco di 5 kg su un tavolo orizzontale. La forza normale vale:",
    opts: ["0 N", "5 N", "49 N", "Dipende dalla velocità"],
    correct: 2,
    exp: "Il blocco è in equilibrio verticale: N = P = m·g = 5 × 9.8 = 49 N."
  },
  {
    q: "Se la forza netta su un oggetto è zero e l'oggetto è in moto, esso:",
    opts: ["Decelera fino a fermarsi", "Accelera", "Prosegue in MRU", "Cambia direzione"],
    correct: 2,
    exp: "Prima legge di Newton: in assenza di forza netta, il corpo mantiene velocità costante in linea retta."
  },
  {
    q: "Un oggetto di 3 kg subisce una forza netta di 12 N. La sua accelerazione è:",
    opts: ["36 m/s²", "4 m/s²", "0.25 m/s²", "9 m/s²"],
    correct: 1,
    exp: "a = F/m = 12/3 = 4 m/s²."
  },
] as const

export default function LeggiNewton() {
  const [m, setM] = useState(5)
  const [F, setF] = useState(20)
  const [t, setT] = useState(0)

  const { a, v, s } = useMemo(() => scene(m, F, t), [m, F, t])

  const pts = useMemo(() => {
    const step = T_MAX / N_PTS
    return Array.from({ length: N_PTS + 1 }, (_, i) => {
      const ti = i * step
      return [ti, scene(m, F, ti).v] as [number, number]
    })
  }, [m, F])

  const ptsS = useMemo(() => {
    const step = T_MAX / N_PTS
    return Array.from({ length: N_PTS + 1 }, (_, i) => {
      const ti = i * step
      return [ti, scene(m, F, ti).s] as [number, number]
    })
  }, [m, F])

  return (
    <>
      <div className="card">
        <h2>Le Tre Leggi di Newton</h2>

        <h3>1ª Legge — Principio di Inerzia</h3>
        <p>
          Un corpo rimane in stato di quiete o di moto rettilineo uniforme finché una
          <strong> forza netta</strong> non agisce su di esso.
        </p>
        <div className="info-box tip">
          <span>Esempio: perché quando il bus frena voli in avanti? Il tuo corpo tende a mantenere la velocità che aveva prima.</span>
        </div>

        <h3>2ª Legge — F = ma</h3>
        <p>La forza netta applicata a un corpo è uguale al prodotto della sua massa per l&apos;accelerazione:</p>
        <div className="formula highlight">F = m · a</div>
        <p>Riformulata: <code style={{ color: 'var(--primary)' }}>a = F / m</code>. Se la forza raddoppia, l&apos;accelerazione raddoppia. Se la massa raddoppia, l&apos;accelerazione si dimezza.</p>
        <div className="formula">Forza peso: P = m · g &nbsp;&nbsp; (g = 9.8 m/s²)</div>
        <div className="info-box example">
          <span><strong>Esempio:</strong> un blocco di 10 kg con forza netta 30 N ha a = 30/10 = 3 m/s². Dopo 4 s: v = 12 m/s, spazio = 24 m.</span>
        </div>

        <h3>3ª Legge — Azione e Reazione</h3>
        <p>Per ogni forza esercitata da A su B, B esercita su A una forza uguale e contraria. Le due forze <strong>agiscono su corpi diversi</strong>.</p>
        <div className="formula">F_AB = −F_BA</div>
        <div className="info-box tip">
          <span>Il razzo avanza perché i gas escono verso il basso (azione) e il razzo viene spinto verso l&apos;alto (reazione).</span>
        </div>

        <h3>Forze fondamentali in dinamica</h3>
        <div className="formula">Peso: P = m·g (verso il basso)</div>
        <div className="formula">Forza normale: N (perpendicolare alla superficie)</div>
        <div className="formula">Attrito: F_a = μ · N (opposta al moto)</div>
      </div>

      <div className="sim-card">
        <h2>Simulazione — 2ª Legge di Newton</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>
          Piano orizzontale privo di attrito. Regola massa e forza, poi scrolla il tempo.
        </p>

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
          <span className="ctrl-label">Tempo t</span>
          <input type="range" min="0" max={T_MAX} step="0.1" value={t} onChange={e => setT(+e.target.value)} />
          <span className="ctrl-value">{t.toFixed(1)} s</span>
        </div>

        <NewtonScene m={m} F={F} t={t} />

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
            <span className="readout-label">Peso P</span>
            <span className="readout-value">{(m * G).toFixed(1)} N</span>
          </div>
        </div>

        <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '4px' }}>v(t) — velocità nel tempo</div>
            <Graph points={pts} xLabel="t (s)" yLabel="v (m/s)" xMax={T_MAX} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '4px' }}>s(t) — spazio nel tempo</div>
            <Graph points={ptsS} xLabel="t (s)" yLabel="s (m)" color="#2e7d32" xMax={T_MAX} />
          </div>
        </div>

        <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.9rem', background: 'rgba(37,99,235,0.05)', borderRadius: 8, border: '1px solid rgba(37,99,235,0.12)', fontSize: '0.85rem' }}>
          Verifica: F = m · a = {m} × {a.toFixed(2)} = <strong>{(m * a).toFixed(1)} N</strong> = F applicata
        </div>
      </div>

      <Quiz title="Quiz — Leggi di Newton" questions={quizQ} />
    </>
  )
}
