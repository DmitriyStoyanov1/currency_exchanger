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
      <div style={{backgroundColor: 'white'}}>
        <ul style={{padding: '3px 0px 0px', margin: '0px', listStyle: 'none',
                    display: 'flex', justifyContent: 'space-around',
                    borderBottom: '1px solid #c8c8c8',
                    color: 'gray'
        }}>
          <li>1WEEK</li>
          <li>1MONTH</li>
          <li>5MONTH</li>
          <li>1YEAR</li>
        </ul>
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
}

export default Chart;
