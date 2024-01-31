import { ITask } from "../../../types/tasks";

const BASE_URL = "http://localhost:3001";

export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${BASE_URL}/tasks`);
  const todos = await res.json();
  console.log(todos);

  return todos;
};
