import { useState, useCallback, useRef } from 'react'

interface SpEvent { x: number; ct: number; id: number }

interface Props {
  beta: number
  showGrid: boolean
  lang: 'it' | 'en'
}

const W = 560
const H = 480
const CX = 280  // origin x in SVG
const CY = 340  // origin y in SVG (shifted down to show more future)
const SCALE = 55 // pixels per unit

function toSVG(x: number, ct: number) {
  return { px: CX + x * SCALE, py: CY - ct * SCALE }
}

function fromSVG(px: number, py: number) {
  return { x: (px - CX) / SCALE, ct: (CY - py) / SCALE }
}

function lorentz(x: number, ct: number, beta: number) {
  const g = 1 / Math.sqrt(1 - beta * beta)
  return {
    xp: g * (x - beta * ct),
    ctp: g * (ct - beta * x),
  }
}

function clipLine(
  ox: number, oy: number,
  dx: number, dy: number,
  margin = 5
): [number, number, number, number] | null {
  // clip to SVG rect [margin, W-margin] x [margin, H-margin]
  const xmin = margin, xmax = W - margin, ymin = margin, ymax = H - margin
  let tmin = -1000, tmax = 1000
  if (Math.abs(dx) > 1e-9) {
    const t1 = (xmin - ox) / dx, t2 = (xmax - ox) / dx
    tmin = Math.max(tmin, Math.min(t1, t2))
    tmax = Math.min(tmax, Math.max(t1, t2))
  } else if (ox < xmin || ox > xmax) return null
  if (Math.abs(dy) > 1e-9) {
    const t1 = (ymin - oy) / dy, t2 = (ymax - oy) / dy
    tmin = Math.max(tmin, Math.min(t1, t2))
    tmax = Math.min(tmax, Math.max(t1, t2))
  } else if (oy < ymin || oy > ymax) return null
  if (tmax < tmin) return null
  return [ox + tmin * dx, oy + tmin * dy, ox + tmax * dx, oy + tmax * dy]
}

function GridLines({ beta, color }: { beta: number; color: string }) {
  if (beta === 0) return null
  const g = 1 / Math.sqrt(1 - beta * beta)
  const lines: JSX.Element[] = []

  // Lines of constant t' (parallel to x' axis): ct = beta*x + const/g
  // Lines of constant x' (parallel to ct' axis): x = beta*ct + const/g
  const range = [-3, -2, -1, 1, 2, 3]

  for (const n of range) {
    const off = n / g * SCALE
    // const t' lines: direction of x' axis = (1, beta) in (x,ct) → SVG (SCALE, -beta*SCALE)
    const dx = SCALE, dy = -beta * SCALE

    // Shift perpendicular to x' axis (direction of ct' axis = (beta, 1))
    // perpendicular to (dx, dy) = (dy, -dx) normalized
    const perpX = dy, perpY = -dx
    const perpLen = Math.sqrt(perpX * perpX + perpY * perpY)
    const ox0 = CX + (off * perpX / perpLen)
    const oy0 = CY + (off * perpY / perpLen)

    const seg = clipLine(ox0, oy0, dx, dy)
    if (seg) lines.push(
      <line key={`t${n}`} x1={seg[0]} y1={seg[1]} x2={seg[2]} y2={seg[3]}
        stroke={color} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
    )

    // const x' lines: direction of ct' axis = (beta, 1) in (x,ct) → SVG (beta*SCALE, -SCALE)
    const dx2 = beta * SCALE, dy2 = -SCALE
    const perp2X = dy2, perp2Y = -dx2
    const perp2Len = Math.sqrt(perp2X * perp2X + perp2Y * perp2Y)
    const ox2 = CX + (off * perp2X / perp2Len)
    const oy2 = CY + (off * perp2Y / perp2Len)

    const seg2 = clipLine(ox2, oy2, dx2, dy2)
    if (seg2) lines.push(
      <line key={`x${n}`} x1={seg2[0]} y1={seg2[1]} x2={seg2[2]} y2={seg2[3]}
        stroke={color} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
    )
  }
  return <>{lines}</>
}

