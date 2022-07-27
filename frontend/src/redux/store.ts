import { configureStore } from '@reduxjs/toolkit'
import graphReducer from './features/graph/graphSlice'
import authReducer from './features/auth/authSlice'
import modeReducer from './features/mode/modeSlice'

export const store = configureStore({
  reducer: {
    graph: graphReducer,
    auth: authReducer,
    mode: modeReducer,
  },
})
