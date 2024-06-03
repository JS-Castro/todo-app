import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "../components/TodoItem";

describe("TodoItem", () => {
  const mockHandleDelete = jest.fn();
  const mockHandleEdit = jest.fn();
  const mockHandleToggleEditMode = jest.fn();

  const renderTodoItem = (editable = false) => {
    return render(
      <TodoItem
        id="1"
        value="Test Todo"
        editable={editable}
        handleDelete={mockHandleDelete}
        handleEdit={mockHandleEdit}
        handleToggleEditMode={mockHandleToggleEditMode}
        isLoading={false}
      />
    );
  };

  it("should render todo item in non-editable mode", () => {
    renderTodoItem(false);
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("should render todo item in editable mode", () => {
    renderTodoItem(true);
    const editInput = screen.getByRole("textbox");
    expect(editInput).toBeInTheDocument();
    expect(editInput).toHaveValue("Test Todo");
    expect(screen.queryByText("Test Todo")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("should call handleDelete when delete button is clicked", () => {
    renderTodoItem();
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(deleteButton);
    expect(mockHandleDelete).toHaveBeenCalledWith("1");
  });

  it("should call handleEdit and handleToggleEditMode when save button is clicked", () => {
    renderTodoItem(true);
    const saveButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveButton);
    expect(mockHandleEdit).toHaveBeenCalledWith("1", "Test Todo");
    expect(mockHandleToggleEditMode).toHaveBeenCalledWith("1");
  });

  it("should call handleToggleEditMode when edit button is clicked", () => {
    renderTodoItem();
    const editButton = screen.getByRole("button", { name: "Edit" });
    fireEvent.click(editButton);
    expect(mockHandleToggleEditMode).toHaveBeenCalledWith("1");
  });
});
