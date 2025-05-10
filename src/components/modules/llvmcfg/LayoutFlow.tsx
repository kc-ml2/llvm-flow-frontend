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

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

// node 크기에 따라 중심 맞춰서 edge를 그리기 때문에
// node에 들어가는 정보에 따라서 nodeWidth, nodeHeight를 바꿔줘야 겹치지 않고 그려짐
const nodeWidth = 45
const nodeHeight = 45

const nodeTypes = {
  selectorNode: CustomNode,
}

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = 'TB',
) => {
  const isHorizontal = direction === 'LR'
  dagreGraph.setGraph({ rankdir: direction })

  nodes.forEach((node: Node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach((edge: Edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  nodes.forEach((node: any) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    node.targetPosition = isHorizontal ? 'left' : 'top'
    node.sourcePosition = isHorizontal ? 'right' : 'bottom'

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    }

    return node
  })

  return { nodes, edges }
}

interface LayoutFlowProps {
  llvmJson: any
  llvmJson_compare: any
  llvmOutput: any
  title: string
}

const LayoutFlow = (props: any) => (
  <BaseLayoutFlow
    {...props}
    nodeWidth={45}
    nodeHeight={45}
    defaultPosition={[150, 150]}
    minZoom={0.1}
    labelType="simple"
  />
)

export default LayoutFlow
