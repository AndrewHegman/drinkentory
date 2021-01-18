import React from "react";
import { PieChart, Pie, Cell, LabelList, ResponsiveContainer, Sector, LineChart, CartesianGrid, XAxis, YAxis, Line, Legend } from "recharts";
import { HistoryData } from "../../Interfaces";

export type HistoryChartProps = {
  width: number;
  height: number;
  data: HistoryData[];
};

const CustomizedAxisTick = (props: any) => {
  return (
    <g transform={`translate(${props.x},${props.y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
        {props.payload.value}
      </text>
    </g>
  );
};

export const HistoryChart: React.FC<HistoryChartProps> = (props) => {
  return (
    <ResponsiveContainer height={"80%"}>
      <LineChart width={props.width} height={props.height} data={props.data} margin={{ top: 55, right: 55 }}>
        <CartesianGrid />
        <XAxis dataKey="name" tick={<CustomizedAxisTick />} height={100} />
        <YAxis />
        <Legend verticalAlign="top" height={36} />
        <Line type="monotone" dataKey="added" stroke="#8884d8" />
        <Line type="monotone" dataKey="drank" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};
