// import { NodeType, EdgeType } from '@/components/modules/llvmcfg/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GraphState {
  // initialNodeBefore: NodeType[] | undefined
  // initialNodeAfter: NodeType[] | undefined
  // initialEdgeBefore: EdgeType[] | undefined
  // initialEdgeAfter: EdgeType[] | undefined
  before_json?: any
  before_output?: Array<string>
  after_json?: any
  after_output?: Array<string>
  file_pass?: string
  isReady?: boolean
}

const initialState: GraphState = {
  // initialNodeBefore: undefined,
  // initialNodeAfter: undefined,
  // initialEdgeBefore: undefined,
  // initialEdgeAfter: undefined,
  before_json: undefined,
  before_output: undefined,
  after_json: undefined,
  after_output: undefined,
  file_pass: undefined,
  isReady: false,
}

export const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    setGraphData: (state, { payload }: PayloadAction<GraphState>) => {
      // state.initialNodeBefore = payload.initialNodeBefore
      // state.initialNodeAfter = payload.initialNodeAfter
      // state.initialEdgeBefore = payload.initialEdgeBefore
      // state.initialEdgeAfter = payload.initialEdgeAfter
      state.before_json = payload.before_json
      state.before_output = payload.before_output
      state.after_json = payload.after_json
      state.after_output = payload.after_output
      state.file_pass = payload.file_pass
      state.isReady = true
    },
  },
})

export const { setGraphData } = graphSlice.actions

export default graphSlice.reducer
