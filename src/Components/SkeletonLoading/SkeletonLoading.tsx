import React from "react";
import { IonItem, IonLabel, IonSkeletonText, IonAvatar, IonList } from "@ionic/react";

interface ISkeletonLoadingProps {
  length?: number;
}

export const SkeletonLoading: React.FC<ISkeletonLoadingProps> = ({ length }) => {
  return (
    <IonList id="skeleton">
      {new Array(length || 8).fill(0).map((_, idx) => (
        <IonItem key={idx}>
          <IonAvatar slot="start">
            <IonSkeletonText animated />
          </IonAvatar>
          <IonLabel>
            <h3>
              <IonSkeletonText animated style={{ width: "50%" }} />
            </h3>
            <p>
              <IonSkeletonText animated style={{ width: "80%" }} />
            </p>
            <p>
              <IonSkeletonText animated style={{ width: "60%" }} />
            </p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};
