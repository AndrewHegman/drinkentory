import React from "react";
import { IonButtons } from "@ionic/react";
import { ButtonLink } from "../ButtonLink/ButtonLink";
import { RouteComponentProps } from "react-router";
import { IRoute } from "../../Utils/Routes";
import * as queryString from "query-string";

export interface ICloseButtonProps extends Pick<RouteComponentProps, "history"> {
  pathname: string;
  searchParamToDelete?: string;
}

export const CloseButton: React.FC<ICloseButtonProps> = ({ pathname, searchParamToDelete, history }) => {
  const getCloseSearchText = () => {
    const searchParams = queryString.parse(history.location.search);

    searchParamToDelete && delete searchParams[searchParamToDelete];
    return `?${queryString.stringify(searchParams)}`;
  };

  return (
    <IonButtons slot={"end"}>
      <ButtonLink to={{ pathname, search: getCloseSearchText() }}>Close</ButtonLink>
    </IonButtons>
  );
};
