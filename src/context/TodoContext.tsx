import { createContext, useContext, useReducer, ReactNode } from "react";
import { ITodo, TTodos } from "../types/todos";

type Action =
  | { type: "ADD_TODO"; payload: { todo: ITodo } }
  | { type: "EDIT_TODO"; payload: { id: string; value: string } }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "TOGGLE_EDIT_MODE"; payload: { id: string } };

interface TodoContextProps {
  todos: TTodos;
  addTodo: (value: string) => void;
  editTodo: (id: string, value: string) => void;
  deleteTodo: (id: string) => void;
  toggleEditMode: (id: string) => void;
}

export const TodoContext = createContext<TodoContextProps | undefined>(undefined);

const todoReducer = (todos: TTodos, action: Action): TTodos => {
  switch (action.type) {
    case "ADD_TODO":
      return [...todos, action.payload.todo];
    case "EDIT_TODO":
      return todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, value: action.payload.value, editable: false }
          : todo
      );
    case "DELETE_TODO":
      return todos.filter((todo) => todo.id !== action.payload.id);
    case "TOGGLE_EDIT_MODE":
      return todos.map((todo) =>
        todo.id === action.payload.id ? { ...todo, editable: !todo.editable } : todo
      );
    default:
      return todos;
  }
};

export const TodoProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value?: TodoContextProps;
}) => {
  const [todos, dispatch] = useReducer(todoReducer, value?.todos || []);

  const addTodo = (value: string) => {
    const newTodo: ITodo = { id: Date.now().toString(), value, editable: false };
    dispatch({ type: "ADD_TODO", payload: { todo: newTodo } });
  };

  const editTodo = (id: string, value: string) => {
    dispatch({ type: "EDIT_TODO", payload: { id, value } });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: "DELETE_TODO", payload: { id } });
  };

  const toggleEditMode = (id: string) => {
    dispatch({ type: "TOGGLE_EDIT_MODE", payload: { id } });
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo, toggleEditMode }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = (): TodoContextProps => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
