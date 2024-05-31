import Todos from "../components/Todos";
import TodoForm from "../components/TodoForm";
import { useTodoContext } from "../context/TodoContext";
import Alert from "../components/Alert";
// import { useEffect } from "react";

const TodoContainer = () => {
  const {
    state: { todos, message },
    addTodo,
    editTodo,
    deleteTodo,
    toggleEditMode,
    // setItems,
    // setMessage,
  } = useTodoContext();

  // useEffect(() => {
  // fetch("https://ardanis.com/api/todos")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setItems(data);
  //   });
  // }, []);

  const handleAddItem = (value: string) => {
    addTodo(Date.now().toString(), value);
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
      <Alert {...message} />
      <TodoForm handleAdd={handleAddItem} />
      <Todos
        todos={todos}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleToggleEditMode={handleToggleEditMode}
      />
    </>
  );
};

export default TodoContainer;
