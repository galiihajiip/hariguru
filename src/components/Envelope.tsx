import { motion, useAnimate, useReducedMotion } from 'motion/react'
import { forwardRef, useImperativeHandle, useId } from 'react'
import { WaxSeal, PostageStamp, Postmark } from './Stationery'
import { PressedFlower, Sprig } from './Botanicals'
import { usePersonalization } from '../hooks/usePersonalization'
import { hero, meta } from '../data/letterContent'
import { burstPetals } from './ConfettiEffect'

export interface EnvelopeHandle {
  open: () => Promise<void>
}

const EASE = [0.22, 1, 0.36, 1] as const

/** Jagged crack through the wax seal: left and right halves. */
const CRACK_LEFT = 'polygon(0 0, 54% 0, 47% 22%, 56% 41%, 45% 60%, 53% 79%, 48% 100%, 0 100%)'
const CRACK_RIGHT = 'polygon(54% 0, 100% 0, 100% 100%, 48% 100%, 53% 79%, 45% 60%, 56% 41%, 47% 22%)'

/**
 * The envelope is built from layered HTML/SVG so the flap can rotate in real 3D:
 *   back  →  liner/inside  →  letter  →  pocket (front folds)  →  flap  →  seal
 */
export const Envelope = forwardRef<EnvelopeHandle, { opened: boolean; onActivate: () => void; disabled?: boolean }>(
  function Envelope({ opened, onActivate, disabled }, ref) {
    const [scope, animate] = useAnimate<HTMLDivElement>()
    const reduce = useReducedMotion()
    const { to, sapaan } = usePersonalization()
    const linerId = useId().replace(/:/g, '')

    useImperativeHandle(ref, () => ({
      async open() {
        const q = (s: string) => scope.current?.querySelector(s)
        if (!scope.current) return
        if (reduce) {
          animate('.env-seal', { opacity: 0 }, { duration: 0.2 })
          animate('.env-flap', { rotateX: 128 }, { duration: 0.01 })
          animate('.env-body', { y: '16%', scale: 0.95 }, { duration: 0.01 })
          ;(q('.env-flap') as HTMLElement).style.zIndex = '1'
          await animate('.env-letter', { y: '-46%' }, { duration: 0.3 })
          return
        }
        await animate('.env-body', { rotate: [0, -1.6, 1.4, -0.8, 0], y: [0, -4, 0] }, { duration: 0.55, ease: 'easeInOut' })
        animate('.env-seal-whole', { opacity: 0 }, { duration: 0.05 })
        animate('.env-seal-left', { opacity: [1, 1, 0], x: -26, y: 34, rotate: -28 }, { duration: 0.7, ease: EASE })
        await animate('.env-seal-right', { opacity: [1, 1, 0], x: 26, y: 40, rotate: 24 }, { duration: 0.7, ease: EASE })
        animate('.env-body', { y: '16%', scale: 0.95 }, { duration: 1.4, ease: EASE })
        await animate('.env-flap', { rotateX: 92 }, { duration: 0.42, ease: [0.5, 0, 0.75, 0] })
        ;(q('.env-flap') as HTMLElement).style.zIndex = '1'
        await animate('.env-flap', { rotateX: 128 }, { duration: 0.55, ease: [0.25, 1, 0.5, 1] })
        const rect = scope.current.getBoundingClientRect()
        const letter = animate('.env-letter', { y: '-48%', rotate: -1.2, scale: 1.02 }, { duration: 1.1, ease: EASE })
        setTimeout(() => {
          burstPetals({
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: Math.max(0.15, (rect.top + rect.height * 0.2) / window.innerHeight),
          })
        }, 380)
        await letter
      },
    }))

    return (
      <div ref={scope} className="relative mx-auto w-full max-w-[540px] pt-[14%] sm:pt-[20%]">
        {/* idle float */}
        <motion.div
          animate={reduce ? undefined : { y: [0, -9, 0], rotate: [-0.4, 0.5, -0.4] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <button
            type="button"
            onClick={onActivate}
            disabled={disabled || opened}
            aria-label={opened ? `Surat untuk ${to} sudah terbuka` : `Buka surat untuk ${to}`}
            className="env-body group relative block w-full cursor-pointer select-none disabled:cursor-default"
            style={{ aspectRatio: '1.56 / 1', perspective: 1400, WebkitTapHighlightColor: 'transparent' }}
          >
            {/* soft ground shadow */}
            <span className="absolute -bottom-6 left-[8%] right-[8%] h-8 rounded-[50%] bg-[#5a3e2b]/25 blur-xl" aria-hidden="true" />

            {/* back of envelope + inside */}
            <span
              className="absolute inset-0 overflow-hidden rounded-[6px]"
              style={{
                background: 'linear-gradient(180deg, #cdb798 0%, #dccab0 55%, #e5d6bf 100%)',
                boxShadow: '0 30px 60px -28px rgba(70,45,25,0.55), 0 8px 18px -10px rgba(70,45,25,0.35)',
              }}
              aria-hidden="true"
            />

            {/* the letter inside */}
            <span
              className="env-letter paper-sheet absolute left-[6%] right-[6%] top-[5%] block h-[90%] rounded-[3px] text-left"
              style={{ zIndex: 2, transformOrigin: '50% 100%' }}
              aria-hidden="true"
            >
              <span className="absolute inset-x-[8%] top-[9%] block">
                <span className="eyebrow block text-[0.5rem] text-brown sm:text-[0.6rem]">Surabaya, 25 November 2026</span>
                <span className="font-hand mt-1 block text-[clamp(1.25rem,4.6vw,2rem)] leading-tight text-burgundy">Untuk {to},</span>
                <span className="mt-2 block space-y-[0.55rem] sm:space-y-3">
                  {[92, 84, 96, 70].map((w, i) => (
                    <span key={i} className="block h-px bg-brown/25" style={{ width: `${w}%` }} />
                  ))}
                </span>
                <span className="font-hand mt-2 block text-[clamp(0.85rem,2.6vw,1.1rem)] text-ink-soft/80">
                  ada yang ingin saya sampaikan kepada {sapaan}…
                </span>
              </span>
              <PressedFlower tone="blush" className="absolute bottom-[8%] right-[6%] h-[38%] w-auto rotate-[18deg] opacity-80" />
            </span>

            {/* front pocket (left, right, bottom folds) */}
            <svg
              viewBox="0 0 156 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              style={{ zIndex: 3 }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={`pl-${linerId}`} x1="0" x2="1">
                  <stop offset="0" stopColor="#ecdfca" />
                  <stop offset="1" stopColor="#e4d4bb" />
                </linearGradient>
                <linearGradient id={`pr-${linerId}`} x1="1" x2="0">
                  <stop offset="0" stopColor="#ecdfca" />
                  <stop offset="1" stopColor="#e2d1b6" />
                </linearGradient>
                <linearGradient id={`pb-${linerId}`} x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0" stopColor="#f3e9d8" />
                  <stop offset="1" stopColor="#eadcc5" />
                </linearGradient>
              </defs>
              <path d="M0 2 Q0 0 2 0 L73 55 Q78 58.5 73 62 L2 100 Q0 100 0 98Z" fill={`url(#pl-${linerId})`} />
              <path d="M156 2 Q156 0 154 0 L83 55 Q78 58.5 83 62 L154 100 Q156 100 156 98Z" fill={`url(#pr-${linerId})`} />
              <path d="M0 98 L70 50 Q78 45 86 50 L156 98 Q156 100 153 100 L3 100 Q0 100 0 98Z" fill={`url(#pb-${linerId})`} />
              <path d="M0 98 L70 50 Q78 45 86 50 L156 98" fill="none" stroke="#b79f7e" strokeOpacity="0.45" strokeWidth="0.35" />
            </svg>

            {/* address on the pocket */}
            <span className="absolute inset-x-0 bottom-[5%] block text-center" style={{ zIndex: 4 }} aria-hidden="true">
              <span className="mx-auto flex max-w-[82%] items-baseline justify-center gap-2">
                <span className="eyebrow shrink-0 text-[0.5rem] text-brown/90 sm:text-[0.6rem]">Untuk:</span>
                <span className="font-hand truncate pl-0.5 pr-[0.35em] text-[clamp(1.25rem,5vw,2.1rem)] leading-[1.1] text-ink">{to}</span>
              </span>
              <span className="eyebrow mt-0.5 block text-[0.46rem] tracking-[0.2em] text-brown/80 sm:text-[0.56rem]">{meta.school}</span>
            </span>

            {/* flap */}
            <span
              className="env-flap absolute inset-x-0 top-0 block h-[60%]"
              style={{ zIndex: 5, transformOrigin: '50% 0%', transformStyle: 'preserve-3d' }}
              aria-hidden="true"
            >
              {/* outside face */}
              <svg viewBox="0 0 156 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" style={{ backfaceVisibility: 'hidden' }}>
                <defs>
                  <linearGradient id={`fo-${linerId}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#efe4d1" />
                    <stop offset="1" stopColor="#e6d6bd" />
                  </linearGradient>
                  <filter id={`fs-${linerId}`} x="-10%" y="-10%" width="120%" height="140%">
                    <feDropShadow dx="0" dy="1.2" stdDeviation="1.1" floodColor="#5a3e2b" floodOpacity="0.28" />
                  </filter>
                </defs>
                <path d="M2 0 L154 0 Q156 0 154.5 1.5 L83 56 Q78 60 73 56 L1.5 1.5 Q0 0 2 0Z" fill={`url(#fo-${linerId})`} filter={`url(#fs-${linerId})`} />
              </svg>
              <span
                className="font-hand absolute left-[5%] top-[7%] block -rotate-3 text-[clamp(0.8rem,2.7vw,1.15rem)] leading-none text-brown"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {hero.envelopeFrom}
              </span>
              {/* inside face with patterned liner */}
              <svg
                viewBox="0 0 156 60"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
              >
                <defs>
                  <pattern id={`lp-${linerId}`} width="10" height="10" patternUnits="userSpaceOnUse">
                    <rect width="10" height="10" fill="#7f3f4c" />
                    <circle cx="2.5" cy="2.5" r="1" fill="#c99595" opacity="0.8" />
                    <circle cx="7.5" cy="7.5" r="0.7" fill="#e3cf9f" opacity="0.8" />
                    <path d="M7 2.5 Q8 1 9 2.5" stroke="#92977b" strokeWidth="0.4" fill="none" />
                  </pattern>
                </defs>
                <path d="M2 0 L154 0 Q156 0 154.5 1.5 L83 56 Q78 60 73 56 L1.5 1.5 Q0 0 2 0Z" fill="#e8dbc4" />
                <path d="M10 2 L146 2 L80 52 Q78 53.5 76 52Z" fill={`url(#lp-${linerId})`} />
              </svg>
            </span>

            {/* wax seal: whole + two halves for the crack */}
            <span
              className="env-seal absolute left-1/2 top-[60%] block w-[19%] min-w-[64px] max-w-[104px] -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 6, aspectRatio: '1' }}
              aria-hidden="true"
            >
              <motion.span
                className="env-seal-whole absolute inset-0 block"
                animate={reduce || opened ? undefined : { scale: [1, 1.045, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 4px 6px rgba(60,20,30,0.35))' }}
              >
                <WaxSeal className="h-full w-full transition-transform duration-500 group-hover:rotate-[8deg]" />
              </motion.span>
              <span className="env-seal-left absolute inset-0 block opacity-0" style={{ clipPath: CRACK_LEFT }}>
                <WaxSeal className="h-full w-full" />
              </span>
              <span className="env-seal-right absolute inset-0 block opacity-0" style={{ clipPath: CRACK_RIGHT }}>
                <WaxSeal className="h-full w-full" />
              </span>
            </span>

            {/* stamp + postmark overlapping the corner */}
            <span className="absolute -right-[3%] -top-[9%] block w-[17%] min-w-[54px] max-w-[88px] rotate-[7deg]" style={{ zIndex: 7 }} aria-hidden="true">
              <PostageStamp className="h-auto w-full drop-shadow-[0_3px_4px_rgba(60,40,20,0.25)]" />
            </span>
            <span className="absolute right-[9%] top-[2%] block w-[30%] max-w-[150px] -rotate-[8deg] mix-blend-multiply" style={{ zIndex: 8 }} aria-hidden="true">
              <Postmark className="h-auto w-full" />
            </span>

            {/* pressed sprig tucked under the envelope edge */}
            <span className="absolute -bottom-[16%] -left-[7%] block w-[16%] -rotate-[38deg]" style={{ zIndex: 0 }} aria-hidden="true">
              <Sprig color="#c99595" className="h-auto w-full" />
            </span>
          </button>
        </motion.div>
      </div>
    )
  },
)
