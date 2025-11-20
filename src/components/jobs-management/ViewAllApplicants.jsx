"use client";
import { getApplicantsByJobAPI } from "@/src/services/allAPI";
import { setLoading } from "@/src/store/slices/authSlice";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const ViewAllApplicants = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("applied");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Map each status to a color
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
    // console.log("JobId is ", jobId);
    try {
      setIsLoading(true);
      const queryParams = {
        status,
        jobId,
        page,
        limit,
      };

      const result = await getApplicantsByJobAPI(queryParams);

      if (result.status === 200) {
        const { applications, total } = result.data;

        if (!applications || applications.length === 0) {
          Swal.fire({
            icon: "info",
            title: "No Applicants Found",
            text: "No candidates are available for this job or status.",
            confirmButtonColor: "#000",
          });
        }

        setApplications(applications || []);
        setTotalPages(total || 1);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error Fetching Applicants",
          text: result?.response?.data?.message || "Something went wrong!",
        });
      }
    } catch (error) {
      console.log("Error fetching applicants:", error);
      Swal.fire({
        icon: "error",
        title: "Fetch Failed",
        text: "Unable to fetch applicants. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchApplicants();
  }, [page, status]);

  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <div className="flex flex-col justify-between items-start border-b border-gray-300 gap-6 md:py-10 py-0 pb-3 mb-4">
        <div>
          <h2 className="md:text-[24px] text-[20px] font-normal w-max text-[#A9A9A9] leading-none">
            <span className="text-black">Applicants Management</span>
          </h2>
          <p className="text-[16px] text-gray-600 mt-3">
            View and manage all applicants
          </p>
        </div>

        {/* Search */}
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
        </div>
      </div>

      {/* Loader */}
      {isLoading ? (
        <div className="flex justify-center items-center w-full py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="ml-2 text-primary">Loading...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm border-collapse whitespace-nowrap">
            <thead>
              <tr className="md:text-[18px] text-[16px] text-black">
                <th className="py-3 px-6 font-semibold ">Candidate Name</th>
                <th className="py-3 px-6 font-semibold ">Email</th>
                <th className="py-3 px-6 font-semibold ">Phone Number</th>
                <th className="py-3 px-6 font-semibold ">Status</th>
                <th className="py-3 px-6 font-semibold ">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((applicant, index) => {
                const candidate = applicant.candidateDetails || {};
                const fullName = `${candidate.firstName || ""} ${
                  candidate.lastName || ""
                }`.trim();

                return (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <td className="py-5 px-6 text-black font-medium ">
                      {fullName || "N/A"}
                    </td>
                    <td className="py-5 px-6 text-black ">
                      {candidate.email || "N/A"}
                    </td>
                    <td className="py-5 px-6 ">
                      {candidate.phoneNumber || "N/A"}
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${getStatusColor(
                            applicant.status
                          )}`}
                        ></span>
                        <span className="capitalize text-gray-800">
                          {applicant.status || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center text-[14px] ">
                      <button className="border border-gray-400 rounded-[5px] px-4 py-1 leading-none hover:bg-gray-200">
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewAllApplicants;
