import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import React from "react";
import { NetworkErrorAlert, INetworkErrorAlertProps } from "../NetworkErrorAlert";
import createMockStore from "redux-mock-store";
import { IonAlert, AlertButton } from "@ionic/react";
import { Provider } from "react-redux";
import { RootState } from "../../../Redux/Store/index";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { initialState } from "../../../Redux";
import { actionTypes as CommonActionTypes } from "../../../Redux/Store/Common/Types";

type DispatchExts = ThunkDispatch<RootState, {}, AnyAction>;

const mockStore = createMockStore<RootState, DispatchExts>([thunk]);

fdescribe("NetworkErrorAlert", () => {
  let store;
  let wrapper: ReactWrapper;
  const origIsProd = process.env.REACT_APP_IS_PROD;

  const render = (props?: Partial<INetworkErrorAlertProps>) => {
    store = mockStore({ ...initialState, common: { ...initialState.common, ...props } });
    return mount(
      <Provider store={store}>
        <NetworkErrorAlert />
      </Provider>
    );
  };

  afterEach(() => {
    store.clearActions();
  });

  describe("when there is no network error", () => {
    beforeEach(() => {
      wrapper = render({
        isNetworkError: false,
      });
    });

    it("the alert should not be open", () => {
      expect(wrapper.find(IonAlert).props()["isOpen"]).toBeFalsy();
    });
  });

  describe("when there is a network error", () => {
    it("the alert should not be open", () => {
      wrapper = render({
        isNetworkError: true,
        networkErrorMessage: "foo",
      });

      expect(wrapper.find(IonAlert).props().isOpen).toBeTruthy();
    });

    describe("when in dev mode", () => {
      beforeEach(() => {
        process.env.REACT_APP_IS_PROD = "false";
        wrapper = render({
          isNetworkError: true,
          networkErrorMessage: "foo",
        });
      });

      afterEach(() => {
        process.env.REACT_APP_IS_PROD = origIsProd;
      });

      it("should display the full error message", () => {
        expect(wrapper.find(IonAlert).props().message).toBe("foo");
      });

      describe("the buttons", () => {
        let buttons: AlertButton[];
        beforeEach(() => {
          buttons = wrapper.find(IonAlert).props().buttons as AlertButton[];
        });

        it("should show the correct number of buttons", () => {
          expect(buttons.length).toBe(1);
        });

        it("should dispatch the clearNetworkError action when clicked", () => {
          buttons[0].handler(null);
          const actions = store.getActions();
          expect(actions.length).toBe(1);
          expect(actions[0].type).toEqual(CommonActionTypes.CLEAR_NETWORK_ERROR);
        });
      });
    });
    describe("when in prod mode", () => {
      beforeEach(() => {
        process.env.REACT_APP_IS_PROD = "true";
        wrapper = render({
          isNetworkError: true,
          networkErrorMessage: "foo",
        });
      });

      afterEach(() => {
        process.env.REACT_APP_IS_PROD = origIsProd;
      });

      it("should not display the full error message", () => {
        expect(wrapper.find(IonAlert).props().message).toBe("A network error occurred!");
      });

      describe("the buttons", () => {
        let buttons: AlertButton[];
        beforeEach(() => {
          buttons = wrapper.find(IonAlert).props().buttons as AlertButton[];
        });

        it("should show the correct number of buttons", () => {
          expect(buttons.length).toBe(2);
        });

        it("should dispatch the clearNetworkError action when the 'OK' button is clicked", () => {
          buttons[0].handler(null);
          const actions = store.getActions();
          expect(actions.length).toBe(1);
          expect(actions[0].type).toEqual(CommonActionTypes.CLEAR_NETWORK_ERROR);
        });

        // Test not working because ref is undefined
        xit("should change the message to the full error when the 'More Info' button is clicked", () => {
          buttons[1].handler(null);
          expect(wrapper.find(IonAlert).props().message).toBe("foo");
        });
      });
    });
  });
});
