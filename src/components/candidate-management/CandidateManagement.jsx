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
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetAllCandidates = async () => {
    try {
      setIsLoading(true);

      const queryParams = {
        page,
        limit,
        search: searchTerm, // ⬅️ send search to backend
      };

      const result = await getAllCandidatesAPI(queryParams);

      if (result.status === 200) {
        setCandidates(result.data.data || []);
        setTotalPages(result.data.totalPages || 1);
      } else {
        // console.log(result.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (candidateId) => {
    try {
      const result = await getToggleCandidateStatusAPI(candidateId);

      if (result.status === 200 && result.data?.success) {
        setCandidates((prev) =>
          prev.map((item) =>
            item._id === candidateId
              ? { ...item, status: result.data.data.status }
              : item
          )
        );
      } else {
        // console.log(result.response?.data?.message || "Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ⬅️ search + pagination both hit backend
  useEffect(() => {
    handleGetAllCandidates();
  }, [page, searchTerm]);

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <div className="flex flex-col justify-between items-start border-b border-gray-300 gap-6 md:py-10 py-0 pb-3 mb-4">
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
              onChange={(e) => {
                setPage(1); // reset pagination on new search
                setSearchTerm(e.target.value);
              }}
            />
          </div>

          {/* <div className="md:w-[20%] w-full flex items-center md:justify-start justify-end">
            <button className="flex shrink-0 items-center gap-2 rounded-[8px] px-4 py-[6px] text-[15px] text-white bg-primary transition">
              <FaSlidersH className="text-[16px]" />
              Filter By Skills
              <LuChevronDown />
            </button>
          </div> */}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center w-full py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="ml-2 text-primary">Loading...</p>
          </div>
        ) : (
          <table className="min-w-full text-left text-sm border-collapse whitespace-nowrap">
            <thead>
              <tr className="md:text-[18px] text-[16px] text-black">
                <th className="py-3 px-6 font-semibold">No</th>
                <th className="py-3 px-6 font-semibold">Name</th>
                <th className="py-3 px-6 font-semibold">Phone</th>
                <th className="py-3 px-6 font-semibold">Email</th>
                <th className="py-3 px-6 font-semibold">Location</th>
                <th className="py-3 px-6 font-semibold">Status</th>
                <th className="py-3 px-6 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {candidates.map((candidate, index) => (
                <tr
                  key={candidate._id}
                  className="border-b border-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <td className="py-5 px-6 text-black">{index + 1}</td>
                  <td className="py-5 px-6 text-black font-medium">
                    {candidate.firstName}
                  </td>
                  <td className="py-5 px-6 text-black">
                    {candidate?.profile?.phone || "-"}
                  </td>
                  <td className="py-5 px-6 text-black">{candidate.email}</td>
                  <td className="py-5 px-6 text-black">
                    {candidate?.profile?.location || "-"}
                  </td>

                  <td className="py-5 px-6">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          candidate.status === "active"
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
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    >
                      {candidate.status === "active" ? "Block" : "Unblock"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrevPage}
            disabled={page === 1 || isLoading}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={page === totalPages || isLoading}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CandidateManagement;
