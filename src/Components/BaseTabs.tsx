import React from "react";
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { Route } from "react-router";
import { map, list, codeWorking } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import { routes } from "../Utils/Routes";

interface IBaseTabsProps {}

export const BaseTabs: React.FC<IBaseTabsProps> = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {/* <Redirect exact path="/" to="/inventory" /> */}
          {routes.map((route, idx) => {
            console.log(route);
            return (
              <Route key={idx} path={route.to} render={(props) => <route.component {...props} {...route.componentProps} />} exact={route.exact} />
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
