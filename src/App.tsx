import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from '@/components/pages/main/main'
import UploadC from '@/components/pages/upload/uploadC'
import UploadCPP from '@/components/pages/upload/uploadCPP'
import UploadLL from '@/components/pages/upload/uploadLL'
import Login from '@/components/modules/login/Login'
import Profile from '@/components/pages/profile/profile'
import LLVMcfg from '@/components/pages/llvmcfg/llvmcfg'
import NavBar from './components/modules/common/NavBar'
import Footer from './components/modules/common/Footer'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { setAuthData } from '@/redux/features/auth/authSlice'
import { useEffect } from 'react'

function App() {
  const { isLogin } = useAppSelector((state) => state.auth)
  const { isReady } = useAppSelector((state) => state.graph)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) {
      dispatch(setAuthData(JSON.parse(data)))
    }
  })

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/uploadC" element={<UploadC />} />
        <Route path="/uploadCPP" element={<UploadCPP />} />
        <Route path="/uploadLL" element={<UploadLL />} />
        <Route path="/login" element={<Login />} />
        <Route path="/llvmcfg" element={<LLVMcfg />} />
        {isLogin && <Route path="/profile" element={<Profile />} />}
        {isReady && <Route path="/llvmcfg" element={<LLVMcfg />} />}
      </Routes>
      {!isReady && <Footer />}
    </Router>
  )
}

export default App
