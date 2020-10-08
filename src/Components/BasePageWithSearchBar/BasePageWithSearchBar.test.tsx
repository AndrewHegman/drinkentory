import React from "react";
import { BasePageWithSearchBar, IBasePageWithSearchBarProps } from "./BasePageWithSearchBar";
import { mount, ReactWrapper } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import { LinkInputCard } from "../LinkInputCard/LinkInputCard";

fdescribe("BasePageWithInputCards", () => {
  const renderComponent = (props: IBasePageWithSearchBarProps) => {
    return mount(
      <BrowserRouter>
        <BasePageWithSearchBar {...props}>
          <LinkInputCard title={"Country"} pathname={"foo"} />
        </BasePageWithSearchBar>
      </BrowserRouter>
    );
  };

  it("should render the component without errors", () => {
    const component = renderComponent({ title: "foo", pathname: "bar", items: ["item1", "item2"] });
    expect(component.find(BasePageWithSearchBar).length).toBe(1);
  });
});
