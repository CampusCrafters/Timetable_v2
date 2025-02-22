"use client";

import React, { useState } from "react";
import Modal from "./Modal";

interface ClassProps {
  className: string;
  timings: string
}

const Class: React.FC<ClassProps> = ({ className,timings }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button to Open Modal */}
      <button
        onClick={toggleModal}
        className="py-6 px-6 bg-stone-900 text-stone-300 text-center rounded hover:bg-stone-900 hover:text-white flex flex-col items-center justify-center gap-1"
      >
        <span className="text-base font-medium">{className}</span>
      </button>

      {/* Modal Component */}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={toggleModal} timings={timings}></Modal>
      )}
    </div>
  );
};

export default Class;
