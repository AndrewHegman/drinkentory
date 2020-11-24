import Axios from "axios";
import { Beer } from "../Interfaces";

export const fetchAllBeer = (expandFields?: [keyof Beer]) => {
  return Axios.get(`http://localhost:3002/v1/beer${expandFields ? `?expand=${expandFields.join(",")}` : ""}`).then((res) => res.data);
};
