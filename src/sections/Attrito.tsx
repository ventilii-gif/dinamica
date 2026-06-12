import { useState } from 'react'
import Quiz from '../components/Quiz'

const G = 9.8

function AttritionGraph({ m, muS, muD }: { m: number; muS: number; muD: number }) {
  const W = 460, H = 200
  const PAD = { top: 20, right: 20, bottom: 36, left: 54 }
  const iW = W - PAD.left - PAD.right
  const iH = H - PAD.top - PAD.bottom
  const N = m * G
  const FsMax = muS * N
  const Fk = muD * N
  const Fmax = Math.max(FsMax * 1.5, 10)
  const tx = (f: number) => PAD.left + (f / Fmax) * iW
  const ty = (f: number) => PAD.top + iH - (f / (FsMax * 1.1)) * iH
  const staticPts: string[] = []
  for (let i = 0; i <= 40; i++) { const f = (i/40)*FsMax; staticPts.push(`${i===0?'M':'L'}${tx(f).toFixed(1)},${ty(f).toFixed(1)}`) }
  const dropX = tx(FsMax)
  const dropY1 = ty(FsMax), dropY2 = ty(Fk)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <rect x={PAD.left} y={PAD.top} width={iW} height={iH} fill="#fbfcfe" rx="5" />
      <rect x={PAD.left} y={PAD.top} width={dropX-PAD.left} height={iH} fill="rgba(46,125,50,0.04)" />
      <text x={PAD.left+(dropX-PAD.left)/2} y={PAD.top+iH-6} textAnchor="middle" fill="rgba(46,125,50,0.5)" fontSize="9">statico</text>
      <rect x={dropX} y={PAD.top} width={PAD.left+iW-dropX} height={iH} fill="rgba(213,84,0,0.04)" />
      <text x={dropX+(PAD.left+iW-dropX)/2} y={PAD.top+iH-6} textAnchor="middle" fill="rgba(213,84,0,0.5)" fontSize="9">cinetico</text>
      <path d={staticPts.join(' ')} fill="none" stroke="#2e7d32" strokeWidth="2.5" />
      <path d={`M${dropX.toFixed(1)},${dropY1.toFixed(1)} L${dropX.toFixed(1)},${dropY2.toFixed(1)}`} fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d={`M${dropX.toFixed(1)},${dropY2.toFixed(1)} L${tx(Fmax).toFixed(1)},${dropY2.toFixed(1)}`} fill="none" stroke="#e05600" strokeWidth="2.5" />
      <text x={dropX+4} y={ty(FsMax)-4} fill="#2e7d32" fontSize="9">μₛ·N={FsMax.toFixed(1)}N</text>
      <text x={dropX+4} y={ty(Fk)+12} fill="#e05600" fontSize="9">μₖ·N={Fk.toFixed(1)}N</text>
      <line x1={PAD.left} y1={PAD.top+iH} x2={PAD.left+iW} y2={PAD.top+iH} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top+iH} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <text x={PAD.left+iW/2} y={H-4} textAnchor="middle" fill="rgba(0,0,0,0.45)" fontSize="10">Forza applicata F (N)</text>
      <text x={14} y={PAD.top+iH/2} textAnchor="middle" fill="rgba(0,0,0,0.45)" fontSize="10" transform={`rotate(-90,14,${PAD.top+iH/2})`}>F attrito (N)</text>
    </svg>
  )
}

