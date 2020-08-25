import { makeStyles } from "@material-ui/styles";

export const useCreateNewItemStyles = makeStyles({
  root: {
    "--background": "lightgrey",
  },
  label: {
    color: "black",
    fontSize: "28px",
    fontWeight: 700,
  },
  bottomNavigation: {
    flex: "1 1 auto",
    justifyContent: "flex-end",
  },
});
