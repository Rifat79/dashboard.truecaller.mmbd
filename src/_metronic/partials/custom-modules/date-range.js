import moment from 'moment'
import './date-range.css'
import React, {useState} from 'react'

export default function DateRange2 ({callBack, startDate, endDate}) {
  const [state, setState] = useState({
    start:startDate,
    end: endDate,
  });

  const { start, end } = state;

  return (
    <div className='mb-10' id='date-range-ref'>
      <div className='position-relative'>
        <label className='form-label fs-6 fw-bold'>From Date</label>
        {/* <DateRange callBack={(e: any) => setDate(e)}/> */}
        <input
          type='date'
          id='inputId-1'
          data-kt-menu-dismiss='false'
          className='form-control'
          value={moment(state.start).format('YYYY-MM-DD')}
          onChange={(e) => {
            setState({
              ...state,
              start: moment(e.target.value)
            });
            callBack({ start_date: moment(e.target.value).format('MM-DD-YYYY'), end_date: end.format('MM-DD-YYYY') });
          }}
        />
      </div>
      <div className='position-relative'>
        <label className='form-label fs-6 fw-bold'>To Date</label>
        <input
          type='date'
          id='inputId-2' 
          value={moment(state.end).format('YYYY-MM-DD')}
          onChange={(e) => {
            setState({
              ...state,
              end: moment(e.target.value)
            });
            callBack({ start_date: start.format('MM-DD-YYYY'), end_date: moment(e.target.value).format('MM-DD-YYYY') });
          }}
          min={moment(state.start).format('YYYY-MM-DD')}
          data-kt-menu-dismiss='false' 
          className='form-control'
        />
      </div>
    </div>
  )
}
