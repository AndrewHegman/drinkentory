import React from "react";

import { setBreweryRoute, setStyleRoute, setBreweryCountryRoute } from "../../Utils/Routes";
import { withRouter, RouteComponentProps } from "react-router";
import { useCreateNewBreweryStyles } from "./CreateNewBrewery.styles";
import { SearchParams } from "../../Utils/Constants";
import * as queryString from "query-string";
import { BasePageWithInputCards } from "../../Components/BasePageWithInputCards/BasePageWithInputCards";
import { EditableInputCard } from "../../Components/EditableInputCard/EditableInputCard";
import { LinkInputCard } from "../../Components/LinkInputCard/LinkInputCard";

export interface CreateNewBreweryProps extends RouteComponentProps {}

const CreateNewBreweryComponent: React.FC<CreateNewBreweryProps & RouteComponentProps> = (props) => {
  const { history } = props;
  const searchParams = queryString.parse(history.location.search);
  const [name, setName] = React.useState<string>((searchParams[SearchParams.NewItemName] as string) || "");

  return (
    <BasePageWithInputCards
      title={"Create new Brewery"}
      history={history}
      closeRoute={{ pathname: setBreweryRoute.pathname, searchParamToDelete: SearchParams.BreweryName }}
    >
      <EditableInputCard
        title={"Brewery"}
        onChange={(event) => setName(event.detail.value || "")}
        onBlur={() => {
          searchParams[SearchParams.BreweryName] = name;
          history.push({
            search: `?${queryString.stringify(searchParams)}`,
          });
        }}
        value={name}
      />
      <LinkInputCard title={"Country"} pathname={setBreweryCountryRoute.pathname} search={history.location.search} />
      <LinkInputCard title={"City"} pathname={setBreweryCountryRoute.pathname} search={history.location.search} />
    </BasePageWithInputCards>
  );
};

export const CreateNewBrewery = withRouter(CreateNewBreweryComponent);
