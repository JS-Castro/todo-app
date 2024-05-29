import { render, screen, fireEvent } from "@testing-library/react";
import EditTodo from "../components/EditTodo";

describe("EditTodo", () => {
  it("should render input field and save button", () => {
    render(<EditTodo handleSave={() => {}} editValue="" setEditValue={() => {}} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("should update input value when typing", () => {
    render(<EditTodo handleSave={() => {}} editValue="Test Edit Value" setEditValue={() => {}} />);

    const inputField = screen.getByRole("textbox");
    fireEvent.change(inputField, { target: { value: "Test Edit Value" } });

    expect(inputField).toHaveValue("Test Edit Value");
  });

  it("should call handleSave function when save button is clicked", () => {
    const mockHandleSave = jest.fn();

    render(
      <EditTodo handleSave={mockHandleSave} editValue="Initial Value" setEditValue={() => {}} />
    );

    const saveButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveButton);

    expect(mockHandleSave).toHaveBeenCalled();
  });
});
