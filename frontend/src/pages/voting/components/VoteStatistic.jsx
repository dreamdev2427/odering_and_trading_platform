import { HorizontalBar } from 'react-chartjs-2';
import React from 'react';

export const VoteStatistic = ({ stat }) => {

  const { votingUserStatistic } = stat || {};

  if (!votingUserStatistic) return <></>;

  const { votesYes, votesNo, votesAbstention } = votingUserStatistic;
  const data = {
    labels: ['Yes', 'No', 'Abstention'],
    datasets: [
      {
        label: 'yes',
        data: [votesYes,votesNo,votesAbstention],
        backgroundColor: ['red','blue','gray'],
        barPercentage: 0.5,
      },
    ],
  };

  return (
    <HorizontalBar
      height="100px"
      width="300px"
      data={data}
      options={{
        scales: {
          xAxes: [{
            gridLines: {
              display:false
            }
          }],
          yAxes: [{
            gridLines: {
              display:false
            }
          }]
        },
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          datalabels: {
            display: true,
            color: 'white'
          },
          title: {
            display: true,
            text: 'Voting statistic',
          },
        },
      }}
    />
  );
};
