import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { unsaid } from '../data/letterContent'
import { useFill } from '../hooks/usePersonalization'
import { InteractiveNote } from '../components/InteractiveNote'
import { Reveal } from '../components/UI/Reveal'
import { CurlyArrow, DoodleHeart, Sparkle } from '../components/Botanicals'

const OFFSETS = ['lg:mt-0', 'lg:mt-20', 'lg:mt-6']
const MOBILE_SHIFT = ['mr-5 sm:mr-0', 'ml-5 sm:ml-0', 'mr-3 sm:mr-0']

export function UnsaidSection() {
  const f = useFill()
  const [opened, setOpened] = useState<boolean[]>(() => unsaid.notes.map(() => false))
  const count = opened.filter(Boolean).length
  const all = count === unsaid.notes.length

  return (
    <section id="tak-terucap" aria-labelledby="tak-terucap-title" className="relative px-4 pb-28 pt-16 sm:px-8 sm:pb-36 sm:pt-24 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 flex flex-col items-start sm:mb-16 lg:items-end lg:text-right">
          <p className="eyebrow mb-5 flex items-center gap-3 text-burgundy">
            <span className="h-px w-8 bg-burgundy/50" aria-hidden="true" />
            {unsaid.eyebrow}
          </p>
          <h2 id="tak-terucap-title" className="display max-w-4xl text-[clamp(2.1rem,7vw,4.6rem)] text-ink outline-none">
            {unsaid.title}
          </h2>
          <div className="mt-6 flex items-center gap-2 text-brown lg:flex-row-reverse">
            <CurlyArrow className="h-10 w-12 rotate-[20deg] lg:-scale-x-100" color="#8a7663" />
            <p className="font-hand text-[1.4rem]">{unsaid.hint}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
          {unsaid.notes.map((n, i) => (
            <div key={n.label} className={`${OFFSETS[i]} ${MOBILE_SHIFT[i]} ${i === 2 ? 'sm:col-span-2 sm:mx-auto sm:w-1/2 lg:col-span-1 lg:mx-0 lg:w-auto' : ''}`}>
              <InteractiveNote
                index={i}
                label={n.label}
                teaser={f(n.teaser)}
                message={n.message.map(f)}
                scribble={n.scribble}
                open={opened[i]}
                onToggle={() => setOpened((o) => o.map((v, j) => (j === i ? !v : v)))}
              />
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 text-center" aria-live="polite">
          <div className="flex items-center gap-2" aria-hidden="true">
            {opened.map((o, i) => (
              <motion.span
                key={i}
                animate={{ scale: o ? 1 : 0.7, opacity: o ? 1 : 0.35 }}
                className="block"
              >
                <Sparkle className="h-3.5 w-3.5" color={o ? '#783c48' : '#8a7663'} />
              </motion.span>
            ))}
          </div>
          <p className="text-[0.85rem] text-brown">
            {count} dari {unsaid.notes.length} kertas telah dibuka
          </p>
          <AnimatePresence>
            {all && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="font-hand px-4 text-center text-[1.5rem] leading-snug text-burgundy"
              >
                {unsaid.done}
                <DoodleHeart className="ml-2 inline-block h-6 w-6 align-[-4px]" />
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
