import { render, screen } from "@testing-library/react";
import Todos from "../components/Todos";
import { TodoProvider } from "../context/TodoContext";
import { TTodos } from "../types/todos";

describe("Todos", () => {
  function renderTodoProvider({ todos }: { todos: TTodos }) {
    return (
      <TodoProvider
        value={{
          todos: todos,
          addTodo: () => {},
          editTodo: () => {},
          deleteTodo: () => {},
          toggleEditMode: () => {},
        }}
      >
        <Todos />
      </TodoProvider>
    );
  }

  it("should render an empty list when no todos are provided", () => {
    render(renderTodoProvider({ todos: [] }));

    expect(screen.getByText("You have no todos")).toBeInTheDocument();
  });

  it("should render a list of todos", () => {
    const todos = [
      { id: "1", value: "todo 1", editable: false },
      { id: "2", value: "todo 2", editable: false },
    ];

    render(renderTodoProvider({ todos }));

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

    render(renderTodoProvider({ todos }));

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
