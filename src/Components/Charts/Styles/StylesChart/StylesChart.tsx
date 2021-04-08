import React from "react";
import { BarChart } from "recharts";
import { useHistory } from "react-router";
import { IonSegment, IonSegmentButton, IonLabel, IonSelectOption, IonSelect, IonToggle } from "@ionic/react";
import { BreweryDocument, SearchParams, StyleData } from "../../../../Interfaces";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../../Redux/Store/index";
import { getStylesByBeerData, getStylesByBreweryData, getStylesByDate, getFavoriteStylesByDate } from "../StylesData";
import { StylesByBreweryChart } from "../StylesByBreweryChart";
import { PieChart, Pie, Cell, Sector } from "recharts";
import { useStylesChartStyles } from "./StylesChart.styles";

import * as queryString from "query-string";

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
  const [style, setStyle] = React.useState<string>(props.styles[0]._id);
  const [showFavoriteStyles, setShowFavoriteStyles] = React.useState<boolean>(false);

  const history = useHistory();
  const classes = useStylesChartStyles();

  React.useEffect(() => {
    const urlParams = queryString.parse(history.location.search);
    if (!urlParams[SearchParams.DataType] || !Object.values(StyleChartType).includes(urlParams[SearchParams.DataType] as StyleChartType)) {
      urlParams[SearchParams.DataType] = chartType;
      history.push({
        search: `?${queryString.stringify(urlParams)}`,
      });
    } else {
      setChartType(urlParams[SearchParams.DataType] as StyleChartType);
    }
  }, []);

  React.useEffect(() => {
    const urlParams = queryString.parse(history.location.search);

    urlParams[SearchParams.DataType] = chartType;
    history.push({
      search: `?${queryString.stringify(urlParams)}`,
    });
  }, [chartType]);

  const handleStylesTypeChange = (event: React.MouseEvent<HTMLIonSegmentElement, MouseEvent>) => {
    setChartType((event.target as any).value as StyleChartType);
  };

  const getStyleSelector = (includeFavorite: boolean = false) => {
    return (
      <>
        {includeFavorite && (
          <div className={classes.favoritesToggleContainer}>
            <IonToggle checked={showFavoriteStyles} onIonChange={(e) => setShowFavoriteStyles(e.detail.checked)}>
              Favorite Styles
            </IonToggle>
            <IonLabel className={classes.favoritesToggleLabel}>Show favorites only</IonLabel>
          </div>
        )}
        <IonSelect disabled={showFavoriteStyles} value={style} onIonChange={(e) => setStyle(e.detail.value)} placeholder={"Choose a style"}>
          {props.styles.map((style) => (
            <IonSelectOption value={style._id} key={style._id}>
              {style.name}
            </IonSelectOption>
          ))}
        </IonSelect>
      </>
    );
  };

  const getChart = () => {
    let data;
    switch (chartType) {
      case StyleChartType.ByBeer:
        data = getStylesByBeerData(props.styles, props.beer);
        return <StylesByBeerChart data={data} width={props.width} height={props.height} />;
      case StyleChartType.ByBrewery:
        data = getStylesByBreweryData(style, props.beer);
        console.log(data);
        return (
          <>
            {getStyleSelector()}
            <StylesByBreweryChart data={data} width={props.width} height={props.height} />
          </>
        );
      case StyleChartType.ByDate:
        data = getStylesByDate(props.history, props.beer, "2021");
        console.log(data);
        return (
          <>
            {getStyleSelector(true)}
            <StylesByBreweryChart data={data} width={props.width} height={props.height} />
          </>
        );
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
