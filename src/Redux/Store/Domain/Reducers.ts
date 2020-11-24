import { Domain } from "domain";
import { DOMAttributes } from "react";
import { Domains } from "../../../Interfaces";
import { DomainActionTypes, DomainState, SET_DOMAIN } from "./Types";

const initialState: DomainState = {
  domain: Domains.Beer,
};

export const domainReducer = (state = initialState, action: DomainActionTypes): DomainState => {
  switch (action.type) {
    case SET_DOMAIN:
      return {
        ...state,
        domain: action.domain,
      };
    default:
      return state;
  }
};
