import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

const stemV: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (d: number) => ({ pathLength: 1, opacity: 1, transition: { duration: 1.7, ease: EASE, delay: d } }),
}
const budV: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: (d: number) => ({ scale: 1, opacity: 1, transition: { duration: 1.1, ease: EASE, delay: d + 1.15 } }),
}
const leafV: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: (d: number) => ({ scale: 1, opacity: 1, transition: { duration: 0.9, ease: EASE, delay: d + 0.7 } }),
}

const STEM = '#6c7258'
const LEAF = '#92977b'

function Grow({ x, y, r = 0, s = 1, d, children, sway = 7 }: { x: number; y: number; r?: number; s?: number; d: number; children: ReactNode; sway?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <g className="sway" style={{ ['--d' as string]: `${sway}s` }}>
        <motion.g variants={budV} custom={d} style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}>
          {children}
        </motion.g>
      </g>
    </g>
  )
}

function Leaf({ x, y, r, s = 1, d }: { x: number; y: number; r: number; s?: number; d: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <motion.g variants={leafV} custom={d} style={{ transformBox: 'fill-box', transformOrigin: '0% 50%' }}>
        <path d="M0 0C8 -7 21 -7 30 0C21 7 8 7 0 0Z" fill={LEAF} opacity="0.85" />
        <path d="M1 0H27" stroke={STEM} strokeWidth="0.7" />
      </motion.g>
    </g>
  )
}

function Stem({ d, delay, w = 1.8 }: { d: string; delay: number; w?: number }) {
  return <motion.path d={d} variants={stemV} custom={delay} stroke={STEM} strokeWidth={w} strokeLinecap="round" fill="none" />
}

/* ---------- flower heads, drawn around (0,0) = where the stem ends ---------- */

function Cosmos({ color = '#c99595' }: { color?: string }) {
  return (
    <g>
      {Array.from({ length: 9 }).map((_, i) => (
        <path
          key={i}
          d="M0 0C-6 -8 -5 -22 0 -27C5 -22 6 -8 0 0Z"
          transform={`rotate(${i * 40 + (i % 2 ? 5 : -3)})`}
          fill={color}
          opacity={0.75 + (i % 3) * 0.08}
          stroke="#9c6b6b"
          strokeOpacity="0.35"
          strokeWidth="0.6"
        />
      ))}
      <circle r="6" fill="#c6a66b" />
      <circle r="6" fill="none" stroke="#8a6a3a" strokeOpacity="0.5" strokeWidth="0.8" strokeDasharray="1 1.6" />
    </g>
  )
}

function Tulip({ color = '#b97a80' }: { color?: string }) {
  return (
    <g>
      <path d="M0 2C-14 -3 -16 -25 -9 -38C-5 -29 -2 -32 0 -42C2 -32 5 -29 9 -38C16 -25 14 -3 0 2Z" fill={color} />
      <path d="M0 2C-6 -8 -6 -24 0 -36C6 -24 6 -8 0 2Z" fill="#d9a3a3" opacity="0.7" />
      <path d="M-7 -6C-9 -16 -8 -26 -5 -32" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </g>
  )
}

function Cluster({ color = '#faf8f2' }: { color?: string }) {
  const pts: Array<[number, number, number]> = [
    [0, -14, 4], [-10, -8, 3.5], [10, -9, 3.6], [-6, -20, 3], [7, -21, 3.2], [-15, -16, 2.8], [15, -17, 2.9], [0, -26, 2.8], [-3, -4, 2.6], [5, -2, 2.4],
  ]
  return (
    <g>
      {pts.map(([x, y], i) => (
        <path key={`s${i}`} d={`M0 4Q${x / 2} ${y / 2 + 2} ${x} ${y}`} stroke={STEM} strokeWidth="0.6" fill="none" />
      ))}
      {pts.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={i % 3 === 0 ? '#e3c1ba' : color} stroke="#c6a66b" strokeOpacity="0.4" strokeWidth="0.5" />
      ))}
    </g>
  )
}

function Wheat({ color = '#c6a66b' }: { color?: string }) {
  return (
    <g>
      <path d="M0 0V-46" stroke={STEM} strokeWidth="1" />
      {Array.from({ length: 7 }).map((_, i) => (
        <g key={i}>
          <ellipse cx={-3.6} cy={-8 - i * 6} rx="2.6" ry="5" transform={`rotate(-24 -3.6 ${-8 - i * 6})`} fill={color} opacity={0.75 + (i % 2) * 0.15} />
          <ellipse cx={3.6} cy={-11 - i * 6} rx="2.6" ry="5" transform={`rotate(24 3.6 ${-11 - i * 6})`} fill={color} opacity={0.7 + (i % 2) * 0.15} />
        </g>
      ))}
      <ellipse cx="0" cy="-50" rx="2.4" ry="5" fill={color} />
    </g>
  )
}

