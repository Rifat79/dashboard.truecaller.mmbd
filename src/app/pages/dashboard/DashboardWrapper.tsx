/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from 'moment'
import { FC, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { initialQueryState } from '../../../_metronic/helpers'
import { Toolbar } from '../../../_metronic/layout/components/toolbar/Toolbar'
import { PageTitle } from '../../../_metronic/layout/core'
import LineApexChart, { dataSeries } from '../../../_metronic/partials/widgets/charts/LineApexChat'
import { getAuth } from '../../modules/auth'
import { getQueryRequest } from '../../modules/helpers/api'
import { getDateRange } from '../../modules/helpers/helper'
import ActivationDashboard from '../device-activation'
import { ActivationDashboardWrapper } from './activation'
import { UsersListHeader } from './components/header/UsersListHeader'
import { QueryRequestProvider, useQueryRequest } from './core/QueryRequestProvider'
import { QueryResponseProvider, useQueryResponseData } from './core/QueryResponseProvider'
import { GameDashboardWrapper } from './game-revenue'
import { PushpullDashboardWrapper } from './push-pull'

const DashboardPage = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile:: 55px;'
  document.body.setAttribute('style', bodyStyles)

  const {updateState, state} = useQueryRequest()
  // const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  // useEffect(() => {
  //   const endDate = moment().format('MM-DD-YYYY');
  //   const startDate = moment().subtract(30, 'days').format('MM-DD-YYYY');
  //   const search = window.location.search;
  //   updateState({
  //     filter: { 
  //       start_date: `${startDate} 00:00:00`,
  //       end_date: `${endDate} 23:59:59`,
  //     },
  //     ...initialQueryState,
  //   });
  // }, []);

  // const data: any = useQueryResponseData()

  // useEffect(() => {
  //   const callAPI = async () => {
  //     const res: any = await getQueryRequest(`${GET_MAIN_DASHBOARD_DATA}?id=${auth?.user?.organization}`);
  //     setLoading(false);
  //     if(res?.success) {
  //       setData(res?.data);
  //     }
  //   };
  //   callAPI();
  // }, []);

  // if(isLoading) return <h1 style={{textAlign: 'center'}}>loading...</h1>;
  // if(data && Object.keys(data)?.length == 0) return <h1 style={{textAlign: 'center'}}>No Data Found!</h1>;

  return(
    <>
    <Toolbar title={`Report -- ${getDateRange(state?.filter)}`}>
        <UsersListHeader />
    </Toolbar>
    {/* begin::Row */}
    
    <div className='row g-5 g-xl-8'>
      <div className='col-12'>
        <div className='card'>
          <div className='card-header'>
            <h2 className='card-title'>Activation Recap Report -- All Models</h2>
          </div>
          <div className='card-body'>
            <ActivationDashboardWrapper />
          </div>
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <div className='card-header'>
            <h2 className='card-title'>Game Revenue Report</h2>
          </div>
          <div className='card-body'>
             <GameDashboardWrapper />
          </div>
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <div className='card-header'>
            <h2 className='card-title'>Push-Pull Revenue Report</h2>
          </div>
          <div className='card-body'>
             <PushpullDashboardWrapper />
          </div>
        </div>
      </div>
    </div>
    {/* end::Row */}
    </>
  )
}

const DashboardWrapper: FC = () => {
  const intl = useIntl();
  let bodyStyles = '';
  bodyStyles += '--kt-toolbar-height: 0px;';
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile:: 0px;';
  document.body.setAttribute('style', bodyStyles);
  const auth = getAuth()
  return (
    <QueryRequestProvider>
      <QueryResponseProvider>
      <PageTitle description={auth?.user?.organizationName || ''} breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      {/* <Toolbar /> */}
      <DashboardPage />
      </QueryResponseProvider>
    </QueryRequestProvider>
  )
}

export { DashboardWrapper }
