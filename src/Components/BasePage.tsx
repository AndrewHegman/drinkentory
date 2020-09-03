import React from "react";
import { useHistory } from "react-router-dom";
import { IonPage, IonToolbar, IonSegmentButton, IonLabel, IonSegment, IonContent, IonHeader, IonButtons, IonIcon, IonPopover } from "@ionic/react";
import { Domains } from "../Utils/Routes";
import { SettingsMenu } from "./SettingsMenu";
import { menuOutline } from "ionicons/icons";
import { useBasePageStyles } from "./BasePage.styles";
import { SearchParams } from "../Utils/Constants";
import * as queryString from "query-string";

require("dotenv");

export interface IBasePage {
  toolbarHeaderContent?: React.ReactNode;
  headerContent?: React.ReactNode;
}

export const BasePage: React.FC<IBasePage> = (props) => {
  const history = useHistory();
  const urlParams = queryString.parse(history.location.search);
  const isProd = process.env.REACT_APP_IS_PROD === "true";

  // TODO: Force a default value if domain is invalid (not `beer` or `wine`)
  const [domain, setDomain] = React.useState<string>((urlParams[SearchParams.Domain] as string) || Domains.Beer);
  const [showSettingsPopover, setShowSettingsPopover] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (urlParams[SearchParams.Domain] !== domain) {
      urlParams[SearchParams.Domain] = domain;
      history.push({
        search: `?${queryString.stringify(urlParams)}`,
      });
    }
  }, [history, domain, urlParams]);

  const handleChange = (value: any) => {
    setDomain(value.detail.value);
  };

  const { headerContent, toolbarHeaderContent } = props;

  const classes = useBasePageStyles();
  return (
    <IonPage>
      {!isProd && (
        <IonPopover isOpen={showSettingsPopover} onDidDismiss={() => setShowSettingsPopover(false)}>
          <SettingsMenu />
        </IonPopover>
      )}
      <IonHeader>
        <IonToolbar>
          {!isProd && (
            <IonButtons slot="start">
              <IonIcon icon={menuOutline} onClick={() => setShowSettingsPopover(true)} className={classes.settingsPopoverToggle} />
            </IonButtons>
          )}
          <IonSegment onIonChange={handleChange} value={domain}>
            <IonSegmentButton value={Domains.Beer} title={Domains.Beer}>
              <IonLabel>Beer</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value={Domains.Wine} title={Domains.Wine}>
              <IonLabel>Wine</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          {toolbarHeaderContent}
        </IonToolbar>
        {headerContent}
      </IonHeader>
      <IonContent fullscreen={true}>{props.children}</IonContent>
    </IonPage>
  );
};
