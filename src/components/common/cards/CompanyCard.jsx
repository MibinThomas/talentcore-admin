"use client";
import {
  FaIndustry,
  FaUsers,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";
import { LuTrash } from "react-icons/lu";
import EditCompanyModal from "../modal/EditCompanyModal";
import Link from "next/link";

function CompanyCard({ companyData, onUpdate }) {
  return (
    <div className="company-card w-[330px] lg:w-[360px] h-auto rounded-[15px] bg-gradient-to-br from-[#2E0B57] to-[#6615A5] shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="card_container h-full p-6 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-white text-[26px] font-semibold leading-[1.2] max-w-[80%]">
            {companyData?.name}
          </h3>
          <EditCompanyModal companyData={companyData} onUpdate={onUpdate} />
        </div>

        {/* Sub details */}
        <p className="text-[#E3CCFF] text-[16px] font-medium mb-2">
          {companyData?.industry}
        </p>
        <p className="text-[#CBAAFF] text-[14px] font-normal mb-4 leading-snug line-clamp-3">
          {companyData?.description}
        </p>

        {/* Info Grid */}
        <div className="info-grid grid grid-cols-1 gap-3 text-[#EFDAFF] text-[15px]">
          <div className="flex items-center gap-3">
            <FaUsers size={18} className="text-white" />
            <span>Company Size: {companyData?.companySize}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaCalendarAlt size={18} className="text-white" />
            <span>Founded: {companyData?.foundedYear}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt size={18} className="text-white" />
            <span>{companyData?.place}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaGlobe size={18} className="text-white" />
            <Link
              href={companyData?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-[#EEDCFF]"
            >
              {companyData?.website}
            </Link>
          </div>
        </div>

        {/* Status + Actions */}
        {/* <div className="w-full flex items-center justify-between mt-6">
          <button
            type="button"
            className={`w-full py-[.7rem] rounded-[8px] font-medium text-[16px] ${
              companyData?.isActive
                ? "bg-white text-primary"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {companyData?.isActive ? "Active" : "Inactive"}
          </button>

          <button className="bg-white p-3 rounded-[10px] ml-3 hover:bg-gray-100 transition">
            <LuTrash size={20} className="text-black" />
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default CompanyCard;
