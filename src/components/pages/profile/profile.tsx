import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { setLogout } from '@/redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import styles from './profile.module.scss'
import buttons from '../../../Button.module.scss'
import ProfileTable from './ProfileTable'

const Profile = () => {
  const { email } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

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
        <ProfileTable />
      </div>
    </section>
  )
}

export default Profile