function Rose({ color = '#9c5866' }: { color?: string }) {
  return (
    <g transform="translate(0 -12)">
      <path d="M-14 4C-18 -6 -10 -16 0 -15C11 -16 18 -6 14 4C10 12 -10 12 -14 4Z" fill={color} opacity="0.9" />
      <path d="M-9 2C-11 -6 -5 -11 1 -10C8 -10 11 -3 8 3" fill="none" stroke="#f1d2d6" strokeOpacity="0.55" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M-4 0C-5 -4 -2 -6 1 -6C4 -6 5 -3 3 0" fill="none" stroke="#f1d2d6" strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" />
      <path d="M-14 4C-10 10 -4 13 0 13C4 13 10 10 14 4" fill="none" stroke="#5a2431" strokeOpacity="0.35" strokeWidth="1" />
      <path d="M-6 12C-10 16 -16 16 -20 14C-16 10 -10 10 -6 12Z" fill={LEAF} />
      <path d="M6 12C10 16 16 16 20 14C16 10 10 10 6 12Z" fill={LEAF} />
    </g>
  )
}

/** Open book with flowers growing out of its pages. */
export function BookWithFlowers({ className = '' }: { className?: string }) {
  const lines = [0, 1, 2, 3, 4, 5]
  return (
    <motion.svg
      viewBox="0 0 600 450"
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      role="img"
      aria-label="Ilustrasi buku terbuka dengan bunga-bunga yang tumbuh dari halamannya"
    >
      <defs>
        <radialGradient id="book-glow" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#e3cf9f" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#e6c7c1" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#f5f0e7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="page-l" x1="0" x2="1">
          <stop offset="0" stopColor="#f1e9da" />
          <stop offset="0.85" stopColor="#faf7f0" />
          <stop offset="1" stopColor="#e0d3bd" />
        </linearGradient>
        <linearGradient id="page-r" x1="1" x2="0">
          <stop offset="0" stopColor="#f1e9da" />
          <stop offset="0.85" stopColor="#faf7f0" />
          <stop offset="1" stopColor="#e0d3bd" />
        </linearGradient>
      </defs>

      <ellipse cx="300" cy="250" rx="300" ry="210" fill="url(#book-glow)" />
      <ellipse cx="300" cy="428" rx="250" ry="12" fill="#5a3e2b" opacity="0.16" />

      {/* cover */}
      <path d="M24 396C120 378 232 382 300 410C368 382 480 378 576 396L566 416C474 400 368 404 300 430C232 404 126 400 34 416Z" fill="#783c48" />
      <path d="M34 416C126 400 232 404 300 430C368 404 474 400 566 416" stroke="#4a1f29" strokeWidth="1" fill="none" opacity="0.5" />

      {/* page stacks */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} stroke="#cdbfa6" strokeWidth="0.8" fill="none" opacity={0.9 - i * 0.15}>
          <path d={`M300 ${406 + i * 3}C230 ${383 + i * 3} 130 ${379 + i * 3} ${40 - i} ${395 + i * 3}`} />
          <path d={`M300 ${406 + i * 3}C370 ${383 + i * 3} 470 ${379 + i * 3} ${560 + i} ${395 + i * 3}`} />
        </g>
      ))}

      {/* pages */}
      <path d="M300 404C230 380 130 376 44 392L70 250C150 236 240 242 300 270Z" fill="url(#page-l)" stroke="#cdbfa6" strokeWidth="0.8" />
      <path d="M300 404C370 380 470 376 556 392L530 250C450 236 360 242 300 270Z" fill="url(#page-r)" stroke="#cdbfa6" strokeWidth="0.8" />
      <path d="M300 270V404" stroke="#b9a68a" strokeWidth="1.2" />

      {/* writing on the pages */}
      <g stroke="#8a7663" strokeOpacity="0.32" strokeWidth="1.1" strokeLinecap="round" fill="none">
        {lines.map((k) => (
          <path key={`l${k}`} d={`M${86 - k * 3} ${274 + k * 18}C${150} ${262 + k * 18.5} ${226} ${266 + k * 19} ${282} ${290 + k * 19}`} strokeDasharray={k === 2 ? '60 14 90 400' : k === 5 ? '120 400' : undefined} />
        ))}
        {lines.map((k) => (
          <path key={`r${k}`} d={`M${514 + k * 3} ${274 + k * 18}C${450} ${262 + k * 18.5} ${374} ${266 + k * 19} ${318} ${290 + k * 19}`} strokeDasharray={k === 4 ? '80 12 40 400' : undefined} />
        ))}
      </g>
      {/* a tiny formula, half-forgotten */}
      <text x="128" y="358" fontFamily="Caveat, cursive" fontSize="17" fill="#8a7663" opacity="0.55" transform="rotate(-4 128 358)">a² + b² = c²</text>
      <text x="380" y="356" fontFamily="Caveat, cursive" fontSize="16" fill="#783c48" opacity="0.5" transform="rotate(4 380 356)">kamu pasti bisa</text>

      {/* stems */}
      <Stem d="M300 298C294 240 312 182 302 112" delay={0.1} w={2} />
      <Stem d="M288 300C270 252 252 222 236 176" delay={0.35} />
      <Stem d="M312 300C330 252 352 222 374 168" delay={0.25} />
      <Stem d="M276 304C252 276 216 258 186 226" delay={0.55} w={1.5} />
      <Stem d="M324 304C352 276 398 258 430 236" delay={0.5} w={1.6} />
      <Stem d="M294 306C280 290 268 280 256 262" delay={0.8} w={1.2} />
      <Stem d="M308 306C322 288 336 280 350 270" delay={0.85} w={1.2} />

      {/* leaves */}
      <Leaf x={300} y={226} r={-150} s={1.1} d={0.1} />
      <Leaf x={306} y={180} r={-30} s={0.9} d={0.2} />
      <Leaf x={258} y={226} r={-170} s={0.85} d={0.35} />
      <Leaf x={346} y={226} r={-20} s={0.8} d={0.3} />
      <Leaf x={230} y={258} r={-160} s={0.7} d={0.55} />
      <Leaf x={384} y={258} r={-15} s={0.75} d={0.5} />

      {/* heads */}
      <Grow x={302} y={110} s={1.25} d={0.1} sway={8}>
        <Cosmos />
      </Grow>
      <Grow x={236} y={178} r={-16} s={0.95} d={0.35} sway={6.5}>
        <Tulip />
      </Grow>
      <Grow x={374} y={170} r={14} d={0.25} sway={7.5}>
        <Cluster />
      </Grow>
      <Grow x={186} y={228} r={-48} s={0.9} d={0.55} sway={9}>
        <Wheat />
      </Grow>
      <Grow x={432} y={238} r={30} s={1} d={0.5} sway={6}>
        <Rose />
      </Grow>
      <Grow x={256} y={264} r={-30} s={0.6} d={0.8} sway={5.5}>
        <Cosmos color="#e3c1ba" />
      </Grow>
      <Grow x={350} y={272} r={26} s={0.55} d={0.85} sway={6}>
        <Cosmos color="#d9bf88" />
      </Grow>
    </motion.svg>
  )
}

