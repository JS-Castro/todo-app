import { ITask } from "../../../types/tasks";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <tr key={task.id}>
      <td>{task.text}</td>
      <td>{task.color}</td>
    </tr>
  );
};

export default Task;
