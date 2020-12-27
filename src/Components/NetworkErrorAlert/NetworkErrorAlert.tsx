import React from "react";
import { IonAlert } from "@ionic/react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { common } from "../../Redux/Store/Common/Actions";

require("dotenv");

export interface INetworkErrorAlertProps extends PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    isNetworkError: state.common.isNetworkError,
    networkErrorMessage: state.common.networkErrorMessage,
  };
};

const NetworkErrorAlertComponent: React.FC<INetworkErrorAlertProps> = (props) => {
  const dispatch = useDispatch();

  const getButtons = () => {
    if (process.env.REACT_APP_IS_PROD === "true") {
      return [
        {
          text: "Ok!",
          handler: () => console.log("clicked OK"),
        },
        {
          text: "More Info",
          handler: () => console.log("clicked more info"),
        },
      ];
    } else {
      return [
        {
          text: "Ok!",
          handler: () => dispatch(common.clearNetworkError()),
        },
      ];
    }
  };

  const getMessage = () => {
    if (process.env.REACT_APP_IS_PROD === "true") {
      return "A network error occurred!";
    } else {
      return props.networkErrorMessage;
    }
  };
  return <IonAlert isOpen={props.isNetworkError} buttons={getButtons()} message={getMessage()} />;
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const NetworkErrorAlert = connector(NetworkErrorAlertComponent);
