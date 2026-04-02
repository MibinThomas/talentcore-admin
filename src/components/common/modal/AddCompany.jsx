"use client";
import { addNewComapanyAPI } from "@/src/services/allAPI";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";

function AddCompanyModal({ onAdded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    companySize: "",
    foundedYear: "",
    website: "",
    description: "",
    place: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        name,
        industry,
        companySize,
        foundedYear,
        website,
        description,
        place,
      } = formData;
      if (
        !name ||
        !industry ||
        !companySize ||
        !foundedYear ||
        !website ||
        !description ||
        !place
      ) {
        Swal.fire({
          icon: "info",
          title: "Error",
          text: "Please fill in all the required fields.",
        });
        return;
      } else {
        const result = await addNewComapanyAPI(formData);
        if (result.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: result?.data?.message,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            setIsOpen(false);
            setFormData({
              name: "",
              industry: "",
              companySize: "",
              foundedYear: "",
              website: "",
              description: "",
              place: "",
            });
          });
          // Trigger refresh in parent
          if (onAdded) onAdded();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: result?.response?.data?.message,
          });
        }
      }
    } catch (error) {}
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary text-white text-[18px] px-10 py-2 leading-none flex items-center justify-center gap-2 rounded-[10px] w-max"
      >
        Add Company <FaPlus />
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
            className="bg-white rounded-2xl shadow-lg w-full max-w-[650px] p-6 md:p-8 relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <IoClose size={24} />
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-900">
              Add New Company
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Fill in the details to register a new company
            </p>

            {/* Form */}
            <form className="scrollbar-hide grid grid-cols-1 sm:grid-cols-2 md:gap-4 gap-2 max-h-[350px]  overflow-y-auto">
              <input
                type="text"
                name="name"
                placeholder="Company Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="md:col-span-1 col-span-2 text-[18px] text-black border border-t-0 border-gray-200 rounded-[10px] px-3 py-2 w-full focus:outline-none  placeholder:text-[#B1B1B1] shadow-[0px_3px_4.3px_-1px_#00000036]"
              />
              <input
                type="url"
                name="website"
                placeholder="Website"
                value={formData.website}
                onChange={handleChange}
                className="md:col-span-1 col-span-2 text-[18px] text-black border border-t-0 border-gray-200 rounded-[10px] px-3 py-2 w-full focus:outline-none  placeholder:text-[#B1B1B1] shadow-[0px_3px_4.3px_-1px_#00000036] "
              />
              <input
                type="text"
                name="place"
                placeholder="Location"
                value={formData.place}
                onChange={handleChange}
                className="md:col-span-1 col-span-2 text-[18px] text-black border border-t-0 border-gray-200 rounded-[10px] px-3 py-2 w-full focus:outline-none  placeholder:text-[#B1B1B1] shadow-[0px_3px_4.3px_-1px_#00000036]"
              />
              <input
                type="text"
                name="foundedYear"
                placeholder="year"
                value={formData.founded}
                onChange={handleChange}
                className="md:col-span-1 col-span-2 text-[18px] text-black border border-t-0 border-gray-200 rounded-[10px] px-3 py-2 w-full focus:outline-none  placeholder:text-[#B1B1B1] shadow-[0px_3px_4.3px_-1px_#00000036]"
              />
              <input
                type="text"
                name="industry"
                placeholder="Industry"
                value={formData.industry}
                onChange={handleChange}
                className="md:col-span-1 col-span-2 text-[18px] text-black border border-t-0 border-gray-200 rounded-[10px] px-3 py-2 w-full focus:outline-none  placeholder:text-[#B1B1B1] shadow-[0px_3px_4.3px_-1px_#00000036]"
              />

              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className={`md:col-span-1 col-span-2 text-[18px] border border-t-0 border-gray-200 rounded-[10px] px-3 py-2 w-full focus:outline-none shadow-[0px_3px_4.3px_-1px_#00000036] ${
                  formData.companySize ? "text-black" : "text-[#B1B1B1]"
                }`}
              >
                <option value="" className="text-[#B1B1B1]">
                  Company Size
                </option>
                <option value="1-10" className="text-black">
                  1-10
                </option>
                <option value="11-50" className="text-black">
                  11-50
                </option>
                <option value="51-200" className="text-black">
                  51-200
                </option>
                <option value="200+" className="text-black">
                  200+
                </option>
              </select>
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-2 text-[18px] text-black border border-t-0 border-gray-200 rounded-[10px] px-3 py-2 w-full focus:outline-none  placeholder:text-[#B1B1B1] shadow-[0px_3px_4.3px_-1px_#00000036]"
              ></textarea>
              {/* Buttons */}
              <div className="col-span-1 sm:col-span-2 flex justify-center gap-6 mt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-primary text-white px-8 py-2 rounded-lg hover:bg-primary/90"
                >
                  Submit
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

export default AddCompanyModal;
