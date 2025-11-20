"use client";
import { scheduleInterviewAPI } from "@/src/services/allAPI";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const ScheduleInterviewModal = ({ isOpen, onClose, applicationId }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    applicationId: applicationId || "",
    interviewDate: "",
    round: "HR",
    mode: "Google Meet",
    meetLink: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      applicationId: applicationId || "",
    }));
  }, [applicationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModeChange = (e) => {
    const selectedMode = e.target.value;
    setFormData({
      ...formData,
      mode: selectedMode,
      meetLink: "",
      location: "",
    });
  };

 const handleScheduleInterview = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const { applicationId, interviewDate, round, mode, meetLink, location } = formData;

    // basic validations
    if (!applicationId) {
      Swal.fire({ icon: "error", title: "Missing applicationId" });
      return;
    }

    if (!interviewDate || !round || !mode) {
      Swal.fire({ icon: "error", title: "Please fill all required fields" });
      return;
    }

    if (mode !== "In-Person" && !meetLink) {
      Swal.fire({ icon: "error", title: "Please provide a meeting link" });
      return;
    }

    if (mode === "In-Person" && !location) {
      Swal.fire({ icon: "error", title: "Please provide a location" });
      return;
    }

    // debug payload
    console.log("📤 Scheduling interview payload:", formData);

    const result = await scheduleInterviewAPI(formData);

    if (result?.status === 201) {
      await Swal.fire({
        icon: "success",
        title: "Interview Scheduled Successfully",
      });

      onClose();
      setFormData({
        applicationId,
        interviewDate: "",
        round: "HR",
        mode: "Google Meet",
        meetLink: "",
        location: "",
        description: "",
      });
      return; // success, exit early
    }

    // handle unexpected non-201 responses
    const unexpectedMsg = result?.response?.data?.message || "Could not schedule interview";
    Swal.fire({ icon: "error", title: unexpectedMsg });
  } catch (error) {
    console.error("Error scheduling interview:", error);
    const errorMsg =
      error?.response?.data?.message ||
      error?.message ||
      "Could not schedule interview";
    Swal.fire({
      icon: "error",
      title: "Scheduling Failed",
      text: errorMsg,
    });
  } finally {
    setLoading(false);
  }
};


  return (
    isOpen && (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[6px] flex items-center justify-center px-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Schedule Interview</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>

          <form className="space-y-4">
            {/* Interview Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interview Date
              </label>
              <input
                type="date"
                name="interviewDate"
                min={new Date().toISOString().split("T")[0]} // prevent past dates
                value={formData.interviewDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mode
              </label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleModeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Google Meet">Google Meet</option>
                <option value="Zoom">Zoom</option>
                <option value="Teams">Teams</option>
                <option value="In-Person">In-Person</option>
              </select>
            </div>

            {/* Meet Link or Location */}
            {formData.mode !== "In-Person" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Link
                </label>
                <input
                  type="url"
                  name="meetLink"
                  value={formData.meetLink}
                  onChange={handleChange}
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
                  placeholder="Office Address, City"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            {/* Round */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Round
              </label>
              <select
                name="round"
                value={formData.round}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="HR">HR</option>
                <option value="Technical">Technical</option>
                <option value="Manager">Manager</option>
                <option value="Final">Final</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleScheduleInterview}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? "Scheduling..." : "Schedule"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ScheduleInterviewModal;
