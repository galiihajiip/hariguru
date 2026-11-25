import { createContext, useCallback, useContext, type ReactNode } from 'react'
import { fill, readPersonalization, type Personalization } from '../utils/personalization'

const Ctx = createContext<Personalization>(readPersonalization(''))

export function PersonalizationProvider({ value, children }: { value: Personalization; children: ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function usePersonalization() {
  return useContext(Ctx)
}

/** Returns a function that fills {s} / {sapa} / {kepada} / {to} tokens for the current recipient. */
export function useFill() {
  const p = useContext(Ctx)
  return useCallback((text: string) => fill(text, p), [p])
}
