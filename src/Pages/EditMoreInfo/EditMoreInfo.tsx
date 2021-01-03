import React from "react";
import { BasePageTextEditor } from "../../Components/BasePageTextEditor";
import { NetworkErrorAlert } from "../../Components/Alerts";
import { routes } from "../../Utils";

export interface IEditMoreInfoProps {}

export const EditMoreInfo: React.FC<IEditMoreInfoProps> = (props) => {
  return (
    <>
      <BasePageTextEditor title={"Edit more information"} onClosePathname={routes.inventoryRoute.pathname}>
        <NetworkErrorAlert />
      </BasePageTextEditor>
    </>
  );
};
