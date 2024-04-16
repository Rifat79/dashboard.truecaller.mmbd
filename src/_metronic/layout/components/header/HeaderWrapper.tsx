/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {getAuth} from '../../../../app/modules/auth'
import {KTSVG} from '../../../helpers'
import {useLayout, usePageData} from '../../core'
import {Header} from './Header'
import {Topbar} from './Topbar'

export function HeaderWrapper() {
  const {config, classes, attributes} = useLayout()
  const {pageTitle, pageDescription} = usePageData()
  const {header, aside} = config
  const auth = getAuth()

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      {...attributes.headerMenu}
    >
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}
      >
        {/* begin::Aside mobile toggle */}
        {aside.display && (
          <div className='d-flex align-items-center d-lg-none ms-n3 me-1' title='Show aside menu'>
            <div
              className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
              id='kt_aside_mobile_toggle'
            >
              <KTSVG path='/media/icons/duotune/abstract/abs015.svg' className='svg-icon-2x mt-1' />
            </div>
          </div>
        )}
        {/* end::Aside mobile toggle */}
        {/* begin::Logo */}
        {!aside.display && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
            <Link to='/dashboard' className='d-lg-none'>
              <img alt='Logo' src={auth?.user?.organizationUrl} className='h-30px' />
            </Link>
          </div>
        )}
        {/* end::Logo */}

        {aside.display && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
            <Link to='/' className='d-lg-none'>
              <img alt='Logo' src={auth?.user?.organizationUrl} className='h-30px' />
            </Link>
          </div>
        )}

        {/* begin::Wrapper */}
        <div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
          {/* begin::Navbar */}
          {header.left === 'menu' && (
            <div className='d-flex align-items-stretch' id='kt_header_nav'>
              <Header />
            </div>
          )}

          {header.left === 'page-title' && (
            <div className='d-flex align-items-center' id='kt_header_nav'>
              {/* <DefaultTitle />
               */}
              <h1 className='d-flex align-items-center text-dark fw-bolder my-1 fs-3'>
                {pageTitle}
                {pageDescription && (
                  <>
                    <span className='h-20px border-gray-200 border-start ms-3 mx-2'></span>
                    <small className='text-muted fs-7 fw-bold my-1 ms-1'>{pageDescription}</small>
                  </>
                )}
              </h1>
            </div>
          )}

          <div className='d-flex align-items-stretch flex-shrink-0'>
            <Topbar />
          </div>
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  )
}
