import { makeStyles } from "@material-ui/styles";
import { greyFont } from "../../Utils/Constants";

export const useEditableInputCardStyles = makeStyles({
  header: {
    fontSize: 18,
    fontWeight: "normal",
    color: greyFont,
  },
  input: {
    "--padding-top": "0px",
    fontSize: 28,
    color: "black",
    paddingTop: 0,
  },
});
