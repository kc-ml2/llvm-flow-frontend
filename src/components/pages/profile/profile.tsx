import { useEffect, useState } from 'react'
import styles from './profile.module.scss'
import buttons from '@/styles/Button.module.scss'
import ProfileTable from './ProfileTable'
import { getJsonData } from '@/api/http-get'
import { OptimizationRecord } from '@/types/optimization'

const Profile = () => {
  const [userName, setUserName] = useState<string>('')
  const [items, setItems] = useState<OptimizationRecord[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchData = async (page: number, searchUser?: string) => {
    setLoading(true)
    try {
      if (searchUser) {
        // Search specific user - assuming this endpoint also supports pagination
        const response = await getJsonData(`profile?Identifier=${searchUser}`)
        setItems(response.data.data)
        setTotalPages(1) // Assuming search returns all results in one page
        setCurrentPage(1)
      } else {
        // Get paginated optimization history
        const response = await getJsonData('optimization-records', {
          page,
          page_size: 10,
          desc: true,
        })
        setItems(response.data.data)
        setTotalPages(Math.ceil(response.data.total_count / 10))
        setCurrentPage(page)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(1)
  }, [])

  const handleSubmit = () => {
    fetchData(1, userName)
  }

  const handlePageChange = (page: number) => {
    if (!userName) {
      // Only use server pagination for general history, not for user search
      fetchData(page)
    }
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
          <button
            onClick={handleSubmit}
            className={buttons.default}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
      <div className={styles.list}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ProfileTable
            items={items}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  )
}

export default Profile
