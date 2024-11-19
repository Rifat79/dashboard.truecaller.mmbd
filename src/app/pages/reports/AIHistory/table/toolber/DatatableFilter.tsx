import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {KTSVG, initialQueryState} from '../../../../../../_metronic/helpers'
import DateRange from '../../../../../../_metronic/partials/content/forms/dateRange'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'

const DatatableFilter = ({initialState}: any) => {
  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [paymentChannel, setPaymentChannel] = useState('')
  const [date, setDate] = useState<any>({
    end_date: initialState?.date ? `${initialState?.date} 00:00:00` : '',
    start_date: initialState?.date ? `${initialState?.date} 23:59:59` : '',
  })
  const [changed, setChanged] = useState({
    label: 'Select date range...',
    custom: false,
  })

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    setPaymentChannel('')
    setDate({end_date: '', start_date: ''})
    updateState({filter: undefined, ...initialQueryState})
    setChanged({
      label: 'Select date range...',
      custom: false,
    })
  }

  const filterData = () => {
    updateState({
      filter: {
        payment_channel: paymentChannel,
        ...date,
      },
      ...initialQueryState,
    })
  }

  const operators = [
    {
      id: 8,
      name: 'GrameenPhone',
    },
    {
      id: 9,
      name: 'Banglalink',
    },
    {
      id: 10,
      name: 'Robi',
    },
  ]

  return (
    <>
      <button
        disabled={isLoading}
        type='button'
        className='btn btn-light-primary btn-sm mx-3'
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
            <DateRange
              onChange={(e: any) => setDate(e)}
              changed={changed}
              setChanged={setChanged}
            />
          </div>
          <div className='mb-5'>
            <label className='form-label fs-6 fw-bold'>Operator:</label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='paymentMethod'
              data-hide-search='true'
              onChange={(e) => setPaymentChannel(e.target.value)}
              value={paymentChannel}
            >
              <option value=''>select option</option>
              {operators.map((item, indx) => (
                <option value={item?.id} key={indx}>
                  {item?.name}
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

export {DatatableFilter}
