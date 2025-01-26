import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { FaCalendarAlt, FaChalkboardTeacher, FaExchangeAlt } from "react-icons/fa";
import BgImage from "../../../public/bg.png";
import { fail, success } from "@/utils/toasts";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  timings: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, timings }) => {
  const [formData, setFormData] = useState({
    date: "",
    year: "",
    batch: "",
    timings: timings,
    to: "",
    lecturer_name: "",
  });

  useEffect(() => {
    const cookieValue = getCookie("query");
    if (cookieValue) {
      const year = cookieValue.slice(0, 4);
      const batch = cookieValue.slice(4, 8);
      setFormData((prevData) => ({
        ...prevData,
        year,
        batch,
      }));
    }
  }, []);

  const getCookie = (name: string) => {
    const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    const res = await axios.post("/api/changeclass", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(res){
      success("Changes successfull! ")
    }
    else{
      fail("Error while adding changes.")
    }
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 overflow-y-auto">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative z-60 bg-stone-950 text-white rounded-lg shadow-lg p-6 sm:p-8 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl w-full border border-yellow-500">
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
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 text-center">
            Enter Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <FaCalendarAlt className="text-yellow-500 text-xl" />
              <div className="w-full">
                <label htmlFor="date" className="hidden block text-sm mb-2 sm:flex">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 bg-stone-800 text-white rounded-lg shadow-md"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <FaExchangeAlt className="text-yellow-500 text-xl" />
              <div className="w-full">
                <label htmlFor="to" className="hidden block text-sm mb-2 sm:flex">
                  Exchange To
                </label>
                <input
                  type="text"
                  id="to"
                  name="to"
                  placeholder="Enter course name"
                  value={formData.to}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 bg-stone-800 text-white rounded-lg shadow-md"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <FaChalkboardTeacher className="text-yellow-500 text-xl" />
              <div className="w-full">
                <label htmlFor="lecturer_name" className="hidden block  text-sm mb-2 sm:flex">
                  Lecturer Name
                </label>
                <input
                  type="text"
                  id="lecturer_name"
                  name="lecturer_name"
                  placeholder="Enter lecturer name"
                  value={formData.lecturer_name}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 bg-stone-800 text-white rounded-lg shadow-md"
                />
              </div>
            </div>

            <div className="flex flex-row justify-between items-center gap-4">
              <button
                onClick={onClose}
                className="bg-red-700 text-white flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-red-800 transition-all w-full sm:w-auto"
              >
                <MdClose className="text-xl" />
                Close
              </button>
              <button
                type="submit"
                className="bg-yellow-600 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-yellow-600 transition-all w-full sm:w-auto"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
