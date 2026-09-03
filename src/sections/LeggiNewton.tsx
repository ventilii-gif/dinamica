import { useState, useMemo } from 'react'
import Graph from '../components/Graph'
import ModuleShell from '../components/ModuleShell'
import type { Exercise } from '../components/Esercizi'

const G = 9.8
const T_MAX = 8
const N_PTS = 80

function scene(m: number, F: number, t: number) {
  const a = F / m
  return { a, v: a * t, s: 0.5 * a * t * t }
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
      <line x1={20} y1={groundY} x2={W - 20} y2={groundY} stroke="var(--sim-axis-soft)" strokeWidth="1.5" />
      {[...Array(18)].map((_, i) => (
        <line key={i} x1={20 + i * 26} y1={groundY} x2={14 + i * 26} y2={groundY + 10}
          stroke="var(--sim-ground-hatch)" strokeWidth="1" />
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
        stroke="#2e9e4f" strokeWidth="2" />
      <text x={bx + blockW / 2 + 6} y={groundY - blockH - 18} fill="#2e9e4f" fontSize="9">N</text>
      <text x={W / 2} y={H - 12} textAnchor="middle" fill="var(--sim-text)" fontSize="11">
        a = {a.toFixed(2)} m/s² · v = {scene(m, F, t).v.toFixed(2)} m/s · s = {scene(m, F, t).s.toFixed(2)} m
      </text>
    </svg>
  )
}

const quizQ = [
  { q: "Un oggetto in moto rettilineo uniforme (MRU) è soggetto a:", opts: ["Una forza nella direzione del moto", "Nessuna forza netta", "Una forza contraria al moto", "Una forza verticale"], correct: 1, exp: "La 1ª legge di Newton dice che un corpo mantiene il suo stato di moto se la forza NETTA è zero." },
  { q: "Se la massa di un corpo raddoppia e la forza netta rimane uguale, l'accelerazione:", opts: ["Raddoppia", "Rimane uguale", "Si dimezza", "Diventa zero"], correct: 2, exp: "Dalla 2ª legge: a = F/m. Se m raddoppia con F costante, a si dimezza." },
  { q: "L'unità di misura della forza nel Sistema Internazionale è:", opts: ["Joule (J)", "Watt (W)", "Newton (N)", "Pascal (Pa)"], correct: 2, exp: "1 N = 1 kg·m/s²: la forza che imprime 1 m/s² a una massa di 1 kg." },
  { q: "La forza peso di un oggetto di 4 kg sulla Terra (g = 9.8 m/s²) vale:", opts: ["4 N", "9.8 N", "39.2 N", "13.8 N"], correct: 2, exp: "P = m·g = 4 × 9.8 = 39.2 N." },
  { q: "La 3ª legge di Newton afferma che le forze di azione e reazione:", opts: ["Agiscono sullo stesso corpo", "Si annullano sempre", "Agiscono su corpi diversi", "Hanno la stessa direzione"], correct: 2, exp: "Azione e reazione sono uguali e contrarie ma agiscono su corpi DIVERSI: per questo non si annullano." },
  { q: "Un blocco di 5 kg su un tavolo orizzontale. La forza normale vale:", opts: ["0 N", "5 N", "49 N", "Dipende dalla velocità"], correct: 2, exp: "Equilibrio verticale: N = P = m·g = 5 × 9.8 = 49 N." },
  { q: "Se la forza netta su un oggetto è zero e l'oggetto è in moto, esso:", opts: ["Decelera fino a fermarsi", "Accelera", "Prosegue in MRU", "Cambia direzione"], correct: 2, exp: "Prima legge: senza forza netta il corpo mantiene velocità costante in linea retta." },
  { q: "Un oggetto di 3 kg subisce una forza netta di 12 N. La sua accelerazione è:", opts: ["36 m/s²", "4 m/s²", "0.25 m/s²", "9 m/s²"], correct: 1, exp: "a = F/m = 12/3 = 4 m/s²." },
] as const

const esercizi: Exercise[] = [
  {
    q: 'Una cassa di 12 kg viene spinta su un pavimento liscio con una forza orizzontale di 36 N. Calcola l’accelerazione e la velocità raggiunta dopo 5 s partendo da fermo.',
    hints: [
      'Il pavimento è liscio: non c’è attrito, quindi la forza netta coincide con la forza applicata.',
      'Applica la seconda legge di Newton per ricavare l’accelerazione: a = F / m.',
      'Per la velocità usa la legge oraria del moto uniformemente accelerato: v = v₀ + a·t, con v₀ = 0.',
    ],
    solution: 'a = F/m = 36/12 = 3 m/s²\nv = v₀ + a·t = 0 + 3 × 5 = 15 m/s\n\nLa cassa accelera di 3 m/s² e dopo 5 secondi viaggia a 15 m/s.',
  },
  {
    q: 'Un ascensore di massa 800 kg sale con accelerazione costante di 1,2 m/s². Quanto vale la tensione del cavo? (g = 9,8 m/s²)',
    hints: [
      'Sull’ascensore agiscono due forze verticali: la tensione T del cavo verso l’alto e il peso P verso il basso.',
      'Scegli come verso positivo quello dell’accelerazione (verso l’alto) e scrivi ΣF = ma: T − P = m·a.',
      'Ricava T isolandola: T = m·a + m·g = m(a + g).',
    ],
    solution: 'T − m·g = m·a\nT = m(a + g) = 800 × (1,2 + 9,8) = 800 × 11 = 8800 N\n\nLa tensione (8800 N) è maggiore del peso (7840 N): la differenza è ciò che produce l’accelerazione verso l’alto.',
  },
  {
    q: 'Su un corpo di 4 kg agiscono contemporaneamente due forze orizzontali: 20 N verso destra e 8 N verso sinistra. Determina l’accelerazione (modulo e verso) e lo spazio percorso in 3 s partendo da fermo.',
    hints: [
      'Le forze sono sulla stessa retta ma con versi opposti: la forza netta è la loro differenza.',
      'F_netta = 20 − 8 = 12 N, diretta verso destra (il verso della forza maggiore).',
      'Usa a = F_netta / m e poi s = ½·a·t², dato che v₀ = 0.',
    ],
    solution: 'F_netta = 20 − 8 = 12 N verso destra\na = F/m = 12/4 = 3 m/s² verso destra\ns = ½·a·t² = ½ × 3 × 9 = 13,5 m\n\nIl corpo accelera a 3 m/s² verso destra e percorre 13,5 m in 3 secondi.',
  },
  {
    q: 'Un’automobile di 1000 kg passa da 0 a 100 km/h in 8 s. Qual è la forza media che il motore trasmette alla vettura?',
    hints: [
      'Prima converti la velocità in unità SI: dividi i km/h per 3,6 per ottenere i m/s.',
      'Calcola l’accelerazione media come variazione di velocità diviso il tempo: a = Δv / Δt.',
      'Applica infine F = m·a con la massa in kg.',
    ],
    solution: 'v = 100 km/h = 100/3,6 ≈ 27,8 m/s\na = Δv/Δt = 27,8/8 ≈ 3,47 m/s²\nF = m·a = 1000 × 3,47 ≈ 3470 N\n\nIl motore trasmette in media circa 3,5 kN, pari a poco più di un terzo del peso della vettura.',
  },
  {
    q: 'Un libro appoggiato su un tavolo è fermo. Un compagno afferma: «la forza peso e la forza normale sono azione e reazione secondo la terza legge». Spiega perché l’affermazione è sbagliata.',
    hints: [
      'Ricorda la condizione essenziale della terza legge: le due forze devono agire su corpi diversi.',
      'Chiediti su quale corpo agisce il peso del libro e su quale corpo agisce la forza normale.',
      'Prova a individuare le vere reazioni: chi esercita il peso sul libro? e chi riceve la reazione della normale?',
    ],
    solution: 'Peso e normale agiscono entrambi SULLO STESSO corpo (il libro): sono forze che si bilanciano per la prima legge, non una coppia azione-reazione.\n\nLe vere coppie azione-reazione sono:\n• la Terra attira il libro (peso) ↔ il libro attira la Terra con forza uguale e contraria;\n• il tavolo spinge il libro verso l’alto (normale) ↔ il libro preme sul tavolo verso il basso.\n\nOgni coppia è formata da forze applicate a corpi diversi.',
  },
  {
    q: 'Due blocchi a contatto, m₁ = 3 kg e m₂ = 2 kg, sono spinti insieme su un piano orizzontale liscio da una forza F = 25 N applicata su m₁. Calcola l’accelerazione comune e la forza di contatto che m₁ esercita su m₂.',
    hints: [
      'I due blocchi si muovono insieme: trattali prima come un unico corpo di massa m₁ + m₂ per trovare l’accelerazione.',
      'a = F / (m₁ + m₂). La forza di contatto è l’unica forza orizzontale che agisce sul secondo blocco.',
      'Isola m₂ e applica la seconda legge solo a lui: F_contatto = m₂ · a.',
    ],
    solution: 'Sistema completo: a = F/(m₁+m₂) = 25/(3+2) = 5 m/s²\nForza di contatto su m₂: F_c = m₂·a = 2 × 5 = 10 N\n\nVerifica su m₁: F − F_c = 25 − 10 = 15 N = m₁·a = 3 × 5 = 15 N ✓\nLa forza di contatto (10 N) è minore di F perché deve accelerare solo 2 kg dei 5 kg totali.',
  },
  {
    q: 'Un paracadutista di 80 kg scende a velocità costante (velocità limite). Che cosa si può dire della forza netta su di lui? Quanto valgono la resistenza dell’aria e la sua accelerazione? (g = 9,8 m/s²)',
    hints: [
      '«Velocità costante» è la chiave: rileggi l’enunciato della prima legge di Newton.',
      'Se la velocità non cambia, l’accelerazione è nulla e quindi la forza netta è zero.',
      'Forza netta nulla significa che la resistenza dell’aria bilancia esattamente il peso.',
    ],
    solution: 'Velocità costante ⇒ a = 0 ⇒ forza netta = 0 (1ª legge di Newton)\nQuindi la resistenza dell’aria eguaglia il peso:\nR = P = m·g = 80 × 9,8 = 784 N\na = 0\n\nÈ un caso di equilibrio dinamico: il corpo si muove ma non accelera, perché le forze si bilanciano.',
  },
]

function Teoria() {
  return (
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
  )
}

function Simulazione() {
  const [m, setM] = useState(5)
  const [F, setF] = useState(20)
  const [t, setT] = useState(0)

  const { a, v, s } = useMemo(() => scene(m, F, t), [m, F, t])

  const pts = useMemo(() => Array.from({ length: N_PTS + 1 }, (_, i) => {
    const ti = i * T_MAX / N_PTS
    return [ti, scene(m, F, ti).v] as [number, number]
  }), [m, F])

  const ptsS = useMemo(() => Array.from({ length: N_PTS + 1 }, (_, i) => {
    const ti = i * T_MAX / N_PTS
    return [ti, scene(m, F, ti).s] as [number, number]
  }), [m, F])

  return (
    <div className="sim-card">
      <h2>Simulazione — 2ª Legge di Newton</h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>
        Piano orizzontale privo di attrito. Regola massa e forza, poi scorri il tempo.
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
        <div className="readout"><span className="readout-label">Accelerazione a</span><span className="readout-value">{a.toFixed(2)} m/s²</span></div>
        <div className="readout"><span className="readout-label">Velocità v(t)</span><span className="readout-value">{v.toFixed(2)} m/s</span></div>
        <div className="readout"><span className="readout-label">Spazio s(t)</span><span className="readout-value">{s.toFixed(2)} m</span></div>
        <div className="readout"><span className="readout-label">Peso P</span><span className="readout-value">{(m * G).toFixed(1)} N</span></div>
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
  )
}

export default function LeggiNewton() {
  return (
    <ModuleShell
      theory={<Teoria />}
      sim={<Simulazione />}
      exercises={esercizi}
      quizTitle="Quiz — Leggi di Newton"
      quizQuestions={quizQ}
    />
  )
}
