/* eslint-disable camelcase */
import React, { Suspense, useEffect } from 'react'
import SwitchSelector from '@/components/pages/llvmcfg/SwitchSelector'
import SlidingGuide from '../llvmcfg/SlidingGuide'
import { useAppSelector } from '@/redux/hook'
import styles from '../llvmcfg/llvmcfg.module.scss'
import exstyles from './example.module.scss'
import Loading from '@/components/modules/common/Loading'
import LLVMcfg from '../llvmcfg/llvmcfg'

function Example() {
  const { file_pass, before_json, before_output, after_json, after_output } =
    useAppSelector((state) => state.graph)

  const { isFull } = useAppSelector((state) => state.mode)

  const LayoutFlow = React.lazy(
    () => import('@/components/modules/llvmcfg/LayoutFlow'),
  )
  const LayoutFlow2 = React.lazy(
    () => import('@/components/modules/llvmcfg/LayoutFlow2'),
  )
  const LayoutFlowFull = React.lazy(
    () => import('@/components/modules/llvmcfg/LayoutFlowFull'),
  )
  const LayoutFlowFull2 = React.lazy(
    () => import('@/components/modules/llvmcfg/LayoutFlowFull2'),
  )

  return (
    <section>
      <div className={exstyles.example}>
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
