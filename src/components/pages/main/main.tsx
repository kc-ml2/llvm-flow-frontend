/* eslint-disable camelcase */
/* eslint-disable multiline-ternary */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/redux/hook'
import styles from './main.module.scss'
import buttons from '@/styles/Button.module.scss'
import example from '@/gif/example.gif'
import exBefore from '../../../exData/exBefore.json'
import exAfter from '../../../exData/exAfter.json'
import { setGraphData } from '@/redux/features/graph/graphSlice'

function Main() {
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

  return (
    <section className={styles.main}>
      <section className={styles.title}>
        <section id={styles.description}>
          <h1>LLVM-FLOW</h1>
          <h3>
            Visualize the LLVM CFG <i>interactively</i>.
          </h3>
          <br></br>
          <br></br>
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
    </section>
  )
}

export default Main as React.ComponentType
