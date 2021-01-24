import React from "react";
import { StyleData } from "../../../Interfaces";
import { BarChart, Pie, Cell, Sector, CartesianGrid, XAxis, YAxis, Bar, Legend, Tooltip, LabelList } from "recharts";
import * as _ from "lodash";

export interface IStylesByBeerChartProps {
  data: StyleData[];
  width: number;
  height: number;
}

export const StylesByBreweryChart: React.FC<IStylesByBeerChartProps> = (props) => {
  const { data, width, height } = props;
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const enumeratedData = data.map((datum, idx) => ({ ...datum, idx }));

  const onMouseOver = React.useCallback((data) => {
    setActiveIndex(data.idx);
  }, []);

  const _height = height * 0.75;
  const _bottomMargin = height * 0.25;

  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    const radius = 10;
    const _x = x + 5;
    const _y = y - radius;
    return (
      <g>
        <text x={_x} y={_y} fill="#8884d8" textAnchor="start" dominantBaseline="middle" transform={`rotate(-40, ${_x}, ${_y})`}>
          {value}
        </text>
      </g>
    );
  };
  const maxValue = _.maxBy(data, "value")?.value ?? 0;
  return (
    <BarChart
      width={width}
      height={height}
      data={props.data}
      margin={{
        top: 50,
        right: 30,
        left: 20,
        bottom: 150,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={"name"} tick={false} />
      <YAxis type="number" ticks={Array.from(Array(maxValue + 6).keys())} />
      <Tooltip />
      <Bar dataKey="value" fill={"#8884d8"}>
        <LabelList data={data} dataKey="name" content={renderCustomizedLabel} />
      </Bar>
    </BarChart>
  );
};
