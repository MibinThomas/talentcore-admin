"use client";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function SubscriptionModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    details: [""],
  });

  const [isLoading, setIsLoading] = useState(false);

  // Prefill form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        duration: initialData.duration || "",
        details: initialData.features?.length ? initialData.features : [""],
      });
    } else {
      setFormData({
        title: "",
        description: "",
        price: "",
        duration: "",
        details: [""],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDetailChange = (index, value) => {
    const updatedDetails = [...formData.details];
    updatedDetails[index] = value;
    setFormData({ ...formData, details: updatedDetails });
  };

  const handleAddDetail = () => {
    setFormData({ ...formData, details: [...formData.details, ""] });
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = formData.details.filter((_, i) => i !== index);
    setFormData({ ...formData, details: updatedDetails });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newPlan = {
        ...formData,
        details: formData.details.filter((d) => d.trim() !== ""),
      };
      onSubmit(newPlan);
      onClose();
    } catch (error) {
      console.error("Error submitting plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "text-[16px] border border-gray-200 rounded-[10px] px-3 py-2 w-full focus:outline-none placeholder:text-[#B1B1B1] shadow-sm";

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 py-6 sm:py-10"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-lg w-full max-w-[600px] max-h-[75vh] lg:max-h-[80vh] overflow-y-auto p-6 relative scroll-smooth"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <IoClose size={24} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {initialData ? "Edit Subscription Plan" : "Add Subscription Plan"}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {initialData
            ? "Update the details below to modify this subscription plan."
            : "Fill in the details below to add a new subscription plan."}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Plan Title (e.g. Basic, Pro)"
            value={formData.title}
            onChange={handleChange}
            className={inputClass}
            required
          />
          <textarea
            name="description"
            placeholder="Short Description"
            value={formData.description}
            onChange={handleChange}
            rows={2}
            className={inputClass}
          />

          {/* Price + Duration */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="price"
              placeholder="Price (e.g. ₹199.99)"
              value={formData.price}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration (e.g. 30 days)"
              value={formData.duration}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Dynamic Plan Details */}
          <div>
            <label className="block text-gray-700 text-[15px] mb-2">
              Plan Details
            </label>
            <div className="space-y-2">
              {formData.details.map((detail, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder={`Feature ${index + 1}`}
                    value={detail}
                    onChange={(e) =>
                      handleDetailChange(index, e.target.value)
                    }
                    className={`${inputClass} flex-1`}
                  />
                  {formData.details.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveDetail(index)}
                      className="text-red-500 hover:text-red-600 text-sm font-medium"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Detail Button */}
            <button
              type="button"
              onClick={handleAddDetail}
              className="flex items-center gap-2 text-primary text-[15px] mt-2 hover:text-primary/80"
            >
              <FaPlus className="text-[14px]" /> Add Detail
            </button>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-primary px-4 py-2 rounded-lg border border-gray-200 w-full sm:w-auto"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors w-full sm:w-auto"
            >
              {isLoading
                ? "Submitting..."
                : initialData
                ? "Update Plan"
                : "Add Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubscriptionModal;
