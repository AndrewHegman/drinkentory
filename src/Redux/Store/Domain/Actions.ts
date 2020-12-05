import { actionTypes, DomainActions, DomainActionTypes } from "./Types";
import { Domains } from "../../../Interfaces";

export const domain = {
  setDomain: (domain: Domains): DomainActionTypes => {
    return DomainActions.setDomain(domain);
  },
} as const;
