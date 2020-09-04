import React from "react";
import { Inventory } from "../Pages/Inventory";
import { NotFound } from "../Pages/NotFound";
import { AddNewItem } from "../Pages/AddNewItem";
import { CreateNewItem } from "../Pages/CreateNewItem";
import { SetBrewery } from "../Pages/SetBrewery";
import { CreateNewBrewery } from "../Pages/CreateNewBrewery";
import { SetBreweryCountry } from "../Pages/SetBreweryCountry";
import { SetStyle } from "../Pages/SetStyle";

export enum Domains {
  Beer = "beer",
  Wine = "wine",
}

export interface IRoute {
  pathname: string;
  exact: boolean;
  component: React.FC<any> | React.ComponentClass<any>;
  componentProps?: { [key: string]: any };
}

export const inventoryRoute: IRoute = {
  pathname: "/inventory",
  exact: true,
  component: Inventory,
};

export const statisticsRoute: IRoute = {
  pathname: "/statistics",
  exact: false,
  component: Inventory,
};

export const addNewItemRoute: IRoute = {
  pathname: "/inventory/add",
  exact: true,
  component: AddNewItem,
};

export const createNewItemRoute: IRoute = {
  pathname: "/inventory/create",
  exact: true,
  component: CreateNewItem,
};

export const setBreweryRoute: IRoute = {
  pathname: "/inventory/create/setbrewery",
  exact: true,
  component: SetBrewery,
};

export const createNewBreweryRoute: IRoute = {
  pathname: "/inventory/create/brewery",
  exact: true,
  component: CreateNewBrewery,
};

export const setBreweryCountryRoute: IRoute = {
  pathname: "/inventory/create/brewery/setcountry",
  exact: true,
  component: SetBreweryCountry,
};

export const setStyleRoute: IRoute = {
  pathname: "/inventory/create/setstyle",
  exact: true,
  component: SetStyle,
};

export const routes: IRoute[] = [
  inventoryRoute,
  statisticsRoute,
  addNewItemRoute,
  createNewItemRoute,
  createNewBreweryRoute,
  setBreweryRoute,
  setBreweryCountryRoute,
  setStyleRoute,
];
