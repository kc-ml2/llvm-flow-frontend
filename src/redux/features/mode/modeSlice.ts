import { createSlice } from '@reduxjs/toolkit'

interface ModeState {
  isFull: boolean
}

const initialState: ModeState = {
  isFull: false,
}

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setIsFullTrue: (state) => {
      state.isFull = true
    },
    setIsFullFalse: (state) => {
      state.isFull = false
    },
  },
})

export const { setIsFullTrue, setIsFullFalse } = modeSlice.actions

export default modeSlice.reducer
