import { render, screen } from "@testing-library/react";
import TodoContainer from "../containers/TodoContainer";
import { TodoProvider } from "../context/TodoContext";

describe("TodoContainer", () => {
  it("should render TodoForm and Todos components within TodoProvider", () => {
    const todos = [
      { id: "1", value: "todo 1", editable: false },
      { id: "2", value: "todo 2", editable: false },
    ];

    render(
      <TodoProvider
        value={{
          todos: todos,
          addTodo: () => {},
          editTodo: () => {},
          deleteTodo: () => {},
          toggleEditMode: () => {},
        }}
      >
        <TodoContainer />
      </TodoProvider>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Todo" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Todo List" })).toBeInTheDocument();
    expect(screen.getAllByText(/todo \d/i)).toHaveLength(2);
  });
});
