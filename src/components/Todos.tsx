import TodoItem from "./TodoItem";
import { ITodo } from "../types/todos";

interface TodosProps {
  todos: ITodo[];
  handleEdit: (id: string, value: string) => void;
  handleDelete: (id: string) => void;
  handleToggleEditMode: (id: string) => void;
}

const Todos = ({ todos, handleEdit, handleDelete, handleToggleEditMode }: TodosProps) => {
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
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleToggleEditMode={handleToggleEditMode}
        />
      ))}
    </ul>
  );
};

export default Todos;
