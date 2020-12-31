import { Domains } from "../../../Interfaces";
import { DomainActionTypes, DomainState, actionTypes } from "./Types";

const initialState: DomainState = {
  domain: Domains.Beer,
};

export const domainReducer = (state = initialState, action: DomainActionTypes): DomainState => {
  switch (action.type) {
    case actionTypes.SET_DOMAIN:
      return {
        ...state,
        domain: action.domain,
      };
    default:
      return state;
  }
};
