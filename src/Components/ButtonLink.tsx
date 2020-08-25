import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { IonButton } from "@ionic/react";

export interface IButtonLinkProps extends LinkProps {
  search?: string;
}

export const ButtonLink: React.FC<IButtonLinkProps> = (props) => {
  const { to } = props;
  return (
    <Link to={to}>
      <IonButton>{props.children}</IonButton>
    </Link>
  );
};
