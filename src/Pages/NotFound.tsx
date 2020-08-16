import React from "react";
import { BasePage } from "../Components/BasePage";

export interface INotFound {}

export const NotFound: React.FC<INotFound> = (props: INotFound) => {
  return (
    <BasePage>
      <div>Maybe you've had too much to drink because looks like you are lost!!</div>
    </BasePage>
  );
};
