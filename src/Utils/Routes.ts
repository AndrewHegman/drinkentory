import React from "react";
import { Inventory } from "../Pages/Inventory";
import { NotFound } from "../Pages/NotFound";
import { AddNewItem } from "../Pages/AddNewItem";
import { CreateNewItem } from "../Pages/CreateNewItem";
import { SetBrewery } from "../Pages/SetBrewery";
import { CreateNewBrewery } from "../Pages/CreateNewBrewery";
import { SetBreweryCountry } from "../Pages/SetBreweryCountry";
import { SetStyle } from "../Pages/SetStyle";

export interface IRoute {
  pathname: string;
  exact: boolean;
  component: React.FC<any> | React.ComponentClass<any>;
  componentProps?: { [key: string]: any };
}

export const routes: { [key: string]: IRoute } = {
  inventoryRoute: {
    pathname: "/inventory",
    exact: true,
    component: Inventory,
  },

  statisticsRoute: {
    pathname: "/statistics",
    exact: false,
    component: Inventory,
  },

  addNewItemRoute: {
    pathname: "/inventory/add",
    exact: true,
    component: AddNewItem,
  },

  createNewItemRoute: {
    pathname: "/inventory/create",
    exact: true,
    component: CreateNewItem,
  },

  setBreweryRoute: {
    pathname: "/inventory/create/setbrewery",
    exact: true,
    component: SetBrewery,
  },

  createNewBreweryRoute: {
    pathname: "/inventory/create/brewery",
    exact: true,
    component: CreateNewBrewery,
  },

  setBreweryCountryRoute: {
    pathname: "/inventory/create/brewery/setcountry",
    exact: true,
    component: SetBreweryCountry,
  },

  setStyleRoute: {
    pathname: "/inventory/create/setstyle",
    exact: true,
    component: SetStyle,
  },
};
