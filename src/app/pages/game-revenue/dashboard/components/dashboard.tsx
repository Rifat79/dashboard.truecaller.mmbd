import ReactApexChart from "react-apexcharts";
import { MixedWidget10 } from "../../../../modules/widgets/MixedWidget10";
import { useQueryResponse, useQueryResponseData } from "../core/QueryResponseProvider";


const DashBoard = () => {
    const { isLoading } = useQueryResponse();
    const data: any = useQueryResponseData();

    console.log('data: ', data)

    return (
        <>
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

        <div className='card mb-8 mt-8'>
        <div className='card-header min-h-40px text-center align-items-center justify-content-center'>
          <h2 className='card-title text-uppercase m-0'>Lifetime</h2>
        </div>
        <div className='card-body p-4'>
          {isLoading ? (
            <h5 style={{textAlign: 'center'}}>Chart is loading, please wait...</h5>
          ) : Object.keys(data).length > 0 ? (
            <div className='row gy-4 row-cols-1 row-cols-sm-2 row-cols-lg-4'>
              <MixedWidget10
                className='card-xl-stretch mb-xl-8'
                chartColor='info'
                chartHeight='150px'
                title='Generate Reports'
                description='Finance and accounting reports'
                total={20330}
                data={data?.chart2[0]}
              />
              <MixedWidget10
                className='card-xl-stretch mb-xl-8'
                chartColor='info'
                chartHeight='150px'
                title='Generate Reports'
                description='Finance and accounting reports'
                total={20330}
                data={data?.chart2[1]}
              />
            </div>
          ) : (
            <h5 style={{textAlign: 'center'}}>No Data Found!</h5>
          )}
        </div>
      </div>
      </>
    )
};

export {DashBoard};