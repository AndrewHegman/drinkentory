export type HistoryDocument = {
  _id: string;
  beerId: string;
  changeAmt: number;
  date: Date;
};

export type HistoryData = {
  name: string;
  added: number;
  drank: number;
};
