import { useEffect, useState } from 'react'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import 'rsuite/dist/rsuite.min.css';

import { KTSVG, initialQueryState } from '../../../../../_metronic/helpers'
import { MenuComponent } from '../../../../../_metronic/assets/ts/components';
import {  isDate, reactSelectify } from '../../../../modules/helpers/helper';
import { getQueryRequest } from '../../../../library/api.helper';
import { REFERENCE_LIST } from '../../../../constants/api.constants';
import DateRange from '../../../../../_metronic/partials/content/forms/dateRange';

const UsersListFilter = () => {
  const { updateState } = useQueryRequest()
  const { isLoading } = useQueryResponse()
  const [pack, setpack] = useState<string | undefined>('')
  const [model, setModel] = useState<any>(null);
  const [date, setDate] = useState<any>({ end_date: '', start_date: '' })
  const [range, setRange] = useState({
    start: '',
    end: '',
  });
  const [changed, setChanged] = useState({
    label: 'Select date range...',
    custom: false,
  })
  const [ref, setRef] = useState('');
  const [reference_list, setRefList] = useState<any>([]);

  useEffect(() => {
    MenuComponent.reinitialization()

    getRefList()
  }, [])

  const getRefList = async () => {
    const res = await getQueryRequest(REFERENCE_LIST);
    if (res?.data && Array.isArray(res?.data)) {
      setRefList(res?.data);
    }
  }


  const resetData = () => {
    updateState({ filter: undefined, ...initialQueryState })
    setRef('');
    setRange({
      start: '',
      end: '',
    });
    setChanged({
      label: 'Select date range...',
      custom: false,
    })
  }

  const filterData = () => {
    updateState({
      filter: { 
        start_date: `${date?.start_date}`,
        end_date: `${date?.end_date}`,
        reference: ref
      },
      ...initialQueryState,
    })
  }



  return (
    <>
      {/* begin::Filter Button */}
      <button
        disabled={isLoading}
        type='button'
        className='btn btn-sm btn-light-primary me-3'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-2' />
        Filter
      </button>
      <div
        className='menu menu-sub menu-sub-dropdown w-300px w-md-325px'
        data-kt-menu='true'
        id='kt_menu_63b3b3ba02686'
      >
        <div className='separator border-gray-200'></div>

        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          <div className='mb-5'>
            <DateRange onChange={(e: any) => setDate(e)} changed={changed} setChanged={setChanged}/>
          </div>

          <div className='mb-5'>
            <label className='form-label fs-6 fw-bold'>Reference:</label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='status'
              data-hide-search='true'
              onChange={(e) => setRef(e.target.value)}
              value={ref}
            >
              <option value=''>select option</option>
              {reference_list.map((item: any, i: any) => (
                <option key={i} value={item.slug}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className='d-flex justify-content-end'>
            <button
              type='button'
              disabled={isLoading}
              onClick={resetData}
              className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='reset'
            >
              Reset
            </button>
            <button
              disabled={isLoading}
              type='button'
              onClick={filterData}
              className='btn btn-primary fw-bold px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='filter'
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export { UsersListFilter }
