import { Domains } from "../../../Interfaces";

export const actionTypes = {
  SET_DOMAIN: "SET_DOMAIN",
} as const;

export interface DomainState {
  domain: Domains;
}

export const DomainActions = {
  setDomain: (domain: Domains) => ({
    type: actionTypes.SET_DOMAIN,
    domain,
  }),
};

export type DomainActionTypes = ReturnType<typeof DomainActions.setDomain>;
