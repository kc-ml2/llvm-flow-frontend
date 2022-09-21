import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
// local storage에 저장
import storage from 'redux-persist/lib/storage'
import graphReducer from './features/graph/graphSlice'
import authReducer from './features/auth/authSlice'
import modeReducer from './features/mode/modeSlice'

const rootReducer = combineReducers({
  graph: graphReducer,
  auth: authReducer,
  mode: modeReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})
