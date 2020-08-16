import React, { Component } from "react";
import { render, fireEvent, RenderResult, createEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Domains } from "../../Utils/Routes";
import { BasePage } from "../BasePage";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("BasePage", () => {
  const renderComponent = (children?: React.ReactNode) => {
    const history = createMemoryHistory();
    return render(
      <Router history={history}>
        <BasePage>{children}</BasePage>
      </Router>
    );
  };

  it("should render without throwing an error", () => {
    const component = renderComponent();
    expect(component).toBeDefined();
  });

  describe("When the query parameter for domain", () => {
    describe("Is not defined", () => {
      beforeEach(() => {
        //eslint-disable-next-line no-restricted-globals
        history.replaceState({}, "", "?domain=");
        renderComponent();
      });
      it(`should default the domain to ${Domains.Beer}`, () => {
        expect(mockHistoryPush).toHaveBeenCalledWith({
          search: `?domain=${Domains.Beer}`,
        });
      });
    });
    describe("Is not a valid value", () => {
      beforeEach(() => {
        //eslint-disable-next-line no-restricted-globals
        history.replaceState({}, "", "?domain=foo");
        renderComponent();
      });
      it(`should default the domain to ${Domains.Beer}`, () => {
        expect(mockHistoryPush).toHaveBeenCalledWith({
          search: `?domain=${Domains.Beer}`,
        });
      });
    });
  });

  xdescribe("The segment buttons", () => {
    let component: RenderResult;
    let beerSegment: HTMLElement;
    let wineSegment: any;

    beforeEach(() => {
      component = renderComponent();

      beerSegment = component.getByTitle(Domains.Beer);
      wineSegment = component.getByText("Wine").closest("ion-segment-button");
    });

    // Segment buttons don't emit click events, need to fix this
    describe("When the domain is beer", () => {
      beforeEach(() => {
        beerSegment && fireEvent.click(beerSegment);
      });

      it("should change the query when clicked", () => {
        expect(mockHistoryPush).toHaveBeenCalledWith({
          search: `?domain=${Domains.Beer}`,
        });
      });
    });

    describe("When the domain is wine", () => {
      beforeEach(async () => {
        beerSegment && fireEvent.click(beerSegment);
      });

      it("should change the query when clicked", () => {
        expect(mockHistoryPush).toHaveBeenCalledWith({
          search: `?domain=${Domains.Wine}`,
        });
      });
    });
  });

  describe("The children", () => {
    const childElementId = "child-id";
    let component: RenderResult;

    beforeEach(() => {
      component = renderComponent(<div data-testid={childElementId} />);
    });

    it("should be rendered properly", () => {
      expect(component.getByTestId(childElementId)).toBeDefined();
    });
  });
});
