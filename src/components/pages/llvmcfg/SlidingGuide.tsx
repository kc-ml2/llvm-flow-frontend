import { useState } from 'react'
import SlidingPane from 'react-sliding-pane'
import Guide from './Guide'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import styles from './SlidingGuide.module.scss'
import buttons from '@/styles/Button.module.scss'

const SlidingGuide = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div>
      <button onClick={() => setIsOpen(true)} className={buttons.guide}>
        🔎 Open Guide
      </button>
      <SlidingPane
        className={styles.sliding}
        overlayClassName={styles.overlay}
        isOpen={isOpen}
        title="🔎 Guide"
        subtitle="How to use LLVM-FLOW"
        onRequestClose={() => {
          setIsOpen(false)
        }}
      >
        <Guide />
      </SlidingPane>
    </div>
  )
}

export default SlidingGuide
