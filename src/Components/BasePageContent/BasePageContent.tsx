import React from "react";
import { IonContent } from "@ionic/react";
import { useBasePageContentStyles } from "./BasePageContent.styles";

export interface IBasePageContentProps {}

// A stylized IonContent component
export const BasePageContent: React.FC<IBasePageContentProps> = (props) => {
  const classes = useBasePageContentStyles();

  return <IonContent class={classes.root}>{props.children}</IonContent>;
};
