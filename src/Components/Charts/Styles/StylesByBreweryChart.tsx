import React from "react";
import { StyleData } from "../../../Interfaces";
import { BarChart, Pie, Cell, Sector, CartesianGrid, XAxis, YAxis, Bar, Legend, Tooltip, LabelList } from "recharts";

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
      <XAxis dataKey={"name"} angle={45} textAnchor={"start"} interval={0} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value">
        <LabelList data={data} dataKey="name" clockWise={true} />
      </Bar>
    </BarChart>
  );
};
