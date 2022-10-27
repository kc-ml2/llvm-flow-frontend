import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { setLogout } from '@/redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import styles from './profile.module.scss'
import buttons from '@/styles/Button.module.scss'
import ProfileTable from './ProfileTable'
import profile from '@/images/profile.png'

const Profile = () => {
  const { email } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <section className={styles.profile}>
      <div className={styles.user}>
        <div className={styles.profileImg}>
          <div className={styles.outer}>
            <img src={profile} />
            <div className={styles.inner}>
              <input
                className={styles.inputfile}
                type="file"
                name="pic"
                accept="image/*"
              />
              <label>+</label>
            </div>
          </div>
        </div>
        <div className={styles.profileMail}>
          <p>Welcome !</p>
          <p>
            <i>{email}</i>
          </p>
          <br></br>
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
      </div>
      <div className={styles.list}>
        <ProfileTable />
      </div>
    </section>
  )
}

export default Profile
