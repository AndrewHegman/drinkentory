import { shallow, ReactWrapper, ShallowWrapper } from "enzyme";
import React from "react";
import { IonAlert, AlertButton, AlertInput } from "@ionic/react";
import { QuantityAlert } from "../QuantityAlert";

fdescribe("QuantityAlert", () => {
  let wrapper: ShallowWrapper;
  const onSubmitFn = jest.fn();
  const onCancelFn = jest.fn();

  const render = (isOpen?: boolean) => {
    return shallow(<QuantityAlert onSubmit={onSubmitFn} onCancel={onCancelFn} isOpen={isOpen ?? true} />);
  };

  describe("opening the alert", () => {
    it("should not be open if isOpen is false", () => {
      wrapper = render(false);
      expect(wrapper.find(IonAlert).props().isOpen).toBeFalsy();
    });

    it("should open if isOpen is true", () => {
      wrapper = render(true);
      expect(wrapper.find(IonAlert).props().isOpen).toBeTruthy();
    });
  });

  describe("the buttons", () => {
    let submitButton: AlertButton;
    let cancelButton: AlertButton;

    beforeEach(() => {
      wrapper = render();
      const buttons = wrapper.find(IonAlert).props().buttons as AlertButton[];
      submitButton = buttons[0];
      cancelButton = buttons[1];
    });

    it("should call the onSubmit callback", () => {
      if (submitButton.handler) {
        submitButton.handler(1);
        expect(onSubmitFn).toHaveBeenCalled();
      } else {
        throw new Error("Submit button should have handler");
      }
    });

    it("should call the onSubmit callback", () => {
      if (cancelButton.handler) {
        cancelButton.handler(1);
        expect(onCancelFn).toHaveBeenCalled();
      } else {
        throw new Error("Cancel button should have handler");
      }
    });
  });

  describe("the input", () => {
    let input: AlertInput[];
    beforeEach(() => {
      wrapper = render();
      input = wrapper.find(IonAlert).props().inputs!;
    });

    it("should only have 1 input", () => {
      expect(input.length).toBe(1);
    });

    it("should be a number-type input", () => {
      expect(input[0].type).toBe("number");
    });
  });
});
