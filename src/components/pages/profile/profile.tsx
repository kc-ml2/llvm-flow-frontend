import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { setLogout } from '@/redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { setGraphData } from '@/redux/features/graph/graphSlice'
import styles from './profile.module.scss'
import buttons from '../../../Button.module.scss'
import axios from 'axios'
const { REACT_APP_API_URL } = process.env

const Profile = () => {
  const { email, token } = useAppSelector((state) => state.auth)
  const [data, setData] = useState<any | undefined>(undefined)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const headers = {
      Authorization: 'Token ' + token,
      // FIXME: boundary 해결하기!
      'Content-type':
        'multipart/form-data; boundary=177130003042384797933296855923',
    }

    axios
      .get(`${REACT_APP_API_URL}/profile/`, { headers: headers })
      .then((response) => {
        setData(response.data.data)
      })
  }, [])

  const showGraph = (i: any) => {
    const payload = new FormData()
    payload.append('path', i[2].substring(0, i[2].indexOf('/')))
    payload.append('passOption', i[0])

    const headers = {
      Authorization: 'Token ' + token,
      // FIXME: boundary 해결하기!
      'Content-type':
        'multipart/form-data; boundary=177130003042384797933296855923',
    }
    axios
      .post(`${REACT_APP_API_URL}/profile/`, payload, {
        headers: headers,
      })
      .then((response) => {
        dispatch(setGraphData(response.data))
        navigate('/llvmcfg')
      })
  }

  const convertDate = (date: string) => {
    return (
      date.slice(0, 4) +
      '.' +
      date.slice(4, 6) +
      '.' +
      date.slice(6, 8) +
      '/' +
      date.slice(9, 11) +
      ':' +
      date.slice(11, 13)
    )
  }

  return (
    <section className={styles.profile}>
      <div className={styles.user}>
        <p>
          Welcome, <i>{email}</i> !
        </p>
        <button
          className={buttons.basic}
          onClick={() => {
            localStorage.removeItem('user')
            dispatch(setLogout())
            navigate('/')
          }}
        >
          Log out
        </button>
      </div>
      <div className={styles.list}>
        <table>
          <thead>
            <tr>
              <td>data</td>
              <td>file name</td>
              <td>pass option</td>
              <td>show graph</td>
            </tr>
          </thead>
          <tbody>
            {data &&
              data
                .map((i: any) => (
                  <tr key={i}>
                    <td>{convertDate(i[2].substring(0, i[2].indexOf('/')))}</td>
                    <td>{i[2].substring(i[2].indexOf('/') + 1)}</td>
                    <td>{i[0]}</td>
                    <td>
                      <button
                        className={buttons.dark}
                        onClick={() => showGraph(i)}
                      >
                        start
                      </button>
                    </td>
                  </tr>
                ))
                .reverse()}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Profile
