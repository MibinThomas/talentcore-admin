import Link from "next/link";
import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
  LuBookOpenText,
  LuDownload,
  LuEye,
  LuGraduationCap,
} from "react-icons/lu";

function CandidateProfileDetails() {
  const skills = [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "Jest",
    "GraphQL",
  ];
  return (
    <div className="w-full">
      <div className="container flex flex-col gap-6">
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-3">
          {/* education */}
          <div className="lg:col-span-6 col-span-1">
            <div className="education__container">
              <h3 className="flex items-start justify-start gap-6">
                <span className="rounded-[10px] bg-primary p-2 text-white">
                  <LuGraduationCap size={24} />{" "}
                </span>
                <div>
                  <span className="text-[#717171]">Education</span>
                  <ul className="list-disc list-primary ms-4">
                    <li>Bcom - Bachelor of Commerce</li>
                    <li>Mcom - Master of Commerce</li>
                  </ul>
                </div>
              </h3>
            </div>
          </div>
          {/* experience  */}
          <div className="lg:col-span-6 col-span-1">
            <div className="education__container">
              <h3 className="flex items-start justify-start gap-4">
                <span className="rounded-[10px] bg-primary p-2 text-white">
                  <LuGraduationCap size={24} />{" "}
                </span>
                <div>
                  <span className="text-[#717171]">Experience</span>
                  <ul className="list-disc list-primary ms-4">
                    <li>Company Name - UI/UX Designer - 1yrs</li>
                    <li>Company Name - Creative Head - 1yrs</li>
                  </ul>
                </div>
              </h3>
            </div>
          </div>
        </div>
        {/* skills */}
        <div className="skills__container">
          <h3 className="text-[#717171]">Skills</h3>
          <div className="flex items-center my-5 justify-start md:gap-3 gap-3 flex-wrap">
            {skills.map((value, index) => (
              <span
                key={index}
                className="content text-white font-medium md:text-[16px] text-[14px] bg-primary px-6 py-1 rounded-[5px]"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
        {/* Portfolio */}
        <div className="skills__container">
          <h3 className="text-[#717171]">Portflio</h3>
          <div className="flex items-center my-5 justify-start md:gap-3 gap-3 flex-wrap">
            <div className="flex flex-col">
              <label className="text-black font-medium md:text-[16px] text-[14px] mb-1">Github</label>
              <Link href="/portfolio" className="text-black text-[18px] border border-gray-300 rounded-[5px] px-6 py-1">
                github@sanjayps.git
              </Link>
            </div>
          </div>
        </div>

        {/* resume */}
        <div className="resume__container">
          <h3 className="flex items-center justify-start gap-2 mb-3">
            <span className="rounded-[10px] p-2 bg-primary text-white">
              <IoDocumentTextOutline size={24} />
            </span>{" "}
            <span className="text-[#717171]"> Documents</span>
          </h3>
          <div className="border rounded-lg border-[#C3C3C3]">
            <div className="flex flex-col sm:flex-row justify-between items-start p-2 lg:p-5">
              <div className="gap-5 flex items-center mb-3 sm:mb-0">
                <LuBookOpenText className="w-[34px] h-[34px] lg:w-[44px] lg:h-[44px] text-[#4D008C]" />
                <div className="flex flex-col">
                  <p className="text-lg lg:text-2xl font-[450] text-[#4D008C]">
                    reasume.pdf
                  </p>
                  <p className="text-sm lg:text-[17px]">
                    Uploaded 2 days ago - 245kb
                  </p>
                </div>
              </div>

              <div className="flex gap-3 self-end sm:self-center">
                <button type="button">
                  <LuDownload className="w-[20px] h-[20px] cursor-pointer" />
                </button>
                <button
                  type="button"
                  onClick={() => handleViewResume(resume?._id)}
                >
                  <LuEye className="w-[20px] h-[20px] cursor-pointer" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateProfileDetails;
