"use client";
import { ToastContainer } from "react-toastify";
import { Teachers } from "next/font/google";
import Sidebar from "../components/common/sidebar/Sidebar";
const teachers = Teachers({
  variable: "--font-teachers",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function LayoutWrapper({ children }) {
  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        <Sidebar />
        <main className="h-full p-4 overflow-y-auto overflow-x-hidden lg:ml-80 relative z-0 pt-18 lg:pt-6">
          {children}
        </main>
      </div>
      <ToastContainer theme="dark" autoClose={3000} />
    </>
  );
}