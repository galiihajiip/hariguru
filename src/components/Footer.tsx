import { footer } from '../data/letterContent'
import { Sparkle } from './Botanicals'

export function Footer() {
  return (
    <footer className="relative -mx-4 border-t border-ivory/10 px-4 pb-10 pt-10 text-center sm:-mx-8 sm:px-8 lg:-mx-14">
      <div className="mx-auto max-w-2xl">
        <p className="pretty font-serif text-[1.08rem] italic leading-[1.55] text-ivory/75">“{footer.quote}”</p>
        <div className="mt-6 flex items-center justify-center gap-3 text-gold/70" aria-hidden="true">
          <span className="h-px w-8 bg-gold/40" />
          <Sparkle className="h-2.5 w-2.5" color="#c6a66b" />
          <span className="h-px w-8 bg-gold/40" />
        </div>
        <p className="mt-6 text-[0.78rem] text-ivory/55">{footer.madeBy}</p>
        <p className="mt-1 text-[0.95rem] font-medium text-ivory/90">{footer.name}</p>
        <p className="mt-2 text-[0.78rem] leading-relaxed text-ivory/55">
          {footer.community}
          <span className="mx-2 opacity-50">·</span>
          {footer.date}
        </p>
        <p className="font-hand mt-5 text-[1.25rem] text-gold-soft/80">{footer.motto}</p>
      </div>
    </footer>
  )
}
