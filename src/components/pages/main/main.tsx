/* eslint-disable camelcase */
/* eslint-disable multiline-ternary */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/redux/hook'
import styles from './main.module.scss'
import buttons from '../../../Button.module.scss'

function Main() {
  const { isLogin } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()

  const handleUploadC = () => {
    if (isLogin) {
      navigate('/uploadC')
    } else {
      navigate('/login')
    }
  }

  const handleUploadCPP = () => {
    if (isLogin) {
      navigate('/uploadCPP')
    } else {
      navigate('/login')
    }
  }

  const handleUploadLL = () => {
    if (isLogin) {
      navigate('/uploadLL')
    } else {
      navigate('/login')
    }
  }

  return (
    <section className={styles.main}>
      <h1>LLVM-FLOW !</h1>
      <h5>
        Visualize CFG of LLVM IR using &nbsp;
        <a
          href="https://github.com/kc-ml2/llvm-block"
          target="_blank"
          rel="noreferrer"
        >
          LLVM-BLOCK
        </a>
      </h5>
      <br></br>
      <button onClick={handleUploadC} className={buttons.white}>
        Start with <b>.c</b> file
      </button>
      <br></br>
      <br></br>
      <button onClick={handleUploadCPP} className={buttons.white}>
        Start with <b>.cpp</b> file
      </button>
      <br></br>
      <br></br>
      <button onClick={handleUploadLL} className={buttons.white}>
        Start with <b>.ll</b> file
      </button>
    </section>
  )
}

export default Main as React.ComponentType
