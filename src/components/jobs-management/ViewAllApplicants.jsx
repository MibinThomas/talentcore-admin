"use client";
import {
  getApplicantsByJobAPI,
  updateApplicationStatusAPI,
} from "@/src/services/allAPI";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaEye } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { LuChevronDown } from "react-icons/lu";
import Swal from "sweetalert2";
import ScheduleInterviewModal from "../common/modal/ScheduleInterviewModal";

const ViewAllApplicants = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
  const [existingInterview, setExistingInterview] = useState(null); // ← Important

  const router = useRouter();

  const allStatuses = [
    "applied",
    "under-review",
    "short-listed",
    "rejected",
    "hired",
  ];

  const getStatusColor = (status) => {
    const colors = {
      applied: "bg-blue-500",
      "under-review": "bg-yellow-500",
      "short-listed": "bg-purple-500",
      rejected: "bg-red-500",
      hired: "bg-green-500",
    };
    return colors[status] || "bg-gray-400";
  };

  const handleFetchApplicants = async () => {
    try {
      setIsLoading(true);
      const queryParams = { status, jobId, page, limit };
      const result = await getApplicantsByJobAPI(queryParams);

      if (result.status === 200) {
        const { applications, total } = result.data;
        setApplications(applications || []);
        setTotalPages(total || 1);

        if (!applications || applications.length === 0) {
          Swal.fire({
            icon: "info",
            title: "No Applicants Found",
            text: "No candidates available for this job or status.",
            confirmButtonColor: "#000",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result?.response?.data?.message || "Something went wrong!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fetch Failed",
        text: "Unable to fetch applicants.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToView = (applicationId) => {
    router.push(
      `/jobs/jobs-management/view/${jobId}/applied-candidates/${applicationId}`
    );
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Change status to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update",
    });

    if (!confirm.isConfirmed) return;

    try {
      const result = await updateApplicationStatusAPI(applicationId, { status: newStatus });
      if (result.status === 200) {
        Swal.fire("Updated!", "Status updated successfully.", "success");
        handleFetchApplicants();
        setStatusDropdownOpen(null);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update status.", "error");
    }
  };

  // Open Modal — Detect if interview exists
  const handleOpenModal = (appId) => {
    const application = applications.find((app) => app._id === appId);
    const interview = application?.interviews?.[0] || null; // latest interview

    setApplicationId(appId);
    setExistingInterview(interview);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setApplicationId(null);
    setExistingInterview(null);
  };

  useEffect(() => {
    handleFetchApplicants();
  }, [page, status]);

  return (
    <div className="w-full bg-white">
      {/* Header & Filters */}
      <div className="flex flex-col justify-between items-start border-b border-gray-300 gap-6 md:py-10 py-0 pb-3 mb-4">
        <div>
          <h2 className="md:text-[24px] text-[20px] font-normal w-max text-[#A9A9A9] leading-none">
            <span className="text-black">Applicants Management</span>
          </h2>
          <p className="text-[16px] text-gray-600 mt-3">View and manage all applicants</p>
        </div>

        <div className="w-full flex md:flex-row flex-col items-center justify-start gap-3">
          <div className="md:w-[80%] w-full flex items-center border border-gray-300 rounded-lg px-3 py-1.5">
            <IoSearchOutline className="text-gray-500 text-[18px]" />
            <input
              type="text"
              placeholder="Search"
              className="ml-2 w-full outline-none bg-transparent text-[15px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-[8px] px-4 py-[8px] text-[15px] text-white bg-primary transition"
            >
              {status || "Filter Status"}
              <LuChevronDown className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-md z-20">
                <button
                  onClick={() => { setStatus(""); setPage(1); setDropdownOpen(false); }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${status === "" ? "bg-gray-200 font-medium" : ""}`}
                >
                  All
                </button>
                {allStatuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setStatus(s); setPage(1); setDropdownOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm capitalize hover:bg-gray-100 ${status === s ? "bg-gray-200 font-medium" : ""}`}
                  >
                    {s.replace("-", " ")}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="ml-2 text-primary">Loading...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm border-collapse whitespace-nowrap">
            <thead>
              <tr className="md:text-[18px] text-[16px] text-black">
                <th className="py-3 px-6 font-semibold">Candidate Name</th>
                <th className="py-3 px-6 font-semibold">Email</th>
                <th className="py-3 px-6 font-semibold">Phone Number</th>
                <th className="py-3 px-6 font-semibold">Status</th>
                <th className="py-3 px-6 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((applicant, index) => {
                const candidate = applicant.candidateDetails || {};
                const fullName = `${candidate.firstName || ""} ${candidate.lastName || ""}`.trim();
                const hasInterview = applicant.interviews?.length > 0;

                return (
                  <tr key={applicant._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-5 px-6 text-black font-medium">{fullName || "N/A"}</td>
                    <td className="py-5 px-6 text-black">{candidate.email || "N/A"}</td>
                    <td className="py-5 px-6">{candidate.phoneNumber || "N/A"}</td>

                    <td className="py-5 px-6 relative">
                      <div
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setDropdownPosition({
                            top: rect.bottom + window.scrollY + 8,
                            left: rect.left + window.scrollX,
                          });
                          setStatusDropdownOpen(statusDropdownOpen === index ? null : index);
                        }}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor(applicant.status)}`}></span>
                        <span className="capitalize text-gray-800">{applicant.status || "N/A"}</span>
                        <LuChevronDown className="text-gray-600 ml-1" />
                      </div>
                    </td>

                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleNavigateToView(applicant._id)}
                          className="hover:text-[#4D008C] transition-all"
                        >
                          <FaEye />
                        </button>

                        {applicant.status === "short-listed" && (
                          <button
                            onClick={() => handleOpenModal(applicant._id)}
                            className="px-3 py-2 rounded-md bg-purple-700 text-white text-sm font-medium hover:bg-purple-800 flex items-center gap-2"
                          >
                            <FaCalendarAlt />
                            {hasInterview ? "Reschedule" : "Schedule"} Interview
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Status Dropdown */}
          {statusDropdownOpen !== null && (
            <div
              className="fixed z-50 bg-white shadow-lg border border-gray-300 rounded-md"
              style={{ top: dropdownPosition.top, left: dropdownPosition.left, width: "160px" }}
            >
              {allStatuses.map((s) => (
                <button
                  key={s}
                  className={`block w-full text-left px-4 py-2 text-sm capitalize hover:bg-gray-100 ${
                    applications[statusDropdownOpen]?.status === s ? "bg-gray-200 font-medium" : ""
                  }`}
                  onClick={() => {
                    handleStatusUpdate(applications[statusDropdownOpen]._id, s);
                  }}
                >
                  {s.replace("-", " ")}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <ScheduleInterviewModal
        isOpen={showModal}
        onClose={closeModal}
        applicationId={applicationId}
        existingInterview={existingInterview}
        onInterviewScheduled={handleFetchApplicants}
      />
    </div>
  );
};

export default ViewAllApplicants;