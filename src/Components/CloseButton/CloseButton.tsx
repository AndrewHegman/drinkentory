import React from "react";
import { IonButtons } from "@ionic/react";
import { ButtonLink } from "../ButtonLink/ButtonLink";
import { RouteComponentProps, useHistory, withRouter } from "react-router";
import { IRoute } from "../../Utils/Routes";

interface ICloseButtonProps {
  pathname: string;
  onClick?: () => void;
}

export const CloseButton: React.FC<ICloseButtonProps> = ({ pathname, onClick }) => {
  const history = useHistory();
  return (
    <IonButtons slot={"end"}>
      <ButtonLink to={{ pathname, search: history.location.search }} onClick={onClick}>
        Close
      </ButtonLink>
    </IonButtons>
  );
};
