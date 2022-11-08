import { useEffect, useState } from 'react'
import styles from './Nickname.module.scss'
import buttons from '@/styles/Button.module.scss'
import axios from 'axios'
const { REACT_APP_API_URL } = process.env
import Stack from '@mui/material/Stack'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import { setAuthData } from '@/redux/features/auth/authSlice'
import { useAppDispatch } from '@/redux/hook'
import { useDispatch } from 'react-redux'

const Helper = () => {
  const [nickname, setNickname] = useState<any>()
  const [openWarning, setOpenWarning] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (nickname.length == 0) {
      alert('please fill out this form ')
    } else {
      const data = { Identifier: nickname }

      const headers = {
        'Content-type': 'application/json',
      }

      axios
        .post(`${REACT_APP_API_URL}/identify/`, data, { headers: headers })
        .then((response) => {
          console.log(response)
          if (response.status === 0) {
            localStorage.setItem('nickname', JSON.stringify(nickname))
            dispatch(setAuthData(JSON.stringify(nickname)))
            navigate(-1)
          } else {
            setOpenWarning(true)
          }
        })
    }
  }

  const handleSubmitAgain = async (e: any) => {
    e.preventDefault()
    if (nickname.length == 0) {
      alert('please fill out this form ')
    } else {
      localStorage.setItem('nickname', JSON.stringify(nickname))
      dispatch(setAuthData(JSON.stringify(nickname)))
      navigate(-1)
    }
  }

  return (
    <section className={styles.nickname}>
      <h1>Nickname</h1>
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <input
          type="text"
          name="nickname"
          placeholder=""
          id="input-text"
          onChange={(e) => {
            setNickname(e.target.value)
          }}
        />

        <input type="submit" value="submit" className={buttons.default}></input>
      </form>
      <br></br>
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
            The same nickname already exists.
            <br></br>
            <button onClick={handleSubmitAgain}>It's me!</button>
          </Alert>
        </Collapse>
      </Stack>
    </section>
  )
}
export default Helper
