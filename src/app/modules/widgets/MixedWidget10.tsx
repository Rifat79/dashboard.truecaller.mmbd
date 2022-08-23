/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import { useThemeMode } from '../../../_metronic/partials'
import { getCSSVariableValue } from '../../../_metronic/assets/ts/_utils'

type Props = {
  className: string
  chartColor: string
  chartHeight: string
  title: string
  description: string
  total: any
}

const MixedWidget10: React.FC<Props> = ({className, chartColor, chartHeight, title, description, total}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()
  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartColor, chartHeight))
    if (chart) {
      chart.render()
    }

    return chart
  }

  useEffect(() => {
    const chart = refreshChart()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode])

  return (
    // <div className={`card ${className}`}>
    //   {/* begin::Body */}
    //   <div className='card-body d-flex flex-column p-0'>
    //     {/* begin::Stats */}
    //     <div className='flex-grow-1 card-p pb-0'>
    //       <div className='d-flex flex-stack flex-wrap'>
    //         <div className='me-2'>
    //           <a href='#' className='text-dark text-hover-primary fw-bold fs-3'>
    //             {title}
    //           </a>

    //           <div className='text-muted fs-7 fw-semibold'>{description}</div>
    //         </div>

    //         <div className={`fw-bold fs-3 text-${chartColor}`}>{total}</div>
    //       </div>
    //     </div>
    //     {/* end::Stats */}

    //     {/* begin::Chart */}
    //     <div ref={chartRef} className='mixed-widget-7-chart card-rounded-bottom'></div>
    //     {/* end::Chart */}
    //   </div>
    //   {/* end::Body */}
    // </div>
    // <div className="card-body p-4">
    <>
        {/*begin::Col*/}
        <div className="col">
            {/*begin::Card widget 8*/}
            <div className="card overflow-hidden border border-dashed border-gray-400 rounded-3 card-flush h-200px">
                <div className="card-header py-3 px-4">
                    <div className="clearfix">
                        <div className="d-flex align-items-center">
                            <span className="fs-4 fw-bold text-gray-400 align-self-start me-1>">
                                ৳
                            </span>
                            <span className="fs-2hx fw-bolder text-gray-800 me-2 lh-1">
                                69,700
                            </span>
                        </div>
                        <span className="fs-6 fw-bold text-gray-400">
                            Total Active
                        </span>
                    </div>
                    <div className="card-toolbar">
                        <a
                            href="#"
                            className="btn btn-icon btn-light-primary btn-active-light-primary w-30px h-30px me-3"
                            data-kt-docs-table-filter="edit_row"
                        >
                            <i className="fas fa-eye fs-6" />
                        </a>
                    </div>
                </div>
                {/*begin::Card body*/}
                <div className="card-body p-0">
                    <div className="separator separator-dashed border-dark" />
                    <div ref={chartRef} className='mixed-widget-7-chart card-rounded-bottom'></div>
                </div>
            </div>
        </div>
        {/*end::Col*/}
    {/* </div> */}
</>
  )
}

const chartOptions = (chartColor: string, chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue('--kt-gray-800')
  const strokeColor = getCSSVariableValue('--kt-gray-300')
  const baseColor = getCSSVariableValue('--kt-' + chartColor)
  const lightColor = getCSSVariableValue('--kt-' + chartColor + '-light')

  return {
    series: [
      {
        name: 'Net Profit',
        data: [15, 25, 15, 40, 20, 50],
      },
      {
        name: 'Net Profit2',
        data: [10, 50, 30, 20, 60, 40],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'line',
      height: chartHeight,
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
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: strokeColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      min: 0,
      max: 60,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return '$' + val + ' thousands'
        },
      },
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  }
}

export {MixedWidget10}
