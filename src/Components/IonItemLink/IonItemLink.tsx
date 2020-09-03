import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { IonItem } from "@ionic/react";
import { useIonItemLinkStyles } from "./IonItemLink.styles";

export interface IIonItemLinkProps extends LinkProps {
  search?: string;
}

export const IonItemLink: React.FC<IIonItemLinkProps> = (props) => {
  const { to } = props;
  const classes = useIonItemLinkStyles();

  return (
    <IonItem>
      <Link to={to} className={classes.root}>
        {props.children}
      </Link>
    </IonItem>
  );
};
