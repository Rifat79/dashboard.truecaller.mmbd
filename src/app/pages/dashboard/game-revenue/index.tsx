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
import {GET_ACTIVATION_DASHBOARD_DATA, GET_GAME_REVENUE_CHART} from '../../../constants/api.constants'
import moment from 'moment'
import { getAuth } from '../../../modules/auth'
import BarChart from '../../../modules/widgets/BarChart'
import { ChartsWidget1 } from '../../../../_metronic/partials/widgets/charts/ChartsWidget1'

const DashBoard = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile:: 55px;'
  document.body.setAttribute('style', bodyStyles)

  const { updateState } = useQueryRequest()
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

  const [state, setState] = useState(stateInit)
  const [loading, setLoading] = useState(true)
  const auth = getAuth()
  const data: any = useQueryResponseData();
  console.log('user:', data)

  // const users = useQueryResponseData()
  // const {updateState} = useQueryRequest()
  // updateState({
  //   filter: {
  //     start_date: '08-01-2022 00:00:00',
  //     end_date: '08-01-2022 23:59:59',
  //     organizationId: 20217
  //   },
  //   ...initialQueryState
  // })
  // const data = useMemo(() => users, [users])
  // useEffect(() => {
  //   const callAPI = async () => {
  //     setLoading(true)
  //     const res = await getQueryRequest(
  //       `${GET_GAME_REVENUE_CHART}?organization_id=${auth?.user?.organization || 20217}&start_date=${state.filter.startDate} 00:00:00&end_date=${state.filter.endDate} 23:59:59${state.filter.deviceType?.id ? `&device_type=${state.filter.deviceType?.id}` : ''}${state.filter?.model?.label?.length > 0 && Object.keys(state.filter.model).length > 0 ? `&model=${state.filter.model?.label}` : ""}`
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

  useEffect(() => {
    const startDate = moment().format('MM-DD-YYYY');
    const endDate = moment().subtract(30, 'days').format('MM-DD-YYYY');
    updateState({
      filter: { 
        start_date: `${startDate} 00:00:00`,
        end_date: `${endDate} 23:59:59`,
      },
      ...initialQueryState,
    });
  }, []);

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
    </>
  )
}

const GameDashboardWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <DashBoard />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {GameDashboardWrapper}