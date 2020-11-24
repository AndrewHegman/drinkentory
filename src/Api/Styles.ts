import Axios from "axios";
import { Style } from "../Interfaces";

export const fetchAllStyles = (expandFields?: [keyof Style]): Promise<Style[]> => {
  return Axios.get(`http://localhost:3002/v1/style${expandFields ? `?expand=${expandFields.join(",")}` : ""}`).then((res) => res.data);
};
