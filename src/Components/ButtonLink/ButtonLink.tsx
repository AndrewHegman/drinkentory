import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { IonButton } from "@ionic/react";
import { useButtonLinkStyles } from "./ButtonLink.styles";

export interface IButtonLinkProps extends LinkProps {}

export const ButtonLink: React.FC<IButtonLinkProps> = (props) => {
  const { to } = props;
  const classes = useButtonLinkStyles();
  return (
    <Link to={to} className={classes.root}>
      <IonButton>{props.children}</IonButton>
    </Link>
  );
};
