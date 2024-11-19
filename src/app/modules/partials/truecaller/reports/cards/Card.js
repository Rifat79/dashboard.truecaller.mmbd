import {KTSVG} from '../../../../../../_metronic/helpers'
import {useQueryResponseLoading} from '../../../../../pages/dashboard/core/QueryResponseProvider'
import {formatPrice} from '../../../../helpers/misc'

export default function Card({data = {}, title = '', backgroundColor, hasPrice = false}) {
  const {daily, weekly, monthly, half_yearly, yearly, total} = data
  const loading = useQueryResponseLoading()

  return (
    <div className='col-xl-4'>
      {/*begin::Mixed Widget 14*/}
      <div
        className='card card-xxl-stretch mb-xl-8 theme-dark-bg-body'
        style={{backgroundColor: backgroundColor}}
      >
        {/*begin::Body*/}
        <div className='card-body d-flex flex-column'>
          {/*begin::Wrapper*/}
          <div className='d-flex flex-column mb-7'>
            {/*begin::Title*/}
            <a href='#' className='text-dark text-hover-primary fw-bold fs-3'>
              {title}
            </a>
            {/*end::Title*/}
          </div>
          {/*end::Wrapper*/}
          {/*begin::Row*/}
          <div className='row g-0'>
            {/*begin::Col*/}
            <div className='col-4'>
              <div className='d-flex align-items-center mb-9 me-2'>
                {/*begin::Symbol*/}
                <div className='symbol symbol-40px me-3'>
                  <div className='symbol-label bg-light'>
                    {/* <i className="ki-duotone ki-abstract-42 fs-1 text-dark">
                            <span className="path1" /><span className="path2" /></i> */}
                    <KTSVG
                      path='/media/icons/duotune/abstract/abs045.svg'
                      className='svg-icon-1 svg-icon-dark'
                    />
                  </div>
                </div>
                {/*end::Symbol*/}
                {/*begin::Title*/}
                <div>
                  <div className='fs-1 text-dark fw-bold lh-1'>
                    {loading ? '...' : hasPrice ? formatPrice(total || 0) : total || 0}
                  </div>
                  <div className='fs-7 text-gray-600 fw-bold'>Total</div>
                </div>
                {/*end::Title*/}
              </div>
            </div>
            {/*end::Col*/}
            {/*begin::Col*/}
            <div className='col-4'>
              <div className='d-flex align-items-center mb-9 ms-2'>
                {/*begin::Symbol*/}
                <div className='symbol symbol-40px me-3'>
                  <div className='symbol-label bg-light'>
                    <KTSVG
                      path='/media/icons/duotune/abstract/abs021.svg'
                      className='svg-icon-1 svg-icon-dark'
                    />
                  </div>
                </div>
                {/*end::Symbol*/}
                {/*begin::Title*/}
                <div>
                  <div className='fs-2 text-dark fw-bold lh-1'>
                    {loading ? '...' : hasPrice ? formatPrice(daily || 0) : daily || 0}
                  </div>
                  <div className='fs-7 text-gray-600 fw-bold'>Daily </div>
                </div>
                {/*end::Title*/}
              </div>
            </div>
            {/*end::Col*/}
            {/*begin::Col*/}
            <div className='col-4'>
              <div className='d-flex align-items-center me-2'>
                {/*begin::Symbol*/}
                <div className='symbol symbol-40px me-3'>
                  <div className='symbol-label bg-light'>
                    <KTSVG
                      path='/media/icons/duotune/abstract/abs022.svg'
                      className='svg-icon-1 svg-icon-dark'
                    />
                  </div>
                </div>
                {/*end::Symbol*/}
                {/*begin::Title*/}
                <div>
                  <div className='fs-2 text-dark fw-bold lh-1'>
                    {loading ? '...' : hasPrice ? formatPrice(weekly || 0) : weekly || 0}
                  </div>
                  <div className='fs-7 text-gray-600 fw-bold'>Weekly </div>
                </div>
                {/*end::Title*/}
              </div>
            </div>
            {/*end::Col*/}
            {/*begin::Col*/}
            <div className='col-4'>
              <div className='d-flex align-items-center ms-2'>
                {/*begin::Symbol*/}
                <div className='symbol symbol-40px me-3'>
                  <div className='symbol-label bg-light'>
                    <KTSVG
                      path='/media/icons/duotune/abstract/abs023.svg'
                      className='svg-icon-1 svg-icon-dark'
                    />
                  </div>
                </div>
                {/*end::Symbol*/}
                {/*begin::Title*/}
                <div>
                  <div className='fs-2 text-dark fw-bold lh-1'>
                    {loading ? '...' : hasPrice ? formatPrice(monthly || 0) : monthly || 0}
                  </div>
                  <div className='fs-7 text-gray-600 fw-bold'>Monthly </div>
                </div>
                {/*end::Title*/}
              </div>
            </div>
            {/*end::Col*/}
            {/*begin::Col*/}
            <div className='col-4'>
              <div className='d-flex align-items-center ms-2'>
                {/*begin::Symbol*/}
                <div className='symbol symbol-40px me-3'>
                  <div className='symbol-label bg-light'>
                    <KTSVG
                      path='/media/icons/duotune/abstract/abs024.svg'
                      className='svg-icon-1 svg-icon-dark'
                    />
                  </div>
                </div>
                {/*end::Symbol*/}
                {/*begin::Title*/}
                <div>
                  <div className='fs-2 text-dark fw-bold lh-1'>
                    {loading ? '...' : hasPrice ? formatPrice(half_yearly || 0) : half_yearly || 0}
                  </div>
                  <div className='fs-7 text-gray-600 fw-bold'>Half Yearly </div>
                </div>
                {/*end::Title*/}
              </div>
            </div>
            {/*end::Col*/}
            {/*begin::Col*/}
            <div className='col-4'>
              <div className='d-flex align-items-center ms-2'>
                {/*begin::Symbol*/}
                <div className='symbol symbol-40px me-3'>
                  <div className='symbol-label bg-light'>
                    <KTSVG
                      path='/media/icons/duotune/abstract/abs025.svg'
                      className='svg-icon-1 svg-icon-dark'
                    />
                  </div>
                </div>
                {/*end::Symbol*/}
                {/*begin::Title*/}
                <div>
                  <div className='fs-2 text-dark fw-bold lh-1'>
                    {loading ? '...' : hasPrice ? formatPrice(yearly || 0) : yearly || 0}
                  </div>
                  <div className='fs-7 text-gray-600 fw-bold'> Yearly </div>
                </div>
                {/*end::Title*/}
              </div>
            </div>
            {/*end::Col*/}
          </div>
          {/*end::Row*/}
        </div>
      </div>
      {/*end::Mixed Widget 14*/}
    </div>
  )
}
