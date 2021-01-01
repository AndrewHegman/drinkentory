import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { RootState } from "./Redux/Store/index";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { BaseTabs } from "./Components/BaseTabs";
import { NotFound } from "./Pages/NotFound";
import { actions } from "./Redux";
import { ServerAddress } from "./Utils";

require("dotenv");

export interface IAppProps extends PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    beer: state.beer,
    domain: state.domain.domain,
  };
};

const UnconnectedApp: React.FC<IAppProps> = (props: IAppProps) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    switch (process.env.REACT_APP_SERVER_ADDRESS) {
      case "localhost":
        dispatch(actions.common.setServerAddress(ServerAddress.Localhost));
        break;
      case "production":
        dispatch(actions.common.setServerAddress(ServerAddress.Production));
        break;
      default:
        dispatch(actions.common.setServerAddress(ServerAddress.Localhost));
        break;
    }
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/inventory" component={BaseTabs} />
          <Route path="/statistics" component={BaseTabs} />
          <Redirect exact from="/" to="/inventory" />
          {/* <Route path="*" component={NotFound} /> */}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const App = connect(mapStateToProps)(UnconnectedApp);
