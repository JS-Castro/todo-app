"use client";

import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AddTaskModal from "./AddTaskModal";

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
        Add new Task <AiOutlinePlus className="ml-2" size={18} />
      </button>
      <AddTaskModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default AddTask;
