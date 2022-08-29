import { ListViewProvider, useListView } from './core/ListViewProvider'
import { QueryRequestProvider } from './core/QueryRequestProvider'
import { QueryResponseProvider } from './core/QueryResponseProvider'
import { UsersListHeader } from './components/header/UsersListHeader'
import { UsersTable } from './table/UsersTable'
// import { UserEditModal } from './user-edit-modal/UserEditModal'
import { KTCard } from '../../../../_metronic/helpers'
import { PageTitle } from '../../../../_metronic/layout/core'
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import Chart from 'react-apexcharts'
import ReactApexChart from 'react-apexcharts'
import { MixedWidget10 } from '../../../modules/widgets/MixedWidget10'
import ChartMap from './components/map'

const DashBoard = () => {
  let bodyStyles = '';
  bodyStyles += '--kt-toolbar-height: 55px;';
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile:: 55px;';
  document.body.setAttribute('style', bodyStyles);

  const { itemIdForUpdate } = useListView()
  const settings = {
    series: [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    },
  };
  return (
    <>
      <Toolbar>
        <UsersListHeader />
      </Toolbar>
      <ReactApexChart
        options={{
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          },
        }}

        series={[{
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100]
        }, {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41]
        }]}
        type='area'
        height={450}
      />

            <div className="card mb-8 mt-8">
                <div className="card-header min-h-40px text-center align-items-center justify-content-center">
                    <h2 className="card-title text-uppercase m-0">Lifetime</h2>
                </div>
                <div className='card-body p-4'>
                  <div className='row gy-4 row-cols-1 row-cols-sm-2 row-cols-lg-4'>
                    <MixedWidget10 className='card-xl-stretch mb-xl-8'
                      chartColor='info'
                      chartHeight='150px'
                      title='Generate Reports'
                      description='Finance and accounting reports'
                      total={20330}
                    />
                    <MixedWidget10 className='card-xl-stretch mb-xl-8'
                      chartColor='info'
                      chartHeight='150px'
                      title='Generate Reports'
                      description='Finance and accounting reports'
                      total={20330}
                    />
                    <MixedWidget10 className='card-xl-stretch mb-xl-8'
                      chartColor='info'
                      chartHeight='150px'
                      title='Generate Reports'
                      description='Finance and accounting reports'
                      total={20330}
                    />
                    <MixedWidget10 className='card-xl-stretch mb-xl-8'
                      chartColor='info'
                      chartHeight='150px'
                      title='Generate Reports'
                      description='Finance and accounting reports'
                      total={20330}
                    />
                  </div>
                </div>
            </div>
            <div className='row mb-8'>
              <ChartMap />
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

export { DashboardWrapper }
