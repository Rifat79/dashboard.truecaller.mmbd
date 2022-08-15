/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import LineApexChart, { dataSeries } from '../../../_metronic/partials/widgets/charts/LineApexChat'

const DashboardPage: FC = () => (
  <>
    {/* begin::Row */}
    <div className='row g-5 g-xl-8'>
      <div className='col-12'>
        <div className='card'>
          <div className='card-header'>
            <h2 className='card-title'>Activation Recap Report -- All Models -- Last 7 Days</h2>
          </div>
          <div className='card-body'>
            <LineApexChart data={dataSeries} title="Feature Phone" yaxis="Revenue" />
          </div>
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <div className='card-header'>
            <h2 className='card-title'>Activation Recap Report -- All Models -- Last 7 Days</h2>
          </div>
          <div className='card-body'>
            <LineApexChart data={dataSeries} title="Smartphone" yaxis="Revenue" />
          </div>
        </div>
      </div>
    </div>
    {/* end::Row */}

  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl();
  let bodyStyles = '';
  bodyStyles += '--kt-toolbar-height: 0px;';
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile:: 0px;';
  document.body.setAttribute('style', bodyStyles);
  return (
    <>
      <PageTitle description='#SS Electronics' breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      {/* <Toolbar /> */}
      <DashboardPage />
    </>
  )
}

export { DashboardWrapper }
