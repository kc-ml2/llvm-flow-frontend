import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { useNavigate } from 'react-router-dom'
import { setGraphData } from '@/redux/features/graph/graphSlice'
import styles from './upload.module.scss'
import buttons from '@/styles/Button.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import NearMeIcon from '@mui/icons-material/NearMe'
import { NavLink } from 'react-router-dom'
import { setAuthData } from '@/redux/features/auth/authSlice'
import PassOption from './passOption'
import { postFormData } from '@/api/http-post'
import WarningErrorAlert from './warningErrorAlert'

function Upload() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [pass, setPass] = useState<string>('')
  const [file, setFile] = useState<string>('')
  const [openWarning, setOpenWarning] = useState(false)
  const [openError, setOpenError] = useState(false)
  const { nickname } = useAppSelector((state) => state.auth)
  const [inputName, setInputName] = useState<string | undefined>(nickname)
  const [errorMessage, setErrorMessage] = useState<string>('')

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

      postFormData(data, 'uploadLL')
        .then((response: any) => {
          dispatch(setGraphData(response.data))
          localStorage.setItem('nickname', JSON.stringify(profileLabel))
          dispatch(setAuthData(profileLabel))
          navigate('/llvmcfg')
        })
        .catch(function (err: any) {
          setOpenError(true)
          setErrorMessage(err.response.data.error)
        })
    }
  }

  return (
    <section className={styles.upload}>
      <div className={styles.Docker}>
        If you want to run it directly on local environment,
        <a
          href="https://kc-ml2.gitbook.io/llvm-flow/getting-started/docker-guide"
          target="_blank"
          rel="noreferrer"
        >
          <NearMeIcon></NearMeIcon>
          <b>click here !</b>
        </a>
      </div>
      <div className={styles.navlink}>
        <NavLink to="/uploadC" id={styles.deactive}>
          with .c file
        </NavLink>
        <NavLink to="/uploadCPP" id={styles.deactive}>
          with .cpp file
        </NavLink>
        <NavLink to="/uploadLL" id={styles.active}>
          with .ll file
        </NavLink>
      </div>
      <div className={styles.clang}>
        <span>
          ⚠️ <br></br>
          LLVM-FLOW searches the same basic blocks between IR modules using
          <b> debug information.</b> <br></br>
          So, when compiling with clang,{' '}
          <b>please include the following commands.</b>
        </span>
        <br></br>
        <span id={styles.clangex}>
          <i>
            clang <b>-O0 -g -Xclang -disable-O0-optnone</b> -emit-llvm -S
          </i>
        </span>
      </div>

      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <div className={styles.userName}>
          <label htmlFor="input-text">User Name</label>
          <input
            type="text"
            name="profileLabel"
            // placeholder={inputName}
            id="input-text"
            defaultValue={inputName}
          />
        </div>
        <div className={styles.file}>
          <label htmlFor="input-file">.ll File Upload</label>
          <input
            type="file"
            name="content"
            multiple
            id="intput-file"
            accept=".ll"
            onChange={(e) => {
              setFile(e.target.value)
            }}
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
            value={pass}
          />
        </div>
        {/* Warning & Error Alert */}
        <WarningErrorAlert
          errorMessage={errorMessage}
          openError={openError}
          openWarning={openWarning}
          setOpenError={setOpenError}
          setOpenWarning={setOpenWarning}
        />

        <div className={styles.cmd}>
          <p>
            opt {file} -S <i>{pass}</i> -o afterg.ll
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

      <PassOption setPass_Props={setPass} />
    </section>
  )
}

export default Upload as React.ComponentType
