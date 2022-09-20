import React, { useEffect, useState } from 'react'
// import uploadAPI from '@/api/http-upload'
// import getCompilerOutput from '@/api/http-upload'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setGraphData } from '@/redux/features/graph/graphSlice'
import styles from './upload.module.scss'
import buttons from '../../../Button.module.scss'
const { REACT_APP_API_URL } = process.env
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'

function Upload() {
  const { isLogin, token } = useAppSelector((state) => state.auth)
  const [pass, setPass] = useState<string>('')
  const [openWarning, setOpenWarning] = useState(false)
  const [openError, setOpenError] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLogin) {
      navigate('/login')
    }
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const content = e.target[0].files
    const transformpass = e.target[1].value

    if (content.length == 0 || transformpass.length == 0) {
      setOpenWarning(true)
    } else {
      const data = new FormData()
      for (let i = 0; i < content.length; i++) {
        data.append('content', content[i])
      }
      data.append('transformpass', transformpass)

      // for (const value of data.entries()) {
      //   console.log(value)
      // }

      // const response = await getCompilerOutput({ data, token })

      const headers = {
        Authorization: 'Token ' + token,
        // FIXME: boundary 해결하기!
        'Content-type':
          'multipart/form-data; boundary=177130003042384797933296855923',
      }

      axios
        .post(`${REACT_APP_API_URL}/upload/`, data, { headers: headers })
        .then((response) => {
          dispatch(setGraphData(response.data))
          navigate('/llvmcfg')
        })
        .catch((response) => setOpenError(true))
    }
  }

  return (
    <section className={styles.upload}>
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <div className={styles.file}>
          <label htmlFor="input-file">File Upload</label>
          <input
            type="file"
            name="content"
            multiple
            id="intput-file"
            accept=".c, .h"
          />
        </div>
        <div className={styles.pass}>
          <label htmlFor="input-text">Pass Option</label>
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
                <b>Error</b>
              </AlertTitle>
              Please check pass option and file again!
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
              File and pass option must be filled out!
            </Alert>
          </Collapse>
        </Stack>

        {/* Warning & Error Alert */}

        <div className={styles.cmd}>
          <h5>clang 10, llvm 10</h5>
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
    </section>
  )
}

export default Upload as React.ComponentType
