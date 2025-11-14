"use client";
import React from "react";
import { LuBanknote, LuClock4, LuMapPin, LuTrash } from "react-icons/lu";
import EditJobModal from "../modal/EditJobModal";
import { FaMapMarkerAlt } from "react-icons/fa";
function JobCard({ job ,onUpdate}) {
  console.log(job._id);
  
  return (
    <div className="job-card lg:w-[350px] w-[320px] h-[330px] lg:h-[360px] rounded-[13px] bg-[linear-gradient(326deg,#3A0367_12.55%,#6E07C3_82.83%)]">
      <div className="card_container h-full px-6 py-2">
        <div className="card__details w-full h-full flex flex-col items-start justify-evenly">
          <div className="w-full flex items-start justify-between">
            <h4 className="text-white text-[30px] font-[600] leading-[1.1] max-w-[80%]">
              {job?.title}
            </h4>
            <EditJobModal job={job} onUpdate={onUpdate} />
          </div>
          <div className="card__sub-title flex items-center text-[#EFDAFF]">
            <span className="text-[18px] leading-[1.2]">
              {job?.companyData?.name}
            </span>
            <span className="separator w-[1px] h-[15px] bg-white mx-2"></span>
            <span className="text-[18px] leading-[1.2]">{job?.jobType}</span>
          </div>
          <div className="job-card__details flex flex-col gap-4">
            <div className="job-card__location flex items-center gap-4">
              <LuMapPin
                size={20}
                className="text-white text-[16px] leading-[1.2]"
              />
              <span className="text-[#EFDAFF] text-[16px] font-normal">
                {job?.location?.place}
              </span>
            </div>
            <div className="job-card__salary flex items-center gap-4">
              <LuBanknote
                size={20}
                className="text-white text-[16px] leading-[1.2]"
              />
              <span className="text-[#EFDAFF] text-[16px] font-normal">
                {job?.salary?.min} - {job?.salary?.max} {job?.salary?.currency}
              </span>
            </div>
            <div className="job-card__location flex items-center gap-4">
              <LuClock4
                size={20}
                className="text-white text-[16px] leading-[1.2]"
              />
              <span className="text-[#EFDAFF] text-[14px] font-normal">
                {job?.timeAgo}
              </span>
            </div>
            <div className="job-card__location flex items-center gap-4">
              <FaMapMarkerAlt
                size={20}
                className="text-white text-[16px] leading-[1.2]"
              />
              <span className="text-[#EFDAFF] text-[16px] font-normal">
                {job?.location?.type}
              </span>
            </div>
          </div>
          <div className="w-full flex items-center justify-between gap-2">
            <button
              type="button"
              className="btn bg-white w-full text-[18px] py-[.7rem] rounded-[5px] text-primary font-medium leading-none "
            >
              Active
            </button>
            <button className="bg-white p-3 rounded-[10px]">
              <LuTrash size={20} className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
