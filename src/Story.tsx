import { useEffect } from 'react'
import { LetterSection } from './sections/LetterSection'
import { UnsaidSection } from './sections/UnsaidSection'
import { ApologySection } from './sections/ApologySection'
import { WhatRemainsSection } from './sections/WhatRemainsSection'
import { FinalSection } from './sections/FinalSection'
import { StoryProgress } from './components/StoryProgress'
import { scrollToId } from './utils/scroll'

/** Everything after the envelope. Loaded as its own chunk. */
export default function Story() {
  useEffect(() => {
    const t = setTimeout(() => scrollToId('surat'), 450)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <StoryProgress />
      <main id="isi-surat" className="overflow-x-clip">
        <LetterSection />
        <UnsaidSection />
        <ApologySection />
        <WhatRemainsSection />
        <FinalSection />
      </main>
    </>
  )
}
