// src/services/axiosClient.js
import axios from "axios";
import { toast } from "react-toastify";
import store from "../store/store";
import { logout } from "../store/slices/authSlice";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // ✅ cookies will always be sent
});

// ✅ Response interceptor for handling 401
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const requestUrl = error.config?.url;

      const publicRoutes = [
        "/auth/request-otp",
        "/auth/login",
        "/auth/resend-otp",
        "/auth/verify-otp",
      ];

      if (
        status === 401 &&
        !publicRoutes.some((route) => requestUrl.includes(route))
      ) {
        store.dispatch(logout());
        toast.error("Session expired. Please log in again.");
        if (typeof window !== "undefined") {
          window.location.href = "/auth";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