export default function MinkowskiDiagram({ beta, showGrid, lang }: Props) {
  const [events, setEvents] = useState<SpEvent[]>([])
  const svgRef = useRef<SVGSVGElement>(null)
  const idRef = useRef(0)

  const handleClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (events.length >= 3) return
    const rect = svgRef.current!.getBoundingClientRect()
    const px = (e.clientX - rect.left) * (W / rect.width)
    const py = (e.clientY - rect.top) * (H / rect.height)
    const { x, ct } = fromSVG(px, py)
    setEvents(prev => [...prev, { x: Math.round(x * 10) / 10, ct: Math.round(ct * 10) / 10, id: idRef.current++ }])
  }, [events.length])

  function clearEvents() { setEvents([]) }

  // Axis endpoints
  const ctTop = toSVG(0, 5.5)
  const ctBot = toSVG(0, -1.5)
  const xRight = toSVG(4.5, 0)
  const xLeft = toSVG(-4.5, 0)

  // Primed axes
  const betaEff = Math.min(beta, 0.995)
  const ctpDir = clipLine(CX, CY, betaEff * SCALE, -SCALE)
  const ctpDirBack = clipLine(CX, CY, -betaEff * SCALE, SCALE)
  const xpDir = clipLine(CX, CY, SCALE, -betaEff * SCALE)
  const xpDirBack = clipLine(CX, CY, -SCALE, betaEff * SCALE)

  // Light cone
  const lcFR = clipLine(CX, CY, SCALE, -SCALE)
  const lcFL = clipLine(CX, CY, -SCALE, -SCALE)
  const lcBR = clipLine(CX, CY, SCALE, SCALE)
  const lcBL = clipLine(CX, CY, -SCALE, SCALE)

  // Event colors
  const evColors = ['#ff6b6b', '#ffd43b', '#74c0fc']

  const eventLabels = lang === 'it'
    ? ['A', 'B', 'C']
    : ['A', 'B', 'C']

  function arrow(x2: number, y2: number, color: string) {
    return (
      <polygon
        points={`${x2},${y2} ${x2 - 6},${y2 + 10} ${x2 + 6},${y2 + 10}`}
        fill={color}
      />
    )
  }

  return (
    <div className="mink-container">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="mink-svg"
        onClick={handleClick}
        style={{ touchAction: 'none' }}
      >
        {/* Background */}
        <rect x="0" y="0" width={W} height={H} fill="#020510" />

        {/* Past light cone fill */}
        <polygon
          points={`${CX},${CY} ${CX - 4 * SCALE},${CY + 4 * SCALE} ${CX + 4 * SCALE},${CY + 4 * SCALE}`}
          fill="rgba(255,82,82,0.04)"
        />
        {/* Future light cone fill */}
        <polygon
          points={`${CX},${CY} ${CX - 4 * SCALE},${CY - 4 * SCALE} ${CX + 4 * SCALE},${CY - 4 * SCALE}`}
          fill="rgba(79,195,247,0.04)"
        />

        {/* S' grid */}
        {showGrid && beta > 0 && <GridLines beta={betaEff} color="#f9a825" />}

        {/* Light cone */}
        {lcFR && <line x1={lcFR[0]} y1={lcFR[1]} x2={lcFR[2]} y2={lcFR[3]} stroke="#ffd54f" strokeWidth="1.5" opacity="0.8" />}
        {lcFL && <line x1={lcFL[0]} y1={lcFL[1]} x2={lcFL[2]} y2={lcFL[3]} stroke="#ffd54f" strokeWidth="1.5" opacity="0.8" />}
        {lcBR && <line x1={lcBR[0]} y1={lcBR[1]} x2={lcBR[2]} y2={lcBR[3]} stroke="#ffd54f" strokeWidth="0.8" opacity="0.35" />}
        {lcBL && <line x1={lcBL[0]} y1={lcBL[1]} x2={lcBL[2]} y2={lcBL[3]} stroke="#ffd54f" strokeWidth="0.8" opacity="0.35" />}
        {/* Light cone label */}
        <text x={CX + 3.5 * SCALE - 10} y={CY - 3.5 * SCALE - 10} fill="#ffd54f" fontSize="11" opacity="0.8">c</text>
        <text x={CX - 3.5 * SCALE + 2} y={CY - 3.5 * SCALE - 10} fill="#ffd54f" fontSize="11" opacity="0.8">c</text>

        {/* S' primed axes */}
        {beta > 0 && (
          <>
            {ctpDir && <line x1={ctpDir[0]} y1={ctpDir[1]} x2={ctpDir[2]} y2={ctpDir[3]} stroke="#f9a825" strokeWidth="1.8" strokeDasharray="6 3" opacity="0.85" />}
            {ctpDirBack && <line x1={ctpDirBack[0]} y1={ctpDirBack[1]} x2={ctpDirBack[2]} y2={ctpDirBack[3]} stroke="#f9a825" strokeWidth="0.8" strokeDasharray="6 3" opacity="0.3" />}
            {xpDir && <line x1={xpDir[0]} y1={xpDir[1]} x2={xpDir[2]} y2={xpDir[3]} stroke="#f9a825" strokeWidth="1.8" strokeDasharray="6 3" opacity="0.85" />}
            {xpDirBack && <line x1={xpDirBack[0]} y1={xpDirBack[1]} x2={xpDirBack[2]} y2={xpDirBack[3]} stroke="#f9a825" strokeWidth="0.8" strokeDasharray="6 3" opacity="0.3" />}
            {/* Labels */}
            {ctpDir && (
              <text x={ctpDir[2] + 6} y={ctpDir[3]} fill="#f9a825" fontSize="13" fontWeight="700">ct'</text>
            )}
            {xpDir && (
              <text x={xpDir[2] - 4} y={xpDir[3] - 8} fill="#f9a825" fontSize="13" fontWeight="700">x'</text>
            )}
          </>
        )}

        {/* S frame axes */}
        {/* x axis */}
        <line x1={xLeft.px} y1={xLeft.py} x2={xRight.px} y2={xRight.py} stroke="#4fc3f7" strokeWidth="1.5" />
        {/* ct axis */}
        <line x1={ctBot.px} y1={ctBot.py} x2={ctTop.px} y2={ctTop.py} stroke="#4fc3f7" strokeWidth="1.5" />
        {/* Arrows */}
        {arrow(ctTop.px, ctTop.py, '#4fc3f7')}
        <polygon points={`${xRight.px},${xRight.py} ${xRight.px - 10},${xRight.py - 6} ${xRight.px - 10},${xRight.py + 6}`} fill="#4fc3f7" />
        {/* Labels */}
        <text x={ctTop.px + 8} y={ctTop.py} fill="#4fc3f7" fontSize="14" fontWeight="700">ct</text>
        <text x={xRight.px - 8} y={xRight.py + 18} fill="#4fc3f7" fontSize="14" fontWeight="700">x</text>

        {/* Tick marks & numbers on axes */}
        {[-3, -2, -1, 1, 2, 3, 4].map(n => {
          const ptX = toSVG(n, 0)
          const ptY = toSVG(0, n)
          const showX = ptX.px > 5 && ptX.px < W - 5
          const showY = ptY.py > 5 && ptY.py < H - 5
          return (
            <g key={n}>
              {showX && (
                <>
                  <line x1={ptX.px} y1={ptX.py - 4} x2={ptX.px} y2={ptX.py + 4} stroke="#4fc3f7" strokeWidth="1" opacity="0.5" />
                  <text x={ptX.px} y={ptX.py + 16} fill="#4fc3f7" fontSize="10" textAnchor="middle" opacity="0.5">{n}</text>
                </>
              )}
              {showY && n > 0 && (
                <>
                  <line x1={ptY.px - 4} y1={ptY.py} x2={ptY.px + 4} y2={ptY.py} stroke="#4fc3f7" strokeWidth="1" opacity="0.5" />
                  <text x={ptY.px - 14} y={ptY.py + 4} fill="#4fc3f7" fontSize="10" textAnchor="middle" opacity="0.5">{n}</text>
                </>
              )}
            </g>
          )
        })}

        {/* Origin dot */}
        <circle cx={CX} cy={CY} r="4" fill="#4fc3f7" />
        <text x={CX + 6} y={CY + 16} fill="#4fc3f7" fontSize="10" opacity="0.6">O</text>

        {/* "FUTURO / FUTURE" label */}
        <text x={CX - 32} y={CY - 4 * SCALE + 30} fill="#4fc3f7" fontSize="11" opacity="0.3" fontStyle="italic">
          {lang === 'it' ? 'futuro' : 'future'}
        </text>
        <text x={CX - 40} y={CY + 4 * SCALE - 10} fill="#e57373" fontSize="11" opacity="0.3" fontStyle="italic">
          {lang === 'it' ? 'passato' : 'past'}
        </text>
        <text x={CX + 2 * SCALE} y={CY - SCALE} fill="#78909c" fontSize="11" opacity="0.35" fontStyle="italic">
          {lang === 'it' ? 'altrove' : 'elsewhere'}
        </text>

        {/* Events */}
        {events.map((ev, i) => {
          const { px, py } = toSVG(ev.x, ev.ct)
          const col = evColors[i]
          return (
            <g key={ev.id}>
              <circle cx={px} cy={py} r="7" fill={col} opacity="0.9" />
              <text x={px + 10} y={py - 6} fill={col} fontSize="13" fontWeight="700">
                {eventLabels[i]}
              </text>
              <text x={px + 10} y={py + 8} fill={col} fontSize="9" opacity="0.75">
                ({ev.x.toFixed(1)}, {ev.ct.toFixed(1)})
              </text>
            </g>
          )
        })}

        {/* "click to add" hint */}
        {events.length === 0 && (
          <text x={W / 2} y={H - 14} fill="#455a64" fontSize="11" textAnchor="middle" fontStyle="italic">
            {lang === 'it' ? '↑ clicca per aggiungere eventi' : '↑ click to add events'}
          </text>
        )}
      </svg>

      {/* Legend */}
      <div className="mink-legend">
        <span className="mink-legend-item">
          <span className="mink-legend-line" style={{ background: '#4fc3f7' }} />
          {lang === 'it' ? 'assi S' : 'S axes'}
        </span>
        {beta > 0 && (
          <span className="mink-legend-item">
            <span className="mink-legend-line" style={{ background: '#f9a825', borderTop: '2px dashed #f9a825', height: 0 }} />
            {lang === 'it' ? "assi S'" : "S' axes"}
          </span>
        )}
        <span className="mink-legend-item">
          <span className="mink-legend-line" style={{ background: '#ffd54f' }} />
          {lang === 'it' ? 'cono di luce' : 'light cone'}
        </span>
      </div>

      {/* Event table */}
      {events.length > 0 && (
        <div className="mink-events">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
              {lang === 'it' ? 'Coordinate degli eventi' : 'Event coordinates'}
            </span>
            <button className="btn btn-ghost" style={{ fontSize: '0.78rem', padding: '3px 10px' }} onClick={clearEvents}>
              {lang === 'it' ? 'Cancella' : 'Clear'}
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr>
                  {[lang === 'it' ? 'Evento' : 'Event', 'x (S)', 'ct (S)', "x' (S')", "ct' (S')"].map(h => (
                    <th key={h} style={{ color: 'var(--muted)', fontWeight: 500, padding: '4px 8px', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {events.map((ev, i) => {
                  const { xp, ctp } = lorentz(ev.x, ev.ct, betaEff)
                  return (
                    <tr key={ev.id}>
                      <td style={{ padding: '4px 8px', color: evColors[i], fontWeight: 700 }}>{eventLabels[i]}</td>
                      {[ev.x, ev.ct, xp, ctp].map((v, j) => (
                        <td key={j} style={{ padding: '4px 8px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--primary)' }}>
                          {v.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
