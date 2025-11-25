// src/components/jobs/job-details/JobDetailsPage.jsx
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import CompanyOverview from "./CompanyOverview.jsx";
import { useRouter } from "next/navigation";
import {
  LuArrowLeft,
  LuArrowRight,
  LuCalendar,
  LuClock,
  LuMapPin,
  LuUsersRound,
  LuWallet,
} from "react-icons/lu";
import { getJobDetailsByIdAPI } from "@/src/services/allAPI.js";
import Swal from "sweetalert2";

function JobDetailsPage({ jobId }) {
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log(jobId);

  const handleFetchJobDetails = async () => {
    setLoading(true);
    try {
      const result = await getJobDetailsByIdAPI(jobId);
      console.log("JobDetails", result.data.job);

      if (result.status === 200) {
        setLoading(false);
        setJob(result.data.job);
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || "Failed to fetch job details.";
      Swal.fire("Error", errorMsg, "error");
      console.error("Error fetching job details:", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToApplicantsPage = () => {
    router.push(`/jobs/jobs-management/view/${jobId}/applied-candidates`);
  };

  useEffect(() => {
    handleFetchJobDetails();
  }, [jobId]);

  if (loading) {
    return <div>Loading job details...</div>; // Simple loading fallback
  }

  // Format salary string
  const salaryText = job?.salary
    ? `${job.salary.min} - ${job.salary.max} ${job.salary.currency}`
    : "Not specified";

  return (
    <section className="w-full min-h-screen md:py-10 py-6">
      <div className="container">
        <div className="job-details__header bg-white border border-[#DBDBDB] rounded-[13px] lg:px-8 lg:py-4 md:p-4 p-2">
          <div className="flex items-center justify-between">
            <div className="back-to-home__btn">
              <Link
                href="/jobs/jobs-management"
                className="text-black/80 font-normal text-[16px] leading-[1.2] flex items-center gap-2 hover:text-[#872CD1] hover:translate-x-[-10px] transition-all duration-300"
              >
                <LuArrowLeft size={20} className="text-[#4D008C]" />
                Back to job listing
              </Link>
            </div>
          </div>

          <div className="job-details__header-content p-4">
            <div className="leading-none text-start border-b border-gray-300 pb-6">
              <h1 className="Job__title text-primary font-bold md:text-[48px] text-[30px] mb-2">
                {job?.title}
              </h1>
              <div className="flex md:items-center text-start justify-between md:flex-row flex-col gap-2">
                <span className="job__company-name md:text-[20px] text-[16px] text-[#6D758F] font-semibold">
                  {job?.companyId?.name || "Company Name"}
                </span>
                <div className="flex items-center lg:justify-start justify-between gap-8 mt-2">
                  <span className="text-secondary lg:text-[18px] text-[16px] font-medium">
                    Posted {new Date(job.createdAt).toDateString()}
                  </span>
                  <span className="text-secondary lg:text-[18px] text-[16px] font-medium">
                    {job.experienceLevel || "N/A"} yrs
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between md:flex-row flex-col pt-6">
              {/* location, salary, posted time */}
              <div className="flex md:items-center md:flex-row flex-col md:gap-8 gap-3 text-gray-600 text-[14px]">
                {/* Location */}
                <div className="flex items-center gap-3 leading-none">
                  <LuMapPin size={18} className="text-gray-500" />
                  <span className="text-primary font-normal lg:text-[16px] text-[14px]">
                    {job.location?.place || "Not specified"}
                  </span>
                </div>

                {/* Salary */}
                <div className="flex items-center gap-3 leading-none">
                  <LuWallet size={18} className="text-gray-500" />
                  <span className="text-primary font-normal lg:text-[16px] text-[14px]">
                    {salaryText}
                  </span>
                </div>

                {/* Posted Time */}
                <div className="flex items-center gap-3 leading-none">
                  <LuClock size={18} className="text-gray-500" />
                  <span className="text-primary font-normal lg:text-[16px] text-[14px]">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {/* Total Applicants */}
                <div className="flex items-center gap-3 leading-none">
                  <LuUsersRound size={18} className="text-gray-500" />
                  <span className="text-primary font-normal lg:text-[16px] text-[14px]">
                    {job?.totalApplications || 0} applicants
                  </span>
                </div>
              </div>
              <button
                onClick={handleNavigateToApplicantsPage}
                className={`bg-primary px-2 py-2 text-[14px] text-white ${
                  job?.totalApplications === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#6D0080]"
                } rounded-md mt-4 md:mt-0 flex items-center justify-center gap-2  `}
                disabled={job?.totalApplications === 0}
              >
                View Applicants{" "}
                <LuArrowRight size={16} className="inline-block ml-1" />
              </button>
            </div>
          </div>
        </div>
        <div className="job-details grid lg:grid-cols-12 grid-cols-1 gap-4 mt-6">
          <div className="lg:col-span-8 col-span-1">
            <div className="w-full flex flex-col md:gap-4 gap-3">
              <div className="job__description w-full rounded-[13px] border border-[#D9D9D9] md:px-8 md:py-6 p-4">
                <h4 className="font-semibold text-black md:text-[30px] text-[24px] mb-4">
                  Job Description
                </h4>
                <p className="content text-[#303030] md:text-[16px] text-[14px]">
                  {job.description}
                </p>
              </div>

              {/* Key Responsibilities */}
              {job.responsibilities?.length > 0 && (
                <div className="job__description w-full rounded-[13px] border border-[#D9D9D9] md:px-8 md:py-6 p-4">
                  <h4 className="font-semibold text-black md:text-[30px] text-[24px] mb-4">
                    Key Responsibilities
                  </h4>
                  <div className="md:pl-8 pl-6">
                    <ol className="list-disc flex flex-col gap-3">
                      {job.responsibilities.map((value, index) => (
                        <li
                          key={index}
                          className="content text-[#303030] md:text-[16px] text-[14px]"
                        >
                          {value}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}

              {/* Requirements */}
              {job?.requirements && job?.requirements.length > 0 && (
                <div className="job__description w-full rounded-[13px] border border-[#D9D9D9] md:px-8 md:py-6 p-4">
                  <h4 className="font-semibold text-black md:text-[30px] text-[24px] mb-4">
                    Requirements
                  </h4>
                  <div className="md:pl-8 pl-6">
                    <ol className="list-disc flex flex-col gap-3">
                      {job?.requirements.map((value, index) => (
                        <li
                          key={index}
                          className="content text-[#303030] md:text-[16px] text-[14px]"
                        >
                          {value}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}

              {/* Skills */}
              {job?.skills && job?.skills.length > 0 && (
                <div className="job__description w-full rounded-[13px] border border-[#D9D9D9] md:px-8 md:py-6 p-4">
                  <h4 className="font-semibold text-black md:text-[30px] text-[24px] mb-4">
                    Skills
                  </h4>
                  <div className="">
                    <div className="flex items-center justify-start md:gap-6 gap-3 flex-wrap">
                      {job?.skills.map((value, index) => (
                        <span
                          key={index}
                          className="content text-secondary font-medium md:text-[16px] text-[14px] border border-[#872CD1] px-3 py-1 rounded-[5px]"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits and Perks */}
              {job?.benefits && job?.benefits.length > 0 && (
                <div className="job__description w-full rounded-[13px] border border-[#D9D9D9] md:px-8 md:py-6 p-4">
                  <h4 className="font-semibold text-black md:text-[30px] text-[24px] mb-4">
                    Benefits and Perks
                  </h4>
                  <div className="md:pl-8 pl-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left column */}
                    <ol className="list-disc flex flex-col gap-3">
                      {job?.benefits
                        .slice(0, Math.ceil(job?.benefits.length / 2))
                        .map((value, index) => (
                          <li
                            key={index}
                            className="content text-[#303030] md:text-[16px] text-[14px]"
                          >
                            {value}
                          </li>
                        ))}
                    </ol>

                    {/* Right column */}
                    <ol className="list-disc flex flex-col gap-3">
                      {job?.benefits
                        .slice(Math.ceil(job?.benefits.length / 2))
                        .map((value, index) => (
                          <li
                            key={index}
                            className="content text-[#303030] md:text-[16px] text-[14px]"
                          >
                            {value}
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Company Overview and Similar Jobs - Right Section */}
          <div className="lg:col-span-4 col-span-1">
            <div className="flex flex-col gap-4">
              <div className="flex border border-[#D9D9D9] p-6 rounded-[13px]">
                <CompanyOverview companyDetails={job?.companyId} />{" "}
                {/* Pass company data if needed */}
              </div>

              {/* Deadline */}
              <div className="flex border border-[#FDE78B] bg-[#FEFAEA] p-6 rounded-[13px]">
                <div className="flex items-center justify-start gap-2">
                  <span>
                    <LuCalendar size={24} className="text-[#F97300]" />
                  </span>
                  <div className="leading-none">
                    <h6 className="text-[#B67C57] font-semibold text-[16px]">
                      Application Deadline
                    </h6>
                    <span className="text-[#D39672] text-[14px]">
                      {new Date(job.applicationDeadline).toDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JobDetailsPage;
