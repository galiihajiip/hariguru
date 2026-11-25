import { useId, type SVGProps } from 'react'

type Svg = SVGProps<SVGSVGElement>

/** Irregular poured-wax outline, generated once (deterministic). */
const WAX_PATH = (() => {
  const pts: string[] = []
  const n = 28
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    const r = 55 + Math.sin(i * 2.3) * 2.6 + Math.cos(i * 5.1) * 1.8 + (i % 4 === 0 ? 2.2 : 0)
    pts.push(`${(60 + Math.cos(a) * r).toFixed(1)} ${(60 + Math.sin(a) * r).toFixed(1)}`)
  }
  return `M${pts.join('L')}Z`
})()

export function WaxSeal({ label = 'Terima Kasih', ...props }: Svg & { label?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id={`wax-${id}`} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#a65a68" />
          <stop offset="45%" stopColor="#7d3a48" />
          <stop offset="100%" stopColor="#4f1e2a" />
        </radialGradient>
        <radialGradient id={`waxin-${id}`} cx="60%" cy="65%" r="70%">
          <stop offset="0%" stopColor="#8a4352" />
          <stop offset="100%" stopColor="#5a2431" />
        </radialGradient>
        <path id={`ring-${id}`} d="M60 60m-33 0a33 33 0 1 1 66 0a33 33 0 1 1 -66 0" />
      </defs>
      <path d={WAX_PATH} fill={`url(#wax-${id})`} />
      <path d={WAX_PATH} fill="none" stroke="#3b1520" strokeOpacity="0.35" strokeWidth="1" />
      <circle cx="60" cy="60" r="43" fill={`url(#waxin-${id})`} />
      <circle cx="60" cy="60" r="43" fill="none" stroke="#c98a95" strokeOpacity="0.35" strokeWidth="1" />
      <circle cx="60" cy="61" r="43" fill="none" stroke="#2e0f17" strokeOpacity="0.4" strokeWidth="1" />
      <circle cx="60" cy="60" r="26" fill="none" stroke="#e7b9c0" strokeOpacity="0.25" strokeWidth="0.8" />
      <text fill="#f1d2d6" fillOpacity="0.85" fontFamily="DM Sans, sans-serif" fontSize="8.4" fontWeight="600">
        <textPath href={`#ring-${id}`} startOffset="0" textLength="204" lengthAdjust="spacing">
          {`${label.toUpperCase()} · ${label.toUpperCase()} ·`}
        </textPath>
      </text>
      {/* embossed blossom */}
      <g transform="translate(60 60)">
        {[0, 72, 144, 216, 288].map((r) => (
          <path key={r} d="M0 0C-6 -6 -6 -15 0 -19C6 -15 6 -6 0 0Z" transform={`rotate(${r})`} fill="#5a2431" stroke="#e7b9c0" strokeOpacity="0.45" strokeWidth="0.8" />
        ))}
        <circle r="3.4" fill="#e7b9c0" fillOpacity="0.55" />
      </g>
      <path d="M28 36C34 26 46 20 58 19" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/** Vintage postage stamp with perforated edge and a little illustration. */
export function PostageStamp(props: Svg) {
  const id = useId().replace(/:/g, '')
  const holes: Array<[number, number]> = []
  for (let x = 4; x <= 76; x += 6) holes.push([x, 0], [x, 100])
  for (let y = 4; y <= 96; y += 6) holes.push([0, y], [80, y])
  return (
    <svg viewBox="0 0 80 100" aria-hidden="true" {...props}>
      <defs>
        <mask id={`perf-${id}`}>
          <rect width="80" height="100" fill="#fff" />
          {holes.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.3" fill="#000" />
          ))}
        </mask>
      </defs>
      <g mask={`url(#perf-${id})`}>
        <rect width="80" height="100" fill="#faf6ec" />
        <rect x="7" y="7" width="66" height="86" fill="#e9d8c4" />
        <rect x="7" y="7" width="66" height="86" fill="none" stroke="#783c48" strokeWidth="0.8" />
        {/* sky + window light */}
        <rect x="11" y="11" width="58" height="60" fill="#efe2cf" />
        <path d="M30 11L52 71H62L40 11Z" fill="#fff6e2" opacity="0.6" />
        {/* desk + book + flower */}
        <path d="M11 62H69V71H11Z" fill="#c9b08d" />
        <path d="M24 60C30 56 38 56 40 59C42 56 50 56 56 60V62H24Z" fill="#faf8f2" stroke="#8a7663" strokeWidth="0.6" />
        <path d="M40 59V62" stroke="#8a7663" strokeWidth="0.6" />
        <path d="M40 58C40 46 37 38 41 28" stroke="#6c7258" strokeWidth="1" fill="none" />
        <path d="M40 46C34 44 32 40 33 37C37 38 40 41 40 46Z" fill="#92977b" />
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <ellipse key={r} cx="41" cy="22" rx="2.6" ry="5.5" transform={`rotate(${r} 41 27)`} fill="#c99595" />
        ))}
        <circle cx="41" cy="27" r="2.4" fill="#c6a66b" />
        <text x="40" y="82" textAnchor="middle" fontFamily="Instrument Serif, serif" fontSize="9" fill="#783c48">Hari Guru</text>
        <text x="40" y="90" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="5" letterSpacing="1.2" fill="#8a7663">2 5 · X I · 2 6</text>
      </g>
    </svg>
  )
}

/** Circular postmark with wavy cancellation lines. */
export function Postmark({ city = 'SURABAYA', date = '25 NOV 2026', color = '#783c48', ...props }: Svg & { city?: string; date?: string; color?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 160 90" fill="none" aria-hidden="true" {...props}>
      <defs>
        <path id={`pm-top-${id}`} d="M16 45a29 29 0 0 1 58 0" />
        <path id={`pm-bot-${id}`} d="M18 45a27 27 0 0 0 54 0" />
      </defs>
      <g stroke={color} strokeOpacity="0.7" opacity="0.85">
        <circle cx="45" cy="45" r="36" strokeWidth="1.4" />
        <circle cx="45" cy="45" r="25" strokeWidth="0.9" />
        {[30, 40, 50, 60].map((y, i) => (
          <path key={y} d={`M84 ${y}C${94 + i} ${y - 5} ${104} ${y + 5} ${116} ${y}S${138} ${y - 5} ${156} ${y}`} strokeWidth="1.3" />
        ))}
      </g>
      <g fill={color} fillOpacity="0.75" fontFamily="DM Sans, sans-serif" fontWeight="600">
        <text fontSize="7.5" letterSpacing="1.6">
          <textPath href={`#pm-top-${id}`} startOffset="50%" textAnchor="middle">{city}</textPath>
        </text>
        <text x="45" y="48.5" textAnchor="middle" fontSize="7.5" letterSpacing="0.6">{date}</text>
        <text fontSize="6.2" letterSpacing="1.4">
          <textPath href={`#pm-bot-${id}`} startOffset="50%" textAnchor="middle" dominantBaseline="hanging">HARI GURU</textPath>
        </text>
      </g>
    </svg>
  )
}
