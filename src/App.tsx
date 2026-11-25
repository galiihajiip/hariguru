import { MotionConfig } from 'motion/react'
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { HeroSection } from './sections/HeroSection'
import { PersonalizationProvider } from './hooks/usePersonalization'
import { isStudioMode, readPersonalization } from './utils/personalization'

const loadStory = () => import('./Story')
const Story = lazy(loadStory)
const StudioGenerator = lazy(() => import('./components/StudioGenerator'))

export default function App() {
  const studio = useMemo(() => isStudioMode(), [])
  if (studio) {
    return (
      <Suspense fallback={null}>
        <StudioGenerator />
      </Suspense>
    )
  }
  return <Experience />
}

function Experience() {
  const personalization = useMemo(() => readPersonalization(), [])
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (personalization.hasTo) document.title = `Surat untuk ${personalization.to} | Surat yang Tertinggal`
    // warm the story chunk while the visitor looks at the envelope
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200))
    idle(() => void loadStory())
  }, [personalization])

  return (
    <PersonalizationProvider value={personalization}>
      <MotionConfig reducedMotion="user">
        <a
          href="#isi-surat"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
          onClick={(e) => {
            if (!opened) {
              e.preventDefault()
              setOpened(true)
            }
          }}
        >
          Langsung ke isi surat
        </a>
        <HeroSection opened={opened} onOpened={() => setOpened(true)} />
        {opened && (
          <Suspense fallback={<div className="h-screen" />}>
            <Story />
          </Suspense>
        )}
      </MotionConfig>
    </PersonalizationProvider>
  )
}
