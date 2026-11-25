/**
 * Hand-drawn botanical & stationery illustrations, all original SVG.
 * Kept deliberately soft and slightly irregular so they read as pressed,
 * dried flowers rather than icons.
 */
import type { SVGProps } from 'react'

type Svg = SVGProps<SVGSVGElement>

const INK = '#4a433b'
const STEM = '#6c7258'
const LEAF = '#92977b'

/** Pressed cosmos-like flower with a long curving stem. */
export function PressedFlower({ tone = 'rose', ...props }: Svg & { tone?: 'rose' | 'gold' | 'blush' }) {
  const petal = tone === 'gold' ? '#d9bf88' : tone === 'blush' ? '#e3c1ba' : '#c99595'
  const vein = tone === 'gold' ? '#a98a52' : '#9c6b6b'
  return (
    <svg viewBox="0 0 120 230" fill="none" aria-hidden="true" {...props}>
      <g opacity="0.95">
        <path d="M61 228C57 196 68 168 60 136C53 108 57 86 60 66" stroke={STEM} strokeWidth="2" strokeLinecap="round" />
        <path d="M60 170C44 163 30 168 17 153C33 146 50 150 60 170Z" fill={LEAF} opacity="0.8" />
        <path d="M60 170C47 160 33 156 20 154" stroke={STEM} strokeWidth="0.8" />
        <path d="M59 128C76 118 92 124 103 108C86 101 70 108 59 128Z" fill={LEAF} opacity="0.72" />
        <path d="M59 128C72 118 87 112 100 109" stroke={STEM} strokeWidth="0.8" />
        <path d="M61 196C70 192 78 194 84 186C75 182 66 185 61 196Z" fill={LEAF} opacity="0.6" />
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 45 + (i % 2 ? 6 : -4)} 60 56)`}>
            <path
              d={`M60 56C${54 - (i % 3)} 46 ${53 + (i % 2)} 28 60 ${20 + (i % 3) * 2}C${67 - (i % 2)} 28 ${66 + (i % 3)} 46 60 56Z`}
              fill={petal}
              opacity={0.78 + (i % 3) * 0.06}
            />
            <path d={`M60 54L60 ${26 + (i % 3) * 2}`} stroke={vein} strokeWidth="0.5" opacity="0.6" />
          </g>
        ))}
        <circle cx="60" cy="56" r="8.5" fill="#c6a66b" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={60 + Math.cos(i) * 4.5} cy={56 + Math.sin(i * 1.7) * 4} r="0.9" fill="#8a6a3a" />
        ))}
      </g>
    </svg>
  )
}

/** Delicate sprig of small buds (baby's breath / lavender feel). */
export function Sprig({ color = '#c99595', ...props }: Svg & { color?: string }) {
  const buds = [
    [52, 30, -20], [66, 40, 25], [47, 56, -30], [70, 66, 30], [50, 82, -25], [68, 94, 28], [54, 110, -20], [66, 122, 24],
  ]
  return (
    <svg viewBox="0 0 120 220" fill="none" aria-hidden="true" {...props}>
      <path d="M60 218C62 180 54 150 60 110C64 80 56 50 58 22" stroke={STEM} strokeWidth="1.6" strokeLinecap="round" />
      {buds.map(([x, y, r], i) => (
        <g key={i}>
          <path d={`M${x < 60 ? 58 : 60} ${y + 8}Q${(x + 60) / 2} ${y + 6} ${x} ${y}`} stroke={STEM} strokeWidth="0.9" />
          <ellipse cx={x} cy={y} rx="4.2" ry="6.5" transform={`rotate(${r} ${x} ${y})`} fill={color} opacity={0.65 + (i % 3) * 0.1} />
        </g>
      ))}
      <ellipse cx="58" cy="18" rx="3.4" ry="6" fill={color} opacity="0.85" />
      <path d="M59 160C44 150 36 152 26 140C40 136 52 142 59 160Z" fill={LEAF} opacity="0.7" />
      <path d="M61 182C74 176 84 178 92 168C80 164 68 168 61 182Z" fill={LEAF} opacity="0.6" />
    </svg>
  )
}

/** Eucalyptus-like branch with round leaves. */
export function LeafBranch(props: Svg) {
  const leaves = [
    [44, 40, 9], [74, 52, 10], [40, 74, 11], [78, 88, 10], [44, 108, 12], [76, 124, 11], [48, 146, 12], [72, 164, 10],
  ]
  return (
    <svg viewBox="0 0 120 220" fill="none" aria-hidden="true" {...props}>
      <path d="M60 220C58 170 64 130 58 90C55 64 60 40 62 18" stroke={STEM} strokeWidth="1.6" strokeLinecap="round" />
      {leaves.map(([x, y, r], i) => (
        <g key={i}>
          <path d={`M${x < 60 ? 59 : 61} ${y + 4}L${x} ${y}`} stroke={STEM} strokeWidth="0.9" />
          <circle cx={x} cy={y} r={r} fill={i % 2 ? '#a3a88c' : LEAF} opacity={0.55 + (i % 3) * 0.12} />
          <path d={`M${x - r * 0.6} ${y + r * 0.3}Q${x} ${y} ${x + r * 0.6} ${y - r * 0.3}`} stroke={STEM} strokeWidth="0.5" opacity="0.6" />
        </g>
      ))}
      <circle cx="62" cy="16" r="6" fill={LEAF} opacity="0.7" />
    </svg>
  )
}

/** Four-point sparkle star. */
export function Sparkle({ color = '#c6a66b', ...props }: Svg & { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 0.5C12.9 7.6 16.4 11.1 23.5 12C16.4 12.9 12.9 16.4 12 23.5C11.1 16.4 7.6 12.9 0.5 12C7.6 11.1 11.1 7.6 12 0.5Z" fill={color} />
    </svg>
  )
}

/** Hand-drawn divider: wavy line with a tiny leaf and dots. */
export function Divider({ color = '#8a7663', ...props }: Svg & { color?: string }) {
  return (
    <svg viewBox="0 0 240 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 13C24 9 40 16 62 12C80 9 92 14 104 12" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M136 12C150 14 164 9 182 12C202 16 218 10 236 12" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M120 4C126 8 127 15 120 20C113 15 114 8 120 4Z" fill={LEAF} opacity="0.85" />
      <path d="M120 6V19" stroke={STEM} strokeWidth="0.7" />
      <circle cx="110" cy="12" r="1.6" fill={color} />
      <circle cx="130" cy="12" r="1.6" fill={color} />
    </svg>
  )
}

/** Wobbly hand-drawn underline used under emphasised words. */
export function Squiggle({ color = '#c99595', ...props }: Svg & { color?: string }) {
  return (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" fill="none" aria-hidden="true" {...props}>
      <path d="M2 8C30 3 52 10 82 6C112 2 140 9 168 5C182 3 192 5 198 6" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

/** Curly hand-drawn arrow. */
export function CurlyArrow({ color = INK, ...props }: Svg & { color?: string }) {
  return (
    <svg viewBox="0 0 90 70" fill="none" aria-hidden="true" {...props}>
      <path d="M4 8C22 4 40 10 44 24C47 36 34 42 30 34C26 24 46 20 58 30C68 38 72 50 74 62" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M66 55L74 63L81 53" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Small doodled heart. */
export function DoodleHeart({ color = '#783c48', ...props }: Svg & { color?: string }) {
  return (
    <svg viewBox="0 0 40 36" fill="none" aria-hidden="true" {...props}>
      <path d="M20 33C14 27 3 21 3 11C3 5 8 2 12 2C16 2 19 5 20 9C21 5 24 2 29 2C34 2 38 6 37 12C36 21 26 27 20 33Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 10C8 7 10 6 12 6" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

/** Single petal shape used for falling/floating petals. */
export function Petal({ color = '#c99595', ...props }: Svg & { color?: string }) {
  return (
    <svg viewBox="0 0 20 28" aria-hidden="true" {...props}>
      <path d="M10 27C3 21 1 13 4 6C6 2 9 1 10 1C11 1 14 2 16 6C19 13 17 21 10 27Z" fill={color} />
      <path d="M10 25L10 5" stroke="rgba(0,0,0,0.12)" strokeWidth="0.6" />
    </svg>
  )
}

/** Chalk-style doodle of a little school bell — the sound of "bel pulang". */
export function BellDoodle({ color = INK, ...props }: Svg & { color?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path d="M24 6C16 6 12 13 12 21V30L8 35H40L36 30V21C36 13 32 6 24 6Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M20 39C21 42 27 42 28 39" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 3V6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 14C3 18 3 22 4 25M43 14C45 18 45 22 44 25" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}
