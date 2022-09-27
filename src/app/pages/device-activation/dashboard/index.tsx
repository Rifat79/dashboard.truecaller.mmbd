import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider, useQueryRequest} from './core/QueryRequestProvider'
import {QueryResponseProvider, useQueryResponse, useQueryResponseData} from './core/QueryResponseProvider'
import {UsersListHeader} from './components/header/UsersListHeader'
// import { UserEditModal } from './user-edit-modal/UserEditModal'
import {initialQueryState, KTCard} from '../../../../_metronic/helpers'
import {PageTitle} from '../../../../_metronic/layout/core'
import {Toolbar} from '../../../../_metronic/layout/components/toolbar/Toolbar'
import Chart from 'react-apexcharts'
import ReactApexChart from 'react-apexcharts'
import {MixedWidget10} from '../../../modules/widgets/MixedWidget10'
import ChartMap from './components/map'
import {useEffect, useMemo, useState} from 'react'
import {getQueryRequest} from '../../../modules/helpers/api'
import {GET_ACTIVATION_DASHBOARD_DATA} from '../../../constants/api.constants'
import moment from 'moment'
import { getAuth } from '../../../modules/auth'
import { containsDeviceType, getDateRange, isChartRequired } from '../../../modules/helpers/helper'

const DashBoard = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile:: 55px;'
  document.body.setAttribute('style', bodyStyles)

  const { isLoading } = useQueryResponse()

  type Chart = {
    data?: any,
    filter?: any,
  }
  const stateInit: Chart = {
    data: {},
    filter: {
      startDate: moment().format('MM-DD-YYYY'),
      endDate: moment().subtract(30, 'days').format('MM-DD-YYYY'),
    }
  }

  // const [state, setState] = useState(stateInit)
  const auth = getAuth()

  const data: any = useQueryResponseData()
  const {updateState, state} = useQueryRequest() 
  console.log('state: ', state)
  useEffect(() => {
    const endDate = moment().format('MM-DD-YYYY');
    const startDate = moment().subtract(30, 'days').format('MM-DD-YYYY');
    const search = window.location.search;
    const model = new URLSearchParams(search).get("model");
    updateState({
      filter: { 
        start_date: `${startDate} 00:00:00`,
        end_date: `${endDate} 23:59:59`,
        model: model
      },
      ...initialQueryState,
    });
  }, []);
  // const data = useMemo(() => users, [users])
  // useEffect(() => {
  //   const callAPI = async () => {
  //     setLoading(true)
  //     const res = await getQueryRequest(
  //       `${GET_ACTIVATION_DASHBOARD_DATA}?organization_id=${auth?.user?.organization || 20217}&start_date=${state.filter.startDate} 00:00:00&end_date=${state.filter.endDate} 23:59:59${state.filter.deviceType?.id ? `&device_type=${state.filter.deviceType?.id}` : ''}${state.filter?.model?.label?.length > 0 && Object.keys(state.filter.model).length > 0 ? `&model=${state.filter.model?.label}` : ""}`
  //     )
  //     setLoading(false)
  //     if (res?.success && res?.data) {
  //       setState({
  //         ...state,
  //         data: res?.data,
  //       })
  //     }
  //   }
  //   callAPI();
  // }, [state.filter.startDate, state.filter.endDate])

  const {itemIdForUpdate} = useListView()
  const settings = {
    series: [
      {
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    },
  }
  console.log('state: ', state)

  return (
    <>
      <Toolbar title={`Activation Recap Report -- ${getDateRange(state?.filter)}`}>
        <UsersListHeader />
      </Toolbar>
      {isLoading ? (
        <h5 style={{textAlign: 'center'}}>Chart is loading, please wait...</h5>
      ) : Object.keys(data).length > 0 ? (
        <ReactApexChart
          options={{
            chart: {
              height: 350,
              type: 'area',
              toolbar: {
                show: false,
              },
              zoom: {
                enabled: false,
              },
              sparkline: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: 'smooth',
            },
            xaxis: {
              // type: 'datetime',
              categories: data?.chart1?.categories,
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm',
              },
            },
          }}
          series={[
            {
              name: 'Feature Phone',
              data: data?.chart1?.data1,
            },
            {
              name: 'Smart Phone',
              data: data?.chart1?.data2,
            },
          ]}
          type='area'
          height={450}
        />
      ) : (
        <h5 style={{textAlign: 'center'}}>No Data Found!</h5>
      )}

      <div className='card mb-8 mt-8'>
        <div className='card-header min-h-40px text-center align-items-center justify-content-center'>
          <h2 className='card-title text-uppercase m-0'>Lifetime</h2>
        </div>
        <div className='card-body p-4'>
          {isLoading ? (
            <h5 style={{textAlign: 'center'}}>Chart is loading, please wait...</h5>
          ) : Object.keys(data).length > 0 ? (
            <div className={`row gy-4 row-cols-1 row-cols-sm-2 row-cols-lg-${containsDeviceType(state?.filter) ? 1 : 2}`}>
              {/* <MixedWidget10
                className='card-xl-stretch mb-xl-8'
                chartColor='info'
                chartHeight='150px'
                title='Total Active'
                description='Finance and accounting reports'
                total={20330}
                series={[
                  {name: 'Smart Phone', data: data?.chart2[0]?.data1},
                  {name: 'Feature Phone', data: data?.chart2[0]?.data2},
                ]}
                data={data?.chart2[0]}
              /> */}
              {isChartRequired(state?.filter, 2) && (
                <MixedWidget10
                  className='card-xl-stretch mb-xl-8'
                  chartColor='info'
                  chartHeight='150px'
                  title='Total Smart Phone'
                  description='Finance and accounting reports'
                  total={20330}
                  data={data?.chart2[0]}
                  series={[
                    {name: 'Smart Phone', data: data?.chart2[0]?.data1},
                  ]}
                />
              )}
              {isChartRequired(state?.filter, 1) && (
                <MixedWidget10
                  className='card-xl-stretch mb-xl-8'
                  chartColor='info'
                  chartHeight='150px'
                  title='Total Feature Phone'
                  description='Finance and accounting reports'
                  total={20330}
                  data={data?.chart2[1]}
                  series={[
                    {name: 'Feature Phone', data: data?.chart2[1]?.data1},
                  ]}
                />
              )}
              {/* <MixedWidget10
              className='card-xl-stretch mb-xl-8'
              chartColor='info'
              chartHeight='150px'
              title='Generate Reports'
              description='Finance and accounting reports'
              total={20330}
            /> */}
            </div>
          ) : (
            <h5 style={{textAlign: 'center'}}>No Data Found!</h5>
          )}
        </div>
      </div>
      <div className='row mb-8'>
        {isLoading ? (
          <h5 style={{textAlign: 'center'}}>Map is loading, please wait...</h5>
        ) : Object.keys(data).length > 0 ? (
          <ChartMap data={data?.chart3} obj={state?.filter}/>
        ) : (
          <h5 style={{textAlign: 'center'}}>No Data Found!</h5>
        )}
      </div>
    </>
  )
}

const DashboardWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <DashBoard />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {DashboardWrapper}
