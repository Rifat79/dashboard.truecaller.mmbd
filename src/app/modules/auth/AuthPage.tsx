/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import {Login} from './components/Login'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-body')
    return () => {
      document.body.classList.remove('bg-body')
    }
  }, [])

  const hideBrands = () => {
    console.log('origin: ', window.location.origin)
    const origin = window.location.origin;

    return origin.includes('hanirainternationalltd.com');
  }

  return (
    <div className="d-flex flex-column flex-column-fluid flex-lg-row-reverse">
      <div
        className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
        style={{
          backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
        }}
      >
        {/* begin::Content */}
        <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
          {/* begin::Logo */}
          {!hideBrands() && (
            <a href='#' className='mb-12'>
              <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo.png')} className='h-45px' />
            </a>
          )}
          {/* end::Logo */}
          {/* begin::Wrapper */}
          <div className='w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto'>
            <Outlet />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Content */}
      </div>
      <div className={`d-flex flex-column flex-lg-row-auto ${hideBrands() ? '' : 'w-xl-600px' } positon-xl-relative bg-dark`}>
      {/* <!--begin::Wrapper--> */}
      {!hideBrands() && (
          <div className="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-600px scroll-y">
            {/* <!--begin::Content--> */}
            <div className="d-flex flex-row-fluid flex-column text-center p-10">
              <h1 className="fw-bolder fs-2qx pb-5 text-white">Our New Brands</h1>
              {/* <!--begin::Logo--> */}
              <a href="#" className="py-5">
                <img alt="Logo" src={toAbsoluteUrl('/media/logos/webmanza-banner.jpeg')} className="img-fluid rounded" />
              </a>
              <a href="#" className="py-5">
                <img alt="Logo" src={toAbsoluteUrl('/media/logos/mkiddo-banner.jpeg')} className="img-fluid rounded" />
              </a>
            </div>
            {/* <!--end::Content--> */}
          </div>
      )}
      {/* <!--end::Wrapper--> */}
    </div>
    </div>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
