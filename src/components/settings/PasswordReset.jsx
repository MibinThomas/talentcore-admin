//src/
"use client";
import { Mail } from "lucide-react";
import React from "react";

function PasswordReset() {
  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarahjohnson@email.com",
      lastReset: "2025-10-20",
      status: "Active",
    },
    {
      id: 2,
      name: "David Miller",
      email: "davidmiller@email.com",
      lastReset: "2025-09-15",
      status: "Pending",
    },
    {
      id: 3,
      name: "Emma Watson",
      email: "emmawatson@email.com",
      lastReset: "2025-10-10",
      status: "Active",
    },
  ];

  return (
    <section className="py-8">
      <div className="container">
        <div className="bg-[#FCFAFF] border border-[#D9D9D9] rounded-2xl p-6 md:p-8 mx-auto shadow-sm hover:shadow-md transition-all">
          {/* Header */}
          <div className="mb-5">
            <h2 className="text-[22px] font-semibold text-gray-800">
              Password Reset
            </h2>
            <p className="text-[14px] text-gray-500">
              Manage user access and password security for candidates and
              companies.
            </p>
          </div>

          {/* Table (Desktop) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F7FB] text-gray-600 text-[14px]">
                  <th className="py-3 px-4 font-medium rounded-tl-lg">Name</th>
                  <th className="py-3 px-4 font-medium">Email</th>
                  <th className="py-3 px-4 font-medium">Last Reset</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium rounded-tr-lg">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="text-[14px] text-gray-700">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.lastReset}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[13px] font-medium ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 text-[13px] hover:bg-gray-100 transition-all">
                        <Mail className="w-4 h-4" />
                        Reset Password
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-800">{user.name}</h3>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[12px] font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{user.email}</p>
                <p className="text-sm text-gray-500 mb-3">
                  Last Reset: {user.lastReset}
                </p>
                <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-[13px] hover:bg-gray-100 transition-all">
                  <Mail className="w-4 h-4" />
                  Reset Password
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PasswordReset;
