/* eslint-disable camelcase */
import React, { Suspense, useEffect } from 'react'
import SwitchSelector from '@/components/pages/llvmcfg/SwitchSelector'
import Helper from './Helper'
import SlidingGuide from './SlidingGuide'
import { useAppSelector } from '@/redux/hook'
import styles from './llvmcfg.module.scss'
import Loading from '@/components/modules/common/Loading'

function LLVMcfg() {
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
    <section className={styles.llvmcfg}>
      <div className={styles.row}>
        <div className={styles.guide}>
          <SlidingGuide />
        </div>
        <div className={styles.mode}>
          <SwitchSelector />
        </div>
      </div>

      {isFull && (
        <Suspense fallback={<Loading />}>
          <section className={styles.layout}>
            <div className={styles.first}>
              <LayoutFlowFull
                llvmJson={before_json}
                llvmOutput={before_output}
                title={'initial'}
              />
            </div>
            <div className={styles.second}>
              <LayoutFlowFull2
                llvmJson={after_json}
                llvmOutput={after_output}
                title={'optimized'}
              />
            </div>
          </section>
        </Suspense>
      )}
      {!isFull && (
        <Suspense fallback={<Loading />}>
          <section className={styles.layout}>
            <div className={styles.first}>
              <LayoutFlow
                llvmJson={before_json}
                llvmOutput={before_output}
                title={'initial'}
              />
            </div>
            <div className={styles.second}>
              <LayoutFlow2
                llvmJson={after_json}
                llvmOutput={after_output}
                title={'optimized'}
              />
            </div>
          </section>
        </Suspense>
      )}
    </section>
  )
}

export default LLVMcfg as React.ComponentType
