import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import DateRangePicker from 'react-daterange-picker'
import 'react-daterange-picker/dist/css/react-calendar.css'
import {useState} from 'react'
import moment from 'moment'

export default function ReactDateRange ({date, setDate}) {
  const today = moment()
  const [state, setState] = useState({
    isOpen: false,
    value: moment.range(today.clone().subtract(30, 'days'), today.clone()),
  })

  const onToggle = () => {
    setState({...state, isOpen: !state.isOpen})
  }

  const onSelect = (value, states) => {
    setState({
      ...state,
      value: value,
    });
    setDate({
      ...date,
      startDate: value.start.format('MM-DD-YYYY'),
      endDate: value.end.format('MM-DD-YYYY')
    })
    // this.setState({ value, states });
    // console.log('value, state: ', value, states)
  }

  return (
    <>
      <div className='mb-2'>
        <label className='form-label fs-6 fw-bold'>Date Range :</label>
      </div>
      <div className='mb-10'>
        <input
          type='text'
          className='form-select form-select-solid fw-bolder'
          value={`${state.value.start.format('YYYY-MM-DD')} - ${state.value.end.format(
            'YYYY-MM-DD'
          )}`}
          onClick={onToggle}
        />
      </div>
      {state.isOpen && (
        <DateRangePicker value={state.value} onSelect={onSelect} singleDateRange={true} />
      )}
    </>
  )
}
