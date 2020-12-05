import Axios from "axios";
import { BeerDocument } from "../Interfaces";

export const fetchAllBeer = (expandFields?: [keyof BeerDocument]) => {
  return Axios.get(`http://localhost:3002/v1/beer${expandFields ? `?expand=${expandFields.join(",")}` : ""}`).then((res) => res.data);
};
