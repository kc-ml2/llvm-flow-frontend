import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { useNavigate } from 'react-router-dom'
import styles from './profile.module.scss'
import buttons from '@/styles/Button.module.scss'
import axios from 'axios'
import ProfileTable from './ProfileTable'
const { REACT_APP_API_URL } = process.env

const Profile = () => {
  const { nickname } = useAppSelector((state) => state.auth)
  const [userName, setUserName] = useState<string>('')
  const [items, setItems] = useState<any | undefined>(undefined)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    const headers = {
      'Content-type': 'application/json',
    }

    axios
      .get(`${REACT_APP_API_URL}/profile?Identifier=${userName}`, {
        headers: headers,
      })
      .then((response) => {
        setItems(response.data.data.reverse())
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <section className={styles.profile}>
      <div className={styles.search}>
        <div className={styles.input}>
          <label htmlFor="input-text">User Name</label>
          <input
            type="text"
            name="userName"
            placeholder=""
            id="input-text"
            onChange={(e) => {
              setUserName(e.target.value)
            }}
          />
        </div>
        <div className={styles.submit}>
          <button onClick={handleSubmit} className={buttons.default}>
            Search
          </button>
        </div>
      </div>
      <div className={styles.list}>
        <ProfileTable items={items} />
      </div>
    </section>
  )
}

export default Profile
