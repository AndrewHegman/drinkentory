import React from "react";
import { BasePageWithInputCards, IBasePageWithInputCardsProps } from "./BasePageWithInputCards";
import { mount, ReactWrapper } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import { CloseButton } from "../CloseButton/CloseButton";
import { LinkInputCard } from "../LinkInputCard/LinkInputCard";

fdescribe("BasePageWithInputCards", () => {
  const renderComponent = (props: IBasePageWithInputCardsProps) => {
    return mount(
      <BrowserRouter>
        <BasePageWithInputCards {...props}>
          <LinkInputCard title={"Country"} pathname={"foo"} />
        </BasePageWithInputCards>
      </BrowserRouter>
    );
  };

  it("should render the component without errors", () => {
    const component = renderComponent({ title: "foo", onClosePathname: "bar" });
    expect(component.find(BasePageWithInputCards).length).toBe(1);
  });

  // Are these really necessary?
  xdescribe("the CloseButton component", () => {
    const props: IBasePageWithInputCardsProps = {
      title: "foo",
      onClosePathname: "bar"
    };
    let component: ReactWrapper;
    beforeEach(() => {
      component = renderComponent(props);
    });

    it("should render a CloseButton component", () => {
      expect(component.find(CloseButton).length).toBe(1);
    });

    it("should set the onClosePathname prop", () => {
      expect(component.find(CloseButton).prop("onClosePathname")).toBe(props.onClosePathname);
    });
  });
});
