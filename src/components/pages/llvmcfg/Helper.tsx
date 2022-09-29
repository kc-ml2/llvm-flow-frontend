import { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import styles from './Helper.module.scss'
import buttons from '@/styles/Button.module.scss'

const Helper = () => {
  const [open, setOpen] = useState<boolean>()
  const [checked, setChecked] = useState<boolean>(false)

  useEffect(() => {
    const isOpen = localStorage.getItem('helperOpen')
    if (isOpen && isOpen === 'true') {
      setOpen(true)
    } else if (isOpen && isOpen === 'false') {
      setOpen(false)
    }
  }, [])

  // Modal
  function close() {
    localStorage.setItem('helperOpen', JSON.stringify(!checked))
    setOpen(false)
  }

  function onChange() {
    setChecked(!checked)
  }

  return (
    <Modal isOpen={open} className={styles.modal}>
      <ModalHeader>📙 GUIDE</ModalHeader>
      <ModalBody></ModalBody>
      <ModalFooter>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <label>Don't show this again</label>
        <button onClick={close}>close</button>
      </ModalFooter>
    </Modal>
  )
}
export default Helper
