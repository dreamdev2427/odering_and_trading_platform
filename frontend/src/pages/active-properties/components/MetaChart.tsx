import React from 'react';
import { Bar } from 'react-chartjs-2';

import { StoMetaValue } from 'services/apollo';

interface MetaChartProps {
  meta: Array<StoMetaValue>;
  name: string;
}

interface ChartDataItem {
  title: string;
  value: number;
  color: string;
}

const MetaChart: React.FC<MetaChartProps> = ({ meta, name }) => {
  const content = meta.filter((x) => x.key === name);

  if (!content[0]?.value) {
    return <></>;
  }

  const chartData = JSON.parse(content[0].value);
  const data = {
    labels: [''],
    datasets: chartData.data.map((d: ChartDataItem) => ({
      label: d.title,
      data: [d.value],
      backgroundColor: d.color,
      barPercentage: 0.2,
      stack: 'a',
    })),
  };

  return (
    <div className="mt-md-2">
      <div className="mt-md-2">
        <b>{chartData.title}</b>
      </div>
      <Bar
        height={chartData.height}
        data={data}
        options={{
          plugins: {
            title: {
              position: 'top',
              text: [chartData.title],
              display: true,
            },
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        }}
      />
    </div>
  );
};

export default MetaChart;
