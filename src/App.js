import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

const TWENTY_MIN_TEMP_SUB= gql`
  subscription {
    last_20_min_temp(
      order_by: {
        five_sec_interval: asc
      }
      where: {
        location: {
          _eq: "Miami"
        }
      }
    ) {
      five_sec_interval
      location
      max_temp
    }
  }
`

function App() {
  
  return (
    <div
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px'}}
      >
    <Subscription subscription={TWENTY_MIN_TEMP_SUB}>
          {
            ({data, error, loading}) => {
              if (error) {
                console.error(error);
                return "Error";
              }
              if (loading) {
                return "Loading";
              }
              let chartJSData = {
                labels: [],
                datasets: [{
                  label: "Max temp every 5 secs",
                  data: [],
                  pointBackgroundColor: [],
                  borderColor: 'lavendar',
                  fill: false
                }]
              };
              data.last_20_min_temp.forEach((item) => {
                const formattedTime = moment(item.five_sec_interval).format('LTS');
                chartJSData.labels.push(formattedTime);
                chartJSData.datasets[0].data.push(item.max_temp);
                chartJSData.datasets[0].pointBackgroundColor.push('aqua');
              })
              return (
                <Line
                  data={chartJSData}
                  options={{
                    animation: {duration: 0},
                    scales: { yAxes: [{ticks: { min: 5, max: 20 }}]}
                  }}
                />
              );
            }
          }
        </Subscription>
      </div>
    );
  }



export default App;
