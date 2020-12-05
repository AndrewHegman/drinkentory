import { breweryReducer } from "./Breweries/Reducers";
import { beerReducer } from "./Beer/Reducers";
import { styleReducer } from "./Styles/Reducers";
import { domainReducer } from "./Domain/Reducers";
import { geographyReducer } from "./Geography/Reducers";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  breweries: breweryReducer,
  beer: beerReducer,
  style: styleReducer,
  domain: domainReducer,
  geography: geographyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
