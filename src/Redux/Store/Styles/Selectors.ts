import { StyleDocument } from "../../../Interfaces";
import { RootState } from "../index";

export const styles = {
  byId: (state: RootState, id: string): StyleDocument | undefined => state.styles.styles.find((style) => style._id === id),
  getAllBaseStyles: (state: RootState): (StyleDocument | undefined)[] =>
    state.styles.styles
      .filter((style) => style.baseStyle === style._id)
      .map((baseStyle) => state.styles.styles.find((_style) => _style._id === baseStyle._id)),
};
