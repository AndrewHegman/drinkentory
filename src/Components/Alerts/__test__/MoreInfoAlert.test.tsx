import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { IonAlert, AlertButton, AlertInput } from "@ionic/react";
import { MoreInfoAlert, IMoreInfoAlertProps } from "../MoreInfoAlert";

describe("MoreInfoAlert", () => {
  let wrapper: ShallowWrapper;
  const onCloseFn = jest.fn();
  const onEditFn = jest.fn();

  const render = (props?: Partial<IMoreInfoAlertProps>) => {
    return shallow(<MoreInfoAlert onClose={onCloseFn} onEdit={onEditFn} message={props.message ?? "foo"} isOpen={props.isOpen ?? true} />);
  };

  describe("opening the alert", () => {
    it("should not be open if isOpen is false", () => {
      wrapper = render({ isOpen: false });
      expect(wrapper.find(IonAlert).props().isOpen).toBeFalsy();
    });

    it("should open if isOpen is true", () => {
      wrapper = render({ isOpen: true });
      expect(wrapper.find(IonAlert).props().isOpen).toBeTruthy();
    });
  });

  describe("the buttons", () => {
    let closeButton: AlertButton;
    let editButton: AlertButton;

    beforeEach(() => {
      wrapper = render();
      const buttons = wrapper.find(IonAlert).props().buttons as AlertButton[];
      closeButton = buttons[0];
      editButton = buttons[1];
    });

    it("should call the onSubmit callback", () => {
      if (closeButton.handler) {
        closeButton.handler(1);
        expect(onCloseFn).toHaveBeenCalled();
      } else {
        throw new Error("Submit button should have handler");
      }
    });

    it("should call the onSubmit callback", () => {
      if (editButton.handler) {
        editButton.handler(1);
        expect(onEditFn).toHaveBeenCalled();
      } else {
        throw new Error("Cancel button should have handler");
      }
    });
  });
});
