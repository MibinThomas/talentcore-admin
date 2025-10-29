// src/app/jobs/jobs-management/JobManagement.jsx
"use client";
import JobCard from "@/src/components/common/cards/JobCard";
import AddJobModal from "@/src/components/common/modal/AddJobModal";
import React from "react";
import { FaSlidersH } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { LuChevronDown } from "react-icons/lu";

function JobManagement() {
  return (
    <section className="w-full">
      <div className="container">
        <div className="section__header flex items-center justify-between">
            <h3 className="text-[24px] ">Job Management</h3>
          <AddJobModal />
        </div>
        {/* Search & Filter */}
        <div className="w-full flex md:flex-row flex-col items-center justify-start gap-3 py-10">
          <div className="md:w-[80%] w-full flex items-center border border-gray-300 rounded-lg px-3 py-1.5 ">
            <IoSearchOutline className="text-gray-500 text-[18px]" />
            <input
              type="text"
              placeholder="Search"
              className="ml-2 w-full outline-none bg-transparent text-[15px]"
            />
          </div>
          <div className="md:w-[20%] w-full flex items-center md:justify-start justify-end">
            <button className="flex shrink-0 items-center gap-2  rounded-[8px] px-4 py-[6px] text-[15px] text-white bg-primary transition">
              <FaSlidersH className="text-[16px]" />
              Filter 
              <LuChevronDown />
            </button>
          </div>
        </div>

        {/* View All Jobs*/}
        <div className="flex flex-wrap gap-4 items-center justify-center">
            {Array(10).fill(0).map((_,index) => <JobCard key={index}/>) || <JobCard/>}
        </div>
      </div>
    </section>
  );
}

export default JobManagement;
