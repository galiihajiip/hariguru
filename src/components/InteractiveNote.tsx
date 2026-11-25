import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useId } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

const PAPERS = [
  { bg: '#fbf8f1', tape: 'washi', tilt: -2.6 },
  { bg: '#f8eeea', tape: 'washi sage', tilt: 1.9 },
  { bg: '#f3f1e6', tape: 'washi gold', tilt: -1.3 },
]

export interface NoteProps {
  index: number
  label: string
  teaser: string
  message: string[]
  scribble: string
  open: boolean
  onToggle: () => void
}

/** A small folded paper note; tapping unfolds the hidden message. */
export function InteractiveNote({ index, label, teaser, message, scribble, open, onToggle }: NoteProps) {
  const id = useId()
  const reduce = useReducedMotion()
  const paper = PAPERS[index % PAPERS.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: EASE, delay: index * 0.12 }}
    >
    <motion.article
      initial={false}
      animate={{ rotate: open ? paper.tilt * 0.3 : paper.tilt, y: 0 }}
      whileHover={reduce ? undefined : { y: -6, rotate: paper.tilt * 0.5 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="relative"
      style={{ perspective: 1000 }}
    >
      <span className={`${paper.tape} -top-3 left-1/2 z-10 -translate-x-1/2 rotate-[-4deg]`} aria-hidden="true" />
      <div
        className="relative overflow-hidden rounded-[3px]"
        style={{
          background: paper.bg,
          backgroundImage: 'var(--paper-noise)',
          boxShadow: open
            ? '0 2px 4px rgba(60,40,20,0.08), 0 28px 50px -24px rgba(60,40,20,0.45)'
            : '0 1px 2px rgba(60,40,20,0.08), 0 16px 30px -18px rgba(60,40,20,0.4)',
          transition: 'box-shadow .5s',
        }}
      >
        <motion.button
          type="button"
          onClick={onToggle}
          whileTap={{ scale: 0.985 }}
          aria-expanded={open}
          aria-controls={`${id}-msg`}
          className="block w-full cursor-pointer px-6 pb-6 pt-8 text-left sm:px-7"
        >
          <span className="flex items-baseline justify-between gap-3">
            <span className="eyebrow text-[0.64rem] text-burgundy">{label}</span>
            <span className="font-serif text-sm italic text-brown/80" aria-hidden="true">
              No. {String(index + 1).padStart(2, '0')}
            </span>
          </span>
          <span className="font-serif mt-4 block text-[1.45rem] leading-[1.3] text-ink sm:text-[1.6rem]">{teaser}</span>
          <span className="mt-6 flex items-center gap-2 text-[0.82rem] font-medium text-brown">
            <motion.span
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-brown/40"
              aria-hidden="true"
            >
              <Plus className="h-4 w-4" />
            </motion.span>
            {open ? 'Lipat kembali' : 'Buka lipatan kertas'}
          </span>
        </motion.button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="msg"
              id={`${id}-msg`}
              role="region"
              aria-label={`Pesan: ${label}`}
              initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="overflow-hidden"
            >
              <motion.div
                initial={reduce ? false : { rotateX: -75, y: -10 }}
                animate={{ rotateX: 0, y: 0 }}
                exit={reduce ? undefined : { rotateX: -60, y: -6 }}
                transition={{ duration: 0.75, ease: EASE }}
                style={{ transformOrigin: '50% 0%' }}
                className="relative border-t border-dashed border-brown/30 px-6 pb-8 pt-6 sm:px-7"
              >
                {/* fold crease shading */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#8a7663]/10 to-transparent" aria-hidden="true" />
                <div className="space-y-4">
                  {message.map((m, i) => (
                    <p key={i} className="pretty text-[1rem] leading-[1.85] text-ink-soft">
                      {m}
                    </p>
                  ))}
                </div>
                <p className="font-hand mt-5 rotate-[-2deg] text-right text-[1.35rem] text-burgundy">{scribble}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
    </motion.div>
  )
}
