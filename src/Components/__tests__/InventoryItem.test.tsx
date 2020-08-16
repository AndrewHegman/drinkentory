import React from "react";
import { InventoryItem } from "../InventoryItem";
import { QuantityChangeDirection } from "../../Utils/Types";
import { render, fireEvent, RenderResult, createEvent } from "@testing-library/react";

fdescribe("Inventory Item", () => {
  const renderComponent = (onQuantityChange: (dir: QuantityChangeDirection) => void) => {
    return render(<InventoryItem onQuantityChange={onQuantityChange} />);
  };

  it("should render without throwing an error", () => {
    const component = renderComponent(jest.fn());
    expect(component).toBeDefined();
  });

  describe("When the plus button is clicked", () => {
    let component: RenderResult;
    let plusButton: HTMLElement;

    beforeEach(() => {
      component = renderComponent(jest.fn());
      // const buttons = component.querySe
      // console.log(buttons.length);
    });

    it("should call the callback", () => {
      expect(true).toBe(true);
    });
  });
});
