import { Dispatch, SetStateAction } from 'react'
import styles from './passOption.module.scss'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import passes from '@/locale/passes'

interface PassOptionProps {
  setPass_Props: Dispatch<SetStateAction<string>>
}

const PassOption = ({ setPass_Props }: PassOptionProps) => {
  const handleDisplayA = () => {
    const x = document.getElementById('passOption_pass_a__14cQD')
    if (x) {
      if (x.style.display === 'none') {
        x.style.display = 'block'
      } else {
        x.style.display = 'none'
      }
    }
  }

  const handleDisplayT = () => {
    const x = document.getElementById('passOption_pass_t__liEh0')
    if (x) {
      if (x.style.display === 'none') {
        x.style.display = 'block'
      } else {
        x.style.display = 'none'
      }
    }
  }

  const handleSetPass = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    const text = target.textContent
    const spanText = target.querySelector('span')?.textContent || ''
    const plainText = text?.replace(spanText, '') || ''
    setPass_Props((prev) => {
      if (prev) {
        return prev + ',' + plainText
      } else {
        return plainText
      }
    })
  }

  const analysisPasses = Object.values(passes.analysis)
  const transformPasses = Object.values(passes.transform)

  return (
    <section className={styles.container}>
      {/* analysis */}
      <section id={styles.title}>
        <button onClick={handleDisplayA}>
          LLVM's <i>Analysis</i> Passes <ExpandMoreIcon />
        </button>
      </section>
      <section id={styles.pass_a}>
        {analysisPasses.map(({ pass, description }) => (
          <button className={styles.tooltip} key={pass} onClick={handleSetPass}>
            {pass}
            <span className={styles.tooltip_text}>{description}</span>
          </button>
        ))}
      </section>
      <br></br>
      {/* transform */}
      <section id={styles.title}>
        <button onClick={handleDisplayT}>
          LLVM's <i>Transform</i> Passes <ExpandMoreIcon />
        </button>
      </section>
      <section id={styles.pass_t}>
        {transformPasses.map(({ pass, description }) => (
          <button className={styles.tooltip} key={pass} onClick={handleSetPass}>
            {pass}
            <span className={styles.tooltip_text}>{description}</span>
          </button>
        ))}
      </section>
      {/* */}
      <section id={styles.reference}>
        <a href="https://llvm.org/docs/Passes.html" target="_blacnk">
          <MenuBookIcon /> reference
        </a>
      </section>
    </section>
  )
}

export default PassOption
