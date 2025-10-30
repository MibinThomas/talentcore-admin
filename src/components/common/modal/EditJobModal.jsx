"use client";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function EditJobModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyId: "",
    title: "",
    description: "",
    responsibilities: "",
    requirements: "",
    skills: "",
    benefits: "",
    jobType: "",
    experienceLevel: "",
    salaryMin: "",
    salaryMax: "",
    salaryCurrency: "INR",
    locationType: "",
    locationPlace: "",
    isUrgent: false,
    applicationDeadline: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const processedData = {
        companyId: formData.companyId,
        title: formData.title,
        description: formData.description,
        responsibilities: formData.responsibilities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        requirements: formData.requirements
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        skills: formData.skills
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        benefits: formData.benefits
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        jobType: formData.jobType,
        experienceLevel: formData.experienceLevel,
        salary: {
          min: parseInt(formData.salaryMin) || undefined,
          max: parseInt(formData.salaryMax) || undefined,
          currency: formData.salaryCurrency,
        },
        location: {
          type: formData.locationType,
          place: formData.locationPlace,
        },
        isUrgent: formData.isUrgent,
        applicationDeadline: formData.applicationDeadline,
      };

      // Remove undefined salary fields if not provided
      if (!processedData.salary.min) delete processedData.salary.min;
      if (!processedData.salary.max) delete processedData.salary.max;

      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create job");
      }

      const result = await response.json();
      console.log("New Job Data:", result);
      setIsOpen(false);
      // Optionally reset form or show success message
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "text-[18px] text-black border border-t-0 border-gray-200 rounded-[10px] px-3 py-2 w-full focus:outline-none placeholder:text-[#B1B1B1] shadow-[0px_3px_4.3px_-1px_#00000036]";
  const selectClass = (value) =>
    `text-[18px] border border-t-0 border-gray-200 rounded-[10px] px-3 py-2 w-full focus:outline-none shadow-[0px_3px_4.3px_-1px_#00000036] ${
      value ? "text-black" : "text-[#B1B1B1]"
    }`;
  const textareaClass = (value) =>
    `text-[18px] ${
      value ? "text-black" : "text-[#B1B1B1]"
    } border border-t-0 border-gray-200 rounded-[10px] px-3 py-2 w-full focus:outline-none placeholder:text-[#B1B1B1] shadow-[0px_3px_4.3px_-1px_#00000036] resize-none`;

  return (
    <>
      {/* Trigger Button */}
      <button onClick={() => setIsOpen(true)} className="text-white">
        <AiOutlineEdit size={30} />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-lg w-full max-w-[650px] p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <IoClose size={24} />
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-900">Edit Job Details</h2>
            <p className="text-gray-500 text-sm mb-6">
              Please fill in the details to edit the job.
            </p>

            {/* Error Message */}
            {error && (
              <div className="col-span-1 sm:col-span-2 mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="companyId"
                placeholder="Company ID"
                value={formData.companyId}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                value={formData.title}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <textarea
                name="description"
                placeholder="Job Description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`${textareaClass(
                  formData.description
                )} col-span-1 sm:col-span-2`}
              />
              <textarea
                name="responsibilities"
                placeholder="Responsibilities (comma-separated)"
                value={formData.responsibilities}
                onChange={handleChange}
                rows={3}
                className={`${textareaClass(
                  formData.responsibilities
                )} col-span-1 sm:col-span-2`}
              />
              <textarea
                name="requirements"
                placeholder="Requirements (comma-separated)"
                value={formData.requirements}
                onChange={handleChange}
                rows={3}
                className={`${textareaClass(
                  formData.requirements
                )} col-span-1 sm:col-span-2`}
              />
              <textarea
                name="skills"
                placeholder="Skills (comma-separated)"
                value={formData.skills}
                onChange={handleChange}
                rows={3}
                className={`${textareaClass(
                  formData.skills
                )} col-span-1 sm:col-span-2`}
              />
              <textarea
                name="benefits"
                placeholder="Benefits (comma-separated)"
                value={formData.benefits}
                onChange={handleChange}
                rows={3}
                className={`${textareaClass(
                  formData.benefits
                )} col-span-1 sm:col-span-2`}
              />
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className={selectClass(formData.jobType)}
              >
                <option value="" className="text-[#B1B1B1]">
                  Job Type
                </option>
                <option value="Full-Time" className="text-black">
                  Full-Time
                </option>
                <option value="Part-Time" className="text-black">
                  Part-Time
                </option>
                <option value="Contract" className="text-black">
                  Contract
                </option>
                <option value="Internship" className="text-black">
                  Internship
                </option>
              </select>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className={selectClass(formData.experienceLevel)}
              >
                <option value="" className="text-[#B1B1B1]">
                  Experience Level
                </option>
                <option value="0-1" className="text-black">
                  0-1 year
                </option>
                <option value="1-2" className="text-black">
                  1-2 years
                </option>
                <option value="3-5" className="text-black">
                  3-5 years
                </option>
                <option value="5+" className="text-black">
                  5+ years
                </option>
              </select>
              <input
                type="number"
                name="salaryMin"
                placeholder="Salary Min"
                value={formData.salaryMin}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="number"
                name="salaryMax"
                placeholder="Salary Max"
                value={formData.salaryMax}
                onChange={handleChange}
                className={inputClass}
              />
              <select
                name="salaryCurrency"
                value={formData.salaryCurrency}
                onChange={handleChange}
                className={selectClass(formData.salaryCurrency)}
              >
                <option value="INR" className="text-black">
                  INR
                </option>
                <option value="USD" className="text-black">
                  USD
                </option>
                <option value="EUR" className="text-black">
                  EUR
                </option>
              </select>
              <select
                name="locationType"
                value={formData.locationType}
                onChange={handleChange}
                className={selectClass(formData.locationType)}
              >
                <option value="" className="text-[#B1B1B1]">
                  Location Type
                </option>
                <option value="onsite" className="text-black">
                  Onsite
                </option>
                <option value="remote" className="text-black">
                  Remote
                </option>
                <option value="hybrid" className="text-black">
                  Hybrid
                </option>
              </select>
              <input
                type="text"
                name="locationPlace"
                placeholder="Location Place"
                value={formData.locationPlace}
                onChange={handleChange}
                className={inputClass}
              />
              <label className="col-span-1 sm:col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isUrgent"
                  checked={formData.isUrgent}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <span className="text-[18px] text-gray-700">Is Urgent</span>
              </label>
              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                className={`${inputClass} col-span-1 sm:col-span-2 ${
                  formData.applicationDeadline ? "text-black" : "text-[#B1B1B1]"
                }`}
              />

              {/* Buttons */}
              <div className="col-span-1 sm:col-span-2 flex justify-center gap-6 mt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary text-white px-8 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-primary"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditJobModal;
