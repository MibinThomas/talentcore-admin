// components/ScheduleInterviewModal.jsx (or wherever you place it)
"use client";
import React, { useState } from "react";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";

const ScheduleInterviewModal = ({ isOpen, onClose, applicationId }) => {
  const [formData, setFormData] = useState({
    interviewDate: "",
    mode: "Google Meet",
    meetLink: "",
    location: "",
    description: "",
    round: "HR",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModeChange = (e) => {
    const selectedMode = e.target.value;
    setFormData({ ...formData, mode: selectedMode, meetLink: "" });
  };
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[6px] flex items-center justify-center px-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Schedule Interview</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interview Date & Time
              </label>
              <input
                type="datetime-local"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mode
              </label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleModeChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Google Meet">Google Meet</option>
                <option value="Zoom">Zoom</option>
                <option value="Teams">Teams</option>
                <option value="In-Person">In-Person</option>
              </select>
            </div>
            {formData.mode !== "In-Person" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meet Link
                </label>
                <input
                  type="url"
                  name="meetLink"
                  value={formData.meetLink}
                  onChange={handleChange}
                  required={formData.mode !== "In-Person"}
                  placeholder="https://meet.google.com/abc-defg-hij"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required={formData.mode === "In-Person"}
                  placeholder="e.g., Office Address, City"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Round
              </label>
              <select
                name="round"
                value={formData.round}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="HR">HR</option>
                <option value="Technical">Technical</option>
                <option value="Manager">Manager</option>
                <option value="Final">Final</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Additional notes..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                //   disabled={isSubmitting}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                //   disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                Schedule
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ScheduleInterviewModal;
