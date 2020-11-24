import { SET_DOMAIN, DomainActionTypes } from "./Types";
import { Domains } from "../../../Interfaces";

export const setDomain = (domain: Domains): DomainActionTypes => {
  return {
    type: SET_DOMAIN,
    domain,
  };
};
