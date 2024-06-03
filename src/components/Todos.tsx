import TodoItem from "./TodoItem";
import { ITodo } from "../types/todos";
import Loading from "./Loading";

interface TodosProps {
  todos: ITodo[];
  isLoading: boolean;
  handleEdit: (id: string, value: string) => void;
  handleDelete: (id: string) => void;
  handleToggleEditMode: (id: string) => void;
}

const Todos = ({
  todos,
  isLoading,
  handleEdit,
  handleDelete,
  handleToggleEditMode,
}: TodosProps) => {
  if (!isLoading && todos?.length === 0) {
    return <p>You have no todos</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            isLoading={isLoading}
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
    </>
  );
};

export default Todos;
