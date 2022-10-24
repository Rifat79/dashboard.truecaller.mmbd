import { useEffect, useState } from 'react'
import { initialQueryState, KTSVG } from '../../../../../../_metronic/helpers'
import { MenuComponent } from '../../../../../../_metronic/assets/ts/components'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import ReactDateRange from './react-date-range'
import moment from 'moment'
import Select from 'react-select'
import { deviceTypeOptions } from '../../../../../constants/constants'
import { getQueryRequest } from '../../../../../modules/helpers/api'
import { GET_MODEL_LIST } from '../../../../../constants/api.constants'
import { getAuth } from '../../../../../modules/auth'
import { reactSelectify } from '../../../../../modules/helpers/helper'
import DateRange from '../../../../../../_metronic/partials/custom-modules/DateRange'
import DateRange2 from '../../../../../../_metronic/partials/custom-modules/date-range'

const UsersListFilter = ({state, setState}: any) => {
  const { updateState } = useQueryRequest()
  const { isLoading } = useQueryResponse()
  const [deviceType, setDeviceType] = useState({id: 1, label: 'Smart Phone', value: 1});
  const [models, setModels] = useState([{}]);
  const [model, setModel] = useState({id: 0, label: '', value: ''});
  const [role, setRole] = useState<string | undefined>()
  const [lastLogin, setLastLogin] = useState<string | undefined>()
  const [date, setDate] = useState<any>()
  const auth = getAuth();

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({ filter: undefined, ...initialQueryState })
  }

  const handleDeviceTypeOptionChange = (selectedOption: any) => {
    setDeviceType(selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };
  const handleModelOptionChange = (selectedOption: any) => { 
    setModel(selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };
  const filterData = () => {
    updateState({
      filter: { 
        start_date: `${date?.start_date} 00:00:00`,
        end_date: `${date?.end_date} 23:59:59`
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
          <div className='mb-10 position-relative' id='date-range-ref'>
            {/* <label className='form-label fs-6 fw-bold'>Range:</label>
              <DateRange callBack={(e: any) => setDate(e)}/> */}
              <DateRange2  startDate={''} endDate={''}   callBack={(e: any) => setDate(e)}/>
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
