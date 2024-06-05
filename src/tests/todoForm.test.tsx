import { render, screen, fireEvent } from "@testing-library/react";
import TodoForm from "../components/TodoForm";
import { TodoProvider } from "../context/TodoContext";

describe("TodoForm", () => {
  it("should render input field and add todo button", () => {
    render(
      <TodoProvider>
        <TodoForm handleAdd={jest.fn()} />
      </TodoProvider>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Todo" })).toBeInTheDocument();
  });

  it("should update input value when typing", () => {
    render(
      <TodoProvider>
        <TodoForm handleAdd={jest.fn()} />
      </TodoProvider>
    );

    const inputField = screen.getByRole("textbox");
    fireEvent.change(inputField, { target: { value: "Test Todo" } });

    expect(inputField).toHaveValue("Test Todo");
  });

  it("should clear input value after adding todo", () => {
    render(
      <TodoProvider>
        <TodoForm handleAdd={jest.fn()} />
      </TodoProvider>
    );

    const inputField = screen.getByRole("textbox");
    fireEvent.change(inputField, { target: { value: "Test Todo" } });

    fireEvent.submit(inputField);

    expect(inputField).toHaveValue("");
  });

  it("should call handleAdd function when submitting form", () => {
    const handleAdd = jest.fn();
    render(
      <TodoProvider>
        <TodoForm handleAdd={handleAdd} />
      </TodoProvider>
    );

    const inputField = screen.getByRole("textbox");
    fireEvent.change(inputField, { target: { value: "Test Todo" } });

    fireEvent.submit(inputField);

    expect(handleAdd).toHaveBeenCalledWith("Test Todo");
  });

  it("should not call handleAdd function when submitting form with empty input", () => {
    const handleAdd = jest.fn();
    render(
      <TodoProvider>
        <TodoForm handleAdd={handleAdd} />
      </TodoProvider>
    );

    const inputField = screen.getByRole("textbox");
    fireEvent.change(inputField, { target: { value: "" } });

    fireEvent.submit(inputField);

    expect(handleAdd).not.toHaveBeenCalled();
  });
});
