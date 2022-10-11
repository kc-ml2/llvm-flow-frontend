/* eslint-disable camelcase */
/* eslint-disable multiline-ternary */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import styles from './main.module.scss'
import buttons from '@/styles/Button.module.scss'
import example from '@/gif/example.gif'
import exBefore from '../../../exData/exBefore.json'
import exAfter from '../../../exData/exAfter.json'
import { setGraphData } from '@/redux/features/graph/graphSlice'

function Main() {
  const { isLogin } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleExample = () => {
    dispatch(
      setGraphData({
        before_json: exBefore,
        before_output: ['Function', '%25', '%30', 'Function'],
        after_json: exAfter,
        after_output: ['1:', '%15', '%18', '2:'],
        file_pass: '-simplifycfg -sroa -dse -globalopt -instcombine',
      }),
    )
    navigate('/example')
  }

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
      <section className={styles.title}>
        <section id={styles.description}>
          <h1>LLVM-FLOW</h1>
          <h3>
            Visualize the LLVM CFG <i>interactively</i>.
          </h3>
          <br></br>
          {/* <button onClick={handleUploadC} className={buttons.white}>
            Start with <b>.c</b> file
          </button>
          <br></br> <br></br>
          <button onClick={handleUploadCPP} className={buttons.white}>
            Start with <b>.cpp</b> file
          </button>
          <br></br> <br></br>
          <button onClick={handleUploadLL} className={buttons.white}>
            Start with <b>.ll</b> file
          </button> */}
          <button className={buttons.white}>Getting Started</button>
        </section>
        <section id={styles.example}>
          <button className={buttons.ex} onClick={handleExample}>
            <img src={example}></img>
            <br></br>
            example →
          </button>
        </section>
      </section>
      <section className={styles.keyword}>
        <section id={styles.first}>
          <h4>😊 Open-source</h4>
        </section>
        <section id={styles.second}>
          <h4>💡 Easy-to-use</h4>
        </section>
        <section id={styles.third}>
          <h4>🚀 Various features</h4>
        </section>
      </section>
    </section>
  )
}

export default Main as React.ComponentType
