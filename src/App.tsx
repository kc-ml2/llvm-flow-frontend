import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from '@/components/pages/main/main'
import Nickname from '@/components/pages/nickname/Nickname'
import UploadC from '@/components/pages/upload/uploadC'
import UploadCPP from '@/components/pages/upload/uploadCPP'
import UploadLL from '@/components/pages/upload/uploadLL'
import Profile from '@/components/pages/profile/profile'
import LLVMcfg from '@/components/pages/llvmcfg/llvmcfg'
import Example from '@/components/pages/example/Example'
import NavBar from './components/modules/navbar/NavBar'
import Footer from './components/modules/footer/Footer'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { setAuthData } from '@/redux/features/auth/authSlice'
import { useEffect } from 'react'

function App() {
  const { isReady } = useAppSelector((state) => state.graph)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const data = localStorage.getItem('nickname')
    if (data) {
      dispatch(setAuthData(JSON.parse(data)))
    }
  })

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/nickname" element={<Nickname />} />
        <Route path="/uploadC" element={<UploadC />} />
        <Route path="/uploadCPP" element={<UploadCPP />} />
        <Route path="/uploadLL" element={<UploadLL />} />
        <Route path="/example" element={<Example />} />
        <Route path="/profile" element={<Profile />} />
        {isReady && <Route path="/llvmcfg" element={<LLVMcfg />} />}
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
