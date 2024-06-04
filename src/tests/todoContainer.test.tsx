import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoContainer from "../containers/TodoContainer";
import { TodoProvider } from "../context/TodoContext";

jest.mock("../hooks/useFetch", () => {
  return jest.fn(() => {
    return {
      data: [
        {
          id: Math.floor(Math.random() * 100).toString(),
          value: "Todo 1",
          editable: false,
        },
        {
          id: Math.floor(Math.random() * 100).toString(),
          value: "Todo 2",
          editable: false,
        },
      ],
    };
  });
});

describe("TodoContainer", () => {
  const renderTodoContainer = () => {
    const todos = [
      {
        id: Math.floor(Math.random() * 100).toString(),
        value: "Todo 1",
        editable: false,
      },
      {
        id: Math.floor(Math.random() * 100).toString(),
        value: "Todo 2",
        editable: false,
      },
    ];

    return render(
      <TodoProvider
        value={{
          state: {
            todos,
            message: {
              shouldShow: false,
              text: "",
            },
            loading: false,
          },
          addTodo: jest.fn(),
          editTodo: jest.fn(),
          deleteTodo: jest.fn(),
          toggleEditMode: jest.fn(),
          setLoading: jest.fn(),
          setMessage: jest.fn(),
          setItems: jest.fn(),
        }}
      >
        <TodoContainer />
      </TodoProvider>
    );
  };

  it("should render the TodoContainer and its child components", async () => {
    renderTodoContainer();

    expect(screen.getByText("Todo List")).toBeInTheDocument();
    expect(screen.getByText("Add Todo")).toBeInTheDocument();

    expect(await screen.findByText("Todo 1")).toBeInTheDocument();
  });

  it("should add a new todo item", async () => {
    renderTodoContainer();

    const addButton = screen.getByText("Add Todo");
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { id: 10, value: "New Todo", editable: false } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("New Todo")).toBeInTheDocument();
    });
  });

  it("should display loading indicator when loading", () => {
    render(
      <TodoProvider
        value={{
          state: { todos: [], message: { text: "", shouldShow: false }, loading: true },
          addTodo: jest.fn(),
          editTodo: jest.fn(),
          deleteTodo: jest.fn(),
          toggleEditMode: jest.fn(),
          setItems: jest.fn(),
          setLoading: jest.fn(),
          setMessage: jest.fn(),
        }}
      >
        <TodoContainer />
      </TodoProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
