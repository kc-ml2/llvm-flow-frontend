import example from '@/gif/example.gif'
import styles from './Guide.module.scss'

const Guide = () => {
  return (
    <section className={styles.guide}>
      <h3>click</h3>
      <img src={example}></img>
      <h3>click</h3>
      <img src={example}></img>
      <h3>click</h3>
      <img src={example}></img>
      <h3>click</h3>
      <img src={example}></img>
    </section>
  )
}

export default Guide
