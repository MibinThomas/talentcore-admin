"use client";
import ScheduleInterviewModal from "@/src/components/common/modal/ScheduleInterviewModal";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaBriefcase,
  FaGraduationCap,
  FaFileAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { LuDownload } from "react-icons/lu";

const experiences = [
  {
    id: 1,
    title: "Senior UI/UX Designer",
    company: "TechVision Inc.",
    period: "2019 - Present",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Digital Innovations Ltd.",
    period: "2016 - 2019",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
  {
    id: 3,
    title: "Junior Designer",
    company: "Creative Studio Co.",
    period: "2014 - 2016",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
];

const education = [
  {
    id: 1,
    degree: "Master of Fine Arts in Interaction Design",
    school: "California College of the Arts",
    period: "2012 - 2014",
    meta: "Grade: 3.9 GPA",
  },
  {
    id: 2,
    degree: "Bachelor of Arts in Graphic Design",
    school: "University of California, Berkeley",
    period: "2008 - 2012",
    meta: "Grade: 3.9 GPA",
  },
];

const skills = [
  "UI/UX Design",
  "Figma",
  "React",
  "Prototyping",
  "Design Systems",
];

const quickLinks = [
  {
    id: 1,
    label: "Portfolio",
    link: "https://www.example.com",
  },
  {
    id: 2,
    label: "LinkedIn",
    link: "https://www.example.com",
  },
  {
    id: 3,
    label: "Contact",
    link: "https://www.example.com",
  },
];

export default function ResumeExperiencePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="container mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Schedule Interview Button*/}
        <div className="flex flex-wrap justify-end gap-3 mt-5">
          <button className="text-[16px] text-white bg-green-700 px-8 py-1 rounded-[10px] ">
            Applied
          </button>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-5 py-2 rounded-md bg-purple-700 text-white text-sm font-medium hover:bg-purple-800 flex items-center gap-2"
          >
            <FaCalendarAlt /> Schedule Interview
          </button>
        </div>
        {/* Profile Header Section */}
        <div className="py-6 flex flex-col md:flex-row items-start gap-6">
          {/* Profile Info */}
          <div className="">
            <div>
              <h1 className="md:text-[40px] text-[36px] font-semibold text-black leading-none">
                John Doe
              </h1>
              <p className="text-black mt-1 text-[16px]">
                Senior UI/UX Designer
              </p>
            </div>
            {/* Contact Info */}
            <div className="flex flex-col md:flex-row justify-start md:gap-6 gap-3 mt-4 text-sm text-black">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt /> San Francisco, CA
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="rotate-90" /> +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope /> john.doe@email.com
              </div>
            </div>

            <div className="md:max-w-[80%] w-full py-4">
              <p className="text-black text-[16px] ">
                {`Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.`}
              </p>
            </div>

            <div className="flex items-center justify-start flex-wrap gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link?.link}
                  className="text-[14px] px-3 py-1 rounded-[10px] bg-primary text-white"
                >
                  {link?.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="">
          <h2 className="flex items-center gap-2 text-lg font-medium">
            <FaBriefcase className="text-gray-600" /> Experience
          </h2>

          <div className="space-y-6 bg-[#FCFAFF]">
            {experiences.map((exp) => (
              <article
                key={exp.id}
                className="md:p-4 border-b border-b-gray-300"
              >
                <div className="flex flex-col gap-3">
                  <div>
                    <h3 className="text-[26px] font-semibold w-max">
                      {exp.title}
                    </h3>
                    <p className="text-[18px] text-gray-800">{exp.company}</p>
                  </div>
                  <div className="text-sm text-black">{exp.period}</div>
                  <p className="text-[16px] text-gray-600 md:max-w-[80%] w-full">
                    {exp.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Education, Skills, Documents */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Education */}
          <div className="md:col-span-2">
            <section>
              <h3 className="flex items-center gap-2 text-lg font-medium mb-4">
                <FaGraduationCap className="text-gray-600" /> Education
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-4 rounded-md border border-gray-100"
                  >
                    <h4 className="text-[26px] font-semibold">{edu.degree}</h4>
                    <p className="text-[16px] text-gray-500">{edu.school}</p>
                    <div className="md:max-w-[70%] flex items-center justify-between mt-2 text-[16px] text-black">
                      <span>{edu.period}</span>
                      <span>{edu.meta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Skills */}
            <div className="bg-white p-4 rounded-md border border-gray-100">
              <h4 className="text-md font-medium mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-3 py-1 rounded-[10px] bg-primary text-white"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white p-4 rounded-md border border-gray-100">
              <h4 className="flex items-center gap-2 text-md font-medium mb-3">
                <FaFileAlt className="text-gray-600" /> Attached Documents
              </h4>
              <div className="flex items-center justify-between text-sm border border-gray-400 p-3 rounded-md">
                <div className="flex items-center gap-2 text-gray-700">
                  John_doe_Resume.pdf
                </div>
                <button className="text-gray-">
                  <LuDownload />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
      {/* Modal */}
      <ScheduleInterviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
