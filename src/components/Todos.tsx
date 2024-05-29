import TodoItem from "./TodoItem";
import { useTodoContext } from "../context/TodoContext";

const Todos = () => {
  const { todos, editTodo, deleteTodo, toggleEditMode } = useTodoContext();

  if (todos.length === 0) {
    return <p>You have no todos</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          value={todo.value}
          editable={todo.editable}
          handleDelete={deleteTodo}
          handleEdit={editTodo}
          handleToggleEditMode={toggleEditMode}
        />
      ))}
    </ul>
  );
};

export default Todos;
