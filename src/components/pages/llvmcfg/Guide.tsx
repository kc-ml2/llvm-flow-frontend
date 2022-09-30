import click from '@/gif/click.gif'
import styles from './Guide.module.scss'

const Guide = () => {
  return (
    <section className={styles.guide}>
      <h3>click</h3>
      <img src={click}></img>
      <h3>click</h3>
      <img src={click}></img>
      <h3>click</h3>
      <img src={click}></img>
      <h3>click</h3>
      <img src={click}></img>
    </section>
  )
}

export default Guide
