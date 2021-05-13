import React from "react";
import { Route, Redirect } from "react-router-dom";

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
import { IonApp, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Login } from "./Pages/Login";
import { NotFound } from "./Pages/NotFound";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "./Redux/Store/index";
import { routes, tabs } from "./Utils";
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";
import { selectors } from "./Redux";

require("dotenv");

export interface IAppProps extends PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    isLoggedIn: selectors.users.isLoggedIn(state),
  };
};

const AppComponent: React.FC<IAppProps> = (props: IAppProps) => {
  const notFoundRoute = props.isLoggedIn ? <Route component={NotFound} /> : <Redirect to={routes.loginRoute} />;
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {notFoundRoute}

            {Object.keys(routes).map((routeName, idx) => {
              const route = routes[routeName];

              if (route.isPublic) {
                return (
                  <Route
                    key={idx}
                    path={route.pathname}
                    render={(props) => <route.component {...props} {...route.componentProps} />}
                    exact={route.exact}
                  />
                );
              }

              return (
                <PrivateRoute
                  key={idx}
                  path={route.pathname}
                  render={(props) => <route.component {...props} {...route.componentProps} />}
                  exact={route.exact}
                />
              );
            })}
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            {tabs.map((tab) => (
              <IonTabButton tab={tab.tabId} href={tab.href} key={tab.tabId}>
                <IonIcon icon={tab.icon} />
                <IonLabel>{tab.name}</IonLabel>
              </IonTabButton>
            ))}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const App = connector(AppComponent);
