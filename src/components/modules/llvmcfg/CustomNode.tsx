/* eslint-disable camelcase */
import { memo, useState } from 'react'
import './CustomNode.scss'
import { Handle, Position } from 'react-flow-renderer'
import { useAppSelector } from '@/redux/hook'

// eslint-disable-next-line react/display-name
export default memo(({ data, isConnectable }: any) => {
  const { before_output, after_output } = useAppSelector((state) => state.graph)
  const { isFull } = useAppSelector((state) => state.mode)
  const [fullmode, setFullmode] = useState<boolean>(isFull)

  const changeColor = (sameNode: any, targetNode: any) => {
    if (targetNode.style.backgroundColor === 'rgb(255, 210, 96)') {
      sameNode.style.backgroundColor = 'white'
      targetNode.style.backgroundColor = 'white'
    } else if (targetNode.style.backgroundColor === 'white') {
      sameNode.style.backgroundColor = '#FFD260'
      targetNode.style.backgroundColor = '#FFD260'
    }
  }

  const findSameBlock = (idWithType: string, type: string) => {
    if (before_output && after_output) {
      const id = idWithType.substring(data.block_id.indexOf('%'))
      if (type === 'initial') {
        const index = before_output.indexOf(id)
        const sameBlockID = after_output[index]
        const targetNode = document.getElementById(idWithType)
        const sameNode = document.getElementById('optimized' + sameBlockID)
        changeColor(sameNode, targetNode)
      } else {
        const index = after_output.indexOf(id)
        const sameBlockID = before_output[index]
        const targetNode = document.getElementById(idWithType)
        const sameNode = document.getElementById('initial' + sameBlockID)
        changeColor(sameNode, targetNode)
      }
    }
  }

  const handleSame = (e: any) => {
    findSameBlock(e.target.id, e.target.name)
  }

  const handleFull = () => {
    setFullmode(!fullmode)
  }

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        isConnectable={false}
      />
      <button
        className={`${data.isSame}`}
        onClick={handleSame}
        // onContextMenu={handleClean}
        onDoubleClick={handleFull}
        id={data.block_id}
        name={data.type}
        style={{ backgroundColor: 'white' }}
      >
        {fullmode && (
          <>
            {data.label.map(function (item: string, i: number) {
              return <p key={i}>{item}</p>
            })}
          </>
        )}
        {!fullmode && (
          <>{data.block_id.substring(data.block_id.indexOf('%'))}</>
        )}
      </button>
      <Handle type="source" position={Position.Bottom} isConnectable={false} />
      <Handle
        type="target"
        position={Position.Bottom}
        id="b"
        isConnectable={false}
      />
    </>
  )
})
