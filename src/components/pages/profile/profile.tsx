import { useEffect, useState } from 'react'
import styles from './profile.module.scss'
import buttons from '@/styles/Button.module.scss'
import ProfileTable from './ProfileTable'
import { getJsonData } from '@/api/http-get'
import { OptimizationRecord } from '@/types/optimization'

const Profile = () => {
  const [userName, setUserName] = useState<string>('')
  const [items, setItems] = useState<OptimizationRecord[]>([])

  useEffect(() => {
    getJsonData('optimization-records', {
      page: 1,
      page_size: 10,
      desc: true,
    })
      .then((response) => {
        setItems(response.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleSubmit = () => {
    getJsonData(`profile?Identifier=${userName}`)
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
