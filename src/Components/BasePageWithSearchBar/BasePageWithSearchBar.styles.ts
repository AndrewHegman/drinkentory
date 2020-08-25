import { makeStyles } from "@material-ui/styles";

export const useBasePageWithSearchBarStyles = makeStyles({
  root: {
    "--background": "lightgrey",
  },
  bottomNavigation: {
    flex: "1 1 auto",
    justifyContent: "flex-end",
  },
});
