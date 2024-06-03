import { useState } from "react";
import EditTodo from "./EditTodo";
import Button from "./Button";

interface TodoItemProps {
  id: string;
  value: string;
  editable: boolean;
  isLoading: boolean;
  handleDelete: (id: string) => void;
  handleEdit: (id: string, value: string) => void;
  handleToggleEditMode: (id: string) => void;
}

const TodoItem = ({
  id,
  value,
  editable,
  isLoading,
  handleDelete,
  handleEdit,
  handleToggleEditMode,
}: TodoItemProps) => {
  const [editValue, setEditValue] = useState(value);
  const [isEditable, setIsEditable] = useState(editable);

  const handleSave = () => {
    handleEdit(id, editValue);
    handleToggleEditMode(id);
    setIsEditable(false);
  };

  const handleEditMode = (id: string) => () => {
    handleToggleEditMode(id);
    setIsEditable(true);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <li>
      {isEditable ? (
        <EditTodo handleSave={handleSave} editValue={editValue} setEditValue={setEditValue} />
      ) : (
        <span>{value}</span>
      )}
      {!isEditable && <Button onClick={handleEditMode(id)}>Edit</Button>}
      <Button onClick={() => handleDelete(id)}>Delete</Button>
    </li>
  );
};

export default TodoItem;
