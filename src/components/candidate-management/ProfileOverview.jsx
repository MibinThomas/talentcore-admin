//src/components/me/profile-overview/ProfileOverview.jsx
"use client";
import Link from "next/link";
import React from "react";
import { FaPhone } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { LuMail, LuMapPin } from "react-icons/lu";

function ProfileOverview() {
  return (
    <section className="py-10">
      <div className="">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#4D008C] transition-colors text-[16px] mb-4"
        >
          <GoArrowLeft className="text-lg" />
          back
        </Link>
        {/* box-border */}
        <div
          className="w-full h-full border border-[#DBDBDB] xl:p-6 md:p-4 p-2 rounded-[10px] pb-6 md:py-10 bg-[#4D008C]
        "
        >
            <div className="flex items-center justify-end">
                <button className="text-white bg-green-600 py-2 px-6 leading-none rounded-[10px]">
                    Active
                </button>
            </div>
          <div className="px-4 md:px-0">
            {/* Name */}
            <h1 className="text-white font-semibold text-[26px] md:text-[46px] mb-4">
              Candidate Name
            </h1>
            {/* Location & Email */}
            <div className="flex items-center justify-between flex-wrap gap-y-4">
              {/* 📍 Location & Mail (Left Side) */}
              <div className="flex flex-wrap gap-x-6 gap-3 text-white">
                <span className="flex items-center gap-2 text-[18px]">
                  <LuMapPin size={18} />
                  Thrissur,Kerala,India
                </span>
                <span className="flex items-center gap-2 text-[18px]">
                  <FaPhone size={18} className="rotate-90" />
                  97479303930
                </span>
                <span className="flex items-center gap-2 text-[18px]">
                  <LuMail size={18} />
                  user@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileOverview;
