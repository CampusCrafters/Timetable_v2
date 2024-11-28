"use client";

import React from "react";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import BgImage from "../../../public/bg.png";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative z-60 bg-stone-950 text-white rounded-lg shadow-lg p-6 max-w-lg w-full border border-yellow-500">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={BgImage}
            alt="Modal Background"
            fill
            quality={100}
            className="filter blur-lg opacity-70 object-cover rounded-lg"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-950/80 to-transparent z-10 rounded-lg"></div>

        {/* Modal Content */}
        <div className="relative z-20">
          <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
          <p className="mb-6">
            This is the modal content. It matches the theme of the Dashboard.
          </p>
          <button
            onClick={onClose}
            className="bg-red-600 text-white flex items-center gap-2 px-4 py-2 rounded hover:bg-red-800"
          >
            <MdClose className="text-lg" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
