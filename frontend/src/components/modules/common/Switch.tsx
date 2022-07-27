import style from './Switch.module.scss'

interface SwtichProps {
  isOn: boolean
  handleToggle: () => void
}

const Swtich = ({ isOn, handleToggle }: SwtichProps) => {
  return (
    <>
      <div className={style.switch_button}>
        <input
          className={style.switch_button_checkbox}
          type="checkbox"
          checked={isOn}
          onChange={handleToggle}
        ></input>
        <label
          className={style.switch_button_label}
          htmlFor={'react-switch-new'}
        >
          <span className={style.switch_button_label_span}>simple</span>
        </label>
      </div>
    </>
  )
}

export default Swtich
