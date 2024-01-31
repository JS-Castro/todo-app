"use client";

import { FiEdit, FiTrash2 } from "react-icons/fi";
import { ITask } from "../../../types/tasks";
import { FormEventHandler, useState } from "react";
import AddTaskModal from "./AddTaskModal";
import { editTodo } from "../api/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [modalDeleted, setModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setTaskToEdit("");
    setOpenModalEdit(false);
  };

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={25}
        />
        <AddTaskModal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg">Edit todo</h3>
            <div className="modal-action">
              <input
                onChange={(e) => setTaskToEdit(e.target.value)}
                value={taskToEdit}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </AddTaskModal>
        <FiTrash2 cursor="pointer" className="text-red-500" size={25} />
      </td>
    </tr>
  );
};

export default Task;
