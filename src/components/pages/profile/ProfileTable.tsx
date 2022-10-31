import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { useNavigate } from 'react-router-dom'
import { setGraphData } from '@/redux/features/graph/graphSlice'
import styles from './profile.module.scss'
import pagination from './pagination.module.scss'
import buttons from '@/styles/Button.module.scss'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import DeleteModal from '@/components/pages/profile/DeleteModal'
import { setIsDeleteOpenTrue } from '@/redux/features/modal/deleteModalSlice'

const { REACT_APP_API_URL } = process.env

const ProfileTable = () => {
  const { token } = useAppSelector((state) => state.auth)
  const [items, setItems] = useState<any | undefined>(undefined)
  const [currentID, setCurrentID] = useState<number>()
  const [currentFolder, setCurrentFolder] = useState<string>('')
  const [currentDate, setCurrentDate] = useState<string>('')
  const [currentFile, setCurrentFile] = useState<string>('')
  const [currentOption, setCurrentOption] = useState<string>('')

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
        setItems(response.data.data.reverse())
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
      .catch(() => {
        alert('Error, there is no data.')
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

  function Items({ currentItems }: any) {
    return (
      <table>
        <thead>
          <tr>
            <td>date</td>
            <td>file name</td>
            <td>pass option</td>
            <td>show graph</td>
            <td>delete</td>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((i: any) => (
              <tr key={i}>
                <td>{convertDate(i[2].substring(0, i[2].indexOf('/')))}</td>
                <td>{i[2].substring(i[2].indexOf('/') + 1)}</td>
                <td id={styles.passOption}>{i[0]}</td>
                <td>
                  <button className={buttons.mini} onClick={() => showGraph(i)}>
                    start
                  </button>
                </td>
                <td>
                  <button
                    className={buttons.mini_gray}
                    onClick={() => {
                      dispatch(setIsDeleteOpenTrue())
                      setCurrentID(i[1]),
                        setCurrentDate(
                          convertDate(i[2].substring(0, i[2].indexOf('/'))),
                        ),
                        setCurrentFile(i[2].substring(i[2].indexOf('/') + 1)),
                        setCurrentOption(i[0]),
                        setCurrentFolder(i[2].substring(0, i[2].indexOf('/')))
                    }}
                  >
                    delete
                  </button>

                  <DeleteModal
                    currentDate={currentDate}
                    currentFile={currentFile}
                    currentOption={currentOption}
                    currentID={currentID}
                    currentFolder={currentFolder}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )
  }

  function PaginatedItems({ itemsPerPage }: any) {
    const [currentItems, setCurrentItems] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)

    useEffect(() => {
      if (items) {
        const endOffset = itemOffset + itemsPerPage
        setCurrentItems(items.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(items.length / itemsPerPage))
      }
    }, [itemOffset, itemsPerPage])

    const handlePageClick = (event: any) => {
      const newOffset = (event.selected * itemsPerPage) % items.length
      setItemOffset(newOffset)
    }

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          className={pagination.pagination}
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={10}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={() => null}
          activeClassName={pagination.active}
        />
      </>
    )
  }

  return <PaginatedItems itemsPerPage={10} />
}

export default ProfileTable
