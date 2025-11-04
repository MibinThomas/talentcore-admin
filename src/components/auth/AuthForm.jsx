"use client";
import { loginApi } from "@/src/services/allAPI";
import { setUser } from "@/src/store/slices/authSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const AuthForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = formData;

      // 🧩 Basic validation
      if (!email || !password) {
        Swal.fire({
          icon: "info",
          title: "Login Failed",
          text: "Please enter both email and password.",
        });
        return;
      }

      // 🧠 Call API
      const result = await loginApi(formData);
      console.log(result);

      // ✅ Check response
      if (result.status === 200 && result.data?.user) {
        const { user } = result.data;

        // 🔒 Allow only admin role
        if (user.role !== "admin") {
          Swal.fire({
            icon: "warning",
            title: "Access Denied",
            text: "Only admin users can access this dashboard.",
          });
          return; // ❌ stop here
        }

        // ✅ If admin → store user & redirect
        dispatch(setUser({ user }));

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        router.push("/dashboard");
        setFormData({ email: "", password: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: result?.response?.data?.message || "Invalid login credentials.",
        });
      }
    } catch (error) {
      console.error("Login failed:", error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please check your credentials.",
      });
    }
  };

  return (
    <form className="flex flex-col gap-2 w-full transition-all duration-500 ease-in-out">
      {/* Email Field */}
      <div className="flex flex-col gap-1 transition-all duration-500 ease-in-out">
        <label
          htmlFor="email"
          className="text-sm font-medium text-gray-700 transition-all duration-300"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 placeholder:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5CBDE] border-[#C5CBDE] transition-all duration-300 ease-in-out focus:scale-[1.02]"
          required
        />
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-1 relative transition-all duration-500 ease-in-out">
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-700 transition-all duration-300"
        >
          Password
        </label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 placeholder:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5CBDE] border-[#C5CBDE] pr-10 transition-all duration-300 ease-in-out focus:scale-[1.02]"
          required
        />
        {showPassword ? (
          <LuEye
            className="absolute right-3 top-1/2 transform -translate-y-[-5%] cursor-pointer text-gray-500 transition-all duration-200 hover:scale-110"
            size={20}
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <LuEyeClosed
            className="absolute right-3 top-1/2 transform -translate-y-[-5%] cursor-pointer text-gray-500 transition-all duration-200 hover:scale-110"
            size={20}
            onClick={() => setShowPassword(true)}
          />
        )}
      </div>

      {/* Submit Button */}
      <div className="transition-all flex items-center justify-center duration-500 ease-in-out transform hover:scale-[1.02]">
        <button
          onClick={handleSubmit}
          type="button"
          className="bg-primary py-2 rounded-[5px] text-white w-full transition-all duration-300 ease-in-out hover:bg-primary/90 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
