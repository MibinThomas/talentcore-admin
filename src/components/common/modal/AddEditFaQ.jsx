"use client";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";

function AddEditFAQModal({ onSaved, editData, onClose }) {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    active: true,
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        question: editData.question || "",
        answer: editData.answer || "",
        active: editData.active ?? true,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, active: !prev.active }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.question || !formData.answer) {
      Swal.fire({
        icon: "info",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: editData ? "FAQ Updated!" : "FAQ Added!",
      text: "Your changes have been saved successfully.",
      showConfirmButton: false,
      timer: 1200,
    }).then(() => {
      onSaved(formData);
      onClose();
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-lg w-full max-w-[600px] p-6 md:p-8 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <IoClose size={24} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900">
          {editData ? "Edit FAQ" : "Add New FAQ"}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {editData
            ? "Update the existing FAQ details below."
            : "Fill in the details to add a new FAQ."}
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="scrollbar-hide grid grid-cols-1 gap-4 max-h-[350px] overflow-y-auto"
        >
          <input
            type="text"
            name="question"
            placeholder="Enter Question"
            value={formData.question}
            onChange={handleChange}
            className="text-[18px] text-black border border-gray-200 rounded-[10px] px-3 py-2 w-full focus:outline-none placeholder:text-[#B1B1B1] shadow-[0px_3px_4.3px_-1px_#00000036]"
          />

          <textarea
            name="answer"
            placeholder="Enter Answer"
            value={formData.answer}
            onChange={handleChange}
            rows={4}
            className="text-[18px] text-black border border-gray-200 rounded-[10px] px-3 py-2 w-full focus:outline-none placeholder:text-[#B1B1B1] shadow-[0px_3px_4.3px_-1px_#00000036]"
          ></textarea>

          {/* Active Toggle */}
          {/* <div className="flex items-center justify-between">
            <label className="text-gray-700 font-medium">Active Status</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.active}
                onChange={handleToggle}
              />
              <div
                className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer 
                peer-checked:bg-green-500
                after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                after:bg-white after:border-gray-300 after:border after:rounded-full
                after:h-5 after:w-5 after:transition-all
                peer-checked:after:translate-x-6 peer-checked:after:border-white"
              ></div>
            </label>
          </div> */}

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-4">
            <button
              type="submit"
              className="bg-primary text-white px-8 py-2 rounded-lg hover:bg-primary/90"
            >
              {editData ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-primary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditFAQModal;
