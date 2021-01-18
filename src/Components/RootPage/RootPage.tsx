import React from "react";
import { useHistory } from "react-router";
import {
  IonPage,
  IonToolbar,
  IonSegmentButton,
  IonLabel,
  IonSegment,
  IonContent,
  IonHeader,
  IonButtons,
  IonIcon,
  IonPopover,
  IonLoading,
} from "@ionic/react";
import { Domains, SearchParams } from "../../Interfaces";
import { SettingsMenu } from "../SettingsMenu";
import { menuOutline } from "ionicons/icons";
import { useRootPageStyles } from "./RootPage.styles";
import { RootState } from "../../Redux/Store/index";
import { connect, ConnectedProps, useDispatch } from "react-redux";

import * as queryString from "query-string";
import { actions } from "../../Redux";
import { features } from "../../Utils";

require("dotenv");

export interface IRootPageProps extends PropsFromRedux {
  loadingSpinnerProps?: {
    show: boolean;
    message: string;
  };
  toolbarHeaderContent?: React.ReactNode;
  headerContent?: React.ReactNode;
}

const mapStateToProps = (state: RootState) => {
  return {
    domain: state.domain.domain,
  };
};

const RootPageComponent: React.FC<React.PropsWithChildren<IRootPageProps>> = (props) => {
  const { headerContent, toolbarHeaderContent, domain, loadingSpinnerProps } = props;

  const dispatch = useDispatch();
  const history = useHistory();
  const isProd = process.env.REACT_APP_IS_PROD === "true";

  const [showSettingsPopover, setShowSettingsPopover] = React.useState<boolean>(false);

  /* Check if the domain is set and make sure that the domain is always valid. If not valid, default to Beer */
  React.useEffect(() => {
    const urlParams = queryString.parse(history.location.search);
    const normalizedDomainKeys = Object.keys(Domains).map((key) => key.toLowerCase());
    const normalizedUrlParam = (urlParams[SearchParams.Domain] as string)?.toLowerCase();

    if (normalizedDomainKeys.includes(normalizedUrlParam)) {
      dispatch(actions.domain.setDomain(urlParams[SearchParams.Domain] as Domains));
    } else {
      urlParams[SearchParams.Domain] = Domains.Beer;
      history.push({
        search: `?${queryString.stringify(urlParams)}`,
      });
      dispatch(actions.domain.setDomain(Domains.Beer));
    }
  }, [dispatch, history]);

  /* Handle changing domain when segment button is clicked */
  const handleSegmentChange = (event: any) => {
    const urlParams = queryString.parse(history.location.search);
    if (urlParams[SearchParams.Domain] !== event.target.value) {
      urlParams[SearchParams.Domain] = event.target.value;
      history.push({
        search: `?${queryString.stringify(urlParams)}`,
      });
    }
    dispatch(actions.domain.setDomain(event.target.value));
  };

  const classes = useRootPageStyles();
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
          <IonSegment onClick={handleSegmentChange} value={domain} disabled={!features.domainSwitching}>
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
      <IonContent fullscreen={true}>
        {loadingSpinnerProps && <IonLoading spinner="lines" message={loadingSpinnerProps.message} isOpen={loadingSpinnerProps.show} />}
        {props.children}
      </IonContent>
    </IonPage>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const RootPage = connector(RootPageComponent);
