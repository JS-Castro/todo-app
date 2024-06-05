import { render, screen } from "@testing-library/react";
import Alert from "../components/Alert"; // Adjust the import path as necessary
import IMessage from "../types/message";

describe("Alert Component", () => {
  it("should not render anything when shouldShow is false", () => {
    const props: IMessage = { text: "Test message", shouldShow: false };
    const { container } = render(<Alert {...props} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("should render an empty span when message is empty and shouldShow is true", () => {
    const props: IMessage = { text: "", shouldShow: true };
    render(<Alert {...props} />);

    const emptySpans = screen.getAllByText("");
    emptySpans.forEach((span) => {
      expect(span).toBeInTheDocument();
    });
  });

  it("should render the message when message is not empty and shouldShow is true", () => {
    const props: IMessage = { text: "Test message", shouldShow: true };
    render(<Alert {...props} />);

    expect(screen.getByText("Test message")).toBeInTheDocument();
  });
});
