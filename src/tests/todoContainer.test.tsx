import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoContainer from "../containers/TodoContainer";
import { TodoProvider } from "../context/TodoContext";
import { v4 as uuidv4 } from "uuid";
import { worker } from "../mocks/browser";

jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("unique-id"),
}));

describe("TodoContainer", () => {
  const renderTodoContainer = () => {
    const todos = [
      {
        id: "1",
        value: "Todo 1",
        editable: false,
      },
      {
        id: "2",
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

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    expect(await screen.findByText("Todo 1")).toBeInTheDocument();
  });

  // it("should add a new todo item", async () => {
  //   renderTodoContainer();

  //   const input = screen.getByPlaceholderText("Add new todo");
  //   const addButton = screen.getByText("Add");

  //   fireEvent.change(input, { target: { value: "New Todo" } });
  //   fireEvent.click(addButton);

  //   await waitFor(() => {
  //     expect(screen.getByText("New Todo")).toBeInTheDocument();
  //   });
  // });

  // it("should display loading indicator when loading", () => {
  //   // Manually setting loading state for test purposes
  //   render(
  //     <TodoProvider
  //       value={{
  //         state: { todos: [], message: { text: "", shouldShow: false }, loading: true },
  //         addTodo: jest.fn(),
  //         editTodo: jest.fn(),
  //         deleteTodo: jest.fn(),
  //         toggleEditMode: jest.fn(),
  //         setItems: jest.fn(),
  //         setLoading: jest.fn(),
  //         setMessage: jest.fn(),
  //       }}
  //     >
  //       <TodoContainer />
  //     </TodoProvider>
  //   );

  //   expect(screen.getByText("Loading...")).toBeInTheDocument();
  // });

  // it("should delete a todo item", async () => {
  //   renderTodoContainer();

  //   const input = screen.getByPlaceholderText("Add new todo");
  //   const addButton = screen.getByText("Add");

  //   fireEvent.change(input, { target: { value: "Todo to Delete" } });
  //   fireEvent.click(addButton);

  //   await waitFor(() => {
  //     expect(screen.getByText("Todo to Delete")).toBeInTheDocument();
  //   });

  //   const deleteButton = screen.getByRole("button", { name: "Delete" });

  //   fireEvent.click(deleteButton);

  //   await waitFor(() => {
  //     expect(screen.queryByText("Todo to Delete")).not.toBeInTheDocument();
  //   });
  // });

  // it("should edit a todo item", async () => {
  //   renderTodoContainer();

  //   const input = screen.getByPlaceholderText("Add new todo");
  //   const addButton = screen.getByText("Add");

  //   fireEvent.change(input, { target: { value: "Todo to Edit" } });
  //   fireEvent.click(addButton);

  //   await waitFor(() => {
  //     expect(screen.getByText("Todo to Edit")).toBeInTheDocument();
  //   });

  //   const editButton = screen.getByRole("button", { name: "Edit" });

  //   fireEvent.click(editButton);

  //   const editInput = screen.getByRole("textbox");
  //   fireEvent.change(editInput, { target: { value: "Edited Todo" } });

  //   const saveButton = screen.getByRole("button", { name: "Save" });
  //   fireEvent.click(saveButton);

  //   await waitFor(() => {
  //     expect(screen.getByText("Edited Todo")).toBeInTheDocument();
  //   });

  //   await waitFor(() => {
  //     expect(screen.queryByText("Todo to Edit")).not.toBeInTheDocument();
  //   });
  // });

  // it("should toggle edit mode", async () => {
  //   renderTodoContainer();

  //   const input = screen.getByPlaceholderText("Add new todo");
  //   const addButton = screen.getByText("Add");

  //   fireEvent.change(input, { target: { value: "Todo to Toggle" } });
  //   fireEvent.click(addButton);

  //   await waitFor(() => {
  //     expect(screen.getByText("Todo to Toggle")).toBeInTheDocument();
  //   });

  //   const editButton = screen.getByRole("button", { name: "Edit" });
  //   fireEvent.click(editButton);

  //   expect(screen.getByRole("textbox")).toHaveValue("Todo to Toggle");

  //   const saveButton = screen.getByRole("button", { name: "Save" });
  //   fireEvent.click(saveButton);

  //   await waitFor(() => {
  //     expect(screen.getByText("Todo to Toggle")).toBeInTheDocument();
  //   });

  //   await waitFor(() => {
  //     expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  //   });
  // });

  // it("should show error message on add todo failure", async () => {
  //   // Mock the fetch to fail
  //   global.fetch = jest.fn(() => Promise.reject("API is down"));

  //   renderTodoContainer();

  //   const input = screen.getByPlaceholderText("Add new todo");
  //   const addButton = screen.getByText("Add");

  //   fireEvent.change(input, { target: { value: "Failed Todo" } });
  //   fireEvent.click(addButton);

  //   await waitFor(() => {
  //     expect(screen.getByText("Failed to add todo")).toBeInTheDocument();
  //   });
  // });
});
