import { Fragment } from 'react'
import { Squiggle } from '../Botanicals'

/**
 * Renders text where *segments* are emphasised. Plain React text only —
 * no HTML injection.
 */
export function RichText({ text, tone = 'light' }: { text: string; tone?: 'light' | 'dark' }) {
  const parts = text.split(/\*(.+?)\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className="relative whitespace-normal font-serif text-[1.18em] leading-[1.35] not-italic">
            <span className="italic">{part}</span>
            <Squiggle
              color={tone === 'dark' ? '#c6a66b' : '#c99595'}
              className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full opacity-80"
            />
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

/** Headline helper: *segments* become italic accent spans. */
export function Accent({ text, className = 'italic' }: { text: string; className?: string }) {
  return (
    <>
      {text.split(/\*(.+?)\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={className}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
