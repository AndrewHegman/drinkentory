import { IonRouterLink } from "@ionic/react";
import React from "react";
import { RootPage } from "../../Components/RootPage";
import { routes } from "../../Utils";

export interface INotFound {}

export const NotFound: React.FC<INotFound> = (props: INotFound) => {
  return (
    <RootPage>
      <div>Maybe you've had too much to drink because looks like you are lost!</div>
      <IonRouterLink routerLink={routes.inventoryRoute.pathname}>Click here to go back to the Inventory page</IonRouterLink>
    </RootPage>
  );
};
