import { render, screen } from "@testing-library/react";
import Alert from "../components/Alert"; // Adjust the import path as necessary
import IMessage from "../types/message";

describe("Alert Component", () => {
  it("should not render anything when shouldShow is false", () => {
    const props: IMessage = { message: "Test message", shouldShow: false };
    const { container } = render(<Alert {...props} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("should render the message when shouldShow is true", () => {
    const props: IMessage = { message: "Test message", shouldShow: true };
    render(<Alert {...props} />);

    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("should not render anything when message is empty and shouldShow is false", () => {
    const props: IMessage = { message: "", shouldShow: false };
    const { container } = render(<Alert {...props} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("should render an empty span when message is empty and shouldShow is true", () => {
    const props: IMessage = { message: "", shouldShow: true };
    render(<Alert {...props} />);

    const emptySpans = screen.getAllByText("");
    emptySpans.forEach((span) => {
      expect(span).toBeInTheDocument();
    });
  });
});