/** A row of flowers growing up from the bottom edge (finale). */
export function FlowerBed({ className = '' }: { className?: string }) {
  const plants: Array<{ x: number; h: number; bend: number; head: 'cosmos' | 'tulip' | 'cluster' | 'wheat' | 'rose'; s: number; d: number; c?: string }> = [
    { x: 40, h: 120, bend: -18, head: 'wheat', s: 0.9, d: 0.2 },
    { x: 110, h: 170, bend: 14, head: 'cosmos', s: 1, d: 0 },
    { x: 180, h: 110, bend: -10, head: 'cluster', s: 0.9, d: 0.35 },
    { x: 250, h: 190, bend: 8, head: 'tulip', s: 1, d: 0.15 },
    { x: 330, h: 130, bend: -14, head: 'cosmos', s: 0.75, d: 0.45, c: '#e3c1ba' },
    { x: 400, h: 210, bend: 4, head: 'rose', s: 1.05, d: 0.05 },
    { x: 470, h: 140, bend: 16, head: 'cluster', s: 0.95, d: 0.3 },
    { x: 540, h: 180, bend: -8, head: 'cosmos', s: 0.95, d: 0.2, c: '#d9bf88' },
    { x: 610, h: 120, bend: 12, head: 'wheat', s: 0.85, d: 0.4 },
    { x: 680, h: 165, bend: -12, head: 'tulip', s: 0.9, d: 0.25 },
    { x: 750, h: 115, bend: 10, head: 'cluster', s: 0.85, d: 0.5 },
  ]
  return (
    <motion.svg
      viewBox="0 0 790 240"
      preserveAspectRatio="xMidYMax meet"
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      aria-hidden="true"
    >
      {plants.map((p, i) => {
        const topX = p.x + p.bend
        const topY = 240 - p.h
        return (
          <g key={i}>
            <Stem d={`M${p.x} 242C${p.x - p.bend * 0.4} ${240 - p.h * 0.4} ${topX + p.bend * 0.3} ${240 - p.h * 0.7} ${topX} ${topY}`} delay={p.d} w={1.6} />
            <Leaf x={p.x - p.bend * 0.1} y={240 - p.h * 0.35} r={i % 2 ? -25 : -155} s={0.75} d={p.d} />
            <Grow x={topX} y={topY} r={p.bend * 0.6} s={p.s} d={p.d} sway={6 + (i % 4)}>
              {p.head === 'cosmos' && <Cosmos color={p.c} />}
              {p.head === 'tulip' && <Tulip />}
              {p.head === 'cluster' && <Cluster />}
              {p.head === 'wheat' && <Wheat />}
              {p.head === 'rose' && <Rose color="#b5677a" />}
            </Grow>
          </g>
        )
      })}
    </motion.svg>
  )
}
