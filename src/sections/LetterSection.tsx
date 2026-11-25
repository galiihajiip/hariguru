import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { letter, meta } from '../data/letterContent'
import { useFill } from '../hooks/usePersonalization'
import { Accent, RichText } from '../components/UI/RichText'
import { Reveal } from '../components/UI/Reveal'
import { PressedFlower, Sprig, CurlyArrow, Divider } from '../components/Botanicals'
import { Postmark } from '../components/Stationery'

export function LetterSection() {
  const f = useFill()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const flowerY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -80])
  const sprigY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 60])

  return (
    <section ref={ref} id="surat" aria-labelledby="surat-title" className="relative px-4 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 max-w-3xl sm:mb-16 lg:ml-[4%]">
          <p className="eyebrow mb-5 flex items-center gap-3 text-burgundy">
            <span className="h-px w-8 bg-burgundy/50" aria-hidden="true" />
            {letter.eyebrow}
          </p>
          <h2 id="surat-title" className="display text-[clamp(2.1rem,7vw,4.4rem)] text-ink outline-none">
            <Accent text={f(letter.title)} className="italic text-burgundy" />
          </h2>
        </Reveal>

        <div className="relative lg:grid lg:grid-cols-12 lg:gap-8">
          {/* margin notes — desktop gutter */}
          <aside className="relative hidden lg:col-span-3 lg:block" aria-hidden="true">
            <Reveal delay={0.3} className="sticky top-32 mt-24 -rotate-6 text-brown">
              <p className="font-hand text-2xl leading-snug">{letter.marginNote}</p>
              <CurlyArrow className="ml-16 mt-2 h-14 w-20" color="#8a7663" />
            </Reveal>
          </aside>

          <div className="relative lg:col-span-9 lg:pr-[6%]">
            {/* sheets underneath */}
            <div className="paper-under rotate-[-2.4deg] rounded-[2px]" aria-hidden="true" />
            <div className="paper-under translate-x-2 translate-y-2 rotate-[1.6deg] rounded-[2px] opacity-70" aria-hidden="true" />

            <motion.article
              initial={{ opacity: 0, y: 40, rotate: -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0.4 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="paper-sheet prose-letter relative rounded-[2px] px-6 pb-14 pt-10 sm:px-12 sm:pb-16 sm:pt-14 lg:px-16"
                          >
              {/* red margin line, like an exercise book */}
              <span className="absolute bottom-0 left-4 top-0 w-px bg-rose/50 sm:left-8" aria-hidden="true" />

              <span className="washi -top-3 right-10 rotate-[6deg] sm:right-16" aria-hidden="true" />
              <motion.div style={{ y: flowerY }} className="pointer-events-none absolute -right-5 -top-16 w-20 rotate-[24deg] sm:-right-10 sm:w-28" aria-hidden="true">
                <PressedFlower tone="rose" className="h-auto w-full" />
              </motion.div>

              <header className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-[0.62rem] text-brown">
                    {meta.city}, {meta.date}
                  </p>
                  <p className="font-hand mt-3 text-[clamp(1.55rem,5vw,2.2rem)] leading-tight text-burgundy">{letter.greeting}</p>
                </div>
                <Postmark className="mt-1 hidden w-28 shrink-0 rotate-[6deg] opacity-70 sm:block" aria-hidden="true" />
              </header>

              <div className="paper-ruled space-y-8 bg-transparent text-[1rem] leading-[2rem] text-ink-soft sm:text-[1.06rem]" style={{ ['--rule' as string]: '2rem', backgroundColor: 'transparent' }}>
                {letter.paragraphs.map((p, i) => {
                  const isPull = p.startsWith('*') && p.endsWith('*')
                  return (
                    <Reveal key={i} as="p" delay={0.05} y={14} className={isPull ? 'text-center text-[1.35rem] leading-[2rem] text-burgundy sm:text-[1.6rem]' : ''}>
                      {isPull ? <span className="font-serif italic">{f(p.slice(1, -1))}</span> : <RichText text={f(p)} />}
                    </Reveal>
                  )
                })}
              </div>

              {/* margin note — mobile, inline */}
              <p className="font-hand mt-8 -rotate-2 text-xl text-brown lg:hidden" aria-hidden="true">
                ({letter.marginNote})
              </p>

              <Divider className="mx-auto mt-10 h-5 w-44" />
              <p className="font-hand mt-4 text-right text-lg text-brown">— bersambung di halaman berikutnya</p>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-serif text-sm italic text-brown/70" aria-hidden="true">
                1
              </span>

              <motion.div style={{ y: sprigY }} className="pointer-events-none absolute -bottom-12 -left-6 w-16 -rotate-[30deg] sm:-left-12 sm:w-20" aria-hidden="true">
                <Sprig color="#92977b" className="h-auto w-full" />
              </motion.div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  )
}
