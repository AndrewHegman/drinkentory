import React from "react";
import { RootPage } from "../../Components/RootPage";
import { connect, useDispatch, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { features } from "../../Utils";
import { actions, selectors } from "../../Redux";
import { NetworkErrorAlert } from "../../Components/Alerts";
import { VictoryPie } from "victory";

const mapStateToProps = (state: RootState) => {
  return {
    currentBeer: selectors.beer.getCurrentBeer(state),
    domain: state.domain.domain,
    isWaitingOnAddNewBeer: state.beer.isWaitingOnAddNewBeer,
    isWaitingOnBeerUpdate: state.beer.isWaitingOnBeerUpdate,
    isWaitingOnBeerFetch: state.beer.isWaitingOnFetch,
  };
};

export interface IStatisticsProps extends PropsFromRedux {}

const StatisticsComponent: React.FC<IStatisticsProps> = (props) => {
  const dispatch = useDispatch();

  const [showLoadingAlert, setShowLoadingAlert] = React.useState<boolean>(false);
  const [loadingAlertMessage, setLoadingAlertMessage] = React.useState<string>("");
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];
  return (
    <>
      <RootPage headerContent={<div />} loadingSpinnerProps={{ show: showLoadingAlert, message: loadingAlertMessage }}>
        <NetworkErrorAlert />
        <VictoryPie />
      </RootPage>
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const Statistics = connector(StatisticsComponent);
