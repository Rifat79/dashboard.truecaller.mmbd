import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { kFormatter } from "../../../../app/modules/helpers/misc";

export const dataSeries = [

  {
    date: "2014-01-01",
    value: 150
  },
  {
    date: "2014-01-02",
    value: 16
  },
  {
    date: "2014-01-03",
    value: 170
  },
  {
    date: "2014-01-04",
    value: 1607
  },
  {
    date: "2014-01-05",
    value: 1673
  },
  {
    date: "2014-01-06",
    value: 16
  },
  {
    date: "2014-01-07",
    value: 161
  },
  {
    date: "2014-01-08",
    value: 152
  },
  {
    date: "2014-01-09",
    value: 1407
  },
  {
    date: "2014-01-10",
    value: 144
  },
  {
    date: "2014-01-11",
    value: 154
  },
  {
    date: "2014-01-12",
    value: 1655
  },
  {
    date: "2014-01-13",
    value: 1757
  },
  {
    date: "2014-01-14",
    value: 1870
  },
  {
    date: "2014-01-15",
    value: 1975
  },
  {
    date: "2014-01-16",
    value: 210
  },
  {
    date: "2014-01-17",
    value: 1961
  },
  {
    date: "2014-01-18",
    value: 2073
  },
  {
    date: "2014-01-19",
    value: 2002
  },
  {
    date: "2014-01-20",
    value: 1868
  },
  {
    date: "2014-01-21",
    value: 1924
  },
  {
    date: "2014-01-22",
    value: 2042
  },
  {
    date: "2014-01-23",
    value: 192
  },
  {
    date: "2014-01-24",
    value: 203
  },
  {
    date: "2014-01-25",
    value: 208
  },
  {
    date: "2014-01-26",
    value: 196
  },
  {
    date: "2014-01-27",
    value: 1925
  },
  {
    date: "2014-01-28",
    value: 17
  },
  {
    date: "2014-01-29",
    value: 190
  },
  {
    date: "2014-01-30",
    value: 203
  },
  {
    date: "2014-01-31",
    value: 218
  },
  {
    date: "2014-02-01",
    value: 2106
  }
];


const LineApexChart = (props) => {

  return (
    <div className='min-h-auto w-100 ps-4 pe-6' style={{ height: props.height || 300 }}>
      <ReactApexChart
        options={props.data.options}
        series={props.data.series}
        type='area'
        height={props.height || 300}
      />
    </div>
  )
}

export default LineApexChart