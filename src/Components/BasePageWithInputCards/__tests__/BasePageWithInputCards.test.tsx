import React from "react";
import { BasePageWithInputCards, IBasePageWithInputCardsProps } from "../BasePageWithInputCards";
import { shallow, ShallowWrapper } from "enzyme";
import { IonButton, IonLoading } from "@ionic/react";
import { NetworkErrorAlert } from "../../Alerts";

describe("BasePageWithInputCards", () => {
  const defaultProps: IBasePageWithInputCardsProps = {
    title: "title",
    onClosePathname: "pathname",
    showSubmit: true,
  };
  const renderComponent = (props?: Partial<IBasePageWithInputCardsProps>) => {
    return shallow(<BasePageWithInputCards {...defaultProps} {...props} />);
  };

  describe("the network error alert", () => {
    let component: ShallowWrapper;
    beforeEach(() => {
      component = renderComponent();
    });

    it("should have a network error alert", () => {
      expect(component.find(NetworkErrorAlert).length).toBe(1);
    });
  });

  describe("the loading spinner component", () => {
    let component: ShallowWrapper;
    describe("when loadingSpinnerProps is null", () => {
      beforeEach(() => {
        component = renderComponent();
      });

      it("should not render a loading spinner under any conditions", () => {
        expect(component.find(IonLoading).length).toBe(0);
      });
    });

    describe("when loadingSpinnerProps is not null", () => {
      const message = "message";
      const show = true;
      beforeEach(() => {
        component = renderComponent({
          loadingSpinnerProps: {
            message,
            show,
          },
        });
      });
      it("render an IonLoading component", () => {
        expect(component.find(IonLoading).length).toBe(1);
      });

      it("should have the correct props", () => {
        const ionLoadingProps = component.find(IonLoading).props();

        expect(ionLoadingProps.spinner).toBe("lines");
        expect(ionLoadingProps.message).toBe(message);
        expect(ionLoadingProps.isOpen).toBe(show);
      });
    });
  });

  describe("the submit button component", () => {
    describe("when showSubmit is false", () => {
      let component: ShallowWrapper;
      beforeEach(() => {
        component = renderComponent({ showSubmit: false });
      });

      it("should not render the submit button", () => {
        expect(component.find(IonButton).length).toBe(0);
      });

      describe("when showSubmit is true", () => {
        const onSubmitClick = jest.fn();
        let component: ShallowWrapper;
        beforeEach(() => {
          component = renderComponent({ onSubmitClick });
        });

        it("should render the submit button", () => {
          expect(component.find(IonButton).length).toBe(1);
        });

        it("should use the onSubmitClick callback prop", () => {
          expect(component.find(IonButton).props().onClick).toBe(onSubmitClick);
        });
      });
    });
  });
});
