/* eslint-disable camelcase */
import React, { Suspense } from 'react'
import Switch from '@/components/modules/common/Switch'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { setIsFullFalse, setIsFullTrue } from '@/redux/features/mode/modeSlice'
import styles from './llvmcfg.module.scss'
import Loading from '@/components/modules/common/Loading'

function LLVMcfg() {
  const { file_pass, before_json, before_output, after_json, after_output } =
    useAppSelector((state) => state.graph)
  const { isFull } = useAppSelector((state) => state.mode)

  const dispatch = useAppDispatch()

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
        <div className={styles.info}>
          <h4>
            Pass Option = <i>{file_pass}</i>
          </h4>
        </div>
        <div className={styles.mode}>
          <Switch
            isOn={isFull}
            handleToggle={() => {
              if (isFull === true) {
                dispatch(setIsFullFalse())
              } else if (isFull === false) {
                dispatch(setIsFullTrue())
              }
            }}
          />
        </div>
      </div>
      {isFull && (
        <Suspense fallback={<Loading />}>
          <LayoutFlowFull
            llvmJson={before_json}
            llvmOutput={before_output}
            title={'initial'}
          />
          <LayoutFlowFull2
            llvmJson={after_json}
            llvmOutput={after_output}
            title={'optimized'}
          />
          <hr></hr>
        </Suspense>
      )}
      {!isFull && (
        <Suspense fallback={<Loading />}>
          <LayoutFlow
            llvmJson={before_json}
            llvmOutput={before_output}
            title={'initial'}
          />
          <LayoutFlow2
            llvmJson={after_json}
            llvmOutput={after_output}
            title={'optimized'}
          />
          <hr></hr>
        </Suspense>
      )}
    </section>
  )
}

export default LLVMcfg as React.ComponentType
