import React from "react";
import Todos from "../components/Todos";
import TodoForm from "../components/TodoForm";

const TodoContainer: React.FC = () => {
  return (
    <>
      <h1>Todo List</h1>
      <TodoForm />
      <Todos />
    </>
  );
};

export default TodoContainer;
