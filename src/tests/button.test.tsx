import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../components/Button";

describe("Button", () => {
  it("should render button with provided text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("should render button with custom class name", () => {
    render(<Button className="custom-button">Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toHaveClass("custom-button");
  });

  it("should call onClick function when button is clicked", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });
});
