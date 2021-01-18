import * as beerActions from "./Store/Beer/Actions";
import * as breweriesActions from "./Store/Breweries/Actions";
import * as stylesActions from "./Store/Styles/Actions";
import * as domainsActions from "./Store/Domain/Actions";
import * as geographyActions from "./Store/Geography/Actions";
import * as commonActions from "./Store/Common/Actions";
import * as historyActions from "./Store/History/Actions";

import * as beerSelectors from "./Store/Beer/Selectors";
import * as breweriesSelectors from "./Store/Breweries/Selectors";
import * as geographySelectors from "./Store/Geography/Selectors";
import * as styleSelectors from "./Store/Styles/Selectors";

import { initialState as beerInitialState } from "./Store/Beer/Reducers";
import { initialState as breweriesInitialState } from "./Store/Breweries/Reducers";
import { initialState as commonInitialState } from "./Store/Common/Reducers";
import { initialState as domainInitialState } from "./Store/Domain/Reducers";
import { initialState as geographyInitialState } from "./Store/Geography/Reducers";
import { initialState as styleInitialState } from "./Store/Styles/Reducers";
import { initialState as historyInitialState } from "./Store/History/Reducers";

import { RootState } from "./Store/index";

export const actions = {
  ...beerActions,
  ...breweriesActions,
  ...stylesActions,
  ...domainsActions,
  ...geographyActions,
  ...commonActions,
  ...historyActions,
};

export const selectors = {
  ...beerSelectors,
  ...breweriesSelectors,
  ...geographySelectors,
  ...styleSelectors,
};

export const initialState: RootState = {
  beer: {
    ...beerInitialState,
  },
  breweries: {
    ...breweriesInitialState,
  },
  common: {
    ...commonInitialState,
  },
  domain: {
    ...domainInitialState,
  },
  geography: {
    ...geographyInitialState,
  },
  styles: {
    ...styleInitialState,
  },
  history: {
    ...historyInitialState,
  },
};
