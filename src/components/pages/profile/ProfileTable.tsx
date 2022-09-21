import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { useNavigate } from 'react-router-dom'
import { setGraphData } from '@/redux/features/graph/graphSlice'
import styles from './profile.module.scss'
import pagination from './pagination.module.scss'
import buttons from '../../../Button.module.scss'
import axios from 'axios'
import { Modal } from 'reactstrap'
import ReactPaginate from 'react-paginate'
const { REACT_APP_API_URL } = process.env

const ProfileTable = () => {
  const { token } = useAppSelector((state) => state.auth)
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<any | undefined>(undefined)

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
        setItems(response.data.data)
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

  const deleteGraph = (e: any) => {
    const headers = {
      Authorization: 'Token ' + token,
      // FIXME: boundary 해결하기!
      'Content-type':
        'multipart/form-data; boundary=177130003042384797933296855923',
    }

    axios
      .delete(`${REACT_APP_API_URL}/delete/`, {
        data: { filterID: e },
        headers: headers,
      })
      .then(() => {
        window.location.reload()
      })
      .catch((response) => {
        console.log(response)
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
            <td>data</td>
            <td>file name</td>
            <td>pass option</td>
            <td>show graph</td>
            <td>delete</td>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems
              .map((i: any) => (
                <tr key={i}>
                  <td>{convertDate(i[2].substring(0, i[2].indexOf('/')))}</td>
                  <td>{i[2].substring(i[2].indexOf('/') + 1)}</td>
                  <td>{i[0]}</td>
                  <td>
                    <button
                      className={buttons.mini}
                      onClick={() => showGraph(i)}
                    >
                      start
                    </button>
                  </td>
                  <td>
                    <button
                      className={buttons.mini_yellow}
                      onClick={() => setOpen(true)}
                    >
                      delete
                    </button>
                    <Modal
                      isOpen={open}
                      className={styles.modal}
                      backdropClassName={styles.backdrop}
                    >
                      <div>
                        Are you sure you want to delete this data?
                        <br></br>
                        <button
                          className={buttons.default}
                          onClick={() => deleteGraph(i[1])}
                        >
                          Yes
                        </button>
                        <button
                          className={buttons.default_light}
                          onClick={() => setOpen(false)}
                        >
                          No
                        </button>
                      </div>
                    </Modal>
                  </td>
                </tr>
              ))
              .reverse()}
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
