import { useEffect, useState } from 'react'
import { initialQueryState, KTSVG } from '../../../../../../../_metronic/helpers'
import { MenuComponent } from '../../../../../../../_metronic/assets/ts/components'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import 'rsuite/dist/rsuite.min.css';
import { deviceTypeOptions } from '../../../../../../constants/constants'
import { getQueryRequest } from '../../../../../../modules/helpers/api'
import { GET_MODEL_LIST } from '../../../../../../constants/api.constants'
import { getAuth } from '../../../../../../modules/auth'
import { createGroup, isDate, reactSelectify } from '../../../../../../modules/helpers/helper'
import DateRange from '../../../../../../../_metronic/partials/custom-modules/DateRange'
import SelectSubmenu from '../../../../../../modules/partials/custom-select-with-submenu'
// import DateRange2 from '../../../../../../../_metronic/partials/custom-modules/date-range'
import moment from 'moment'
import DateRange2 from '../partials/date-range/date-range'

const packages = [
  {
    id: 1,
    label: 'Daily Pack',
    value: 'Daily Pack'
  },
  {
    id: 2,
    label: 'Weekly Pack',
    value: 'Weekly Pack'
  },
  {
    id: 3,
    label: 'Monthly Pack',
    value: 'Monthly Pack'
  }
];

const purchase_types = [
  {
    id: 1,
    label: 'First Charge',
    value: 'First Charge',
  },
  {
    id: 2,
    label: 'Auto Renew',
    value: 'Auto Renew',
  }
]

const payment_status_list = [
  {
    id: 1, 
    label: 'Delivered',
    value: 'Delivered'
  },
  {
    id: 2,
    label: 'Processing',
    value: 'Processing'
  },
  {
    id: 3,
    label: 'Pending',
    value: 'Pending'
  },
  {
    id: 4,
    label: 'Failed',
    value: 'Failed'
  },
]

const UsersListFilter = () => {
  const { updateState, state } = useQueryRequest()
  const { isLoading } = useQueryResponse()
  const [deviceType, setDeviceType] = useState({id: 1, label: 'Smart Phone', value: 1});
  const [options, setOptions] = useState([{}]);
  const [allModelList, setAllModelList] = useState<any>([])
  const [pack, setPackage] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<any>(null);
  const [purchaseType, setPurchaseType] = useState<any>(null);
  const [role, setRole] = useState<string | undefined>()
  const [lastLogin, setLastLogin] = useState<string | undefined>()
  const [date, setDate] = useState<any>()
  const [range, setRange] = useState({
    start: '',
    end: '',
  });
  const auth = getAuth();

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({ filter: undefined, ...initialQueryState })
    setPackage(null)
    setPaymentStatus(null)
    setRange({
      start: '',
      end: '',
    });
    setDate(null)
  }

  const handleDeviceTypeOptionChange = (selectedOption: any) => {
    setDeviceType(selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };
  const handleModelOptionChange = (selectedOption: any) => { 
    setPackage(selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };
  const filterData = () => {
    updateState({
      filter: date?.start_date && date?.end_date ? { 
        start_date: `${date?.start_date} 00:00:00`,
        end_date: `${date?.end_date} 23:59:59`,
        package: pack,
        payment_status: paymentStatus,
        purchase_type: purchaseType
      } : {
        package: pack,
        payment_status: paymentStatus,
        purchase_type: purchaseType
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
      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
        {/* begin::Header */}
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
        </div>
        {/* end::Header */}

        {/* begin::Separator */}
        <div className='separator border-gray-200'></div>
        {/* end::Separator */}

        {/* begin::Content */}
        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          {/* begin::Input group */}
          {/* <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>Device Type:</label>
            <Select options={deviceTypeOptions} onChange={handleDeviceTypeOptionChange} value={deviceType}/>
          </div> */}
          {/* end::Input group */}

          {/* begin::Input group */}
          {/* <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>Select Model:</label>
              <SelectSubmenu options={options} value={model} setPackage={setPackage}/>
          </div> */}
          <div className="form-group row">
            <label className='form-label fs-6 fw-bold'>Select Package:</label>
            <div className="mb-3 ">
              <select className="form-control select2" onChange={(e) => setPackage(e.target.value)} id="kt_select2_2" name="param">
                {/* <optgroup label="Alaskan/Hawaiian Time Zone" style={{fontWeight: 'bolder'}}>
                  <option value="AK">Alaska</option>
                  <option value="HI">Hawaii</option>
                </optgroup> */}
                <option label='Select option...'></option>
                {packages.map((item, indx) => (
                  <option value={item?.label} selected={item?.label === pack}>{item?.label}</option>
                ))}
                {/* {packages?.map((item: any, indx) => (
                  item?.options?.length > 0 && (
                    <optgroup label={item?.label?.props?.children} style={{fontWeight: 'bolder'}}>
                      {item?.options?.map((item: any, indx: any) => (
                        <option value={item?.model} selected={item?.model == model?.model}>{item?.model}</option>
                      ))}
                    </optgroup>
                  )
                ))} */}
                {/* {!allModelList || allModelList?.length == 0 && (<option>No Options</option>)} */}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className='form-label fs-6 fw-bold'>Select Purchase Type:</label>
            <div className="mb-3 ">
              <select className="form-control select2" onChange={(e) => setPurchaseType(e.target.value)} id="kt_select2_2" name="param">
                {/* <optgroup label="Alaskan/Hawaiian Time Zone" style={{fontWeight: 'bolder'}}>
                  <option value="AK">Alaska</option>
                  <option value="HI">Hawaii</option>
                </optgroup> */}
                <option label='Select option...'></option>
                {purchase_types.map((item, indx) => (
                  <option value={item?.label} selected={item?.label === purchaseType}>{item?.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className='form-label fs-6 fw-bold'>Select Payment Status:</label>
            <div className="mb-3 ">
              <select className="form-control select2" onChange={(e) => setPaymentStatus(e.target.value)} id="kt_select2_2" name="param">
                {/* <optgroup label="Alaskan/Hawaiian Time Zone" style={{fontWeight: 'bolder'}}>
                  <option value="AK">Alaska</option>
                  <option value="HI">Hawaii</option>
                </optgroup> */}
                <option label='Select option...'></option>
                {payment_status_list.map((item, indx) => (
                  <option value={item?.label} selected={item?.label === paymentStatus}>{item?.label}</option>
                ))}
              </select>
            </div>
          </div>
          {/* end::Input group */}
          <div className='mb-10 position-relative' id='date-range-ref'>
            {/* <label className='form-label fs-6 fw-bold'>Range:</label>
              <DateRange callBack={(e: any) => setDate(e)}/> */}
              <DateRange2 callBack={(e: any) => setDate(e)} range={range} setRange={setRange}/>
          </div>
          {/* begin::Actions */}
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
          {/* end::Actions */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::SubMenu */}
    </>
  )
}

export { UsersListFilter }
