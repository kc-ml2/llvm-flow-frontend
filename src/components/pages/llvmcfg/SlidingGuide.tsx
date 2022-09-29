import { useState } from 'react'
import SlidingPane from 'react-sliding-pane'
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
        title="Hey, it is optional pane title.  I can be React component too."
        subtitle="Optional subtitle."
        onRequestClose={() => {
          setIsOpen(false)
        }}
      >
        <div>And I am pane content.</div>
      </SlidingPane>
    </div>
  )
}

export default SlidingGuide
