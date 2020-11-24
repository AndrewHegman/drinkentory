import Axios from "axios";
import { Brewery } from "../Interfaces";

export const fetchAllBreweries = (expandFields?: [keyof Brewery]): Promise<Brewery[]> => {
  return Axios.get(`http://localhost:3002/v1/brewery${expandFields ? `?expand=${expandFields.join(",")}` : ""}`).then((res) => res.data);
};
