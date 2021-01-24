import React from "react";
import { PieChart, Pie, Cell, Sector } from "recharts";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import { StyleData } from "../../../Interfaces";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../Redux/Store/index";
import { getStylesByBeerData, getStylesByBreweryData } from "./StylesData";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const mapStateToProps = (state: RootState) => {
  return {
    styles: state.styles.styles,
    beer: state.beer.inventory,
    history: state.history.history,
  };
};

export interface IStylesChartProps extends PropsFromRedux {
  width: number;
  height: number;
}

export const StylesChartComponent: React.FC<IStylesChartProps> = (props) => {
  enum StyleChartType {
    ByBeer = "Beer",
    ByBrewery = "Brewery",
    ByDate = "Date",
  }

  const [chartType, setChartType] = React.useState<StyleChartType>(StyleChartType.ByBrewery);
  const handleStylesTypeChange = (event: React.MouseEvent<HTMLIonSegmentElement, MouseEvent>) => {
    setChartType((event.target as any).value as StyleChartType);
  };

  const getChart = () => {
    let data;
    switch (chartType) {
      case StyleChartType.ByBeer:
        data = getStylesByBeerData(props.styles, props.beer);
        return <StylesByBeerChart data={data} width={props.width} height={props.height} />;
      case StyleChartType.ByBrewery:
        data = getStylesByBreweryData("5fee0c0fef79624794d973cc", props.beer);
        return <div>by brewery</div>;
      case StyleChartType.ByDate:
        return <div>by date</div>;
    }
  };

  return (
    <>
      <div style={{ marginTop: "20px", marginRight: "10px", marginLeft: "10px" }}>
        <IonSegment onClick={handleStylesTypeChange} value={chartType}>
          {Object.keys(StyleChartType).map((type: string) => {
            const value = StyleChartType[type as keyof typeof StyleChartType];
            return (
              <IonSegmentButton value={value} title={value} key={value}>
                <IonLabel>{value}</IonLabel>
              </IonSegmentButton>
            );
          })}
        </IonSegment>
      </div>
      {getChart()}
    </>
  );
};

export interface IStylesByBeerChartProps {
  data: StyleData[];
  width: number;
  height: number;
}

const StylesByBeerChart: React.FC<IStylesByBeerChartProps> = (props) => {
  const { data, width, height } = props;
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const enumeratedData = data.map((datum, idx) => ({ ...datum, idx }));

  const onMouseOver = React.useCallback((data) => {
    setActiveIndex(data.idx);
  }, []);

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    ) as any;
  };

  return (
    <>
      <PieChart width={width} height={height}>
        <Pie
          data={enumeratedData}
          activeShape={renderActiveShape}
          innerRadius={110}
          outerRadius={140}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          activeIndex={activeIndex}
          onMouseOver={onMouseOver}
        >
          {(enumeratedData as StyleData[]).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const StylesChart = connector(StylesChartComponent);
