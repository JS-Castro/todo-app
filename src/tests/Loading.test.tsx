import { render, screen } from "@testing-library/react";
import Loading from "../components/Loading";

describe("Loading", () => {
  it("should render loading text", () => {
    render(<Loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
