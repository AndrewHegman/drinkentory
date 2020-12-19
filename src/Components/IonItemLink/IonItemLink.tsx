import React from "react";
import { IonItem } from "@ionic/react";
import { useIonItemLinkStyles } from "./IonItemLink.styles";
import { useHistory } from "react-router";

/**
 * If `search` is not provided, the current search parameter(s) will be used
 * Otherwise, the passed-in parameter will be used
 */
export interface IIonItemLinkProps {
  pathname: string;
  routerDirection?: "none" | "forward" | "back" | "root";
  search?: string;
  onClick?: () => void;
}

export const IonItemLink: React.FC<IIonItemLinkProps> = (props) => {
  const { pathname, routerDirection, search, onClick } = props;
  const classes = useIonItemLinkStyles();
  const history = useHistory();

  return (
    <IonItem
      routerDirection={routerDirection || "forward"}
      routerLink={`${pathname}${search || history.location.search}`}
      onClick={onClick}
      className={classes.root}
    >
      {props.children}
    </IonItem>
  );
};
