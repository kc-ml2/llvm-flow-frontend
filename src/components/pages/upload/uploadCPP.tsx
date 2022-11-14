import React, { useState } from 'react'
// import uploadAPI from '@/api/http-upload'
// import getCompilerOutput from '@/api/http-upload'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setGraphData } from '@/redux/features/graph/graphSlice'
import styles from './upload.module.scss'
import buttons from '@/styles/Button.module.scss'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'
import { NavLink } from 'react-router-dom'
import { setAuthData } from '@/redux/features/auth/authSlice'
import PassOption from './passOption'
const { REACT_APP_API_URL } = process.env

function Upload() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [pass, setPass] = useState<string>('')
  const [openWarning, setOpenWarning] = useState(false)
  const [openError, setOpenError] = useState(false)
  const { nickname } = useAppSelector((state) => state.auth)
  const [inputName, setInputName] = useState<string | undefined>(nickname)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const profileLabel = e.target[0].value
    const content = e.target[1].files
    const transformpass = e.target[2].value

    if (
      content.length == 0 ||
      transformpass.length == 0 ||
      profileLabel.length == 0
    ) {
      setOpenWarning(true)
    } else {
      const data = new FormData()
      for (let i = 0; i < content.length; i++) {
        data.append('content', content[i])
      }
      data.append('transformpass', transformpass)
      data.append('profileLabel', profileLabel)

      const headers = {
        // Authorization: 'Token ' + token,
        // FIXME: boundary 해결하기!
        'Content-type':
          'multipart/form-data; boundary=177130003042384797933296855923',
      }

      axios
        .post(`${REACT_APP_API_URL}/uploadCPP/`, data, { headers: headers })
        .then((response) => {
          dispatch(setGraphData(response.data))
          localStorage.setItem('nickname', JSON.stringify(profileLabel))
          dispatch(setAuthData(profileLabel))
          navigate('/llvmcfg')
        })
        .catch((response) => setOpenError(true))
    }
  }

  return (
    <section className={styles.upload}>
      <div className={styles.navlink}>
        <NavLink to="/uploadC" id={styles.deactive}>
          with .c file
        </NavLink>
        <NavLink to="/uploadCPP" id={styles.active}>
          with .cpp file
        </NavLink>
        <NavLink to="/uploadLL" id={styles.deactive}>
          with .ll file
        </NavLink>
      </div>
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <div className={styles.userName}>
          <label htmlFor="input-text">User Name</label>
          <input
            type="text"
            name="profileLabel"
            placeholder={inputName}
            id="input-text"
          />
        </div>
        <div className={styles.file}>
          <label htmlFor="input-file">.cpp File Upload</label>
          <input
            type="file"
            name="content"
            multiple
            id="intput-file"
            accept=".h, .cpp"
          />
        </div>
        <div className={styles.pass}>
          <label htmlFor="input-text">LLVM's passes</label>
          <input
            type="text"
            name="transformpass"
            placeholder="ex) -simplifycfg -inline"
            id="input-text"
            onChange={(e) => {
              setPass(e.target.value)
            }}
          />
        </div>

        {/* Warning & Error Alert */}

        <Stack>
          <Collapse in={openError}>
            <Alert
              severity="error"
              variant="outlined"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenError(false)
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              <AlertTitle>
                <b>LLVM Command Error</b>
              </AlertTitle>
              Please check LLVM's passes and file again!
            </Alert>
          </Collapse>
        </Stack>

        <Stack>
          <Collapse in={openWarning}>
            <Alert
              severity="warning"
              variant="outlined"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenWarning(false)
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              <AlertTitle>
                <b>Warning</b>
              </AlertTitle>
              User Name, File and Pass Option must be filled out!
            </Alert>
          </Collapse>
        </Stack>

        {/* Warning & Error Alert */}

        <div className={styles.cmd}>
          <h5>clang 10, llvm 10</h5>
          {/* <p>clang -O0 -g -Xclang -disable-O0-optnone -emit-llvm -S *.c</p> */}
          <p>
            opt beforeg.ll -S <i>{pass}</i> -o afterg.ll
          </p>
        </div>

        <div id={styles.submit}>
          <input
            type="submit"
            value="submit"
            className={buttons.default}
          ></input>
        </div>
      </form>

      <PassOption />
    </section>
  )
}

export default Upload as React.ComponentType
