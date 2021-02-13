import React, { Fragment, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

const CovidChart = props => {
    const { hoveredData ={} } = props

    const [ series, setSeries ] = useState([Number(hoveredData.active), Number(hoveredData.recovered), Number(hoveredData.deaths)])
    useEffect(() => {
        setSeries([Number(hoveredData.active), Number(hoveredData.recovered), Number(hoveredData.deaths)])
    }, [hoveredData])
 
    const [lineChart, setLineChart ] = useState(
{
          
        series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        },
        {
            name: "asdf",
            data: [10, 44, 35, 61, 49, 12, 69, 91, 148]
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
        
        },
      
      
      })

    const [donutData, setdonutData] = useState(
       {
        series: series,
            options: {
              chart: {
                width: 380,
                type: 'donut',
              },
              dataLabels: {
                enabled: false
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    show: false
                  }
                }
              }],
              legend: {
                position: 'right',
                offsetY: 0,
                height: 230,
              }
            },
          
          
        }
    )

    return (
        <div className="covid_chart">
            <div className='donut_cahrt'>
            <Chart options={donutData.options} series={series} chartOptions={donutData.chartOptions} type="donut" width="300" />
            </div>
            <div className='line_cahrt'>
              <Chart options={lineChart.options} series={lineChart.series} type="line" height={180} />
              </div>
              
      </div>
    )
}

export default CovidChart