import { Domains } from "../../../Interfaces";

export const SET_DOMAIN = "SET_DOMAIN";

export interface DomainState {
  domain: Domains;
}

interface SetDomain {
  type: typeof SET_DOMAIN;
  domain: Domains;
}

export type DomainActionTypes = SetDomain;
