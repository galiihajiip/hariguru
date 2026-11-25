import { motion } from 'motion/react'
import { apology } from '../data/letterContent'
import { useFill } from '../hooks/usePersonalization'
import { Accent, RichText } from '../components/UI/RichText'
import { Reveal } from '../components/UI/Reveal'
import { DustParticles, TornEdge } from '../components/Atmosphere'
import { Sprig } from '../components/Botanicals'

const SLOW = [0.16, 1, 0.3, 1] as const
const BG = '#4b3129'

export function ApologySection() {
  const f = useFill()
  return (
    <section id="maaf" aria-labelledby="maaf-title" className="relative">
      <TornEdge color={BG} seed={21} className="-mb-px" />
      <div
        className="on-dark relative overflow-hidden px-5 pb-28 pt-20 sm:px-8 sm:pb-40 sm:pt-28 lg:px-14"
        style={{ background: `radial-gradient(120% 70% at 80% 0%, #5d3a30 0%, transparent 60%), linear-gradient(180deg, ${BG} 0%, #4f2c2c 55%, #57293a 100%)` }}
      >
        <div className="window-light opacity-40" aria-hidden="true" />
        <DustParticles count={16} seed={31} className="opacity-60" />

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3 text-gold-soft/90">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              {apology.eyebrow}
            </p>
            <h2 id="maaf-title" className="display max-w-5xl text-[clamp(2.3rem,8vw,5.6rem)] text-ivory outline-none">
              <Accent text={apology.title} className="italic text-rose-soft" />
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-12">
            <div className="relative hidden lg:col-span-4 lg:block" aria-hidden="true">
              <Sprig color="#c99595" className="sway absolute left-6 top-0 h-auto w-28 rotate-[8deg] opacity-70" />
            </div>
            <div className="space-y-7 lg:col-span-7 lg:col-start-6">
              <Reveal as="p" y={10} className="font-hand text-[1.9rem] leading-tight text-rose-soft">
                {f(apology.salutation)}
              </Reveal>
              {apology.paragraphs.map((p, i) => (
                <Reveal
                  key={i}
                  as="p"
                  y={10}
                  transition={{ duration: 1.4, ease: SLOW }}
                  className={`pretty text-[1.04rem] leading-[1.95] sm:text-[1.12rem] ${i === apology.paragraphs.length - 1 ? 'text-ivory' : 'text-ivory/80'}`}
                >
                  <RichText text={f(p)} tone="dark" />
                </Reveal>
              ))}
            </div>
          </div>

          {/* the peak */}
          <div className="relative mt-28 sm:mt-40">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.8, ease: SLOW }}
              className="display max-w-5xl text-[clamp(2.6rem,9vw,6.6rem)] italic leading-[0.98] text-ivory"
            >
              {apology.peak[0]}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.8, ease: SLOW, delay: 0.6 }}
              className="display ml-auto mt-8 max-w-3xl text-right text-[clamp(1.7rem,5vw,3.6rem)] leading-[1.1] text-gold-soft sm:pr-[4%]"
            >
              {apology.peak[1]}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 1 }}
              transition={{ duration: 1.6, delay: 1.4 }}
              className="font-hand mt-6 text-right text-[1.45rem] text-rose-soft/90 sm:pr-[5%]"
            >
              {apology.peakNote}
            </motion.p>
          </div>
        </div>
      </div>
      <TornEdge color="#57293a" flip seed={44} className="-mt-px" />
    </section>
  )
}
