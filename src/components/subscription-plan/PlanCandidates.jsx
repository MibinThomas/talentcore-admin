"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaSlidersH, FaEye } from "react-icons/fa";
import { LuChevronDown } from "react-icons/lu";

const PlanCandidates = () => {
  const [selectedPlan, setSelectedPlan] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const candidates = [
    {
      id: "#01",
      name: "John Doe",
      contact: "+91 9876543210",
      email: "john@gmail.com",
      education: "BCA",
      location: "Kochi, India",
      status: "Active",
      plan: "Basic",
    },
    {
      id: "#02",
      name: "Alice Mathew",
      contact: "+91 9123456780",
      email: "alice@gmail.com",
      education: "BBA",
      location: "Calicut, India",
      status: "Inactive",
      plan: "Pro",
    },
    {
      id: "#03",
      name: "Rahul Nair",
      contact: "+91 9876000000",
      email: "rahul@gmail.com",
      education: "BCOM",
      location: "Calicut, India",
      status: "Active",
      plan: "Premium",
    },
    {
      id: "#04",
      name: "Sneha Pillai",
      contact: "+91 9898989898",
      email: "sneha@gmail.com",
      education: "BCA",
      location: "Kochi, India",
      status: "Active",
      plan: "Basic",
    },
  ];

  const filteredCandidates =
    selectedPlan === "All"
      ? candidates
      : candidates.filter((c) => c.plan === selectedPlan);

  return (
    <section className="w-full bg-white ">
      <div className="container">
          {/* Header Section */}
          <div className="flex justify-between items-center border-b border-gray-300 md:py-10 py-3 mb-4">
  {/* Heading */}
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
      {selectedPlan === "All" ? "Filter by Plan" : selectedPlan}
      <LuChevronDown
        className={`transition-transform ${
          dropdownOpen ? "rotate-180" : "rotate-0"
        }`}
      />
    </button>

    {dropdownOpen && (
      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-md z-20">
        {["All", "Basic", "Pro", "Premium"].map((plan) => (
          <button
            key={plan}
            onClick={() => {
              setSelectedPlan(plan);
              setDropdownOpen(false);
            }}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
              selectedPlan === plan ? "bg-gray-200 font-medium" : ""
            }`}
          >
            {plan}
          </button>
        ))}
      </div>
    )}
  </div>
</div>

    
          {/* Table Section */}
          <div className="overflow-x-auto pb-10">
            <table className="min-w-full text-left text-sm border-collapse whitespace-nowrap">
              <thead>
                <tr className="md:text-[18px] text-[16px] text-black">
                  <th className="py-3 px-6 font-semibold">No</th>
                  <th className="py-3 px-6 font-semibold">Name</th>
                  <th className="py-3 px-6 font-semibold">Contact Number</th>
                  <th className="py-3 px-6 font-semibold">Email</th>
                  <th className="py-3 px-6 font-semibold">Education</th>
                  <th className="py-3 px-6 font-semibold">Location</th>
                  <th className="py-3 px-6 font-semibold">Plan</th>
                  <th className="py-3 px-6 font-semibold">Status</th>
                  <th className="py-3 px-6 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((candidate, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <td className="py-5 px-6 text-black">{candidate.id}</td>
                    <td className="py-5 px-6 text-black font-medium">
                      {candidate.name}
                    </td>
                    <td className="py-5 px-6 text-black">{candidate.contact}</td>
                    <td className="py-5 px-6 text-black">{candidate.email}</td>
                    <td className="py-5 px-6 text-black">{candidate.education}</td>
                    <td className="py-5 px-6 text-black">{candidate.location}</td>
                    <td className="py-5 px-6 text-black">{candidate.plan}</td>
                    <td className="py-5 px-6">
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
                    <td className="py-3 px-6 text-center text-[18px]">
                      <Link
                        href={`/plan-candidates/view/${index + 1}`}
                        className="text-gray-800 hover:text-black"
                      >
                        <FaEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </section>
  );
};

export default PlanCandidates;
