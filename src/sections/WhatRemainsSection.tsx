import { motion } from 'motion/react'
import { remains } from '../data/letterContent'
import { useFill } from '../hooks/usePersonalization'
import { Reveal } from '../components/UI/Reveal'
import { Accent, RichText } from '../components/UI/RichText'
import { JourneyRoute } from '../components/JourneyRoute'
import { BookWithFlowers } from '../components/FlowerIllustration'
import { Petal, Sparkle, Divider } from '../components/Botanicals'

const EASE = [0.22, 1, 0.36, 1] as const

const RISING = [
  { left: '30%', bottom: '38%', d: '9s', delay: '0s', dx: '-30px', c: '#c99595' },
  { left: '52%', bottom: '44%', d: '11s', delay: '-3s', dx: '40px', c: '#e3c1ba' },
  { left: '66%', bottom: '40%', d: '10s', delay: '-6s', dx: '20px', c: '#d9bf88' },
  { left: '42%', bottom: '48%', d: '12s', delay: '-8s', dx: '-50px', c: '#c99595' },
]

export function WhatRemainsSection() {
  const f = useFill()
  return (
    <section id="tetap-tinggal" aria-labelledby="tetap-tinggal-title" className="relative px-4 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-4xl">
          <p className="eyebrow mb-5 flex items-center gap-3 text-burgundy">
            <span className="h-px w-8 bg-burgundy/50" aria-hidden="true" />
            {remains.eyebrow}
          </p>
          <h2 id="tetap-tinggal-title" className="display text-[clamp(2.1rem,6.6vw,4.3rem)] text-ink outline-none">
            <Accent text={remains.title} className="italic text-burgundy" />
          </h2>
        </Reveal>

        {/* the road from Surakarta to Surabaya */}
        <div className="mt-12 sm:mt-16 lg:mr-[10%]">
          <JourneyRoute />
        </div>

        <div className="mt-14 grid items-start gap-10 sm:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            {/* book: mobile position */}
            <div className="relative -mx-2 lg:hidden">
              <BookWithFlowers className="h-auto w-full" />
              <RisingPetals />
            </div>

            <div className="mt-10 space-y-6 text-[1.02rem] leading-[1.9] text-ink-soft sm:text-[1.08rem]">
              {remains.paragraphs.map((p, i) => (
                <Reveal key={i} as="p" y={14} className="pretty">
                  <RichText text={f(p)} />
                </Reveal>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:sticky lg:top-24 lg:col-span-6 lg:block">
            <BookWithFlowers className="h-auto w-full" />
            <RisingPetals />
          </div>
        </div>

        {/* forgotten vs. kept */}
        <div className="mt-20 grid gap-8 sm:mt-24 sm:grid-cols-2 sm:gap-6 lg:mx-[6%]">
          <Reveal className="relative rotate-[-1.5deg]">
            <div className="paper-sheet rounded-[2px] px-6 py-7 sm:px-8">
              <span className="washi -top-3 left-8 rotate-[-6deg]" aria-hidden="true" />
              <p className="eyebrow text-[0.62rem] text-brown">Mungkin akan terlupa</p>
              <ul className="mt-5 space-y-3">
                {remains.forgotten.map((t, i) => (
                  <li key={t} className="relative w-fit font-hand text-[1.55rem] leading-tight text-ink-soft/70">
                    {t}
                    <motion.span
                      aria-hidden="true"
                      className="absolute left-[-4%] top-[55%] h-[2px] w-[108%] origin-left rounded-full bg-burgundy/60"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.4 + i * 0.25 }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="relative rotate-[1.2deg] sm:mt-10">
            <div className="paper-sheet rounded-[2px] px-6 py-7 sm:px-8" style={{ background: '#f6f2e6' }}>
              <span className="washi sage -top-3 right-8 rotate-[5deg]" aria-hidden="true" />
              <p className="eyebrow text-[0.62rem] text-sage-deep">Akan selalu tinggal</p>
              <ul className="mt-5 space-y-3">
                {remains.kept.map((t, i) => (
                  <motion.li
                    key={t}
                    className="flex items-center gap-3 font-serif text-[1.5rem] leading-tight text-ink"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.3 + i * 0.2 }}
                  >
                    <Sparkle className="h-3.5 w-3.5 shrink-0" color="#92977b" />
                    {t}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* closing thought */}
        <Reveal className="mx-auto mt-24 max-w-4xl text-center sm:mt-32">
          <Divider className="mx-auto mb-8 h-5 w-48" />
          <blockquote className="display text-[clamp(1.75rem,5vw,3.2rem)] leading-[1.18] text-ink">
            <Accent text={f(remains.closing)} className="italic text-burgundy" />
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}

function RisingPetals() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {RISING.map((p, i) => (
        <span
          key={i}
          className="petal-up"
          style={{ left: p.left, bottom: p.bottom, ['--d' as string]: p.d, ['--delay' as string]: p.delay, ['--dx' as string]: p.dx }}
        >
          <Petal color={p.c} width={12} />
        </span>
      ))}
    </div>
  )
}
