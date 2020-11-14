import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Chart = (props) => {
  
  const options = {
    title: {
      text: "exchange rate chart"
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      legend: false,
      type: "datetime",
      title: {
        text: "date"
      },
      categories: props.func()
    },
    yAxis: {
      title: {
        text: "currencies rate"
      }
    },
    series: [{
      name: 'rate',
      data: props.func2()
    }]
  }

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
}

export default Chart;
