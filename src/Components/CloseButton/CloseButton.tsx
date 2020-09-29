import React from "react";
import { IonButtons } from "@ionic/react";
import { ButtonLink } from "../ButtonLink/ButtonLink";
import { RouteComponentProps, withRouter } from "react-router";
import { IRoute } from "../../Utils/Routes";
import * as queryString from "query-string";

interface ICloseButtonProps {
  pathname: string;
  searchParamToDelete?: string;
}

export const CloseButtonComponent: React.FC<ICloseButtonProps & RouteComponentProps> = ({ pathname, searchParamToDelete, history }) => {
  const getCloseSearchText = () => {
    const searchParams = queryString.parse(history.location.search);

    searchParamToDelete && delete searchParams[searchParamToDelete];
    return `?${queryString.stringify(searchParams)}`;
  };

  return (
    <IonButtons slot={"end"}>
      <ButtonLink to={{ pathname }}>Close</ButtonLink>
    </IonButtons>
  );
};

export const CloseButton = withRouter(CloseButtonComponent);
