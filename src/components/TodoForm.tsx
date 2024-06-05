import React, { useRef } from "react";

interface EditTodoProps {
  handleAdd: (value: string) => void;
}

const TodoForm = ({ handleAdd }: EditTodoProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current?.value === "") return;

    handleAdd(inputRef.current?.value || "");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