function BlockScene({ m, muS, muD, Fapp }: { m: number; muS: number; muD: number; Fapp: number }) {
  const W = 460, H = 160
  const N = m * G
  const FsMax = muS * N
  const Fk = muD * N
  const moving = Fapp > FsMax
  const Fattrito = moving ? Fk : Math.min(Fapp, FsMax)
  const groundY = 110, blockW = 60, blockH = 40
  const bx = W/2 - blockW/2
  const fScale = (f: number) => Math.min(100, (f/Math.max(FsMax*1.5,1))*100)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sim-svg">
      <rect x={20} y={groundY} width={W-40} height={5} rx="2" fill="rgba(0,0,0,0.08)" />
      {[...Array(14)].map((_,i) => <line key={i} x1={20+i*30} y1={groundY+5} x2={12+i*30} y2={groundY+14} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />)}
      <rect x={bx} y={groundY-blockH} width={blockW} height={blockH} rx="6"
        fill={moving?'rgba(213,84,0,0.12)':'rgba(37,99,235,0.12)'}
        stroke={moving?'#e05600':'#2563eb'} strokeWidth="2" />
      <text x={bx+blockW/2} y={groundY-blockH/2+5} textAnchor="middle" fill={moving?'#e05600':'#2563eb'} fontSize="12" fontWeight="700">{m}kg</text>
      {Fapp > 0 && <>
        <line x1={bx+blockW} y1={groundY-blockH/2} x2={bx+blockW+fScale(Fapp)} y2={groundY-blockH/2} stroke="#b87800" strokeWidth="3" markerEnd="url(#arrA)" />
        <text x={bx+blockW+fScale(Fapp)/2} y={groundY-blockH/2-8} textAnchor="middle" fill="#b87800" fontSize="10">F={Fapp.toFixed(1)}N</text>
      </>}
      {Fattrito > 0 && <>
        <line x1={bx} y1={groundY-blockH/2} x2={bx-fScale(Fattrito)} y2={groundY-blockH/2} stroke={moving?'#e05600':'#2e7d32'} strokeWidth="3" markerEnd={moving?'url(#arrFk)':'url(#arrFs)'} />
        <text x={bx-fScale(Fattrito)/2} y={groundY-blockH/2-8} textAnchor="middle" fill={moving?'#e05600':'#2e7d32'} fontSize="10">Fₐ={Fattrito.toFixed(1)}N</text>
      </>}
      <defs>
        <marker id="arrA" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="#b87800" /></marker>
        <marker id="arrFs" markerWidth="7" markerHeight="7" refX="0" refY="3.5" orient="auto"><polygon points="7,0 0,3.5 7,7" fill="#2e7d32" /></marker>
        <marker id="arrFk" markerWidth="7" markerHeight="7" refX="0" refY="3.5" orient="auto"><polygon points="7,0 0,3.5 7,7" fill="#e05600" /></marker>
      </defs>
      <text x={W/2} y={H-8} textAnchor="middle" fontSize="12" fontWeight="700" fill={moving?'#e05600':'#2e7d32'}>
        {moving?'▶ IN MOTO (attrito cinetico)':'■ FERMO (attrito statico)'}
      </text>
    </svg>
  )
}

const quizQ = [
  { q: "L'attrito statico massimo dipende da:", opts: ["La velocità del blocco","La forza normale e μ_s","L'area di contatto","La temperatura"], correct: 1, exp: "F_s_max = μ_s · N." },
  { q: "Quando un oggetto comincia a scivolare, la forza d'attrito:", opts: ["Aumenta di colpo","Rimane invariata","Diminuisce passando da μ_s a μ_d","Diventa zero"], correct: 2, exp: "L'attrito passa da statico (μ_s·N) a cinetico (μ_d·N), con μ_d < μ_s." },
  { q: "μ_s e μ_d (stesso paio di superfici): quale affermazione è corretta?", opts: ["μ_s = μ_d sempre","μ_s < μ_d","μ_s > μ_d","Dipende dalla velocità"], correct: 2, exp: "μ_s > μ_d: serve più forza per avviare il moto che per mantenerlo." },
  { q: "Su quale coppia di superfici il coefficiente di attrito cinetico è tipicamente più alto?", opts: ["Ghiaccio su ghiaccio","Vetro su vetro","Gomma su asfalto asciutto","Acciaio su acciaio lubrificato"], correct: 2, exp: "Gomma su asfalto asciutto: μ_c ≈ 0.7–0.8." },
  { q: "N = 80 N e μ_s = 0.35. Massima forza prima che il blocco si muova:", opts: ["0.35 N","80 N","28 N","229 N"], correct: 2, exp: "F_s_max = 0.35 × 80 = 28 N." },
  { q: "Il coefficiente di attrito cinetico dipende dalla velocità del blocco?", opts: ["Sì, cresce con la velocità","No, nel modello di Coulomb è costante","Sì, diminuisce con la velocità","Solo sopra certi valori"], correct: 1, exp: "Nel modello di Coulomb, μ_c è indipendente dalla velocità." },
  { q: "F applicata = 18 N, F_s_max = 25 N. La forza d'attrito statico vale:", opts: ["25 N","0 N","18 N","7 N"], correct: 2, exp: "L'attrito statico è reattivo: assume il valore minimo per tenere il blocco fermo, cioè 18 N." },
  { q: "Se la massa raddoppia (F resta uguale), cosa succede all'attrito cinetico?", opts: ["Rimane uguale","Si dimezza","Raddoppia","Aumenta di quattro volte"], correct: 2, exp: "F_k = μ_d · m · g. Se m raddoppia, raddoppia F_k." },
] as const

