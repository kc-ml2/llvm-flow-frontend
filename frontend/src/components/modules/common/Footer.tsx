import styles from './Footer.module.scss'
import github from '@/images/github.png'
import insta from '@/images/insta.png'
import linkedin from '@/images/linkedin.png'
import facebook from '@/images/facebook.png'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.content}>
        <div className={styles.right}>
          <a href="https://github.com/kc-ml2" target="_blank" rel="noreferrer">
            <img src={github} alt="github" width="20" height="20"></img>
          </a>
          <a
            href="https://www.linkedin.com/company/kc-ml2/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt="github" width="20" height="20"></img>
          </a>
          <a
            href="https://www.facebook.com/KCML2/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={facebook} alt="github" width="20" height="20"></img>
          </a>
          <a
            href="https://www.instagram.com/ml2_machinelearninglab/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={insta} alt="github" width="20" height="20"></img>
          </a>
        </div>
        <hr></hr>
        <h5>ML2 | Machine Learning Lab</h5>
      </section>
    </footer>
  )
}

export default Footer
