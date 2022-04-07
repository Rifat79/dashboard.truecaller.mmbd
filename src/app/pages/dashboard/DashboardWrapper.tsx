/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import {
  ChartsWidget4,
} from '../../../_metronic/partials/widgets'

const DashboardPage: FC = () => (
  <>
    {/* begin::Row */}
    <div className='row gy-5 g-xl-8'>
      <div className='col-xxl-12'>
        <div className="card card-flush h-md-100">
          <div className="card-body px-5 py-0">
            <ChartsWidget4 className='card-xl-stretch mb-5 mb-xl-8' />
          </div>
        </div>
      </div>
    </div>
    <div className='row mt-5 g-xl-8'>
      <div className='col-xxl-12'>
        <div className="card card-flush h-md-100">
          <div className="card-body px-5 py-0">
            <ChartsWidget4 className='card-xl-stretch mb-5 mb-xl-8' />
          </div>
        </div>
      </div>
    </div>
    {/* end::Row */}
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <DashboardPage />
    </>
  )
}

export { DashboardWrapper }
