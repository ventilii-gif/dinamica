interface GraphProps {
  points: [number, number][]
  points2?: [number, number][]
  xLabel?: string
  yLabel?: string
  color?: string
  color2?: string
  xMax?: number
}

export default function Graph({
  points, points2, xLabel = 't (s)', yLabel = '',
  color = '#4fc3f7', color2 = '#69f0ae', xMax
}: GraphProps) {
  const W = 460, H = 160
  const PAD = { top: 18, right: 16, bottom: 30, left: 50 }
  const iW = W - PAD.left - PAD.right
  const iH = H - PAD.top - PAD.bottom

  const allY = [
    ...points.map(p => p[1]),
    ...(points2 ?? []).map(p => p[1]),
    0,
  ]
  const xM = xMax ?? Math.max(...points.map(p => p[0]), 1)
  const yMin = Math.min(...allY)
  const yMax = Math.max(...allY, 0.001)
  const yRange = yMax - yMin || 1

  const tx = (x: number) => PAD.left + (x / xM) * iW
  const ty = (y: number) => PAD.top + iH - ((y - yMin) / yRange) * iH

  const toPath = (pts: [number, number][]) =>
    pts.length < 2 ? '' :
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${tx(p[0]).toFixed(1)},${ty(p[1]).toFixed(1)}`).join(' ')

  const yZero = ty(0)
  const hasNeg = yMin < -0.01

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <rect x={PAD.left} y={PAD.top} width={iW} height={iH} fill="rgba(0,0,0,0.35)" rx="5" />
      {hasNeg && (
        <line x1={PAD.left} y1={yZero} x2={PAD.left + iW} y2={yZero}
          stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 3" />
      )}
      <line x1={PAD.left} y1={PAD.top + iH} x2={PAD.left + iW} y2={PAD.top + iH}
        stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + iH}
        stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      {points.length > 1 && (
        <path d={toPath(points)} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      )}
      {points2 && points2.length > 1 && (
        <path d={toPath(points2)} fill="none" stroke={color2} strokeWidth="2"
          strokeDasharray="6 3" strokeLinejoin="round" />
      )}
      <text x={PAD.left + iW / 2} y={H - 3} textAnchor="middle"
        fill="rgba(255,255,255,0.4)" fontSize="10">{xLabel}</text>
      <text x={12} y={PAD.top + iH / 2} textAnchor="middle"
        fill="rgba(255,255,255,0.4)" fontSize="10"
        transform={`rotate(-90,12,${PAD.top + iH / 2})`}>{yLabel}</text>
      <text x={PAD.left - 4} y={PAD.top + 5} textAnchor="end"
        fill="rgba(255,255,255,0.35)" fontSize="9">{yMax.toFixed(1)}</text>
      {hasNeg && (
        <text x={PAD.left - 4} y={PAD.top + iH} textAnchor="end"
          fill="rgba(255,255,255,0.35)" fontSize="9">{yMin.toFixed(1)}</text>
      )}
      <text x={PAD.left + iW} y={PAD.top + iH + 14} textAnchor="middle"
        fill="rgba(255,255,255,0.35)" fontSize="9">{xM.toFixed(0)}</text>
    </svg>
  )
}
