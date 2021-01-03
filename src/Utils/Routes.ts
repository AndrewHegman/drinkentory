import React from "react";
import { Inventory } from "../Pages/Inventory";
import { AddNewItem } from "../Pages/AddNewItem";
import { CreateNewItem } from "../Pages/CreateNewItem";
import { SetBrewery } from "../Pages/SetBrewery";
import { CreateNewBrewery } from "../Pages/CreateNewBrewery";
import { SetBreweryPlace } from "../Pages/SetBreweryPlace";
import { SetStyle } from "../Pages/SetStyle";
import { CreateNewStyle } from "../Pages/CreateNewStyle";
import { SetBaseStyle } from "../Pages/SetBaseStyle";
import { Statistics } from "../Pages/Statistics";
import { EditMoreInfo } from "../Pages/EditMoreInfo";
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
    exact: true,
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

  setBreweryPlaceRoute: {
    pathname: "/inventory/create/brewery/setplace",
    exact: true,
    component: SetBreweryPlace,
  },

  setStyleRoute: {
    pathname: "/inventory/create/setstyle",
    exact: true,
    component: SetStyle,
  },

  createNewStyleRoute: {
    pathname: "/inventory/create/style",
    exact: true,
    component: CreateNewStyle,
  },

  setBaseStyleRoute: {
    pathname: "/inventory/create/style/setbasestyle",
    exact: true,
    component: SetBaseStyle,
  },

  editMoreInfo: {
    pathname: "/editinfo",
    exact: true,
    component: EditMoreInfo,
  },
};
