import { list, map, codeWorking } from "ionicons/icons";

type Tab = {
  tabId: string;
  href: string;
  icon: string;
  name: string;
};

export const tabs: Tab[] = [
  {
    tabId: "inventory",
    href: "/inventory",
    icon: list,
    name: "Inventory"
  },
  {
    tabId: "statistics",
    href: "/statistics",
    icon: map,
    name: "Statistics"
  },
  {
    tabId: "developers",
    href: "/developers",
    icon: codeWorking,
    name: "Developers"
  }
];
