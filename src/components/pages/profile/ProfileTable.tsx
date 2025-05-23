import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/redux/hook'
import { useNavigate } from 'react-router-dom'
import { setGraphData } from '@/redux/features/graph/graphSlice'
import styles from './profile.module.scss'
import pagination from './pagination.module.scss'
import buttons from '@/styles/Button.module.scss'
import ReactPaginate from 'react-paginate'
import PersonIcon from '@mui/icons-material/Person'
import { postFormData } from '@/api/http-post'
import { OptimizationRecord } from '@/types/optimization'

interface ProfileTableProps {
  items: OptimizationRecord[]
}

interface ItemsProps {
  currentItems: OptimizationRecord[] | null
}

interface PaginatedItemsProps {
  itemsPerPage: number
}

interface PageClickEvent {
  selected: number
}

const ProfileTable = ({ items = [] }: ProfileTableProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const showGraph = (i: { id: string }) => {
    const payload = new FormData()
    payload.append('optimization_record_id', i.id)

    postFormData(payload, 'show')
      .then((response) => {
        dispatch(setGraphData(response.data))
        navigate('/llvmcfg')
      })
      .catch(() => {
        alert('Error, there is no data.')
      })
  }

  function Items({ currentItems }: ItemsProps) {
    console.log(currentItems)

    return (
      <table>
        <thead>
          <tr>
            <td>date</td>
            <td>user name</td>
            <td>file</td>
            <td>LLVM's passes</td>
            <td>LLVM's version</td>
            <td>show graph</td>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((i) => (
              <tr key={i.id}>
                <td>{i.created_at.toString()}</td>
                <td>
                  <PersonIcon /> &nbsp;
                  {i.user_name}
                </td>
                <td id={styles.fileList}>{i.file_names.join(',')}</td>
                <td id={styles.passOption}>{i.opt_passes.join(',')}</td>
                <td id={styles.llvm_version}>{i.llvm_version}</td>
                <td>
                  <button className={buttons.mini} onClick={() => showGraph(i)}>
                    start
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )
  }

  function PaginatedItems({ itemsPerPage }: PaginatedItemsProps) {
    const [currentItems, setCurrentItems] = useState<
      OptimizationRecord[] | null
    >(null)
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)

    useEffect(() => {
      if (items) {
        const endOffset = itemOffset + itemsPerPage
        setCurrentItems(items.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(items.length / itemsPerPage))
      }
    }, [itemOffset, itemsPerPage, items])

    const handlePageClick = (event: PageClickEvent) => {
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
