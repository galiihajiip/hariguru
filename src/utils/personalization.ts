export const DEFAULT_TO = 'Bapak/Ibu Guru'
export const SCHOOL = 'SMA Negeri 1 Surakarta'
export const MAX_NAME_LENGTH = 60

export type Sapaan = 'Bapak' | 'Ibu' | 'Bapak/Ibu' | 'Bapak dan Ibu'

export interface Personalization {
  /** Name on the envelope, e.g. "Bu Rina" (default "Bapak/Ibu Guru") */
  to: string
  /** true when a specific teacher was named in the URL */
  hasTo: boolean
  /** {s}  — pronoun in running text: "Bapak dan Ibu" (everyone), "Ibu", "Bapak" or "Bapak/Ibu" */
  sapaan: Sapaan
  /** {sapa} — direct address: "Bapak dan Ibu Guru" or the teacher's name */
  sapa: string
  /** {kepada} — opening line of the final letter: "seluruh Bapak dan Ibu Guru SMA …" or the teacher's name */
  kepada: string
}

/**
 * Normalise a free-text name: strip control/invisible characters, collapse
 * whitespace, trim and cap the length. Output is only ever rendered as React
 * text, never as HTML.
 */
export function cleanName(raw: string | null | undefined, max = MAX_NAME_LENGTH): string {
  if (!raw) return ''
  const cleaned = raw
    .normalize('NFC')
    // control chars, zero-width chars, bidi overrides
    .replace(/[\u0000-\u001F\u007F-\u009F​-‏‪-‮⁠-⁩﻿]/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[<>{}\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (cleaned.length <= max) return cleaned
  // cut on a character boundary (handles emoji / surrogate pairs)
  return Array.from(cleaned).slice(0, max).join('').trim()
}

/** Infer how to address the teacher from the honorific in their name. */
export function inferSapaan(name: string): Sapaan {
  const n = name.toLowerCase()
  if (/^(bu|ibu|bunda|bu\.|ibu\.|mrs\.?|ms\.?|miss)(\s|$)/.test(n)) return 'Ibu'
  if (/^(pak|bapak|pak\.|bapak\.|mr\.?)(\s|$)/.test(n)) return 'Bapak'
  return 'Bapak/Ibu'
}

export function readPersonalization(search: string = window.location.search): Personalization {
  const to = cleanName(new URLSearchParams(search).get('to'))
  if (!to) {
    return {
      to: DEFAULT_TO,
      hasTo: false,
      sapaan: 'Bapak dan Ibu',
      sapa: 'Bapak dan Ibu Guru',
      kepada: `seluruh Bapak dan Ibu Guru ${SCHOOL}`,
    }
  }
  return { to, hasTo: true, sapaan: inferSapaan(to), sapa: to, kepada: to }
}

export function isStudioMode(search: string = window.location.search): boolean {
  const v = new URLSearchParams(search).get('studio')
  return v === '1' || v === 'true'
}

/** Replace {s}, {sapa}, {kepada} and {to} tokens inside a content string. */
export function fill(text: string, p: Pick<Personalization, 'sapaan' | 'to' | 'sapa' | 'kepada'>): string {
  return text
    .replaceAll('{sapa}', p.sapa)
    .replaceAll('{kepada}', p.kepada)
    .replaceAll('{s}', p.sapaan)
    .replaceAll('{to}', p.to)
}
