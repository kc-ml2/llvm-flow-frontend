import SwitchSelector from 'react-switch-selector'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { setIsFullFalse, setIsFullTrue } from '@/redux/features/mode/modeSlice'

export default function App() {
  //   options index 0 = simple / options index 1 = origin,  redux에선 해당 값을 isFullIndex로 사용
  const { isFullIndex } = useAppSelector((state) => state.mode)
  const dispatch = useAppDispatch()

  const selectedFontColor = '#fc851c'
  const selectedBackgroundColor = '#fadf9b'
  const fontColor = '#fc9628'
  const backgroundColor = '#fbecc7'

  const options = [
    {
      label: 'simple',
      value: 'simple',
      selectedBackgroundColor: selectedBackgroundColor,
      selectedFontColor: selectedFontColor,
    },
    {
      label: 'origin',
      value: 'origin',
      selectedBackgroundColor: selectedBackgroundColor,
      selectedFontColor: selectedFontColor,
    },
  ]

  const handleToogle = (newValue: any) => {
    if (newValue === 'simple') {
      dispatch(setIsFullFalse())
    } else if (newValue === 'origin') {
      dispatch(setIsFullTrue())
    }
  }

  return (
    <div>
      <div style={{ width: 150, height: 40 }}>
        <SwitchSelector
          onChange={handleToogle}
          options={options}
          backgroundColor={backgroundColor}
          fontColor={fontColor}
          initialSelectedIndex={isFullIndex}
        />
      </div>
    </div>
  )
}
