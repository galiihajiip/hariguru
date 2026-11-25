import { motion } from 'motion/react'
import { Briefcase, Laptop, School } from 'lucide-react'
import { remains } from '../data/letterContent'

const EASE = [0.22, 1, 0.36, 1] as const
const ICONS = [School, Laptop, Briefcase]

/** Surakarta → Surabaya: the road from the classroom, drawn as a dashed travel line. */
export function JourneyRoute() {
  const stops = remains.journey
  return (
    <ol className="relative grid gap-0 md:grid-cols-3 md:gap-6" aria-label="Perjalanan setelah lulus">
      {stops.map((stop, i) => {
        const Icon = ICONS[i % ICONS.length]
        const last = i === stops.length - 1
        return (
          <motion.li
            key={stop.place}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.25 }}
            className="relative pb-8 pl-14 md:pb-0 md:pl-0 md:pt-14"
          >
            {/* connector to the next stop */}
            {!last && (
              <>
                <motion.span
                  aria-hidden="true"
                  className="absolute bottom-0 left-[21px] top-11 w-0 origin-top border-l-2 border-dashed border-brown/35 md:hidden"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.3 + i * 0.25 }}
                />
                <motion.span
                  aria-hidden="true"
                  className="absolute left-12 right-[-1.5rem] top-[21px] hidden h-0 origin-left border-t-2 border-dashed border-brown/35 md:block"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.25 }}
                />
              </>
            )}
            <span
              aria-hidden="true"
              className={`absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border ${
                last ? 'border-burgundy bg-burgundy text-ivory' : 'border-brown/40 bg-ivory text-burgundy'
              } shadow-[0_6px_14px_-8px_rgba(60,40,20,0.5)]`}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </span>
            <p className="eyebrow text-[0.6rem] text-brown">
              {String(i + 1).padStart(2, '0')} · {stop.city}
            </p>
            <p className="font-serif mt-1 text-[1.35rem] leading-tight text-ink">{stop.place}</p>
            <p className="font-hand mt-1 text-[1.2rem] leading-tight text-burgundy">{stop.detail}</p>
          </motion.li>
        )
      })}
    </ol>
  )
}
