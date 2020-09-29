import { breweryReducer } from "./Breweries/Reducers";
import { beerReducer } from "./Beer/Reducers";

import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  breweries: breweryReducer,
  beer: beerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
