// src/components/jobs/company-overview/CompanyOverview.jsx
"use client";
import React from "react";
import { LuBuilding2 } from "react-icons/lu";

function CompanyOverview({companyDetails}) {
  const company = {
    name: companyDetails?.name || "",
    industry: companyDetails?.industry || "",
    size: companyDetails?.companySize || "",
    founded: companyDetails?.foundedYear || "",
    website: companyDetails?.website || "",
  };

  // Create a label mapping to show nice titles instead of raw keys
  const labels = {
    industry: "Industry",
    size: "Company Size",
    founded: "Founded",
    website: "Website",
  };

  return (
    <div className="w-full">
      <div className="p-3">
        <div className="title flex items-end leading-none gap-2 text-black font-semibold">
          <LuBuilding2 size={24} />
          <span>About {company.name}</span>
        </div>

        <div className="company-overview mt-4 flex flex-col gap-4">
          {Object.entries(company).map(([key, value]) => {
            // Skip rendering "name" since it's already in the title
            if (key === "name") return null;

            return (
              <div
                key={key}
                className="flex items-center justify-start gap-3  text-[#4B4B4B] xl:text-[16px] lg:text-[14px]"
              >
                <span className="w-[100px] flex-shrink-0">{labels[key] || key}</span>
                <span>{value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CompanyOverview;
