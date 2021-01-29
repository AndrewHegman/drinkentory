import { makeStyles } from "@material-ui/styles";

export const useInventoryStyles = makeStyles({
  headerContentContainer: {
    display: "flex",
    backgroundColor: "white",
  },
  searchbar: {
    flex: "1 1 auto",
    justifyContent: "flex-end",
  },
  addItemIcon: {
    fontSize: "xxx-large",
    cursor: "pointer",
  },
  addItemLink: {
    color: "rgb(66, 66, 66)",
  },
  filterIcon: {
    fontSize: "xxx-large",
    cursor: "pointer",
  },
  totalInventoryCountRow: {
    "--background": "lightgrey",
    textAlign: "center",
  },
});
