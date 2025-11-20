// components/SubscriptionModal.jsx
"use client";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function SubscriptionModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    validityDays: "",
    maxSalaryPerMonth: "",
    maxApplicationsPerMonth: "",
    atsAccess: false,
    description: [""],
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        price: initialData.price || "",
        validityDays: initialData.validityDays || "",
        maxSalaryPerMonth: initialData.maxSalaryPerMonth || "",
        maxApplicationsPerMonth: initialData.maxApplicationsPerMonth || "",
        atsAccess: initialData.atsAccess || false,
        description: Array.isArray(initialData.description)
          ? initialData.description.length > 0
            ? initialData.description
            : [""]
          : [""],
      });
    } else {
      setFormData({
        name: "",
        price: "",
        validityDays: "",
        maxSalaryPerMonth: "",
        maxApplicationsPerMonth: "",
        atsAccess: false,
        description: [""],
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDescriptionChange = (index, value) => {
    const updated = [...formData.description];
    updated[index] = value;
    setFormData({ ...formData, description: updated });
  };

  const handleAddDescription = () => {
    setFormData({ ...formData, description: [...formData.description, ""] });
  };

  const handleRemoveDescription = (index) => {
    if (formData.description.length > 1) {
      setFormData({
        ...formData,
        description: formData.description.filter((_, i) => i !== index),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const cleanedData = {
      name: formData.name.trim(),
      price: Number(formData.price),
      validityDays: Number(formData.validityDays),
      maxSalaryPerMonth: Number(formData.maxSalaryPerMonth),
      maxApplicationsPerMonth: Number(formData.maxApplicationsPerMonth),
      atsAccess: formData.atsAccess,
      description: formData.description
        .map((d) => d.trim())
        .filter((d) => d !== ""),
    };

    try {
      await onSubmit(cleanedData, initialData?._id);
      onClose();
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to save plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputClass =
    "text-[16px] border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition"
        >
          <IoClose size={28} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {initialData ? "Edit Subscription Plan" : "Create New Subscription Plan"}
        </h2>
        <p className="text-gray-600 mb-8">
          {initialData
            ? "Update the plan details below."
            : "Fill in all fields to create a new subscription plan."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Plan Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Pro, Premium, Basic"
              className={inputClass}
              required
            />
          </div>

          {/* Price & Validity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="199"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Validity (Days)</label>
              <input
                type="number"
                name="validityDays"
                value={formData.validityDays}
                onChange={handleChange}
                placeholder="30"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Limits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Salary/Month (₹)</label>
              <input
                type="number"
                name="maxSalaryPerMonth"
                value={formData.maxSalaryPerMonth}
                onChange={handleChange}
                placeholder="60000"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Applications/Month</label>
              <input
                type="number"
                name="maxApplicationsPerMonth"
                value={formData.maxApplicationsPerMonth}
                onChange={handleChange}
                placeholder="15"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* ATS Access */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="atsAccess"
              checked={formData.atsAccess}
              onChange={handleChange}
              className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
            />
            <label className="text-gray-700 font-medium">Enable ATS Optimization Access</label>
          </div>

          {/* Description / Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Plan Features</label>
            {formData.description.map((item, index) => (
              <div key={index} className="flex gap-3 mb-3">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  placeholder={`Feature ${index + 1} (e.g. Apply to jobs up to ₹60,000/month)`}
                  className={inputClass}
                />
                {formData.description.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveDescription(index)}
                    className="text-red-600 hover:text-red-700 text-2xl font-light"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddDescription}
              className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1 mt-2"
            >
              <FaPlus size={14} /> Add Another Feature
            </button>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-60 transition flex items-center gap-2"
            >
              {isLoading ? "Saving..." : initialData ? "Update Plan" : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubscriptionModal;