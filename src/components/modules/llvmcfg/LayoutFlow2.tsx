/* eslint-disable camelcase */
import { useCallback, useState } from 'react'
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  MiniMap,
  Background,
  Node,
  Edge,
  MarkerType,
} from 'react-flow-renderer'
import dagre from 'dagre'
import CustomNode from './CustomNode'
import ResizableBox from '@/components/modules/resizableBox/ResizableBox'
import './LayoutFlow.scss'
import buttons from '@/styles/Button.module.scss'
import { COLORS } from '@/const/color'
import BaseLayoutFlow from './BaseLayoutFlow'

interface LayoutFlowProps {
  llvmJson: any
  llvmJson_compare: any
  llvmOutput: any
  title: string
}
const LayoutFlow2 = (props: LayoutFlowProps) => (
  <BaseLayoutFlow
    {...props}
    nodeWidth={45}
    nodeHeight={45}
    defaultPosition={[150, 150]}
    minZoom={0.1}
    labelType="simple"
  />
)

export default LayoutFlow2
