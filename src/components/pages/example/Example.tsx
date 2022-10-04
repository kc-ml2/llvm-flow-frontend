/* eslint-disable camelcase */
import React from 'react'
import styles from './example.module.scss'
import LLVMcfg from '../llvmcfg/llvmcfg'

function Example() {
  return (
    <section>
      <div className={styles.example}>
        <h3>Feature Overview 🎮</h3>
        <span>
          You can experience the basic feature of <i>LLVM-FLOW</i> on this
          example page. &nbsp;
          <i>LLVM-FLOW</i>&nbsp; visualizes interactive 'LLVM CFG' and allows
          you to compare optimization results at a glance. <br></br>
          Sign up and experience more features of <i>LLVM-FLOW</i> for yourself!
        </span>
      </div>

      <LLVMcfg />
    </section>
  )
}

export default Example as React.ComponentType
