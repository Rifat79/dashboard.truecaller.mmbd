import { useEffect, useState } from 'react'
import { initialQueryState, KTSVG } from '../../../../../../_metronic/helpers'
import { MenuComponent } from '../../../../../../_metronic/assets/ts/components'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'

const UsersListFilter = () => {
  const { updateState } = useQueryRequest()
  const { isLoading } = useQueryResponse()
  const [role, setRole] = useState<string | undefined>()
  const [lastLogin, setLastLogin] = useState<string | undefined>()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({ filter: undefined, ...initialQueryState })
  }

  const filterData = () => {
    updateState({
      filter: { role, last_login: lastLogin },
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
          <div className="mb-10">
            {/*begin::Label*/}
            <label className="form-label fs-5 fw-bold mb-3">Payment Type:</label>
            {/*end::Label*/}
            {/*begin::Options*/}
            <div
              className="d-flex flex-column flex-wrap fw-bold"
              data-kt-docs-table-filter="payment_type"
            >
              {/*begin::Option*/}
              <label className="form-check form-check-sm form-check-custom form-check-solid mb-3 me-5">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment_type"
                  defaultValue="all"
                />
                <span className="form-check-label text-gray-600">All</span>
              </label>
              {/*end::Option*/}
              {/*begin::Option*/}
              <label className="form-check form-check-sm form-check-custom form-check-solid mb-3 me-5">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment_type"
                  defaultValue="visa"
                />
                <span className="form-check-label text-gray-600">Visa</span>
              </label>
              {/*end::Option*/}
              {/*begin::Option*/}
              <label className="form-check form-check-sm form-check-custom form-check-solid mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment_type"
                  defaultValue="mastercard"
                />
                <span className="form-check-label text-gray-600">Mastercard</span>
              </label>
              {/*end::Option*/}
              {/*begin::Option*/}
              <label className="form-check form-check-sm form-check-custom form-check-solid">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment_type"
                  defaultValue="americanexpress"
                />
                <span className="form-check-label text-gray-600">American Express</span>
              </label>
              {/*end::Option*/}
            </div>
            {/*end::Options*/}
          </div>
          {/*end::Input group*/}
          {/*begin::Actions*/}
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary"
              data-kt-menu-dismiss="true"
              data-kt-docs-table-filter="filter"
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
