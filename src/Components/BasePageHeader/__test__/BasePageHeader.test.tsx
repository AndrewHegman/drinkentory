import React from "react";
import { CloseButton } from "../../CloseButton";
import { BasePageHeader } from "../BasePageHeader";
import { shallow, ShallowWrapper } from "enzyme";
import { IonTitle } from "@ionic/react";

describe("BasePageHeader", () => {
  const title = "title";
  const onClosePathname = "path";
  const onCloseFn = jest.fn();

  const render = () => {
    return shallow(<BasePageHeader title={title} onClosePathname={onClosePathname} onClose={onCloseFn} />);
  };

  it("should have a title", () => {
    const wrapper = render();
    expect(wrapper.find(IonTitle).props().children).toBe(title);
  });

  describe("the close button", () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      wrapper = render();
    });

    it("should exist", () => {
      expect(wrapper.find(CloseButton).length).toBe(1);
    });

    it("should have the correct props", () => {
      const closeButtonProps = wrapper.find(CloseButton).props();
      expect(closeButtonProps.onClick).toBe(onCloseFn);
      expect(closeButtonProps.pathname).toBe(onClosePathname);
    });
  });
});
