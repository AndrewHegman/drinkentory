import React from "react";

import { addNewItemRoute, setBreweryRoute, setStyleRoute } from "../../Utils/Routes";
import { withRouter, RouteComponentProps } from "react-router";
import { SearchParams } from "../../Utils/Constants";
import * as queryString from "query-string";
import { BasePageWithInputCards } from "../../Components/BasePageWithInputCards/BasePageWithInputCards";
import { EditableInputCard } from "../../Components/EditableInputCard/EditableInputCard";
import { LinkInputCard } from "../../Components/LinkInputCard/LinkInputCard";

export interface CreateNewItemProps {}

const CreateNewItemComponent: React.FC<CreateNewItemProps & RouteComponentProps> = (props) => {
  const { location, history } = props;
  const searchParams = queryString.parse(location.search);
  const [name, setName] = React.useState<string>((searchParams[SearchParams.NewItemName] as string) || "");

  return (
    <BasePageWithInputCards title={"Create new Beer"} closeRoute={{ pathname: addNewItemRoute.pathname }} history={history}>
      <EditableInputCard
        title={"Beer"}
        onChange={(event) => setName(event.detail.value || "")}
        onBlur={() => {
          searchParams[SearchParams.NewItemName] = name;
          history.push({
            search: `?${queryString.stringify(searchParams)}`,
          });
        }}
        value={name}
      />
      <LinkInputCard title={"Brewery"} pathname={setBreweryRoute.pathname} search={history.location.search} />
      <LinkInputCard title={"Style"} pathname={setStyleRoute.pathname} search={history.location.search} />
    </BasePageWithInputCards>
  );
};

export const CreateNewItem = withRouter(CreateNewItemComponent);
