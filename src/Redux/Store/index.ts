import { breweryReducer } from "./Breweries/Reducers";
import { beerReducer } from "./Beer/Reducers";
import { styleReducer } from "./Styles/Reducers";
import { domainReducer } from "./Domain/Reducers";
import { geographyReducer } from "./Geography/Reducers";
import { commonReducer } from "./Common/Reducers";
import { combineReducers } from "redux";
export const rootReducer = combineReducers({
  breweries: breweryReducer,
  beer: beerReducer,
  styles: styleReducer,
  domain: domainReducer,
  geography: geographyReducer,
  common: commonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
