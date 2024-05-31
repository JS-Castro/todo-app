import { createContext, useContext, useReducer, ReactNode } from "react";
import { ITodo } from "../types/todos";
import IMessage from "../types/message";

type Action =
  | { type: "ADD_TODO"; payload: { todo: ITodo } }
  | { type: "EDIT_TODO"; payload: { id: string; value: string } }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "TOGGLE_EDIT_MODE"; payload: { id: string } }
  | { type: "SET_MESSAGE"; payload: { message: IMessage } }
  | { type: "SET_ITEMS"; payload: { todos: ITodo[] } };

export interface TodoContextState {
  todos: ITodo[];
  message: IMessage;
}

interface TodoContextProps {
  state: TodoContextState;
  addTodo: (id: string, value: string) => void;
  editTodo: (id: string, value: string) => void;
  deleteTodo: (id: string) => void;
  toggleEditMode: (id: string) => void;
  setMessage: (message: IMessage) => void;
  setItems: (todos: ITodo[]) => void;
}

export const TodoContext = createContext<TodoContextProps | undefined>(undefined);

const todoReducer = (state: TodoContextState, action: Action): TodoContextState => {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload.todo] };
    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, value: action.payload.value, editable: false }
            : todo
        ),
      };
    case "DELETE_TODO":
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload.id) };
    case "TOGGLE_EDIT_MODE":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, editable: !todo.editable } : todo
        ),
      };
    case "SET_MESSAGE":
      return { ...state, message: action.payload.message };
    case "SET_ITEMS":
      return {
        ...state,
        todos: action.payload.todos,
      };

    default:
      return state;
  }
};

const initialValue: TodoContextState = {
  todos: [],
  message: { message: "", shouldShow: false },
};

export const TodoProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value?: TodoContextProps;
}) => {
  const [state, dispatch] = useReducer(todoReducer, value ? value.state : initialValue);

  const addTodo = (id: string, value: string) => {
    const newTodo: ITodo = { id, value, editable: false };
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

  const setMessage = (message: IMessage) => {
    dispatch({ type: "SET_MESSAGE", payload: { message } });
  };

  const setItems = (todos: ITodo[]) => {
    dispatch({ type: "SET_ITEMS", payload: { todos } });
  };

  return (
    <TodoContext.Provider
      value={{ state, addTodo, editTodo, deleteTodo, toggleEditMode, setMessage, setItems }}
    >
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
