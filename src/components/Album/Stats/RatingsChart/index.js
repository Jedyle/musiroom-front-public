import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({
    labels,
    data,
    bgColor
}) => (
    <Bar
      data={
          {
              labels: labels,
              datasets: [
                  {
                      backgroundColor: bgColor,
                      data: data
                  }
              ]
          }
      }
      options={
          {
              legend: {
                  display: false
              },
              scales: {
                  xAxes: [{
                      gridLines: {
                          display: true
                      },
                      ticks: {
                          display: false
                      },
                      categoryPercentage: 1.0,
                      barPercentage: 1.0
                  }],
                  yAxes: [{
                      gridLines: {
                          display: false,
                      },
                      ticks:{
                          display: false
                      }
                  }]
              }
          }
      }
    />);


const RatingsChart = ({
    stats,
    chartColor,
    textClass
}) => ( stats &&  (
    <div className="columns is-mobile has-border has-margin-right-10">
      <div className="column is-4">
        <h1 className={`is-marginless has-text-centered title is-size-2 ${textClass}`}>
          {stats.average ? parseFloat(stats.average).toFixed(1) : '-'}
        </h1>
        <p className={`has-text-centered has-margin-top-10 ${textClass}`}>
          <span className="icon">
            <i className="fa fa-user"></i>
          </span>
          {stats.count}
        </p>
      </div>
      <div className="column is-8">
        <Chart
          bgColor={chartColor}
          {...stats.stats}
        />
      </div>
    </div>
)
      );

export default RatingsChart;
