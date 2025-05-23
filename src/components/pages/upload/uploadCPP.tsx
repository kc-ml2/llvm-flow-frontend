import React, { useState, FormEvent, ChangeEvent } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { useNavigate } from 'react-router-dom'
import { setGraphData } from '@/redux/features/graph/graphSlice'
import styles from './upload.module.scss'
import buttons from '@/styles/Button.module.scss'
import NearMeIcon from '@mui/icons-material/NearMe'
import { NavLink } from 'react-router-dom'
import { setAuthData } from '@/redux/features/auth/authSlice'
import PassOption from './passOption'
import { postFormData } from '@/api/http-post'
import WarningErrorAlert from './warningErrorAlert'
import { AxiosError } from 'axios'

interface FormData {
  content: FileList
  transformpass: string
  profileLabel: string
}

interface ApiError {
  response?: {
    data?: {
      error?: string
    }
  }
}

function Upload() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [pass, setPass] = useState<string>('')
  const [openWarning, setOpenWarning] = useState(false)
  const [openError, setOpenError] = useState(false)
  const { nickname } = useAppSelector((state) => state.auth)
  const [inputName, setInputName] = useState<string | undefined>(nickname)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const profileLabel = (form[0] as HTMLInputElement).value
    const content = (form[1] as HTMLInputElement).files
    const transformpass = (form[2] as HTMLInputElement).value

    if (
      !content ||
      content.length === 0 ||
      transformpass.length === 0 ||
      profileLabel.length === 0
    ) {
      setOpenWarning(true)
    } else {
      const data = new FormData()
      for (let i = 0; i < content.length; i++) {
        data.append('content', content[i])
      }
      data.append('transformpass', transformpass)
      data.append('profileLabel', profileLabel)

      postFormData(data, 'uploadCPP')
        .then((response) => {
          dispatch(setGraphData(response.data))
          localStorage.setItem('nickname', JSON.stringify(profileLabel))
          dispatch(setAuthData(profileLabel))
          navigate('/llvmcfg')
        })
        .catch((err: AxiosError) => {
          setOpenError(true)
          setErrorMessage(err.response?.data?.error || 'An error occurred')
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
            id="input-text"
            defaultValue={inputName}
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPass(e.target.value)
            }}
            value={pass}
          />
        </div>

        <WarningErrorAlert
          errorMessage={errorMessage}
          openError={openError}
          openWarning={openWarning}
          setOpenError={setOpenError}
          setOpenWarning={setOpenWarning}
        />

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

      <PassOption setPass_Props={setPass} />
    </section>
  )
}

export default Upload
