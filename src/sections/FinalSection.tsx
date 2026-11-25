import { motion, useInView, useReducedMotion } from 'motion/react'
import { ArrowUp, Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { finale, meta, sender } from '../data/letterContent'
import { useFill, usePersonalization } from '../hooks/usePersonalization'
import { DustParticles, FallingPetals, StarField } from '../components/Atmosphere'
import { FlowerBed } from '../components/FlowerIllustration'
import { PressedFlower, Sparkle, Divider } from '../components/Botanicals'
import { WaxSeal, Postmark } from '../components/Stationery'
import { Accent, RichText } from '../components/UI/RichText'
import { Reveal } from '../components/UI/Reveal'
import { celebrateFinale } from '../components/ConfettiEffect'
import { Footer } from '../components/Footer'

const EASE = [0.22, 1, 0.36, 1] as const

export function FinalSection() {
  const f = useFill()
  const { to } = usePersonalization()
  const reduce = useReducedMotion()
  const sigRef = useRef<HTMLDivElement>(null)
  const sigInView = useInView(sigRef, { once: true, amount: 0.6 })

  useEffect(() => {
    if (sigInView) {
      const t = setTimeout(celebrateFinale, 900)
      return () => clearTimeout(t)
    }
  }, [sigInView])

  const titleWords = finale.title.split(' ')

  return (
    <section id="terima-kasih" aria-labelledby="terima-kasih-title" className="relative">
      <div
        className="on-dark relative overflow-hidden px-4 pb-0 pt-24 sm:px-8 sm:pt-32 lg:px-14"
        style={{
          background:
            'radial-gradient(90% 50% at 50% 12%, #6e2f3d 0%, transparent 70%), radial-gradient(80% 40% at 50% 100%, #5a2633 0%, transparent 70%), linear-gradient(180deg, #57293a 0%, #4a1f29 40%, #3a1820 100%)',
        }}
      >
        <StarField count={22} seed={13} />
        <DustParticles count={24} seed={17} className="opacity-80" />
        <FallingPetals count={9} seed={5} />

        {/* heading */}
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="light-bloom" style={{ top: '45%' }} aria-hidden="true" />
          <Reveal className="relative flex flex-col items-center gap-3">
            <p className="eyebrow text-gold-soft">{meta.date}</p>
            <div className="flex items-center gap-3 text-gold/80" aria-hidden="true">
              <span className="h-px w-10 bg-gold/50" />
              <Sparkle className="h-3 w-3" color="#c6a66b" />
              <span className="h-px w-10 bg-gold/50" />
            </div>
            <p className="eyebrow text-ivory/85">{finale.eyebrow}</p>
          </Reveal>

          <h2 id="terima-kasih-title" className="display relative mt-10 text-[clamp(2.4rem,8.4vw,6.2rem)] text-ivory outline-none">
            <span className="sr-only">{finale.title.replaceAll('*', '')}</span>
            <span aria-hidden="true">
              {titleWords.map((w, i) => {
                const accent = w.startsWith('*') || w.endsWith('*')
                return (
                  <motion.span
                    key={i}
                    className={`inline-block pr-[0.22em] ${accent ? 'italic text-gold-soft' : ''}`}
                    initial={{ opacity: 0, y: '0.5em', filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.08 }}
                  >
                    {w.replaceAll('*', '')}
                  </motion.span>
                )
              })}
            </span>
          </h2>
        </div>

        {/* the letter, shown once more — opened */}
        <div className="relative mx-auto mt-16 max-w-[720px] sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.4, ease: EASE }}
            className="relative"
          >
            {/* open envelope behind */}
            <div className="absolute bottom-[-24px] left-[-4%] h-[300px] w-[108%] rounded-[6px] sm:h-[360px]" style={{ background: 'linear-gradient(180deg,#cdb798,#dccab0)', boxShadow: '0 40px 70px -30px rgba(0,0,0,0.6)' }} aria-hidden="true" />
            <svg viewBox="0 0 156 60" preserveAspectRatio="none" className="absolute bottom-[275px] left-[-4%] h-[100px] w-[108%] sm:bottom-[335px] sm:h-[130px]" aria-hidden="true">
              <path d="M2 60 L154 60 Q156 60 154.5 58.5 L83 4 Q78 0 73 4 L1.5 58.5 Q0 60 2 60Z" fill="#e8dbc4" />
              <path d="M10 58 L146 58 L80 8 Q78 6.5 76 8Z" fill="#7f3f4c" opacity="0.9" />
            </svg>

            <article className="paper-sheet relative mx-auto w-[94%] rounded-[2px] px-6 pb-44 pt-10 text-ink sm:px-12 sm:pb-52 sm:pt-14">
              <span className="washi gold -top-3 left-10 rotate-[-5deg]" aria-hidden="true" />
              <PressedFlower tone="rose" className="pointer-events-none absolute -right-4 -top-10 w-16 rotate-[20deg] sm:-right-8 sm:w-20" aria-hidden="true" />
              <div className="flex items-start justify-between gap-4">
                <p className="eyebrow text-[0.62rem] text-brown">
                  {meta.city}, {meta.date}
                </p>
                <Postmark className="hidden w-24 shrink-0 rotate-[8deg] opacity-60 sm:block" aria-hidden="true" />
              </div>
              <p className="font-hand mt-4 text-[clamp(1.6rem,5.4vw,2.3rem)] leading-tight text-burgundy">{f(finale.salutation)}</p>
              <div className="mt-6 space-y-5 text-[1.02rem] leading-[1.9] text-ink-soft sm:text-[1.06rem]">
                {finale.paragraphs.map((p, i) => (
                  <Reveal key={i} as="p" y={12} className="pretty">
                    <RichText text={f(p)} />
                  </Reveal>
                ))}
              </div>
              <Divider className="mx-auto mt-10 h-5 w-40" />
            </article>

            {/* front pocket covering the bottom of the sheet */}
            <svg viewBox="0 0 156 60" preserveAspectRatio="none" className="absolute bottom-[-24px] left-[-4%] h-[150px] w-[108%] drop-shadow-[0_-4px_8px_rgba(60,40,20,0.18)] sm:h-[180px]" aria-hidden="true">
              <path d="M0 2 Q0 0 2 1 L72 35 Q78 38 84 35 L154 1 Q156 0 156 2 L156 57 Q156 60 153 60 L3 60 Q0 60 0 57Z" fill="#ece0cb" />
              <path d="M0 60 L66 32 M156 60 L90 32" stroke="#b79f7e" strokeOpacity="0.4" strokeWidth="0.4" />
            </svg>
            <div className="absolute bottom-[-2px] left-1/2 w-16 -translate-x-1/2 sm:bottom-[4px] sm:w-20" aria-hidden="true">
              <div style={{ aspectRatio: 1, clipPath: 'polygon(0 0, 54% 0, 47% 22%, 56% 41%, 45% 60%, 53% 79%, 48% 100%, 0 100%)' }}>
                <WaxSeal className="h-full w-full -rotate-12" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* closing lines */}
        <div className="relative mx-auto mt-28 max-w-5xl text-center sm:mt-36">
          <div className="light-bloom" aria-hidden="true" />
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: EASE }}
            className="display relative text-[clamp(2.6rem,9vw,7rem)] italic leading-[0.98] text-gold-soft"
          >
            {f(finale.closingLines[0])}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
            className="display relative mx-auto mt-8 max-w-4xl text-[clamp(1.55rem,4.4vw,3rem)] leading-[1.18] text-ivory"
          >
            <Accent text={f(finale.closingLines[1])} className="italic text-rose-soft" />
          </motion.p>
        </div>

        {/* signature */}
        <div ref={sigRef} className="relative mx-auto mt-20 flex max-w-xl flex-col items-center text-center sm:mt-28">
          <Reveal as="p" className="text-[0.98rem] italic text-ivory/75">
            {finale.signoff}
          </Reveal>
          <div className="relative mt-3 px-4">
            <motion.p
              initial={{ opacity: 0, clipPath: reduce ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
              animate={sigInView ? { opacity: 1, clipPath: 'inset(0 0% 0 0)' } : undefined}
              transition={{ duration: 1.8, ease: [0.45, 0, 0.2, 1], delay: 0.2 }}
              className="font-hand text-[clamp(2.3rem,9vw,3.8rem)] leading-[1.1] text-gold-soft"
              style={{ textWrap: 'balance' }}
            >
              {sender.fullName} <span className="text-[0.6em] text-gold-soft/80">({sender.nickname})</span>
            </motion.p>
            <svg viewBox="0 0 300 30" className="mx-auto -mt-1 h-6 w-[min(320px,80vw)]" fill="none" aria-hidden="true">
              <motion.path
                d="M6 18C60 6 120 26 178 14C214 7 250 10 296 20"
                stroke="#c6a66b"
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={sigInView ? { pathLength: 1 } : undefined}
                transition={{ duration: 1.4, ease: EASE, delay: 1.6 }}
              />
            </svg>
          </div>
          <Reveal className="mt-5 space-y-1 text-[0.88rem] leading-relaxed text-ivory/70">
            {sender.credentials.map((c) => (
              <p key={c}>{c}</p>
            ))}
            <p className="eyebrow pt-3 text-[0.6rem] text-gold-soft/80">{sender.community}</p>
          </Reveal>

          <Reveal className="mt-14 max-w-lg">
            <p className="pretty font-serif text-[1.3rem] italic leading-[1.4] text-ivory/90 sm:text-[1.45rem]">{finale.tagline}</p>
            <p className="font-hand mt-4 text-[1.5rem] text-gold-soft">{finale.taglineEn}</p>
            <p className="sr-only">Surat untuk {to}, {meta.date}</p>
          </Reveal>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={celebrateFinale} className="btn-ghost text-gold-soft">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Taburkan bunga lagi
            </button>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
              className="btn-ghost text-ivory/80"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
              Baca dari awal
            </button>
          </div>
        </div>

        {/* flowers rising from the bottom */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <FlowerBed className="h-auto w-full" />
        </div>
        <Footer />
      </div>
    </section>
  )
}
