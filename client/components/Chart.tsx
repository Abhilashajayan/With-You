'use client' 

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function ExampleChart() {

  const options = {
    chart: {
      id: 'apexchart-example',
      // background: '#f8f9fa' // Set the background color here
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    },
    yaxis: [
      {
        title: {
          text: 'Primary Y-axis'
        },
      },
    ],
  };

  const series = [
    {
      name: 'series-1',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
    {
      name: 'series-2',
      data: [10, 20, 15, 30, 29, 40, 50, 71, 105],
    }
  ];

  return (
    <>
      <ApexChart type="line"  options={options} series={series} height={360} width={900} />
    </>
  );
}
