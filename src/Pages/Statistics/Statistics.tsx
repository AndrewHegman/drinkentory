import React from "react";
import { RootPage } from "../../Components/RootPage";
import { connect, useDispatch, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { actions } from "../../Redux";
import { NetworkErrorAlert } from "../../Components/Alerts";
import { HistoryData } from "../../Interfaces";
import { PieChart, Pie, Cell } from "recharts";
import { getHistoryData } from "./History";
import { HistoryChart } from "../../Components/Charts";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

enum StatisticsType {
  Activity = "activity",
  Styles = "styles",
}

const mapStateToProps = (state: RootState) => {
  return {
    styles: state.styles.styles,
    beer: state.beer.inventory,
    history: state.history.history,
    isWaitingOnStylesFetch: state.styles.isLoadingStyles,
    isLoading: state.history.isLoadingHistory,
  };
};

export interface IStatisticsProps extends PropsFromRedux {}

const StatisticsComponent: React.FC<IStatisticsProps> = (props) => {
  const { isWaitingOnStylesFetch } = props;
  const [showLoadingAlert, setShowLoadingAlert] = React.useState<boolean>(false);
  const [loadingAlertMessage, setLoadingAlertMessage] = React.useState<string>("");
  const [showGraph, setShowGraph] = React.useState<boolean>(false);
  const [statisticsType, setStatisticsType] = React.useState<StatisticsType>(StatisticsType.Activity);
  const [data, setData] = React.useState<HistoryData[]>();

  const containerRef = React.useRef<HTMLIonContentElement>(null);

  const dispatch = useDispatch();

  React.useEffect(() => {
    switch (statisticsType) {
      case StatisticsType.Activity:
        dispatch(actions.history.fetchHistory());
        break;
      case StatisticsType.Styles:
        dispatch(actions.beer.fetchAllBeer());
        dispatch(actions.styles.fetchAllStyles());
        break;
    }
  }, [dispatch, statisticsType]);

  React.useEffect(() => {
    let _data;
    if (!props.isLoading) {
      switch (statisticsType) {
        case StatisticsType.Activity:
          setData(getHistoryData(props.history));
          break;
        case StatisticsType.Styles:
          // https://24ways.org/2019/five-interesting-ways-to-use-array-reduce/
          const totalQuantity = props.beer.reduce((a, b) => a + b.historicQuantity, 0);
          let otherQuantity = 0;
          _data = props.styles
            .map((style) => {
              let value = props.beer.filter((beer) => beer.style._id === style._id).reduce((a, b) => a + b.historicQuantity, 0);
              if (value / totalQuantity < 0.1) {
                otherQuantity += value;
                value = 0;
              }
              return {
                name: style.name,
                value,
              };
            })
            .filter((datum) => datum.value > 0);
          _data.push({
            name: "Other",
            value: otherQuantity,
          });
          // setData(_data);
          break;
      }
    }
  }, [props.history, props.isLoading]);

  // We have to wait for ion-content to fully render so we can get an accurate size of the container
  // There is a known issue where this hook doesn't re-trigger when the containerRef updates.
  // When this happens, the graph never renders.
  React.useEffect(() => {
    if (containerRef.current && containerRef.current.offsetHeight > 0 && containerRef.current.offsetWidth > 0) {
      setShowGraph(true);
    }
  }, [containerRef.current, containerRef.current?.offsetHeight, containerRef.current?.offsetWidth]);

  const handleStatisticsTypeChange = (event: React.MouseEvent<HTMLIonSegmentElement, MouseEvent>) => {
    setStatisticsType((event.target as any).value as StatisticsType);
  };

  const getChart = () => {
    if (data && data.length > 0) {
      switch (statisticsType) {
        case StatisticsType.Activity:
          return <HistoryChart data={data} height={containerRef.current!.offsetHeight} width={containerRef.current!.offsetWidth} />;
        case StatisticsType.Styles:
          return (
            <PieChart width={containerRef.current?.offsetWidth} height={containerRef.current?.offsetWidth}>
              <Pie data={data} innerRadius={50} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" activeIndex={0}>
                {data!.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          );
      }
    }
  };
  return (
    <>
      <RootPage headerContent={<div />} loadingSpinnerProps={{ show: showLoadingAlert, message: loadingAlertMessage }} containerRef={containerRef}>
        <IonSegment onClick={handleStatisticsTypeChange} value={statisticsType}>
          <IonSegmentButton value={StatisticsType.Activity} title={StatisticsType.Activity}>
            <IonLabel>Activity</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value={StatisticsType.Styles} title={StatisticsType.Styles}>
            <IonLabel>Styles</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <NetworkErrorAlert />
        {showGraph && getChart()}
      </RootPage>
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const Statistics = connector(StatisticsComponent);
