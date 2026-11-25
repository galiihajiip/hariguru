import { motion, useScroll, useSpring } from 'motion/react'
import { chapters } from '../data/letterContent'
import { useActiveSection } from '../hooks/useActiveSection'
import { scrollToId } from '../utils/scroll'

const IDS: string[] = chapters.map((c) => c.id)
const DARK = new Set<string>(['maaf', 'terima-kasih'])

/** Thin reading-progress line + chapter navigation (desktop). */
export function StoryProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const active = useActiveSection(IDS)
  const onDark = active ? DARK.has(active) : false
  const index = active ? IDS.indexOf(active) : -1

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left"
        style={{ scaleX, background: 'linear-gradient(90deg, #c99595, #c6a66b)' }}
      />

      {/* compact chapter label on mobile */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: index >= 0 ? 1 : 0, y: index >= 0 ? 0 : -10 }}
        className={`pointer-events-none fixed left-1/2 top-3 z-40 -translate-x-1/2 rounded-full px-3 py-1 text-[0.68rem] font-medium tracking-wide backdrop-blur-md lg:hidden ${
          onDark ? 'bg-black/25 text-ivory/85' : 'bg-ivory/70 text-brown shadow-sm'
        }`}
        aria-hidden="true"
      >
        {index >= 0 && (
          <>
            <span className="font-serif italic">{['I', 'II', 'III', 'IV', 'V'][index]}</span>
            <span className="mx-1.5 opacity-50">·</span>
            {chapters[index].label}
          </>
        )}
      </motion.div>

      <nav aria-label="Bab surat" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <ol className="flex flex-col gap-1">
          {chapters.map((c, i) => {
            const isActive = c.id === active
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(c.id)}
                  aria-current={isActive ? 'step' : undefined}
                  className={`group flex min-h-[36px] w-full items-center justify-end gap-3 rounded-full px-2 text-[0.72rem] transition-colors ${
                    onDark ? 'text-ivory/70 hover:text-ivory' : 'text-brown hover:text-ink'
                  }`}
                >
                  <span className={`whitespace-nowrap transition-all duration-300 ${isActive ? 'opacity-100' : 'translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100'}`}>
                    {c.label}
                  </span>
                  <span className="font-serif text-[0.8rem] italic opacity-70">{['I', 'II', 'III', 'IV', 'V'][i]}</span>
                  <span
                    className={`block h-[7px] rounded-full transition-all duration-500 ${isActive ? 'w-6' : 'w-[7px]'} ${
                      onDark ? (isActive ? 'bg-gold-soft' : 'bg-ivory/40') : isActive ? 'bg-burgundy' : 'bg-brown/40'
                    }`}
                  />
                </button>
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
