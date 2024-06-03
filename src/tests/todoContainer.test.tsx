import { render, screen } from "@testing-library/react";
import TodoContainer from "../containers/TodoContainer";
import { TodoContextState, TodoProvider } from "../context/TodoContext";
import { ITodo } from "../types/todos";
import IMessage from "../types/message";

describe("TodoContainer", () => {
  const todos: ITodo[] = [
    { id: "1", value: "todo 1", editable: false },
    { id: "2", value: "todo 2", editable: false },
  ];

  const message: IMessage = {
    text: "",
    shouldShow: false,
  };

  const state: TodoContextState = {
    todos,
    message,
    loading: false,
  };

  it("should render TodoForm and Todos components within TodoProvider", () => {
    render(
      <TodoProvider
        value={{
          state: state,
          addTodo: () => {},
          editTodo: () => {},
          deleteTodo: () => {},
          toggleEditMode: () => {},
          setMessage: () => {},
          setItems: () => {},
          setLoading: () => {},
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
