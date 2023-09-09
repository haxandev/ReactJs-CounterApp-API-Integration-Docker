import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  it("renders the button with text", () => {
    render(
      <Button text="Click me" backgroundColor="blue" onClick={() => {}} />
    );

    const buttonText = screen.getByText(/Click me/i);
    expect(buttonText).toBeInTheDocument();
  });

  it("executes the onClick function when clicked", () => {
    const onClickMock = jest.fn();
    render(
      <Button text="Click me" backgroundColor="blue" onClick={onClickMock} />
    );

    const button = screen.getByText(/Click me/i);
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });
});
