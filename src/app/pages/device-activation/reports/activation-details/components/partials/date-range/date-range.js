import moment from 'moment'
import './date-range.css'
import React, {useState, useEffect} from 'react'
import { useQueryRequest } from '../../../core/QueryRequestProvider';

export default function DateRange2 ({callBack, range, setRange}) {
  const { start, end } = range;

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
          value={moment(range.start).format('YYYY-MM-DD')}
          onChange={(e) => {
            setRange({
              ...range,
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
          value={moment(range.end).format('YYYY-MM-DD')}
          onChange={(e) => {
            setRange({
              ...range,
              end: moment(e.target.value)
            });
            callBack({ start_date: start.format('MM-DD-YYYY'), end_date: moment(e.target.value).format('MM-DD-YYYY') });
          }}
          min={moment(range.start).format('YYYY-MM-DD')}
          data-kt-menu-dismiss='false' 
          className='form-control'
        />
      </div>
    </div>
  )
}
