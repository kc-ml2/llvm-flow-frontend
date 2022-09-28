/* eslint-disable camelcase */
import { useCallback } from 'react'
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
import ResizableBox from '../common/ResizableBox'
import './LayoutFlow.scss'
import buttons from '@/styles/Button.module.scss'

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
  llvmOutput: any
  title: string
}

const LayoutFlow = ({ llvmJson, llvmOutput, title }: LayoutFlowProps) => {
  // const flowStyles = {  background: 'white' }
  // step1) json -> react flow에 맞는 형식으로 변경
  const nodeinitial = llvmJson.objects
  const node = nodeinitial.map((object: any) => {
    return { ...object, isSame: 'no' }
  })
  const edge = llvmJson.edges

  const position = { x: 0, y: 0 }

  // step2) basicblock id 지정 (ex. %210)
  const blockID = node.map(({ label }: any) =>
    label.replace(/[{}]/g, '').split(/\\l/)[0].slice(0, -1),
  )

  // step3) 같은 basicblock 찾기
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
      label: label.replace(/[{}]/g, '').split(/\\l/),
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
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNode,
    initialEdge,
  )

  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(layoutedNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(layoutedEdges)

  const nodeColor = (node: any) => {
    switch (node.data.isSame) {
      case 'yes':
        return '#fc851c'
      case 'no':
        return '#c4c4c4'
      default:
        return '#c4c4c4'
    }
  }

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds,
        ),
      ),
    [],
  )
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction)

      setNodes([...layoutedNodes])
      setEdges([...layoutedEdges])
    },
    [nodes, edges],
  )

  return (
    <ResizableBox>
      <h4>{title}</h4>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultPosition={[100, 0]}
        defaultZoom={0.5}
        minZoom={0.2}
        // style={flowStyles}
      >
        <Background />
        <MiniMap
          nodeColor={nodeColor}
          nodeStrokeWidth={3}
          maskColor={'#eaeaea'}
        />
      </ReactFlow>
      <div className="controls">
        <button onClick={() => onLayout('TB')} className={buttons.mini}>
          vertical layout
        </button>
        <button onClick={() => onLayout('LR')} className={buttons.mini}>
          horizontal layout
        </button>
      </div>
    </ResizableBox>
  )
}

export default LayoutFlow
