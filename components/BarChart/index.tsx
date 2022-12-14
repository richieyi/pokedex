import React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
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
  data: { name: string; count: number }[];
}

function BarChart(props: BarChartProps) {
  const { data } = props;

  return (
    <>
      <h1 className="text-xl text-center">Pokemon Types</h1>
      <RCBarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </RCBarChart>
    </>
  );
}

export default BarChart;
