import React from "react";
import { useHistory } from "react-router-dom";
import { IonPage, IonToolbar, IonSegmentButton, IonLabel, IonSegment, IonContent, IonHeader, IonButtons, IonIcon, IonPopover } from "@ionic/react";
import { Domains } from "../Utils/Routes";
import { SettingsMenu } from "./SettingsMenu";
import { menuOutline } from "ionicons/icons";
import { useBasePageStyles } from "./BasePage.styles";

require("dotenv");

export interface IBasePage {
  toolbarHeaderContent?: React.ReactNode;
  headerContent?: React.ReactNode;
}

export const BasePage: React.FC<IBasePage> = (props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const history = useHistory();
  const isProd = process.env.REACT_APP_IS_PROD === "true";

  // TODO: Force a default value if domain is invalid (not `beer` or `wine`)
  const [domain, setDomain] = React.useState<string>(urlParams.get("domain") || Domains.Beer);
  const [showSettingsPopover, setShowSettingsPopover] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (urlParams.has("domain")) {
      return;
    }

    history.push({
      search: `?domain=${domain}${urlParams.toString().length > 0 ? "&" + urlParams.toString() : ""}`,
    });
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
