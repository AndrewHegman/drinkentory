import { makeStyles } from "@material-ui/styles";

export const useBasePageStyles = makeStyles({
  root: {
    display: "flex",
  },
  bottomNavigation: {
    flex: "1 1 auto",
    justifyContent: "flex-end",
  },
  settingsPopoverToggle: {
    cursor: "pointer",
    fontSize: "xx-large",
  },
});
