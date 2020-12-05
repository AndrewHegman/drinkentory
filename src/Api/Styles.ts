import Axios from "axios";
import { StyleDocument } from "../Interfaces";

export const fetchAllStyles = (expandFields?: [keyof StyleDocument]): Promise<StyleDocument[]> => {
  return Axios.get(`http://localhost:3002/v1/style${expandFields ? `?expand=${expandFields.join(",")}` : ""}`).then((res) => res.data);
};
