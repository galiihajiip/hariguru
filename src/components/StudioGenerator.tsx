import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy, ExternalLink, Link2, MessageCircle, RotateCcw, Users, Wand2 } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react'
import { buildWhatsAppMessage, copyText, currentBaseUrl, generateLinks, parseNames, type GeneratedLink } from '../utils/share'
import { WaxSeal } from './Stationery'
import { PressedFlower, Sparkle } from './Botanicals'
import { footer, sender } from '../data/letterContent'

const EXAMPLE = ['Bu Rina', 'Pak Budi', 'Bu Siti', 'Pak Andi', 'Bu Maya', 'Pak Dedi', 'Bu Wulan', 'Pak Arif', 'Bu Nia', 'Pak Hendra'].join('\n')
const MAX_RECIPIENTS = 100

function normaliseBase(raw: string): string | null {
  try {
    const u = new URL(raw.trim())
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null
    return `${u.origin}${u.pathname}`
  } catch {
    return null
  }
}

export default function StudioGenerator() {
  const ids = { names: useId(), base: useId() }
  const [names, setNames] = useState('')
  const [base, setBase] = useState(() => currentBaseUrl())
  const [links, setLinks] = useState<GeneratedLink[]>([])
  const [dupes, setDupes] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [announce, setAnnounce] = useState('')
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = 'Create Your Letters | Surat yang Tertinggal'
  }, [])

  const lineCount = useMemo(() => names.split(/\r?\n/).filter((l) => l.trim()).length, [names])

  function flash(key: string, msg: string) {
    setCopied(key)
    setAnnounce(msg)
    window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1800)
  }

  function handleGenerate(e: FormEvent) {
    e.preventDefault()
    const { names: list, duplicates } = parseNames(names)
    const b = normaliseBase(base)
    if (!b) return setError('Alamat website belum valid. Contoh: https://surat-guru.vercel.app/')
    if (!list.length) return setError('Tuliskan minimal satu nama guru, satu nama per baris.')
    if (list.length > MAX_RECIPIENTS) return setError(`Maksimal ${MAX_RECIPIENTS} penerima sekaligus.`)
    setError(null)
    setDupes(duplicates)
    setLinks(generateLinks(b, list))
    setAnnounce(`${list.length} tautan personal berhasil dibuat.`)
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  async function copyOne(l: GeneratedLink) {
    const ok = await copyText(l.url)
    flash(l.url, ok ? `Tautan untuk ${l.name} tersalin.` : 'Gagal menyalin. Salin manual dari kolom tautan.')
  }

  async function copyAll() {
    const text = links.map((l) => `${l.name}\n${l.url}`).join('\n\n')
    const ok = await copyText(text)
    flash('__all', ok ? `Semua ${links.length} tautan tersalin.` : 'Gagal menyalin semua tautan.')
  }

  function reset() {
    setLinks([])
    setDupes([])
    setError(null)
    setNames('')
  }

  const sample = links[0]

  return (
    <div className="min-h-[100svh] px-4 pb-16 pt-6 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between gap-3 border-b border-brown/25 pb-3 text-brown">
          <span className="flex items-center gap-2">
            <WaxSeal className="h-7 w-7" aria-hidden="true" />
            <span className="font-serif text-lg italic text-ink">Surat yang Tertinggal</span>
          </span>
          <span className="eyebrow text-[0.62rem]">Studio</span>
        </header>

        <div className="relative mt-10 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:gap-12">
          <PressedFlower className="pointer-events-none absolute -top-10 left-[35%] hidden w-16 rotate-[24deg] opacity-80 lg:block" aria-hidden="true" />

          <section className="lg:col-span-5" aria-labelledby="studio-title">
            <h1 id="studio-title" className="display text-[clamp(2.4rem,7vw,4rem)] text-ink">
              Create Your <span className="italic text-burgundy">Letters</span>
            </h1>
            <p className="pretty mt-4 max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
              Setiap guru memiliki cerita yang berbeda. Kirimkan ucapan kecil yang terasa personal.
            </p>

            <form onSubmit={handleGenerate} noValidate className="paper-sheet mt-8 rounded-[3px] p-5 sm:p-7">
              <div className="mb-6 flex items-center gap-3 rounded-[3px] bg-paper-deep/60 px-3.5 py-3">
                <WaxSeal className="h-9 w-9 shrink-0" aria-hidden="true" />
                <div className="text-[0.85rem] leading-snug">
                  <p className="eyebrow text-[0.58rem] text-brown">Pengirim</p>
                  <p className="font-medium text-ink">{sender.fullName}</p>
                  <p className="text-[0.78rem] text-brown">{sender.community}</p>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor={ids.names} className="eyebrow text-[0.64rem] text-brown">
                    Nama guru <span className="normal-case tracking-normal">(satu per baris)</span>
                  </label>
                  <span className="text-[0.75rem] text-brown" aria-live="polite">
                    {lineCount} baris
                  </span>
                </div>
                <textarea
                  id={ids.names}
                  value={names}
                  onChange={(e) => setNames(e.target.value)}
                  rows={10}
                  placeholder={EXAMPLE}
                  aria-invalid={Boolean(error) && !lineCount}
                  aria-describedby={error ? 'studio-error' : undefined}
                  className="mt-2 block w-full resize-y rounded-[3px] border border-brown/30 bg-ivory px-3.5 py-3 text-[1rem] leading-[1.7] text-ink placeholder:text-brown/40 focus:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/20"
                />
                <button type="button" onClick={() => setNames(EXAMPLE)} className="mt-2 min-h-[44px] text-[0.82rem] font-medium text-burgundy underline decoration-burgundy/30 underline-offset-4 hover:decoration-burgundy">
                  Isi dengan contoh 10 nama
                </button>
              </div>

              <details className="mt-4 rounded-[3px] border border-dashed border-brown/30 px-3.5 py-2 text-[0.85rem] text-ink-soft">
                <summary className="min-h-[36px] cursor-pointer py-1.5 font-medium text-brown">Alamat website</summary>
                <label htmlFor={ids.base} className="sr-only">
                  Alamat website untuk tautan
                </label>
                <input
                  id={ids.base}
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  inputMode="url"
                  className="mb-2 mt-1 block min-h-[44px] w-full rounded-[3px] border border-brown/30 bg-ivory px-3 text-[0.9rem] text-ink focus:border-burgundy focus:outline-none"
                />
                <p className="mb-1 text-[0.75rem] text-brown">Otomatis memakai alamat halaman ini. Ubah hanya bila Anda membuka studio dari alamat lain.</p>
              </details>

              {error && (
                <p id="studio-error" role="alert" className="mt-4 rounded-[3px] bg-burgundy/10 px-3.5 py-2.5 text-[0.88rem] text-burgundy">
                  {error}
                </p>
              )}

              <button type="submit" className="btn-ink mt-6 w-full">
                <Wand2 className="h-[18px] w-[18px]" aria-hidden="true" />
                Generate Personal Links
              </button>
              <p className="mt-3 text-center text-[0.75rem] text-brown">Semua diproses di browser ini. Tidak ada nama yang disimpan.</p>
            </form>
          </section>

          <section ref={resultsRef} className="scroll-mt-6 lg:col-span-7" aria-labelledby="studio-results">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 id="studio-results" className="font-serif text-[1.9rem] leading-tight text-ink">
                  Daftar surat
                </h2>
                <p className="mt-1 flex items-center gap-2 text-[0.88rem] text-brown">
                  <Users className="h-4 w-4" aria-hidden="true" />
                  {links.length ? `${links.length} penerima` : 'Belum ada tautan'}
                  {dupes.length > 0 && <span className="text-burgundy">· {dupes.length} nama ganda diabaikan</span>}
                </p>
              </div>
              {links.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={copyAll} className="btn-ghost text-ink">
                    {copied === '__all' ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                    {copied === '__all' ? 'Tersalin' : 'Copy All Links'}
                  </button>
                  <a href={links[0].url} target="_blank" rel="noopener noreferrer" className="btn-ghost text-burgundy">
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Preview Greeting
                  </a>
                  <button type="button" onClick={reset} className="btn-ghost text-brown" aria-label="Kosongkan formulir dan hasil">
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>

            {dupes.length > 0 && <p className="mt-3 text-[0.8rem] text-brown">Duplikat: {dupes.join(', ')}</p>}

            {!links.length ? (
              <div className="mt-6 flex flex-col items-center rounded-[3px] border border-dashed border-brown/35 px-6 py-16 text-center">
                <Link2 className="h-7 w-7 text-brown/60" aria-hidden="true" />
                <p className="font-hand mt-3 text-[1.5rem] text-brown">tautan personal akan muncul di sini</p>
                <p className="mt-1 max-w-sm text-[0.85rem] text-brown/80">Setiap guru mendapat tautan sendiri, lengkap dengan pesan WhatsApp yang siap dikirim.</p>
              </div>
            ) : (
              <ol className="mt-6 space-y-3">
                <AnimatePresence initial={true}>
                  {links.map((l, i) => (
                    <motion.li
                      key={l.url}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.6) }}
                      className="rounded-[3px] border border-brown/20 bg-ivory/90 p-4 shadow-[0_1px_2px_rgba(60,40,20,0.06)] sm:p-5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-serif mt-0.5 w-7 shrink-0 text-[1.05rem] italic text-brown">{String(i + 1).padStart(2, '0')}</span>
                        <div className="min-w-0 flex-1">
                          <p className="font-serif text-[1.35rem] leading-tight text-ink">{l.name}</p>
                          <a href={l.url} target="_blank" rel="noopener noreferrer" className="mt-1 block break-all text-[0.8rem] leading-snug text-brown underline decoration-brown/25 underline-offset-2 hover:text-burgundy">
                            {l.url.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 sm:pl-10">
                        <button type="button" onClick={() => copyOne(l)} className="btn-ghost min-w-[132px] text-ink" aria-label={`Copy link untuk ${l.name}`}>
                          {copied === l.url ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                          {copied === l.url ? 'Tersalin' : 'Copy Link'}
                        </button>
                        <a
                          href={l.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost border-[#2f6b4f] text-[#2f6b4f]"
                          aria-label={`Kirim via WhatsApp untuk ${l.name}`}
                        >
                          <MessageCircle className="h-4 w-4" aria-hidden="true" />
                          Send via WhatsApp
                        </a>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ol>
            )}

            {sample && (
              <div className="mt-8">
                <p className="eyebrow text-[0.62rem] text-brown">Contoh pesan WhatsApp · {sample.name}</p>
                <pre className="mt-3 whitespace-pre-wrap rounded-[3px] border border-brown/20 bg-[#f1ebdd] p-4 font-sans text-[0.88rem] leading-relaxed text-ink-soft">
                  {buildWhatsAppMessage(sample.name, sample.url)}
                </pre>
              </div>
            )}
          </section>
        </div>

        <footer className="mt-16 flex flex-col items-center gap-1 border-t border-brown/20 pt-6 text-center text-[0.75rem] text-brown sm:flex-row sm:justify-between">
          <p className="flex items-center gap-2">
            <Sparkle className="h-2.5 w-2.5" aria-hidden="true" />
            {footer.madeBy} {footer.name}
          </p>
          <p>{footer.community}</p>
        </footer>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {announce}
      </p>
    </div>
  )
}
