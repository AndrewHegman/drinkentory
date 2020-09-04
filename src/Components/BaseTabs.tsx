import React from "react";
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { Route, RouteComponentProps } from "react-router";
import { map, list, codeWorking } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import { routes } from "../Utils/Routes";

interface IBaseTabsProps extends RouteComponentProps {}

export const BaseTabs: React.FC<IBaseTabsProps> = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {routes.map((route, idx) => {
            return (
              <Route
                key={idx}
                path={route.pathname}
                render={(props) => <route.component {...props} {...route.componentProps} />}
                exact={route.exact}
              />
            );
          })}
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="inventory" href="/inventory">
            <IonIcon icon={list} />
            <IonLabel>Inventory</IonLabel>
          </IonTabButton>
          <IonTabButton tab="statistics" href="/statistics">
            <IonIcon icon={map} />
            <IonLabel>Statistics</IonLabel>
          </IonTabButton>
          <IonTabButton tab="developers" href="/developers">
            <IonIcon icon={codeWorking} />
            <IonLabel>Developers</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};
