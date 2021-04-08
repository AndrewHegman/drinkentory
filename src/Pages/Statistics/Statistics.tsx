import React from "react";
import { RootPage } from "../../Components/RootPage";
import { connect, useDispatch, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { actions } from "../../Redux";
import { NetworkErrorAlert } from "../../Components/Alerts";
import { getHistoryData } from "./History";
import { HistoryChart, StylesChart } from "../../Components/Charts";
import { IonSegment, IonSegmentButton, IonLabel, useIonViewWillEnter } from "@ionic/react";
import { useHistory } from "react-router";
import * as queryString from "query-string";
import { SearchParams } from "../../Interfaces";

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
    isDataLoading:
      state.styles.isLoadingStyles || state.history.isLoadingHistory || state.beer.isWaitingOnFetch || state.breweries.isBreweriesLoading,
  };
};

export interface IStatisticsProps extends PropsFromRedux {}

const StatisticsComponent: React.FC<IStatisticsProps> = (props) => {
  const { isDataLoading } = props;
  const [showLoadingAlert, setShowLoadingAlert] = React.useState<boolean>(false);
  const [loadingAlertMessage, setLoadingAlertMessage] = React.useState<string>("");
  const [showChart, setShowChart] = React.useState<boolean>(false);
  const [statisticsType, setStatisticsType] = React.useState<StatisticsType>(StatisticsType.Styles);

  const containerRef = React.useRef<HTMLIonContentElement>(null);

  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    const urlParams = queryString.parse(history.location.search);
    if (!urlParams[SearchParams.Type] || !Object.values(StatisticsType).includes(urlParams[SearchParams.Type] as StatisticsType)) {
      urlParams[SearchParams.Type] = statisticsType;
      history.push({
        search: `?${queryString.stringify(urlParams)}`,
      });
    } else {
      setStatisticsType(urlParams[SearchParams.Type] as StatisticsType);
    }
  }, []);

  React.useEffect(() => {
    dispatch(actions.history.fetchHistory());
    dispatch(actions.beer.fetchAllBeer());
    dispatch(actions.styles.fetchAllStyles());
    dispatch(actions.breweries.fetchAllBreweries());
  }, [dispatch]);

  React.useEffect(() => {
    const urlParams = queryString.parse(history.location.search);
    urlParams[SearchParams.Type] = statisticsType;
    history.push({
      search: `?${queryString.stringify(urlParams)}`,
    });
  }, [statisticsType]);

  // We have to wait for ion-content to fully render so we can get an accurate size of the container.
  useIonViewWillEnter(() => {
    if (containerRef.current) {
      if (containerRef.current.offsetHeight > 0 && containerRef.current.offsetWidth > 0) {
        setShowChart(true);
      }
    }
  });

  const handleStatisticsTypeChange = (event: React.MouseEvent<HTMLIonSegmentElement, MouseEvent>) => {
    setStatisticsType((event.target as any).value as StatisticsType);
  };

  const getChart = () => {
    if (showChart && !props.isDataLoading) {
      switch (statisticsType) {
        case StatisticsType.Activity:
          return (
            <HistoryChart
              data={getHistoryData(props.history)}
              height={containerRef.current!.offsetHeight}
              width={containerRef.current!.offsetWidth}
            />
          );
        case StatisticsType.Styles:
          return <StylesChart width={containerRef.current?.offsetWidth || 0} height={containerRef.current?.offsetHeight || 0} />;
      }
    } else {
      return <div>Loading...</div>;
    }
  };

  return (
    <RootPage headerContent={<div />} loadingSpinnerProps={{ show: showLoadingAlert, message: loadingAlertMessage }} ref={containerRef}>
      <IonSegment onClick={handleStatisticsTypeChange} value={statisticsType}>
        <IonSegmentButton value={StatisticsType.Activity} title={StatisticsType.Activity}>
          <IonLabel>Activity</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value={StatisticsType.Styles} title={StatisticsType.Styles}>
          <IonLabel>Styles</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      <NetworkErrorAlert />
      {showChart && getChart()}
    </RootPage>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const Statistics = connector(StatisticsComponent);
