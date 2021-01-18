import React from "react";
import { BasePageHeader } from "../../Components/BasePageHeader";
import { SubmitButton } from "../../Components/SubmitButton";
import { NetworkErrorAlert } from "../../Components/Alerts";
import { routes } from "../../Utils";
import { IonPage, IonHeader, IonCardHeader, IonCardTitle, IonCard, IonCardSubtitle, IonCardContent, IonTextarea } from "@ionic/react";
import { BasePageContent } from "../../Components/BasePageContent";

export interface IEditMoreInfoProps {}

export const EditMoreInfo: React.FC<IEditMoreInfoProps> = (props) => {
  return (
    <>
      <IonPage>
        <IonHeader>
          <BasePageHeader title={"More Information"} onClosePathname={routes.inventoryRoute.pathname} />
        </IonHeader>
        <BasePageContent>
          <NetworkErrorAlert />
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Brewery</IonCardSubtitle>
              <IonCardTitle>Beer name</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonTextarea />
            </IonCardContent>
          </IonCard>
          <SubmitButton onSubmit={() => {}} />
        </BasePageContent>
      </IonPage>
    </>
  );
};
