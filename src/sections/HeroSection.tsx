import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, MailOpen } from 'lucide-react'
import { useRef, useState } from 'react'
import { Envelope, type EnvelopeHandle } from '../components/Envelope'
import { DustParticles } from '../components/Atmosphere'
import { PressedFlower, LeafBranch, Sprig, Sparkle, CurlyArrow, BellDoodle } from '../components/Botanicals'
import { Postmark } from '../components/Stationery'
import { MagneticButton } from '../components/UI/MagneticButton'
import { hero, meta } from '../data/letterContent'
import { useFill, usePersonalization } from '../hooks/usePersonalization'
import { scrollToId } from '../utils/scroll'

const EASE = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
}

export function HeroSection({ opened, onOpened }: { opened: boolean; onOpened: () => void }) {
  const envelope = useRef<EnvelopeHandle>(null)
  const [opening, setOpening] = useState(false)
  const reduce = useReducedMotion()
  const f = useFill()
  const { hasTo } = usePersonalization()
  // split the headline into words, remembering which ones sit inside *accent* markers
  const words = hero.headline
    .split(/\*(.+?)\*/g)
    .flatMap((part, i) => part.split(' ').filter(Boolean).map((w) => ({ w, accent: i % 2 === 1 })))
  const plainHeadline = hero.headline.replaceAll('*', '')

  async function handleOpen() {
    if (opening || opened) return
    setOpening(true)
    await envelope.current?.open()
    onOpened()
  }

  return (
    <header className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-4 pb-12 pt-4 sm:px-8 sm:pb-14 sm:pt-5 lg:px-14">
      {/* afternoon light through a classroom window */}
      <div className="window-light" aria-hidden="true" />
      <motion.div
        className="absolute inset-0"
        animate={opening && !reduce ? { y: -40, opacity: 0.9 } : { y: 0 }}
        transition={{ duration: 2.4, ease: EASE }}
        aria-hidden="true"
      >
        <DustParticles count={26} seed={9} />
      </motion.div>
      <div className="ornament-frame hidden sm:block" aria-hidden="true" />

      {/* masthead */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
        className="relative z-10 flex items-center justify-between gap-3 border-b border-brown/25 pb-3 text-brown sm:mx-4 sm:mt-4"
      >
        <span className="eyebrow whitespace-nowrap text-[0.58rem] tracking-[0.16em] sm:text-[0.72rem] sm:tracking-[0.28em]">{meta.date}</span>
        <span className="hidden items-center gap-2 sm:flex" aria-hidden="true">
          <Sparkle className="h-2.5 w-2.5" />
          <span className="font-serif text-sm italic text-brown">Surat yang Tertinggal</span>
          <Sparkle className="h-2.5 w-2.5" />
        </span>
        <span className="eyebrow whitespace-nowrap text-[0.58rem] tracking-[0.16em] sm:text-[0.72rem] sm:tracking-[0.28em]">{meta.event}</span>
      </motion.div>

      {/* botanicals in the corners */}
      <motion.div
        initial={{ opacity: 0, rotate: -30, x: -20 }}
        animate={{ opacity: 1, rotate: -22, x: 0 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.5 }}
        className="pointer-events-none absolute -left-6 top-24 w-20 sm:left-6 sm:top-28 sm:w-28 lg:w-32"
        aria-hidden="true"
      >
        <PressedFlower className="sway h-auto w-full" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, rotate: 40 }}
        animate={{ opacity: 1, rotate: 28 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.7 }}
        className="pointer-events-none absolute -right-8 bottom-32 w-24 sm:right-6 sm:w-28 lg:bottom-24 lg:w-36"
        aria-hidden="true"
      >
        <LeafBranch className="sway h-auto w-full" style={{ ['--d' as string]: '9s' }} />
      </motion.div>
      <div className="pointer-events-none absolute right-[18%] top-24 hidden w-16 rotate-[160deg] opacity-80 lg:block" aria-hidden="true">
        <Sprig color="#d9bf88" className="h-auto w-full" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 content-center gap-x-10 gap-y-6 pt-6 sm:gap-y-8 sm:pt-12 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:pt-10">
        {/* headline */}
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-6 lg:row-start-1 lg:self-end">
          <motion.p variants={item} className="mb-4 flex items-center gap-3 text-burgundy sm:mb-5">
            <span className="h-px w-8 shrink-0 bg-burgundy/50" aria-hidden="true" />
            <span className="eyebrow text-[0.62rem] sm:text-[0.66rem]">{hasTo ? f(hero.dedication.single) : hero.dedication.group}</span>
          </motion.p>

          <h1 className="display text-[clamp(1.6rem,6.4vw,3.2rem)] leading-[1.12] text-ink lg:text-[clamp(2.2rem,3.15vw,3.5rem)]">
            <span className="sr-only">{plainHeadline}</span>
            <span aria-hidden="true">
              <span className="mr-1 font-serif text-[1.4em] leading-none text-rose">“</span>
              {words.map(({ w, accent }, i) => (
                <motion.span
                  key={i}
                  className={`inline-block pr-[0.24em] ${accent ? 'italic text-burgundy' : ''}`}
                  initial={{ opacity: 0, y: '0.45em', filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.032 }}
                >
                  {w}
                  {i === words.length - 1 && <span className="font-serif not-italic text-rose">”</span>}
                </motion.span>
              ))}
            </span>
          </h1>
        </motion.div>

        {/* subheadline — after the envelope on mobile, under the headline on desktop */}
        <motion.div variants={container} initial="hidden" animate="show" className="order-last lg:order-none lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:self-start">
          <motion.div variants={item} className="flex max-w-xl gap-4">
            <span className="mt-3 hidden h-px w-10 shrink-0 bg-brown/40 sm:block" aria-hidden="true" />
            <p className="pretty font-serif text-[1.25rem] italic leading-[1.45] text-ink-soft sm:text-[1.4rem]">{hero.sub}</p>
          </motion.div>
          <motion.div variants={item} className="mt-6 hidden items-center gap-3 text-brown lg:flex" aria-hidden="true">
            <BellDoodle className="h-8 w-8 -rotate-12 opacity-70" />
            <span className="font-hand text-xl">{hero.margin}</span>
          </motion.div>
        </motion.div>

        {/* envelope column */}
        <div className="relative lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-center">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94, rotate: -3 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.55 }}
            className="relative"
          >
            <Envelope ref={envelope} opened={opened} onActivate={handleOpen} disabled={opening} />

            <span className={`pointer-events-none absolute left-[4%] top-0 hidden -rotate-3 items-end gap-1 text-brown transition-opacity duration-500 lg:flex ${opening || opened ? 'opacity-0' : ''}`} aria-hidden="true">
              <span className="font-hand block text-[1.3rem] leading-tight">ketuk segelnya, pelan-pelan saja</span>
              <CurlyArrow className="mb-[-28px] h-12 w-16 rotate-[10deg]" color="#8a7663" />
            </span>
            <Postmark className="pointer-events-none absolute -bottom-10 -left-2 w-28 rotate-[-14deg] opacity-50 sm:-left-8" aria-hidden="true" />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.1 }}
            className="relative mt-10 flex flex-col items-center gap-2 sm:mt-14 sm:gap-3"
          >
            {!opened ? (
              <>
                <MagneticButton onClick={handleOpen} disabled={opening} className="btn-ink" aria-describedby="hero-cta-hint">
                  <MailOpen className="h-[18px] w-[18px]" aria-hidden="true" />
                  {opening ? 'Membuka surat…' : hero.cta}
                </MagneticButton>
                <span id="hero-cta-hint" className="font-hand text-lg text-brown">
                  sebuah surat kecil sedang menunggu untuk dibuka
                </span>
              </>
            ) : (
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => scrollToId('surat')}
                className="btn-ghost text-burgundy"
              >
                Lanjut membaca
                <ArrowDown className="hint-bob h-4 w-4" aria-hidden="true" />
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </header>
  )
}
