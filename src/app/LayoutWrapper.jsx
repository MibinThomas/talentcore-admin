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
      <div className="flex w-full min-h-screen">
        <Sidebar />
        <main className="p-4 lg:w-[calc(100%-300px)] md:pt-0 pt-18 overflow-y-auto overflow-x-hidden">{children}</main>
      </div>
      <ToastContainer theme="dark" autoClose={3000} />
    </>
  );
}
