"use client";
import { resetPasswordAPI } from "@/src/services/allAPI";
import React, { useState } from "react";
import { LuKey, LuMail } from "react-icons/lu";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function AdminProfile() {
  const { user } = useSelector((state) => state.auth);
  const [inputData, setInputData] = useState({
     email: user?.email || "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleResetPassword = async (e) => {
    try {
      e.preventDefault();
      const { email, password, confirmPassword } = inputData;

      if (!email || !password || !confirmPassword) {
        Swal.fire("Info", "Please fill in all fields", "info");
        return;
      }

      if (password !== confirmPassword) {
        Swal.fire("Error", "Passwords do not match", "error");
        return;
      }

      const result = await resetPasswordAPI({
        email,
        newPassword: password,
        confirmPassword,
      });

      if (result.status === 200) {
        Swal.fire("Success", "Password reset successfully", "success");
        setInputData({
          password: "",
          confirmPassword: "",
        })
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.data?.message ||
        error?.message ||
        "Something went wrong! Please try again.";
      Swal.fire("Error", errorMessage, "error");
    }
  };

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
            <div className="w-full flex md:flex-row flex-col items-center justify-between gap-4">
              <div className="md:w-1/3 w-full">
                <label htmlFor="email" className="text-[14px] text-black">
                  Email
                </label>
                <br />
                <input
                  type="email"
                  value={inputData.email}
                  readOnly
                  className="text-black w-full border border-gray-300 rounded-md p-2 cursor-not-allowed"
                />
              </div>

              {/* Password */}
              <div className="md:w-1/3 w-full">
                <label htmlFor="password" className="text-[14px] text-black">
                  Password
                </label>
                <br />
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={inputData?.password}
                    onChange={handleInputChange}
                    className="text-black w-full border border-gray-300 rounded-md p-2 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="md:w-1/3 w-full">
                <label htmlFor="confirmPassword" className="text-[14px] text-black">
                  Confirm Password
                </label>
                <br />
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={inputData.confirmPassword}
                    onChange={handleInputChange}
                    className="text-black w-full border border-gray-300 rounded-md p-2 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetPassword}
              className="bg-white border border-black rounded-[5px] px-4 py-2 leading-none text-[16px] flex items-center justify-center gap-2 hover:bg-[#4D008C] hover:text-white transition-colors mt-4"
            >
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