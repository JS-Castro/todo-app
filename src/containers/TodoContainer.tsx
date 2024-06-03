import Todos from "../components/Todos";
import TodoForm from "../components/TodoForm";
import { useTodoContext } from "../context/TodoContext";
import { v4 as uuidv4 } from "uuid";
import UseFetch from "../hooks/useFetch";

const TodoContainer = () => {
  const {
    state: { todos, message, loading },
    addTodo,
    editTodo,
    deleteTodo,
    toggleEditMode,
  } = useTodoContext();
  UseFetch("https://ardanis.com/api/todos");

  const handleAddItem = (value: string) => {
    addTodo({
      id: uuidv4(),
      value,
      editable: false,
    });
  };

  const handleEdit = (id: string, value: string) => {
    editTodo(id, value);
  };

  const handleDelete = (id: string) => {
    deleteTodo(id);
  };

  const handleToggleEditMode = (id: string) => {
    toggleEditMode(id);
  };

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
