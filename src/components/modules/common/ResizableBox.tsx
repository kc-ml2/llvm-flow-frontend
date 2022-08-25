import React from 'react'
import { ResizableBox as ReactResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'

interface ResizableProps {
  children: React.ReactChild | React.ReactChild[]
}

export default function ResizableBox({ children }: ResizableProps) {
  const width = window.innerWidth * 0.97
  const height = 700

  return (
    <ReactResizableBox
      width={width}
      height={height}
      className="layoutflow"
      minConstraints={[1200, 700]}
      resizeHandles={['se', 'e', 's']}
    >
      <div style={{ width: '100%', height: '100%' }}>{children}</div>
    </ReactResizableBox>
  )
}
