import React from "react";
import { BasePageWithSearchBar, BasePageWithSearchBarProps } from "../BasePageWithSearchBar";
import { shallow, ShallowWrapper } from "enzyme";
import { ClickableIonItem } from "../../ClickableIonItem";

fdescribe("BasePageWithInputCards", () => {
  const defaultProps: BasePageWithSearchBarProps = {
    title: "title",
    onClosePathname: "pathname",
  };
  const renderComponent = (props?: BasePageWithSearchBarProps) => {
    return shallow(<BasePageWithSearchBar {...defaultProps} {...props} />);
  };

  describe("the not found link", () => {
    let wrapper: ShallowWrapper;

    describe("when showNotFound is false", () => {
      beforeEach(() => {
        wrapper = renderComponent({ ...defaultProps, notFoundRoute: { pathname: "foo" }, showNotFound: false });
      });
      it("should not show the not found link", () => {
        expect(wrapper.find(ClickableIonItem).length).toBe(0);
      });
    });
  });
});
