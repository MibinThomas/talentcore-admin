"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";
import { MdLogout } from "react-icons/md";
function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const data = [
    { id: 1, label: "Dashboard", path: "/dashboard" },
    {
      id: 2,
      label: "Candidate Management",
      path: "/candidate-management",
    },
    {
      id: 3,
      label: "Job Application Management",
      path: "/job-application-management",
    },
    { id: 4, label: "Communication", path: "/communication" },
    {
      id: 5,
      label: "Reports and Analytics",
      path: "/reports-and-analytics",
    },
    {
      id: 6,
      label: "Support and Moderation",
      path: "/support-and-moderation",
    },
    { id: 7, label: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 flex justify-between md:items-center items-start p-4 shadow bg-white z-50">
        <div className="logo-container flex justify-start items-center">
          <Link href="/dashboard" className="relative w-[120px] mt-1">
            <Image
              width={1000}
              height={1000}
              className="object-contain"
              src="/assets/logo/talentcore-word-mark.png"
              alt="logo"
              title="logo"
            />
          </Link>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl text-primary focus:outline-none"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Overlay (mobile only when open) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-50 top-16 md:top-0 left-0 min-h-screen w-full md:w-[300px] bg-white shadow-md transform transition-transform duration-300 ease-in-out border-r border-r-[#C6C6C6] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <nav className="w-full h-full px-4 md:pt-6 pt-4 overflow-y-auto">
          {/* Logo (desktop only) */}
          <div className="logo-container mb-6 hidden md:flex justify-start">
            <Link href="/dashboard" className="relative w-[140px] h-[50px]">
              <Image
                fill
                className="object-contain"
                src="/assets/logo/talentcore-word-mark.png"
                alt="logo"
                title="logo"
              />
            </Link>
          </div>

          <ul className="flex flex-col gap-1">
            {data.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.id}>
                  <Link
                    onClick={() => setIsOpen(false)}
                    href={item.path}
                    className={`block ps-4 py-3 rounded-md text-[18px] md:text-[20px] font-normal transition-all duration-300 ${
                      isActive
                        ? "text-black bg-gray-100"
                        : "text-[#9AA0B6] hover:text-black hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* logout button */}
          <div className="mt-10 flex items-center justify-center">
            <button 
            className="text-white flex items-center justify-center gap-2 px-4 py-1 rounded-[10px] bg-primary">
              <MdLogout size={20} />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Spacer to push content below mobile top bar */}
      <div className="md:hidden h-16"></div>
    </>
  );
}

export default Sidebar;
