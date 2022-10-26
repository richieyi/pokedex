import React from 'react';
import {
  BarChart as RCBarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

interface BarChartProps {
  data: any;
}

function BarChart(props: BarChartProps) {
  const { data } = props;

  return (
    <div className="hidden lg:block">
      <h1 className="text-xl text-center">Pokemon Types</h1>
      <RCBarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </RCBarChart>
    </div>
  );
}

export default BarChart;
