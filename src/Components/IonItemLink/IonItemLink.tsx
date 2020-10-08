import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { IonItem } from "@ionic/react";
import { useIonItemLinkStyles } from "./IonItemLink.styles";

export interface IIonItemLinkProps extends LinkProps {
  onClick?: () => void;
}

export const IonItemLink: React.FC<IIonItemLinkProps> = (props) => {
  const { to, onClick } = props;
  const classes = useIonItemLinkStyles();

  return (
    <IonItem>
      <Link to={to} className={classes.root} onClick={onClick}>
        {props.children}
      </Link>
    </IonItem>
  );
};
