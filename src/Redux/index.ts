import * as beerActions from "./Store/Beer/Actions";
import * as breweriesActions from "./Store/Breweries/Actions";
import * as stylesActions from "./Store/Styles/Actions";
import * as domainsActions from "./Store/Domain/Actions";
import * as geographyActions from "./Store/Geography/Actions";

import * as beerSelectors from "./Store/Beer/Selectors";
import * as breweriesSelectors from "./Store/Breweries/Selectors";
import * as geographySelectors from "./Store/Geography/Selectors";
import * as styleSelectors from "./Store/Styles/Selectors";

export const actions = { ...beerActions, ...breweriesActions, ...stylesActions, ...domainsActions, ...geographyActions };

export const selectors = { ...beerSelectors, ...breweriesSelectors, ...geographySelectors, ...styleSelectors };
