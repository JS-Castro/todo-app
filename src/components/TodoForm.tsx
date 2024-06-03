import React, { useState } from "react";

interface EditTodoProps {
  handleAdd: (value: string) => void;
}

const TodoForm = ({ handleAdd }: EditTodoProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === "") return;
    handleAdd(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
