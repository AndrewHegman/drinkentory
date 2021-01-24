export type StyleDocument = {
  _id: string;
  name: string;
  baseStyle: string;
};

export type AddStyleDto = {
  name: string;
  baseStyle: string;
};

export type StyleData = {
  name: string;
  value: number;
};
