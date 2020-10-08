import React from "react";
import { IonButtons } from "@ionic/react";
import { ButtonLink } from "../ButtonLink/ButtonLink";
import { RouteComponentProps, withRouter } from "react-router";
import { IRoute } from "../../Utils/Routes";

interface ICloseButtonProps {
  pathname: string;
  searchParamToDelete?: string;
}

export const CloseButton: React.FC<ICloseButtonProps> = ({ pathname }) => {
  return (
    <IonButtons slot={"end"}>
      <ButtonLink to={{ pathname }}>Close</ButtonLink>
    </IonButtons>
  );
};
