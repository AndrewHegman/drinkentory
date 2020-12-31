import React from "react";
import { IonItem, useIonRouter } from "@ionic/react";
import { useClickableIonItemStyles } from "./ClickableIonItem.styles";
import { useHistory } from "react-router";

/**
 * If `search` is not provided, the current search parameter(s) will be used
 * Otherwise, the passed-in parameter will be used
 */
export interface IClickableIonItemProps {
  pathname?: string;
  routerDirection?: "none" | "forward" | "back" | "root";
  search?: string;
  onClick?: () => void | boolean;
}

export const ClickableIonItem: React.FC<IClickableIonItemProps> = (props) => {
  const { pathname, routerDirection, search, onClick } = props;
  const classes = useClickableIonItemStyles();
  const history = useHistory();
  const ionRouter = useIonRouter();

  return (
    <IonItem
      onClick={() => {
        if (!onClick || onClick()) {
          if (pathname) {
            ionRouter.push(`${pathname}${search || history.location.search}`, routerDirection || "forward");
          }
        }
      }}
      className={classes.root}
    >
      {props.children}
    </IonItem>
  );
};
