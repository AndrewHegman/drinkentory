import { HistoryDocument, HistoryData } from "../../Interfaces";

const getShortDate = (date: Date) => {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const getHistoryData = (data: HistoryDocument[]) => {
  return data.reduce((arr: HistoryData[], item) => {
    const idx = arr.findIndex((x) => x.name === getShortDate(new Date(item.date)));
    if (idx < 0) {
      arr.push({
        name: getShortDate(new Date(item.date)),
        added: item.changeAmt > 0 ? item.changeAmt : 0,
        drank: item.changeAmt < 0 ? Math.abs(item.changeAmt) : 0,
      });
    } else {
      if (item.changeAmt > 0) {
        arr[idx].added += item.changeAmt;
      } else {
        arr[idx].drank += Math.abs(item.changeAmt);
      }
    }

    return arr;
  }, []);
};
