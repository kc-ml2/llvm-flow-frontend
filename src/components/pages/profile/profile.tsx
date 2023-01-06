import { useEffect, useState } from 'react'
import styles from './profile.module.scss'
import buttons from '@/styles/Button.module.scss'
import axios from 'axios'
import ProfileTable from './ProfileTable'
const { REACT_APP_API_URL } = process.env

const Profile = () => {
  const [userName, setUserName] = useState<string>('')
  const [items, setItems] = useState<any | undefined>(undefined)

  useEffect(() => {
    const headers = {
      'Content-type': 'application/json',
    }

    axios
      .get(`${REACT_APP_API_URL}/allprofile`, {
        headers: headers,
      })
      .then((response) => {
        setItems(response.data.data.reverse())
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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
