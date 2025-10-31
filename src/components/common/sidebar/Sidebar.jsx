"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import Image from "next/image";
import { MdLogout } from "react-icons/md";

function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

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
      // path: "/job-application-management",
      subItems: [
        { label: "Company Section", path: "/job-application-management/companies" },
        { label: "Job Management", path: "/jobs/jobs-management" },
        { label: "Interview Scheduling", path: "/job-application-management/interviews" },
      ],
    },
    { id: 4, label: "Communication", path: "/communication" },
    {
      id: 5,
      label: "Subscription Plan",
      path: "/subscription-plan",
    },
    {
      id: 6,
      label: "Support and Moderation",
      path: "/support-and-moderation",
    },
    { id: 7, label: "Settings", path: "/settings" },
  ];

  const handleDropdownToggle = () => {
    setOpenDropdown(!openDropdown);
  };

  const isParentActive = (path) => pathname.startsWith(path);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-16 flex justify-between items-center p-4 shadow bg-white z-50">
        <div className="logo-container flex justify-start items-center">
          <Link href="/dashboard" className="relative w-[120px]">
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
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-50 top-16 lg:top-0 left-0 min-h-screen w-full lg:w-[320px] bg-white shadow-md transform transition-transform duration-300 ease-in-out border-r lg:border-r-[#C6C6C6] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="w-full h-full px-4 lg:pt-6 pt-4 overflow-y-auto">
          {/* Logo (desktop only) */}
          <div className="logo-container mb-6 hidden lg:flex justify-start">
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
              if (item.subItems) {
                const isActive = isParentActive(item.path);
                return (
                  <li key={item.id} className="flex flex-col">
                    <button
                      onClick={handleDropdownToggle}
                      className={`ps-4 py-3 rounded-md text-[18px] lg:text-[20px] font-normal transition-all duration-300 flex justify-between items-center w-full text-left ${
                        isActive
                          ? "text-black bg-gray-100"
                          : "text-[#9AA0B6] hover:text-black hover:bg-gray-50"
                      }`}
                    >
                      <span>{item.label}</span>
                      <HiChevronDown
                        className={`transition-transform duration-300 ${openDropdown ? "rotate-180" : ""}`}
                        size={20}
                      />
                    </button>
                    {openDropdown && (
                      <ul className="ml-4 flex flex-col gap-1 border-l border-l-gray-200 pl-4 max-h-[300px] overflow-y-auto">
                        {item.subItems.map((subItem) => {
                          const isSubActive = pathname === subItem.path;
                          return (
                            <li key={subItem.path}>
                              <Link
                                onClick={() => setIsOpen(false)}
                                href={subItem.path}
                                className={`block ps-2 py-2 rounded-md text-[16px] font-normal transition-all duration-300 ${
                                  isSubActive
                                    ? "text-black bg-gray-100"
                                    : "text-[#9AA0B6] hover:text-black hover:bg-gray-50"
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }
              const isActive = pathname === item.path;
              return (
                <li key={item.id}>
                  <Link
                    onClick={() => setIsOpen(false)}
                    href={item.path}
                    className={`block ps-4 py-3 rounded-md text-[18px] lg:text-[20px] font-normal transition-all duration-300 ${
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
              className="text-white flex items-center justify-center gap-2 px-4 py-1 rounded-[10px] bg-primary"
            >
              <MdLogout size={20} />
              Logout
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;