export default function Attrito() {
  const [m, setM] = useState(5)
  const [muS, setMuS] = useState(0.5)
  const [muD, setMuD] = useState(0.35)
  const [Fapp, setFapp] = useState(0)
  const N = m * G
  const FsMax = muS * N
  const Fk = muD * N
  const moving = Fapp > FsMax
  const muDMax = Math.max(0.05, muS - 0.05)
  return (
    <>
      <div className="card">
        <h2>Attrito Statico e Dinamico</h2>
        <h3>Attrito statico</h3>
        <p>Finché un oggetto è fermo, l'attrito statico si oppone alla forza applicata fino a un massimo:</p>
        <div className="formula highlight">F_applicata ≤ F_s_max = μ_s · N</div>
        <h3>Attrito cinetico (dinamico)</h3>
        <div className="formula highlight">F_k = μ_d · N &nbsp; con &nbsp; μ_d &lt; μ_s</div>
        <div className="info-box warn">Serve più forza per avviare il moto che per mantenerlo.</div>
        <h3>Valori tipici di μ</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'0.4rem',marginTop:'0.5rem',fontSize:'0.85rem'}}>
          {[['Ghiaccio / Ghiaccio','0.03','0.02'],['Legno / Legno','0.4','0.3'],['Gomma / Asfalto','0.8','0.7'],['Acciaio / Acciaio','0.74','0.57'],['Teflon / Teflon','0.04','0.04']].map(([mat,us,uk]) => (
            <div key={mat} style={{padding:'0.4rem 0.6rem',background:'var(--soft)',borderRadius:6,border:'1px solid var(--border)'}}>
              <div style={{color:'var(--text)',fontWeight:600,fontSize:'0.8rem'}}>{mat}</div>
              <div style={{color:'var(--muted)',fontSize:'0.75rem'}}>μ_s = {us} · μ_d = {uk}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="sim-card">
        <h2>Simulazione — Attrito Statico e Cinetico</h2>
        <div className="ctrl-row"><span className="ctrl-label">Massa m</span><input type="range" min="1" max="20" step="0.5" value={m} onChange={e => setM(+e.target.value)} /><span className="ctrl-value">{m} kg</span></div>
        <div className="ctrl-row"><span className="ctrl-label">μ statico (μ_s)</span><input type="range" min="0.05" max="1.0" step="0.01" value={muS} onChange={e => { const v=+e.target.value; setMuS(v); if(muD>=v) setMuD(+(v-0.05).toFixed(2)) }} /><span className="ctrl-value">{muS.toFixed(2)}</span></div>
        <div className="ctrl-row"><span className="ctrl-label">μ cinetico (μ_d)</span><input type="range" min="0.01" max={muDMax} step="0.01" value={muD} onChange={e => setMuD(+e.target.value)} /><span className="ctrl-value">{muD.toFixed(2)}</span></div>
        <div className="ctrl-row"><span className="ctrl-label">Forza applicata</span><input type="range" min="0" max={FsMax*1.6} step="0.5" value={Fapp} onChange={e => setFapp(+e.target.value)} /><span className="ctrl-value">{Fapp.toFixed(1)} N</span></div>
        <BlockScene m={m} muS={muS} muD={muD} Fapp={Fapp} />
        <div style={{marginTop:'0.75rem'}}>
          <div style={{fontSize:'0.8rem',color:'var(--muted)',marginBottom:'6px'}}>Curva attrito — verde: statica, arancione: cinetica</div>
          <AttritionGraph m={m} muS={muS} muD={muD} />
        </div>
        <div className="readouts" style={{marginTop:'0.75rem'}}>
          <div className="readout"><span className="readout-label">Forza normale N</span><span className="readout-value">{N.toFixed(1)} N</span></div>
          <div className="readout"><span className="readout-label">F_s_max</span><span className="readout-value">{FsMax.toFixed(1)} N</span></div>
          <div className="readout"><span className="readout-label">F_k = μ_d·N</span><span className="readout-value">{Fk.toFixed(1)} N</span></div>
          <div className="readout"><span className="readout-label">Stato</span><span className="readout-value" style={{color:moving?'var(--red)':'var(--green)'}}>{moving?'In moto':'Fermo'}</span></div>
        </div>
      </div>
      <Quiz title="Quiz — Attrito Statico e Dinamico" questions={quizQ} />
    </>
  )
}
