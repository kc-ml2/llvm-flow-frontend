import type { BaseLayoutFlowProps } from './BaseLayoutFlow'
import BaseLayoutFlow from './BaseLayoutFlow'

interface LayoutFlowFactoryProps {
  llvmJson: any
  llvmJson_compare: any
  llvmOutput: any
  title: string
  variant: 'simpleSmall' | 'detailLarge'
}

const LayoutFlowFactory = ({
  variant,
  ...baseProps
}: LayoutFlowFactoryProps) => {
  const variants = {
    simpleSmall: {
      nodeWidth: 45,
      nodeHeight: 45,
      defaultPosition: [150, 150] as [number, number],
      minZoom: 0.1,
      labelType: 'simple' as const,
    },
    detailLarge: {
      nodeWidth: 350,
      nodeHeight: 300,
      defaultPosition: [150, 0] as [number, number],
      minZoom: 0.05,
      labelType: 'detail' as const,
    },
  }

  const layoutConfig = variants[variant]

  return <BaseLayoutFlow {...baseProps} layoutConfig={layoutConfig} />
}

export default LayoutFlowFactory
