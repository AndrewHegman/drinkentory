require("dotenv");

const useDevModeOverride = false;
const devModeOverride = process.env.REACT_APP_IS_PROD === "false" && useDevModeOverride;

export const features = {
  // TODO (5)
  // Allow the user to specify/create base- and sub-styles
  baseStyle: false || devModeOverride,

  // TODO (2)
  // Allow the user to filter the inventory by style, brewery, etc
  inventoryFilters: false || devModeOverride,

  // TODO (2)
  // Allow the user to search the current inventory
  inventorySearchbar: true || devModeOverride,

  // TODO (3)
  // Allow the user to switch between beer and wine domain
  domainSwitching: false || devModeOverride,
};
