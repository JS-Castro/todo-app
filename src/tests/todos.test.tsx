import { render, screen } from "@testing-library/react";
import Todos from "../components/Todos";
import { TTodos } from "../types/todos";

describe("Todos", () => {
  function renderTodo({ todos }: { todos: TTodos }) {
    return (
      <Todos
        isLoading={false}
        todos={todos}
        handleDelete={jest.fn()}
        handleEdit={jest.fn()}
        handleToggleEditMode={jest.fn()}
      />
    );
  }

  it("should render the string, 'You have no todos', when there are not todos", () => {
    render(renderTodo({ todos: [] }));

    expect(screen.getByText("You have no todos")).toBeInTheDocument();
  });

  it("should render a list of todos", () => {
    const todos = [
      { id: "1", value: "todo 1", editable: false },
      { id: "2", value: "todo 2", editable: false },
    ];

    render(renderTodo({ todos }));

    expect(screen.getAllByText(/todo \d/i)).toHaveLength(2);
  });

  it("should only be able to edit todo with editable set to true", () => {
    const todos = [
      {
        id: "1",
        value: "todo 1",
        editable: true,
      },
      {
        id: "2",
        value: "todo 2",
        editable: false,
      },
    ];

    render(renderTodo({ todos }));

    const editableTodo = screen.getByDisplayValue("todo 1");
    expect(editableTodo).toBeInTheDocument();
    expect(editableTodo).toHaveAttribute("type", "text");
    expect(editableTodo).toHaveValue("todo 1");

    const nonEditableTodo = screen.getByText("todo 2");
    expect(nonEditableTodo).toBeInTheDocument();
    const editButton = screen.getByRole("button", { name: "Edit" });
    expect(editButton).toBeInTheDocument();
  });
});
