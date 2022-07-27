import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isLogin: boolean
  email: string | undefined
  token: string | undefined
}

const initialState: AuthState = {
  isLogin: false,
  email: undefined,
  token: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<AuthState>) => {
      state.isLogin = true
      state.email = payload.email
      state.token = payload.token
    },
    setLogout: (state) => {
      state.isLogin = false
      state.email = undefined
      state.token = undefined
    },
  },
})

export const { setAuthData, setLogout } = authSlice.actions

export default authSlice.reducer
