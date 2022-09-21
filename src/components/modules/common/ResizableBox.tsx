import React from 'react'
import { ResizableBox as ReactResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'
import './ResizableBox.scss'

interface ResizableProps {
  children: React.ReactChild | React.ReactChild[]
}

export default function ResizableBox({ children }: ResizableProps) {
  const width = window.innerWidth * 0.98
  const height = 600

  return (
    <ReactResizableBox
      width={width}
      height={height}
      className="layoutflow"
      minConstraints={[1200, 600]}
      resizeHandles={['se', 'e', 's']}
    >
      <div style={{ width: '99%', height: '90%' }}>{children}</div>
    </ReactResizableBox>
  )
}
