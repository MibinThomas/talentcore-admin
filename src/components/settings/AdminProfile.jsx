"use client";
import React from "react";
import { LuKey, LuMail } from "react-icons/lu";

function AdminProfile() {
  return (
    <div className="w-full">
      <div className="container">
        <div className="admin__profile__section">
          <div>
            <h3 className="text-black font-semibold text-[24px] leading-none">
              Profile Settings
            </h3>
            <p className="text-[#00000080] text-[14px] mt-2">
              Manage your account settings and preferences.
            </p>
          </div>

          <div className="border border-gray-300 p-5 mt-4 rounded-[10px]">
            <h4 className="text-black text-[24px] font-semibold leading-none">
              Admin Name
            </h4>
            <p className="text-[#00000080] text-[16px]">Admin</p>
            <div className="w-full flex items-center justify-between gap-4">
              <div className="md:w-1/2">
                <label htmlFor="email" className="text-[14px] text-black">
                  Email
                </label>
                <br />
                <input
                  type="email"
                  value={"admin@gmail.com"}
                  readOnly
                  className="text-black w-full border border-gray-300 rounded-md p-2 "
                />
              </div>
            </div>

            <button className="bg-white border border-black rounded-[5px] px-4 py-2 leading-none text-[16px] flex items-center justify-center gap-2 hover:bg-[#4D008C] hover:text-white transition-colors mt-4">
              <LuKey />
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
