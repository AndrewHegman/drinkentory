import { StyleDocument } from "../../../Interfaces";
import { RootState } from "../index";

export const styles = {
  byId: (state: RootState, id: string): StyleDocument | undefined => state.style.styles.find((style) => style._id === id),
};
