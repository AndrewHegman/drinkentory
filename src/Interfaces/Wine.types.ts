export type WineDocument = {
  _id: string;
  name: string;
  producer: string;
  varietal: string;
  country: string;
  region: string;
  vintage: number;
  quantity: number;
  currentQuantity?: number;
};
