import Todos from "../components/Todos";
import TodoForm from "../components/TodoForm";
import { useTodoContext } from "../context/TodoContext";
import { v4 as uuidv4 } from "uuid";
import useFetch from "../hooks/useFetch";
import { useCallback } from "react";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const TodoContainer = () => {
  const {
    state: { todos, message, loading },
    addTodo,
    editTodo,
    deleteTodo,
    toggleEditMode,
  } = useTodoContext();
  useFetch(`${API_BASE_URL}/todos`);

  const handleAddItem = useCallback(
    (value: string) => {
      addTodo({
        id: uuidv4(),
        value,
        editable: false,
      });
    },
    [addTodo]
  );

  const handleEdit = useCallback(
    (id: string, value: string) => {
      editTodo(id, value);
    },
    [editTodo]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteTodo(id);
    },
    [deleteTodo]
  );

  const handleToggleEditMode = useCallback(
    (id: string) => {
      toggleEditMode(id);
    },
    [toggleEditMode]
  );

  return (
    <>
      <h1>Todo List</h1>
      <TodoForm handleAdd={handleAddItem} />
      {message.shouldShow ? (
        <p>{message.text}</p>
      ) : (
        <Todos
          isLoading={loading}
          todos={todos}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleToggleEditMode={handleToggleEditMode}
        />
      )}
    </>
  );
};

export default TodoContainer;
