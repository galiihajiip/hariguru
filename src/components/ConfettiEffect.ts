import confetti from 'canvas-confetti'
import { prefersReducedMotion } from '../utils/scroll'

let petalShape: confetti.Shape | null = null
let leafShape: confetti.Shape | null = null

function shapes() {
  if (!petalShape) {
    try {
      petalShape = confetti.shapeFromPath({ path: 'M10 27C3 21 1 13 4 6C6 2 9 1 10 1C11 1 14 2 16 6C19 13 17 21 10 27Z' })
      leafShape = confetti.shapeFromPath({ path: 'M0 10C4 2 14 0 20 2C18 10 10 16 0 10Z' })
    } catch {
      /* older browsers without Path2D: fall back to default shapes */
    }
  }
  return [petalShape, leafShape, 'square' as const].filter(Boolean) as confetti.Shape[]
}

/** Small burst of petals and paper flakes from a point on screen. */
export function burstPetals(origin: { x: number; y: number }) {
  if (prefersReducedMotion()) return
  const s = shapes()
  const base = {
    origin,
    shapes: s,
    colors: ['#c99595', '#e3c1ba', '#faf8f2', '#c6a66b', '#92977b'],
    disableForReducedMotion: true,
    zIndex: 60,
    ticks: 220,
    gravity: 0.7,
    scalar: 1.05,
  }
  confetti({ ...base, particleCount: 46, spread: 78, startVelocity: 32 })
  setTimeout(() => confetti({ ...base, particleCount: 24, spread: 120, startVelocity: 22, scalar: 0.8 }), 160)
}

/** Gentle gold and ivory celebration for the finale. */
export function celebrateFinale() {
  if (prefersReducedMotion()) return
  const s = shapes()
  const base = {
    shapes: s,
    colors: ['#c6a66b', '#e3cf9f', '#faf8f2', '#f5f0e7', '#e3c1ba'],
    disableForReducedMotion: true,
    zIndex: 60,
    ticks: 320,
    gravity: 0.55,
    drift: 0.2,
    scalar: 1,
  }
  confetti({ ...base, particleCount: 50, angle: 60, spread: 60, startVelocity: 46, origin: { x: 0, y: 0.85 } })
  confetti({ ...base, particleCount: 50, angle: 120, spread: 60, startVelocity: 46, origin: { x: 1, y: 0.85 } })
  setTimeout(() => confetti({ ...base, particleCount: 36, spread: 140, startVelocity: 26, origin: { x: 0.5, y: 0.55 }, scalar: 0.8 }), 280)
}
