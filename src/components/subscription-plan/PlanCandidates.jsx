"use client";
import {
  getAllSubscriptionPlansAPI,
  getCandidatesByPlanAPI,
} from "@/src/services/allAPI";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSlidersH, FaEye } from "react-icons/fa";
import { LuChevronDown } from "react-icons/lu";
import Swal from "sweetalert2";

const PlanCandidates = () => {
  const [selectedPlanName, setSelectedPlanName] = useState("All");
  const [selectedPlanId, setSelectedPlanId] = useState(""); // <-- store ID for API
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [candidates, setCandidates] = useState([]);
  const [plans, setPlans] = useState([]);

  const handleFetchCandidates = async (planId = "") => {
    try {
      const queryParams = {
        page,
        limit,
        planId: planId || "",
      };

      const result = await getCandidatesByPlanAPI(queryParams);

      if (result.status === 200) {
        setCandidates(result.data.users || []);
        setTotalPages(result.data.totalPages || 1);
      } else {
        Swal.fire({
          icon: "error",
          title: result?.response?.data?.message || "Error fetching users",
        });
      }
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
    }
  };

  const fetchPlans = async () => {
    try {
      const result = await getAllSubscriptionPlansAPI();
      if (result.status === 200) {
        setPlans(result.data.plans || []);
      }
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  // initial load
  useEffect(() => {
    fetchPlans();
  }, []);

  // fetch candidates whenever page changes
  useEffect(() => {
    handleFetchCandidates(selectedPlanId);
  }, [page]);

  const handlePlanSelect = (plan) => {
    setSelectedPlanName(plan ? plan.name : "All");
    setSelectedPlanId(plan ? plan._id : ""); // API needs ID
    setDropdownOpen(false);
    setPage(1); // reset to first page when filtering
    handleFetchCandidates(plan ? plan._id : "");
  };

  return (
    <section className="w-full bg-white ">
      <div className="container">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b border-gray-300 md:py-10 py-3 mb-4">
          <h2 className="md:text-[24px] text-[20px] font-normal">
            Plan Candidates
          </h2>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-[8px] px-4 py-[8px] text-[15px] text-white bg-primary transition"
            >
              <FaSlidersH className="text-[16px]" />
              {selectedPlanName === "All" ? "Filter by Plan" : selectedPlanName}
              <LuChevronDown
                className={`transition-transform ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-md z-20">
                <button
                  onClick={() => handlePlanSelect(null)}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    selectedPlanName === "All" ? "bg-gray-200 font-medium" : ""
                  }`}
                >
                  All
                </button>

                {plans.map((plan, index) => (
                  <button
                    key={index}
                    onClick={() => handlePlanSelect(plan)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      selectedPlanId === plan._id
                        ? "bg-gray-200 font-medium"
                        : ""
                    }`}
                  >
                    {plan.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="scrollbar-hide overflow-x-auto pb-10">
          <table className="min-w-full text-left text-sm border-collapse whitespace-nowrap">
            <thead>
              <tr className="md:text-[18px] text-[16px] text-black">
                <th className="py-3 px-6 font-semibold">No</th>
                <th className="py-3 px-6 font-semibold">Name</th>
                <th className="py-3 px-6 font-semibold">Email</th>
                <th className="py-3 px-6 font-semibold">Plan</th>
                <th className="py-3 px-6 font-semibold">Start Date</th>
                <th className="py-3 px-6 font-semibold">End Date</th>
                <th className="py-3 px-6 font-semibold">
                  Applied (This Month)
                </th>
                <th className="py-3 px-6 font-semibold">Total Applications</th>
                <th className="py-3 px-6 font-semibold">Status</th>
                <th className="py-3 px-6 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {candidates.length > 0 ? (
                candidates.map((candidate, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <td className="py-5 px-6">{index + 1}</td>
                    <td className="py-5 px-6 font-medium">{candidate.name}</td>
                    <td className="py-5 px-6">{candidate.email}</td>
                    <td className="py-5 px-6">{candidate.planName}</td>
                    <td className="py-5 px-6">{candidate.startDate}</td>
                    <td className="py-5 px-6">{candidate.endDate}</td>
                    <td className="py-5 px-6">
                      {candidate.totalApplicationsThisMonth}
                    </td>
                    <td className="py-5 px-6">
                      {candidate.totalAppliedOverall}
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            candidate.planStatus ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        {candidate.status}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center text-[18px]">
                      <Link
                        href={`/plan-candidates/view/${candidate._id}`}
                        className="text-gray-800 hover:text-black"
                      >
                        <FaEye />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="py-5 px-6 text-center text-[18px] text-primary"
                  >
                    No candidates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
    </section>
  );
};

export default PlanCandidates;
