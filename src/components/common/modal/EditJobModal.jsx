"use client";
import { updateJobDetailsByIdAPI, getAllCompaniesAPI } from "@/src/services/allAPI";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";

function EditJobModal({ job, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState([]);

  const [formData, setFormData] = useState({
    companyId: "",
    title: "",
    description: "",
    responsibilities: [""],
    requirements: [""],
    skills: [""],
    benefits: [""],
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

  // ✅ Fetch all companies for dropdown
  const fetchCompanies = async () => {
    try {
      const result = await getAllCompaniesAPI();
      if (result.status === 200) {
        setCompanies(result.data?.companies || result.data || []);
      }
    } catch (err) {
      console.error("Error fetching companies:", err);
    }
  };

  // ✅ Prefill form when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchCompanies();
      if (job) {
        setFormData({
          companyId: job?.companyId?._id || job?.companyId || "",
          title: job?.title || "",
          description: job?.description || "",
          responsibilities: job?.responsibilities?.length
            ? job.responsibilities
            : [""],
          requirements: job?.requirements?.length ? job.requirements : [""],
          skills: job?.skills?.length ? job.skills : [""],
          benefits: job?.benefits?.length ? job.benefits : [""],
          jobType: job?.jobType || "",
          experienceLevel: job?.experienceLevel || "",
          salaryMin: job?.salary?.min || "",
          salaryMax: job?.salary?.max || "",
          salaryCurrency: job?.salary?.currency || "INR",
          locationType: job?.location?.type || "",
          locationPlace: job?.location?.place || "",
          isUrgent: job?.isUrgent || false,
          applicationDeadline: job?.applicationDeadline
            ? job.applicationDeadline.split("T")[0]
            : "",
        });
      }
    }
  }, [isOpen, job]);

  // --- Handlers ---
  const handleArrayChange = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const handleAddField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const handleRemoveField = (field, index) => {
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updated });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const reqBody = {
        companyId: formData.companyId,
        title: formData.title,
        description: formData.description,
        responsibilities: formData.responsibilities.filter((r) => r.trim() !== ""),
        requirements: formData.requirements.filter((r) => r.trim() !== ""),
        skills: formData.skills.filter((r) => r.trim() !== ""),
        benefits: formData.benefits.filter((r) => r.trim() !== ""),
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

      const result = await updateJobDetailsByIdAPI(job._id, reqBody);

      if (result?.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Job Updated",
          text: result?.data?.message || "Job updated successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        if (onUpdate) onUpdate();
        setIsOpen(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            result?.response?.data?.message ||
            result?.data?.message ||
            "Failed to update job.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while updating the job.",
      });
      console.error("Update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "text-[16px] border border-gray-200 rounded-[10px] px-3 py-2 w-full focus:outline-none placeholder:text-[#B1B1B1] shadow-sm";

  const renderDynamicField = (label, field) => (
    <div className="col-span-1 sm:col-span-2">
      <label className="block text-gray-700 text-[15px] mb-2">{label}</label>
      <div className="space-y-2">
        {formData[field].map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder={`${label} ${index + 1}`}
              value={item}
              onChange={(e) => handleArrayChange(field, index, e.target.value)}
              className={`${inputClass} flex-1`}
            />
            {formData[field].length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveField(field, index)}
                className="text-red-500 hover:text-red-600 text-sm font-medium"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => handleAddField(field)}
        className="flex items-center gap-2 text-primary text-[15px] mt-2 hover:text-primary/80"
      >
        + Add {label}
      </button>
    </div>
  );

  return (
    <>
      {/* Trigger */}
      <button onClick={() => setIsOpen(true)} className="text-white">
        <AiOutlineEdit size={22} />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-lg w-full max-w-[650px] p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <IoClose size={24} />
            </button>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Edit Job Details
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Update the job information below.
            </p>

            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Company Dropdown */}
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-gray-700 text-[15px] mb-2">
                  Select Company
                </label>
                <select
                  name="companyId"
                  value={formData.companyId}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select Company</option>
                  {companies.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                name="title"
                placeholder="Job Title"
                value={formData.title}
                onChange={handleChange}
                className={inputClass}
              />

              <textarea
                name="description"
                placeholder="Job Description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`${inputClass} col-span-1 sm:col-span-2`}
              />

              {renderDynamicField("Responsibilities", "responsibilities")}
              {renderDynamicField("Requirements", "requirements")}
              {renderDynamicField("Skills", "skills")}
              {renderDynamicField("Benefits", "benefits")}

              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Job Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>

              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Experience Level</option>
                <option value="0-1">0-1 year</option>
                <option value="1-2">1-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
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
                className={inputClass}
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>

              <select
                name="locationType"
                value={formData.locationType}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Location Type</option>
                <option value="onsite">Onsite</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
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
                />
                <span className="text-[15px] text-gray-700">Is Urgent</span>
              </label>

              <div className="flex flex-col col-span-1 sm:col-span-2">
                <label className="text-gray-700 text-[15px] mb-2">
                  Application Deadline
                </label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="col-span-1 sm:col-span-2 flex justify-center gap-6 mt-4">
                <button
                  onClick={handleUpdateJob}
                  type="button"
                  disabled={isLoading}
                  className="bg-primary text-white px-8 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-primary"
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
