import Axios from "axios";
import { BreweryDocument } from "../Interfaces";

export const fetchAllBreweries = (expandFields?: [keyof BreweryDocument]): Promise<BreweryDocument[]> => {
  return Axios.get(`http://localhost:3002/v1/brewery${expandFields ? `?expand=${expandFields.join(",")}` : ""}`).then((res) => res.data);
};
