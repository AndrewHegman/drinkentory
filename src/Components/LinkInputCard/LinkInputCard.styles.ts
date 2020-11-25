import { makeStyles } from "@material-ui/styles";
import { greyFont } from "../../Utils/Constants";

export const useLinkInputCardStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
  header: {
    fontSize: 18,
    fontWeight: "normal",
    color: greyFont,
  },
  content: {
    fontSize: 28,
    color: "black",
    paddingTop: 0,
  },
});
