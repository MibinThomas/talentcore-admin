"use client";
import CompanyCard from "@/src/components/common/cards/CompanyCard";
import AddCompanyModal from "@/src/components/common/modal/AddCompany";
import { getAllCompaniesAPI } from "@/src/services/allAPI";
import React, { useEffect, useState } from "react";
import { FaSlidersH } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { LuChevronDown } from "react-icons/lu";

function ViewAllCompanies() {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchterm, SetSearchTerm] = useState("");

  const handleFetchAllCompanies = async () => {
    try {
      setLoading(true);
      const result = await getAllCompaniesAPI();
      if (result.status === 200) {
        setCompanyData(result?.data?.companies || []);
      } else {
        // console.log(result?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    SetSearchTerm(e.target.value);
  };

  useEffect(() => {
    handleFetchAllCompanies();
  }, []);

  // Filter companies client-side (case-insensitive)
  const filteredCompanies = companyData.filter((c) => {
    if (!searchterm) return true;
    const q = searchterm.trim().toLowerCase();
    // adjust fields to search depending on your company object shape
    const name = (c.name || "").toString().toLowerCase();
    const industry = (c.industry || "").toString().toLowerCase();
    const place = (c.place || "").toString().toLowerCase();
    return name.includes(q) || industry.includes(q) || place.includes(q);
  });

  return (
    <section className="w-full">
      <div className="container">
        <div className="section__header flex items-center justify-between">
          <h3 className="text-[24px] ">View All Companies</h3>
          <AddCompanyModal onAdded={handleFetchAllCompanies} />
        </div>

        {/* Search & Filter */}
        <div className="w-full flex md:flex-row flex-col items-center justify-start gap-3 py-10">
          <div className="md:w-[80%] w-full flex items-center border border-gray-300 rounded-lg px-3 py-1.5 ">
            <IoSearchOutline className="text-gray-500 text-[18px]" />
            <input
              type="text"
              placeholder="Search"
              value={searchterm}
              onChange={handleSearchChange}
              className="ml-2 w-full outline-none bg-transparent text-[15px]"
            />
          </div>
          {/* <div className="md:w-[20%] w-full flex items-center md:justify-start justify-end">
            <button className="flex shrink-0 items-center gap-2  rounded-[8px] px-4 py-[6px] text-[15px] text-white bg-primary transition">
              <FaSlidersH className="text-[16px]" />
              Filter
              <LuChevronDown />
            </button>
          </div> */}
        </div>

        {/* View All Companies */}
        {loading ? (
          <div className="w-full h-[50vh] flex items-center justify-center">
            <span className="text-primary text-[20px]">
              Loading companies...
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {filteredCompanies?.length > 0 ? (
              filteredCompanies.map((item, index) => (
                <CompanyCard
                  key={item.id ?? index}
                  companyData={item}
                  onUpdate={handleFetchAllCompanies}
                />
              ))
            ) : (
              <div className="w-full h-[50vh] flex items-center justify-center">
                <span className="text-primary text-[24px]">
                  No companies found !!!
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default ViewAllCompanies;
