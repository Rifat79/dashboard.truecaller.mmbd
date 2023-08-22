import { useEffect, useState } from 'react'
import { MenuComponent } from '../../../../../../_metronic/assets/ts/components'
import { initialQueryState, KTSVG } from '../../../../../../_metronic/helpers'
import DateRange from '../../../../../../_metronic/partials/content/forms/dateRange'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { getQueryRequest } from '../../../../../library/api.helper'
import { REFERENCE_LIST } from '../../../../../constants/api.constants'

const DatatableFilter = ({ initialState }: any) => {
  const { updateState } = useQueryRequest()
  const { isLoading } = useQueryResponse()
  const [pack, setpack] = useState<string | undefined>('')
  const [purchaseType, setPurchaseType] = useState('');
  const [status, setStatus] = useState<string | undefined>('')
  const [date, setDate] = useState<any>({ end_date: initialState?.date ? `${initialState?.date} 00:00:00` : '', start_date: initialState?.date ? `${initialState?.date} 23:59:59` : '' })
  const [ref, setRef] = useState(initialState?.ref ? initialState?.ref : '');
  const [reference_list, setRefList] = useState<any>([]);
  const [changed, setChanged] = useState({
    label: 'Select date range...',
    custom: false,
  })

  useEffect(() => {
    MenuComponent.reinitialization();

    getRefList();
  }, [])

  const getRefList = async () => {
    const res = await getQueryRequest(REFERENCE_LIST);
    if (res?.data && Array.isArray(res?.data)) {
      setRefList(res?.data);
    }
  }

  const resetData = () => {
    setpack('')
    setStatus('')
    setPurchaseType('');
    setRef('');
    setDate({ end_date: '', start_date: '' })
    updateState({ filter: undefined, ...initialQueryState })
    setChanged({
      label: 'Select date range...',
      custom: false,
    })
  }

  const filterData = () => {
    updateState({
      filter: { package: pack, payment_status: status, purchase_type: purchaseType, reference: ref, ...date },
      ...initialQueryState,
    })
  }
  const packages = [
    {
      id: 1,
      title: 'Daily Pack',
      slug: 'Daily Pack'
    },
    {
      id: 2,
      title: 'Weekly Pack',
      slug: 'Weekly Pack'
    },
    {
      id: 3,
      title: 'Monthly Pack',
      slug: 'Monthly Pack'
    },
  ];

  const purchase_types = [
    {
      id: 1,
      title: 'First Charge',
      slug: 'First Charge'
    },
    {
      id: 2,
      title: 'Auto Renew',
      slug: 'Auto Renew'
    },
  ];

  const status_list = [
    {
      id: 1,
      title: 'Processing',
      slug: 'processing'
    },
    {
      id: 2,
      title: 'Delivered',
      slug: 'delivered'
    },
    {
      id: 3,
      title: 'Failed',
      slug: 'failed'
    },
  ];

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
            <DateRange onChange={(e: any) => setDate(e)} changed={changed} setChanged={setChanged}/>
          </div>
          <div className='mb-5'>
            <label className='form-label fs-6 fw-bold'>Package:</label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='paymentMethod'
              data-hide-search='true'
              onChange={(e) => setpack(e.target.value)}
              value={pack}
            >
              <option value=''>select option</option>
              {packages.map((item, indx) => (
                <option value={item?.slug} key={indx}>{item?.title}</option>
              ))}
            </select>
          </div>

          <div className='mb-5'>
            <label className='form-label fs-6 fw-bold'>Purchase Type:</label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='paymentMethod'
              data-hide-search='true'
              onChange={(e) => setPurchaseType(e.target.value)}
              value={purchaseType}
            >
              <option value=''>select option</option>
              {purchase_types.map((item, indx) => (
                <option value={item?.slug} key={indx}>{item?.title}</option>
              ))}
            </select>
          </div>

          <div className='mb-5'>
            <label className='form-label fs-6 fw-bold'>Status:</label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='status'
              data-hide-search='true'
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value=''>select option</option>
              {status_list.map((item, i) => (
                <option key={i} value={item.slug}>
                  {item.title}
                </option>
              ))}
            </select>
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

export { DatatableFilter }
