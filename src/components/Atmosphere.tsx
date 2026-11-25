import { memo, type CSSProperties } from 'react'
import { Petal, Sparkle } from './Botanicals'

/** Small deterministic PRNG so decorative layouts are stable across renders. */
function rand(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

type Vars = CSSProperties & Record<`--${string}`, string | number>

/** Tiny floating dust motes catching the light. Pure CSS animation. */
export const DustParticles = memo(function DustParticles({ count = 22, seed = 7, className = '' }: { count?: number; seed?: number; className?: string }) {
  const r = rand(seed)
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const size = 2 + r() * 4
        const style: Vars = {
          left: `${r() * 100}%`,
          top: `${15 + r() * 80}%`,
          width: size,
          height: size,
          '--d': `${10 + r() * 14}s`,
          '--delay': `${-r() * 20}s`,
          '--dx': `${(r() - 0.5) * 80}px`,
          '--o': (0.35 + r() * 0.5).toFixed(2),
        }
        return <span key={i} className="dust" style={style} />
      })}
    </div>
  )
})

/** Petals slowly falling through a section. */
export const FallingPetals = memo(function FallingPetals({ count = 10, seed = 3, colors = ['#c99595', '#e3c1ba', '#d9bf88'] }: { count?: number; seed?: number; colors?: string[] }) {
  const r = rand(seed)
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const size = 9 + r() * 9
        const style: Vars = {
          left: `${r() * 100}%`,
          width: size,
          '--d': `${14 + r() * 14}s`,
          '--delay': `${-r() * 28}s`,
          '--dx': `${(r() - 0.3) * 160}px`,
          '--r': `${200 + r() * 360}deg`,
        }
        return (
          <span key={i} className="petal" style={style}>
            <Petal color={colors[i % colors.length]} width={size} style={{ opacity: 0.75 }} />
          </span>
        )
      })}
    </div>
  )
})

/** Twinkling sparkles scattered over an area. */
export const StarField = memo(function StarField({ count = 16, seed = 11, color = '#e3cf9f' }: { count?: number; seed?: number; color?: string }) {
  const r = rand(seed)
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const size = 6 + r() * 12
        const style: Vars = {
          position: 'absolute',
          left: `${r() * 100}%`,
          top: `${r() * 100}%`,
          width: size,
          height: size,
          '--d': `${3 + r() * 4}s`,
          '--delay': `${-r() * 6}s`,
        }
        return <Sparkle key={i} className="twinkle" color={color} style={style} />
      })}
    </div>
  )
})

/** Jagged torn-paper edge used between sections. */
export function TornEdge({ color, flip = false, seed = 5, className = '' }: { color: string; flip?: boolean; seed?: number; className?: string }) {
  const r = rand(seed)
  const pts: string[] = ['0,40']
  for (let x = 0; x <= 1440; x += 24 + Math.floor(r() * 24)) {
    pts.push(`${x},${(10 + r() * 20).toFixed(1)}`)
  }
  pts.push('1440,18', '1440,40')
  return (
    <svg
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none block h-5 w-full sm:h-8 ${className}`}
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <polygon points={pts.join(' ')} fill={color} />
    </svg>
  )
}
