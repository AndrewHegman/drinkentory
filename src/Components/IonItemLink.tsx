import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { IonItem } from "@ionic/react";

export interface IIonItemLinkProps extends LinkProps {
  search?: string;
}

export const IonItemLink: React.FC<IIonItemLinkProps> = (props) => {
  const { to } = props;
  return (
    <IonItem>
      <Link to={to}>{props.children}</Link>
    </IonItem>
  );
};
