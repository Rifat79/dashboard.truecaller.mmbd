import { useEffect, useState } from 'react'
import { initialQueryState, KTSVG } from '../../../../../../../_metronic/helpers'
import { MenuComponent } from '../../../../../../../_metronic/assets/ts/components'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import Select from 'react-select'
import { deviceTypeOptions } from '../../../../../../constants/constants'
import DateRange from '../../../../../../../_metronic/partials/custom-modules/DateRange'
import { getQueryRequest } from '../../../../../../modules/helpers/api'
import { GET_KEYWORDS } from '../../../../../../constants/api.constants'
import { reactSelectify } from '../../../../../../modules/helpers/helper'

const UsersListFilter = () => {
  const [date, setDate] = useState<any>()
  const { updateState } = useQueryRequest()
  const { isLoading } = useQueryResponse()
  const [role, setRole] = useState<string | undefined>()
  const [lastLogin, setLastLogin] = useState<string | undefined>()
  const [state, setState] = useState({
    model: {},
    models: [{}],
    deviceType: {id: 1, label: 'Smart Phone', value: 1}
  })
  const [keywords, setKeywords] = useState<any>([]);
  const [keyword, setKeyword] = useState<any>();

  useEffect(() => {
    MenuComponent.reinitialization()
    const getKeywords = async() => {
      const res: any = await getQueryRequest(GET_KEYWORDS);
      const keywords = reactSelectify(res?.data, 'key');
      setKeywords(keywords)
    };
    getKeywords();
  }, [])

  const resetData = () => {
    updateState({ filter: undefined, ...initialQueryState })
  }

  const handleDeviceTypeChange = (selectdOption: any) => {
    setState({
      ...state,
      deviceType: selectdOption
    })
  }

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
        <div className="px-7 py-5">
          {/*begin::Input group*/}
          {/* <div className='mb-5'>
            <label className='form-label fs-6 fw-bold'>Device Type:</label>
            <Select options={deviceTypeOptions} value={state.deviceType} onChange={handleDeviceTypeChange}/>
          </div>
          
          <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>Models:</label>
            <Select />
          </div> */}
          <div className='mb-10 position-relative' id='date-range-ref'>
            <label className='form-label fs-6 fw-bold'>Keywords:</label>
              <Select
                options={keywords}
                onChange={(option) => setKeyword(option)}
                value={keyword}
               />
          </div>
          <div className='mb-10 position-relative' id='date-range-ref'>
            <label className='form-label fs-6 fw-bold'>Range:</label>
              <DateRange callBack={(e: any) => setDate(e)}/>
          </div>
          {/*end::Input group*/}
          {/*begin::Actions*/}
          <div className="d-flex justify-content-end mt-5">
            <button
              type="submit"
              className="btn btn-primary"
              data-kt-menu-dismiss="true"
              data-kt-docs-table-filter="filter"
              onClick={filterData}
            >
              Apply
            </button>
          </div>
          {/*end::Actions*/}
        </div>

        {/* end::Content */}
      </div>
      {/* end::SubMenu */}
    </>
  )
}

export { UsersListFilter }
