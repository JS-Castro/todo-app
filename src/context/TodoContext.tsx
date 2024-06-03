import { createContext, useContext, useReducer, ReactNode } from "react";
import { ITodo } from "../types/todos";
import IMessage from "../types/message";

type Action =
  | { type: "ADD_TODO"; payload: { todo: ITodo } }
  | { type: "EDIT_TODO"; payload: { id: string; value: string } }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "TOGGLE_EDIT_MODE"; payload: { id: string } }
  | { type: "SET_MESSAGE"; payload: { message: IMessage } }
  | { type: "SET_ITEMS"; payload: { todos: ITodo[] } }
  | { type: "SET_LOADING"; payload: { loading: boolean } };

export interface TodoContextState {
  todos: ITodo[];
  message: IMessage;
  loading: boolean;
}

interface TodoContextProps {
  state: TodoContextState;
  addTodo: (todo: ITodo) => void;
  editTodo: (id: string, value: string) => void;
  deleteTodo: (id: string) => void;
  toggleEditMode: (id: string) => void;
  setMessage: (message: IMessage) => void;
  setItems: (todos: ITodo[]) => void;
  setLoading: (loading: boolean) => void;
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
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case "TOGGLE_EDIT_MODE":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id.toString() === action.payload.id ? { ...todo, editable: !todo.editable } : todo
        ),
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: {
          text: action.payload.message.text,
          shouldShow: action.payload.message.shouldShow,
        },
      };
    case "SET_ITEMS":
      return { ...state, todos: action.payload.todos };
    case "SET_LOADING":
      return { ...state, loading: action.payload.loading };

    default:
      return state;
  }
};

const initialValue: TodoContextState = {
  todos: [],
  message: { text: "", shouldShow: false },
  loading: false,
};

export const TodoProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value?: TodoContextProps;
}) => {
  const [state, dispatch] = useReducer(todoReducer, value ? value.state : initialValue);

  const addTodo = async (todo: ITodo) => {
    dispatch({ type: "SET_LOADING", payload: { loading: true } });

    try {
      await fetch("https://ardanis.com/api/todo", {
        method: "POST",
        body: JSON.stringify(todo),
      });

      dispatch({ type: "ADD_TODO", payload: { todo } });
    } catch (error) {
      dispatch({
        type: "SET_MESSAGE",
        payload: { message: { text: "Failed to add todo", shouldShow: true } },
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
    }
  };

  const editTodo = async (id: string, value: string) => {
    dispatch({ type: "SET_LOADING", payload: { loading: true } });

    try {
      const response = await fetch(`https://ardanis.com/api/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
      });

      const updatedTodo = await response.json();

      dispatch({ type: "EDIT_TODO", payload: { id, value: updatedTodo.value } });
    } catch (error) {
      dispatch({
        type: "SET_MESSAGE",
        payload: { message: { text: "Failed to edit todo", shouldShow: true } },
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
    }
  };

  const deleteTodo = async (id: string) => {
    dispatch({ type: "SET_LOADING", payload: { loading: true } });
    try {
      await fetch(`https://ardanis.com/api/todo/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "DELETE_TODO", payload: { id } });
    } catch (error) {
      dispatch({
        type: "SET_MESSAGE",
        payload: { message: { text: "Failed to delete todo", shouldShow: true } },
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
    }
  };

  const toggleEditMode = async (id: string) => {
    dispatch({ type: "SET_LOADING", payload: { loading: true } });
    try {
      const response = await fetch(`https://ardanis.com/api/todo/${id}/toggle`, {
        method: "PUT",
      });

      const { todoId } = await response.json();

      dispatch({ type: "TOGGLE_EDIT_MODE", payload: { id: todoId } });
    } catch (error) {
      dispatch({
        type: "SET_MESSAGE",
        payload: { message: { text: "Failed to toggle todo", shouldShow: true } },
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
    }
  };

  const setMessage = (message: IMessage) => {
    dispatch({
      type: "SET_MESSAGE",
      payload: { message: { text: message.text, shouldShow: message.shouldShow } },
    });
  };

  const setItems = (todos: ITodo[]) => {
    dispatch({ type: "SET_ITEMS", payload: { todos } });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: { loading } });
  };

  return (
    <TodoContext.Provider
      value={{
        state,
        addTodo,
        editTodo,
        deleteTodo,
        toggleEditMode,
        setMessage,
        setItems,
        setLoading,
      }}
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
