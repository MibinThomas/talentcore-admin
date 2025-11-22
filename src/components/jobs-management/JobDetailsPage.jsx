// src/components/jobs/job-details/JobDetailsPage.jsx
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import CompanyOverview from "./CompanyOverview.jsx";
import { useRouter } from "next/navigation";
import {
  LuArrowLeft,
  LuBookmark,
  LuCalendar,
  LuClock,
  LuMapPin,
  LuShare2,
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

  // Dummy data for job details
  const jobDetails = {
    title: "Senior Frontend Developer",
    company: "TechCorp Innovations",
    location: "New York, NY, USA",
    salary: "$120,000 - $150,000 annually",
    postedTime: "Posted 2 days ago",
    totalApplicants: 25,
    description:
      "We are seeking a talented Senior Frontend Developer to join our dynamic team at TechCorp Innovations. In this role, you will be responsible for building responsive and engaging user interfaces using modern web technologies. You will collaborate closely with UX designers, backend developers, and product managers to deliver high-quality features that enhance user experience. If you have a passion for clean code, performance optimization, and innovative design, this is the perfect opportunity for you.",
    responsibilities: [
      "Develop and maintain user-facing features using React.js and TypeScript",
      "Collaborate with designers to implement pixel-perfect UI components",
      "Optimize application performance and ensure cross-browser compatibility",
      "Integrate APIs and third-party services to enhance functionality",
      "Conduct code reviews and mentor junior developers on best practices",
      "Stay updated with the latest frontend trends and tools",
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of professional experience in frontend development",
      "Proficiency in JavaScript, React, and state management libraries (e.g., Redux)",
      "Strong understanding of HTML5, CSS3, and responsive design principles",
      "Experience with build tools like Webpack or Vite",
      "Excellent problem-solving skills and attention to detail",
      "Ability to work in a fast-paced, agile environment",
    ],
    skills: [
      "React",
      "TypeScript",
      "JavaScript (ES6+)",
      "CSS/SCSS",
      "Git",
      "Webpack",
      "RESTful APIs",
    ],
    benefits: [
      "Competitive salary and performance-based bonuses",
      "Comprehensive health, dental, and vision insurance",
      "401(k) retirement plan with company matching",
      "Unlimited paid time off and flexible working hours",
      "Professional development budget for courses and conferences",
      "Remote work options and home office stipend",
      "Team-building events and wellness programs",
      "Stock options and employee referral bonuses",
    ],
    deadline: "November 15, 2025",
    companyId: "techcorp-123", // Dummy company ID for CompanyOverview
  };

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
            {/* share and save buttons */}
            <div className="w-max flex items-center justify-end gap-4 ms-auto">
              <button className="w-max p-1 border border-gray-300 rounded-[5px]">
                <LuBookmark
                  strokeWidth={1.5}
                  size={22}
                  className="relative text-[#4D008C]"
                />
              </button>
              <button className="w-max p-1 border border-gray-300 rounded-[5px]">
                <LuShare2
                  strokeWidth={1.5}
                  size={22}
                  className="relative text-[#4D008C]"
                />
              </button>
            </div>
          </div>

          <div className="job-details__header-content p-4">
            <div className="leading-none text-start border-b border-gray-300 pb-6">
              <h1 className="Job__title text-primary font-bold md:text-[48px] text-[30px] mb-2">
                {job?.title}
              </h1>
              <div className="flex md:items-center text-start justify-between md:flex-row flex-col gap-2">
                <span className="job__company-name md:text-[20px] text-[16px] text-[#6D758F] font-semibold">
                  {job?.companyId?.companyName || "Company Name"}
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

            {/* location, salary, posted time */}
            <div className="flex md:items-center md:flex-row flex-col md:gap-8 gap-3 text-gray-600 text-[14px]  pt-6">
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
              {job?.requirements &&
                job?.requirements.length > 0 && (
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
                <CompanyOverview  companyDetails={job?.companyId}/> {/* Pass company data if needed */}
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
