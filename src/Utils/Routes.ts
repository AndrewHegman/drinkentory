import React from "react";
import { Inventory } from "../Pages/Inventory";
import { NotFound } from "../Pages/NotFound";

export enum Domains {
  Beer = "beer",
  Wine = "wine",
}

export interface IRoute {
  to: string;
  exact: boolean;
  component: React.FC<any>;
  componentProps?: { [key: string]: any };
}

export const routes: IRoute[] = [
  {
    to: "/inventory",
    exact: false,
    component: Inventory,
    componentProps: { showAddModal: false },
  },
  {
    to: "/statistics",
    exact: false,
    component: Inventory,
  },
  // {
  //   to: "/*",
  //   component: NotFound,
  // },
];
