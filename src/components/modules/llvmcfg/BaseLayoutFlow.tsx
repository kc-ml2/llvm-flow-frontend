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

const nodeTypes = {
  selectorNode: CustomNode,
}

export interface BaseLayoutFlowProps {
  llvmJson: any
  llvmJson_compare: any
  llvmOutput: any
  title: string
  layoutConfig: {
    nodeWidth: number
    nodeHeight: number
    defaultPosition: [number, number]
    minZoom: number
    labelType: 'simple' | 'detail'
  }
}

const BaseLayoutFlow = ({
  llvmJson,
  llvmJson_compare,
  llvmOutput,
  title,
  layoutConfig,
}: BaseLayoutFlowProps) => {
  const [vertical, setVertical] = useState<boolean>(true)
  const [horizontal, setHorizontal] = useState<boolean>(false)
  const nodeinitial = llvmJson.objects
  const node = nodeinitial.map((object: any) => {
    return { ...object, isSame: 'no' }
  })
  const edge = llvmJson.edges || [
    {
      _gvid: 0,
      tail: 0,
      head: 0,
    },
  ]

  const numberOfNode = llvmJson.objects.length
  const numberOfEdge = edge.length

  const position = { x: 0, y: 0 }

  // step2) basicblock id 지정 (ex. %210)
  const blockID = node.map(({ label }: any) =>
    label.replace(/[{}]/g, '').split(/\\l/)[0].slice(0, -1),
  )

  // step3) 같은 basicblock 찾기 + entry basic block의 경우 따로 비교
  function checkSameBlock(
    json: Array<string>,
    output: Array<string>,
    data: any,
  ) {
    for (let i = 0; i < json.length; i++) {
      for (let j = 0; j < output.length; j++) {
        if (json[i] === output[j]) {
          data[i].isSame = 'yes'
        }
      }
    }
  }
  checkSameBlock(blockID, llvmOutput, node)

  function checkSameEntryBlock(json: any, json_compare: any, data: any) {
    if (json[0].label == json_compare[0].label) {
      data[0].isSame = 'yes'
    }
  }
  checkSameEntryBlock(llvmJson.objects, llvmJson_compare.objects, node)

  // step*) edge tailport와 node 정보 연결하기
  function connectTailport(tailport: string, tail: number) {
    if (tailport) {
      const tailLabel = node.filter((node: any) => node._gvid === tail)[0].label
      const text = tailLabel.substring(tailLabel.indexOf(tailport) + 3)
      if (text.includes('|')) {
        return text.substring(0, text.indexOf('|'))
      } else {
        return text.substring(0, text.indexOf('}'))
      }
    } else {
      return null
    }
  }

  // setp**) 위에서 아래로 target이 되는 경우, targetHandleID 설정
  function setTargetHandleID(tail: number, head: number) {
    const tailLabelFull = node.filter((node: any) => node._gvid === tail)[0]
      .label
    const tailLabel = tailLabelFull
      .replace(/[{}]/g, '')
      .split(/\\l/)[0]
      .slice(0, -1)

    const headLabelFull = node.filter((node: any) => node._gvid === head)[0]
      .label
    const headLabel = headLabelFull
      .replace(/[{}]/g, '')
      .split(/\\l/)[0]
      .slice(0, -1)

    if (tailLabel > headLabel) {
      return 'b'
    } else if (tailLabel < headLabel) {
      return 'a'
    }
  }

  // step4) node, edge 정의
  const initialNode = node.map(({ _gvid, name, label, isSame }: any) => ({
    id: _gvid.toString(),
    data: {
      type: title,
      label:
        layoutConfig.labelType === 'simple'
          ? [label.replace(/[{}]/g, '').split(/\\l/)[0]]
          : label.replace(/[{}]/g, '').split(/\\l/),
      name: name.replace('Node', ''),
      id: _gvid.toString(),
      isSame: isSame,
      block_id: title + label.replace(/[{}]/g, '').split(/\\l/)[0].slice(0, -1),
    },
    type: 'selectorNode',
    position: position,
  }))
  const initialEdge = edge.map(({ _gvid, tail, head, tailport }: any) => ({
    id: _gvid.toString(),
    source: tail.toString(),
    target: head.toString(),
    type: 'smoothstep',
    animated: true,
    targetHandle: setTargetHandleID(tail, head),
    sourceHandle: setTargetHandleID(tail, head),
    label: connectTailport(tailport, tail),
    labelStyle: { fontWeight: 600, fontSize: '1rem' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  }))

  // step5) react-flow 설정
  // dagre 레이아웃 적용
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))
  const getLayoutedElements = (
    nodes: Node[],
    edges: Edge[],
    direction = 'TB',
  ) => {
    const isHorizontal = direction === 'LR'
    dagreGraph.setGraph({ rankdir: direction })
    nodes.forEach((node: Node) => {
      dagreGraph.setNode(node.id, {
        width: layoutConfig.nodeWidth,
        height: layoutConfig.nodeHeight,
      })
    })
    edges.forEach((edge: Edge) => {
      dagreGraph.setEdge(edge.source, edge.target)
    })
    dagre.layout(dagreGraph)
    nodes.forEach((node: any) => {
      const nodeWithPosition = dagreGraph.node(node.id)
      node.targetPosition = isHorizontal ? 'left' : 'top'
      node.sourcePosition = isHorizontal ? 'right' : 'bottom'
      node.position = {
        x: nodeWithPosition.x - layoutConfig.nodeWidth / 2,
        y: nodeWithPosition.y - layoutConfig.nodeHeight / 2,
      }
      return node
    })
    return { nodes, edges }
  }
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNode,
    initialEdge,
  )

  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(layoutedNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(layoutedEdges)

  const nodeColor = (node: any) => {
    switch (node.data.isSame) {
      case 'yes':
        return COLORS.PURPLE
      case 'no':
        return COLORS.GRAY
      default:
        return COLORS.GRAY
    }
  }

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds,
        ),
      ),
    [],
  )
  const onLayout = useCallback(
    (direction: any) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction)
      setNodes([...layoutedNodes])
      setEdges([...layoutedEdges])
    },
    [nodes, edges],
  )

  return (
    <ResizableBox>
      <h4>
        {title} &nbsp;&nbsp;
        <i>
          [Node: {numberOfNode}, Edge: {numberOfEdge}]
        </i>
      </h4>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultPosition={layoutConfig.defaultPosition}
        defaultZoom={0.5}
        minZoom={layoutConfig.minZoom}
      >
        <Background />
        <MiniMap
          nodeColor={nodeColor}
          nodeStrokeWidth={3}
          maskColor={COLORS.DARKGRAY}
        />
      </ReactFlow>
      <div className="controls">
        <button
          onClick={() => {
            onLayout('TB')
            setVertical(true)
            setHorizontal(false)
          }}
          className={vertical === true ? buttons.mini_fill : buttons.mini_gray}
        >
          vertical layout
        </button>
        <button
          onClick={() => {
            onLayout('LR')
            setVertical(false)
            setHorizontal(true)
          }}
          className={
            horizontal === true ? buttons.mini_fill : buttons.mini_gray
          }
        >
          horizontal layout
        </button>
      </div>
    </ResizableBox>
  )
}

export default BaseLayoutFlow
