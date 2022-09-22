/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import LineApexChart, { dataSeries } from '../../../_metronic/partials/widgets/charts/LineApexChat'
import { GET_MAIN_DASHBOARD_DATA } from '../../constants/api.constants'
import { getAuth } from '../../modules/auth'
import { getQueryRequest } from '../../modules/helpers/api'

const DashboardPage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const callAPI = async () => {
      const res: any = await getQueryRequest(`${GET_MAIN_DASHBOARD_DATA}?id=${auth?.user?.organization}`);
      setLoading(false);
      if(res?.success) {
        setData(res?.data);
      }
    };
    callAPI();
  }, []);

  if(loading) return <h1 style={{textAlign: 'center'}}>loading...</h1>;
  if(data && Object.keys(data)?.length == 0) return <h1 style={{textAlign: 'center'}}>No Data Found!</h1>;
  console.log('data: ', data)
  return(
    <>
    {/* begin::Row */}
    <div className='row g-5 g-xl-8'>
      <div className='col-12'>
        <div className='card'>
          <div className='card-header'>
            <h2 className='card-title'>Activation Recap Report -- All Models -- Last 30 Days</h2>
          </div>
          <div className='card-body'>
            <LineApexChart 
              // data={data ? data['chartOne']?.data1 : []} 
              series={[
                {
                  name: 'Feature Phone',
                  data: data ? data['chartOne']?.data1 : []
                },
                {
                  name: 'Smart Phone',
                  data: data ? data['chartOne']?.data2 : []
                },
              ]}
              categories={data ? data['chartOne']?.categories : []} 
              title="Feature Phone" yaxis="Activation" 
            />
          </div>
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <div className='card-header'>
            <h2 className='card-title'>Game Revenue Recap Report -- All Models -- Last 30 Days</h2>
          </div>
          <div className='card-body'>
            <LineApexChart 
              // data={data ? data['chartTwo']?.data1 : []} 
              series={[
                {
                  name: 'Feature Phone',
                  data: data ? data['chartTwo']?.data1 : []
                },
                {
                  name: 'Smart Phone',
                  data: data ? data['chartTwo']?.data2 : []
                },
              ]}
              categories={data ? data['chartTwo']?.categories : []} 
              title="Feature Phone" 
              yaxis="Revenue" 
            />
          </div>
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <div className='card-header'>
            <h2 className='card-title'>Push-Pull Recap Report -- All Models -- Last 30 Days</h2>
          </div>
          <div className='card-body'>
            <LineApexChart 
              series={[
                {
                  name: 'Revenue',
                  data: data ? data['chartThree']?.data1 : []
                },
              ]}
              // data={data ? data['chartThree']?.data1 : []} 
              categories={data ? data['chartThree']?.categories : []} 
              title="Feature Phone" 
              yaxis="Revenue" 
            />
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
  return (
    <>
      <PageTitle description='#SS Electronics' breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      {/* <Toolbar /> */}
      <DashboardPage />
    </>
  )
}

export { DashboardWrapper }
