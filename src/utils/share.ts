import { cleanName, inferSapaan } from './personalization'
import { sender } from '../data/letterContent'

export interface GeneratedLink {
  name: string
  url: string
  whatsapp: string
}

/** Base URL of the current deployment, without query string or hash. */
export function currentBaseUrl(): string {
  const { origin, pathname } = window.location
  return `${origin}${pathname}`
}

export function buildGreetingUrl(base: string, to: string): string {
  return `${base}?to=${encodeURIComponent(to)}`
}

export function buildWhatsAppMessage(to: string, url: string): string {
  const s = inferSapaan(to)
  return [
    `Selamat Hari Guru Nasional, ${to}.`,
    '',
    `Ada sebuah surat kecil yang ingin saya sampaikan sebagai bentuk terima kasih atas semua ilmu, waktu, dan kebaikan yang pernah ${s} berikan.`,
    '',
    `Saya membuat sesuatu yang sederhana ini khusus untuk ${s}.`,
    '',
    'Semoga berkenan membukanya.',
    '',
    url,
    '',
    'Selamat Hari Guru Nasional 2026.',
    '',
    `— ${sender.nickname}, alumni SMA Negeri 1 Surakarta angkatan 2023 (KASMAJI)`,
  ].join('\n')
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}

/** Split a textarea into unique, cleaned names (case/space-insensitive dedupe). */
export function parseNames(raw: string): { names: string[]; duplicates: string[] } {
  const seen = new Map<string, string>()
  const duplicates: string[] = []
  for (const line of raw.split(/\r?\n/)) {
    const name = cleanName(line)
    if (!name) continue
    const key = name
      .toLocaleLowerCase('id-ID')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[.\s]+/g, ' ')
      .trim()
    if (seen.has(key)) duplicates.push(name)
    else seen.set(key, name)
  }
  return { names: [...seen.values()], duplicates }
}

export function generateLinks(base: string, names: string[]): GeneratedLink[] {
  return names.map((name) => {
    const url = buildGreetingUrl(base, name)
    return { name, url, whatsapp: buildWhatsAppUrl(buildWhatsAppMessage(name, url)) }
  })
}

/** Clipboard write with a fallback for older in-app browsers. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.top = '-1000px'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}
