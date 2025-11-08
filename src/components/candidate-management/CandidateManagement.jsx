"use client";
import {
  getAllCandidatesAPI,
  getToggleCandidateStatusAPI,
} from "@/src/services/allAPI";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSlidersH, FaEye } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { LuChevronDown } from "react-icons/lu";

const CandidateManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [candidates, setCandidates] = useState([]);

  const handleGetAllCandidates = async () => {
    try {
      const result = await getAllCandidatesAPI();
      if (result.status === 200) {
        setCandidates(result.data.data);
      } else {
        console.log(result.response.data.message);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // const candidates = [
  //   {
  //     id: "#01",
  //     name: "John Doe",
  //     contact: "+91 9876543210",
  //     email: "John@gmail.com",
  //     education: "BCA",
  //     location: "Kochi, India",
  //     status: "Active",
  //   },
  //   {
  //     id: "#02",
  //     name: "John Doe",
  //     contact: "+91 9876543210",
  //     email: "John@gmail.com",
  //     education: "BBA",
  //     location: "Calicut, India",
  //     status: "Inactive",
  //   },
  //   {
  //     id: "#03",
  //     name: "John Doe",
  //     contact: "+91 9876543210",
  //     email: "John@gmail.com",
  //     education: "BCOM",
  //     location: "Calicut, India",
  //     status: "Active",
  //   },
  //   {
  //     id: "#04",
  //     name: "John Doe",
  //     contact: "+91 9876543210",
  //     email: "John@gmail.com",
  //     education: "BCA",
  //     location: "Kochi, India",
  //     status: "Active",
  //   },
  // ];

  const handleToggleStatus = async (candidateId) => {
    try {
      const result = await getToggleCandidateStatusAPI(candidateId);

      if (result.status === 200 && result.data?.success) {
        // Update state to reflect new status returned by backend
        setCandidates((prev) =>
          prev.map((item) =>
            item._id === candidateId
              ? { ...item, status: result.data.data.status }
              : item
          )
        );

        console.log(result.data.message);
      } else {
        console.log(
          result.response?.data?.message ||
            result.data?.message ||
            "Failed to toggle status"
        );
      }

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCandidates = candidates.filter((item) =>
    item.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    const fetch = async () => {
      handleGetAllCandidates();
    };
    fetch();
  }, []);
  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <div className="flex flex-col  justify-between items-start border-b border-gray-300 gap-6 md:py-10 py-0 pb-3 mb-4">
        <h2 className="md:text-[24px] text-[20px] font-normal w-max text-[#A9A9A9]">
          Dashboard / <span className="text-black">Candidate Management</span>
        </h2>

        {/* Search & Filter */}
        <div className="w-full flex md:flex-row flex-col items-center justify-start gap-3">
          <div className="md:w-[80%] w-full flex items-center border border-gray-300 rounded-lg px-3 py-1.5 ">
            <IoSearchOutline className="text-gray-500 text-[18px]" />
            <input
              type="text"
              placeholder="Search"
              className="ml-2 w-full outline-none bg-transparent text-[15px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-[20%] w-full flex items-center md:justify-start justify-end">
            <button className="flex shrink-0 items-center gap-2  rounded-[8px] px-4 py-[6px] text-[15px] text-white bg-primary transition">
              <FaSlidersH className="text-[16px]" />
              Filter By Skills
              <LuChevronDown />
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm border-collapse whitespace-nowrap">
          <thead>
            <tr className="md:text-[18px] text-[16px] text-black">
              <th className="py-3 px-6 font-semibold ">No</th>
              <th className="py-3 px-6 font-semibold ">Name</th>
              <th className="py-3 px-6 font-semibold ">Contact Number</th>
              <th className="py-3 px-6 font-semibold ">Email</th>
              <th className="py-3 px-6 font-semibold ">Education</th>
              <th className="py-3 px-6 font-semibold ">Location</th>
              <th className="py-3 px-6 font-semibold ">Status</th>
              <th className="py-3 px-6 font-semibold ">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-300 transition-colors"
              >
                <td className="py-5 px-6 text-black ">{index + 1}</td>
                <td className="py-5 px-6 text-black font-medium ">
                  {candidate.firstName}
                </td>
                <td className="py-5 px-6 text-black ">{candidate.contact}</td>
                <td className="py-5 px-6 text-black ">{candidate.email}</td>
                <td className="py-5 px-6 text-black ">{candidate.education}</td>
                <td className="py-5 px-6 text-black ">{candidate.location}</td>
                <td className="py-5 px-6 ">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        candidate.status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    <span className="text-gray-800">{candidate.status}</span>
                  </div>
                </td>
                <td className="py-3 px-6 flex items-center gap-4 text-[18px]">
                  <Link
                    href={`/candidate-management/view/${candidate._id}`}
                    className="text-gray-700 hover:text-black"
                  >
                    <FaEye />
                  </Link>

                  <button
                    onClick={() => handleToggleStatus(candidate._id)}
                    className={`px-3 py-1 rounded-md text-white text-[14px] ${
                      candidate.status === "active"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {candidate.status === "active" ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateManagement;
