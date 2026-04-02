"use client";
import JobCard from "@/src/components/common/cards/JobCard";
import AddJobModal from "@/src/components/common/modal/AddJobModal";
import { fetchAllJobsAPI, getAllCompaniesAPI } from "@/src/services/allAPI";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

function JobManagement() {
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filters
  const [keyword, setKeyword] = useState("");
  const [jobType, setJobType] = useState("");
  const [companyId, setCompanyId] = useState(""); // Will be used later

  const handleFetchAllJobs = async () => {
    try {
      setIsLoading(true);
      const queryParams = {
        page,
        limit,
        keyword,
        jobType,
        ...(companyId && { companyId }), // only add when set
      };

      const result = await fetchAllJobsAPI(queryParams);
      // console.log(result);
      
      if (result.status === 200) {
        const { jobs, totalPages, page: currentPage } = result.data;
        setJobs(jobs || []);
        setTotalPages(totalPages || 1);
        setPage(currentPage || 1);
      } else {
        // console.log(result?.response?.data?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchAllCompanies = async () => {
    try {
      const result = await getAllCompaniesAPI();
      if (result.status === 200) {
        const companies = result.data.companies || [];
        setCompany(companies);
      } else {
        // console.log(result?.response?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleFetchAllCompanies();
  }, []);

  // console.log("Companies", company);

  useEffect(() => {
    handleFetchAllJobs();
  }, [page, jobType, keyword, companyId]); // triggers on page, filter, or place change

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    handleFetchAllJobs();
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <section className="w-full">
      <div className="container">
        {/* Header */}
        <div className="section__header flex items-center justify-between">
          <h3 className="text-[24px]">Job Management</h3>
          <AddJobModal />
        </div>

        {/* Search & Filter */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 py-10">
          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="md:w-[50%] w-full flex items-center border border-gray-300 rounded-lg px-3 py-1.5"
          >
            <IoSearchOutline className="text-gray-500 text-[18px]" />
            <input
              type="text"
              placeholder="Search job title or keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="ml-2 w-full outline-none bg-transparent text-[15px]"
            />
          </form>

          {/* Job Type Filter */}
          <select
            value={jobType}
            onChange={(e) => {
              setPage(1);
              setJobType(e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-[15px] bg-white"
          >
            <option value="">All Job Types</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contratct">Contract</option>
            <option value="Freelance">Freelance</option>
            <option value="Internship">Internship</option>
          </select>

          {/* Company Filter (future) */}
          {/* Company Filter */}
          <select
            value={companyId}
            onChange={(e) => {
              setPage(1);
              setCompanyId(e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-[15px] bg-white w-[220px]"
          >
            <option value="">All Companies</option>
            {company.length > 0 ? (
              company.map((comp) => (
                <option key={comp._id} value={comp._id}>
                  {comp.name}
                </option>
              ))
            ) : (
              <option disabled>No Companies Found</option>
            )}
          </select>
        </div>

        {/* Job Cards */}
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {isLoading ? (
            <div className="flex justify-center items-center w-full py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="ml-2 text-primary">Loading...</p>
            </div>
          ) : jobs.length > 0 ? (
            jobs.map((job, index) => (
              <JobCard
                key={index + job._id}
                job={job}
                onUpdate={handleFetchAllJobs}
              />
            ))
          ) : (
            <h1 className="text-[20px] text-gray-500">No Jobs Found</h1>
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
    </section>
  );
}

export default JobManagement;
