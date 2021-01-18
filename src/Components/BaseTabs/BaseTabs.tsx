import React from "react";
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { Route } from "react-router";
import { IonReactRouter } from "@ionic/react-router";
import { IRoute, routes, tabs } from "../../Utils";

interface IBaseTabsProps {}

export const BaseTabs: React.FC<IBaseTabsProps> = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {Object.keys(routes).map((routeName, idx) => {
            const route = (routes as { [key: string]: IRoute })[routeName];
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
          {tabs.map((tab) => (
            <IonTabButton tab={tab.tabId} href={tab.href} key={tab.tabId}>
              <IonIcon icon={tab.icon} />
              <IonLabel>{tab.name}</IonLabel>
            </IonTabButton>
          ))}
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};
