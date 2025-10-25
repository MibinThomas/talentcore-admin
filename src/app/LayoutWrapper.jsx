"use client";
import { ToastContainer } from "react-toastify";
import { Teachers } from "next/font/google";
const teachers = Teachers({
  variable: "--font-teachers",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function LayoutWrapper({ children }) {
  return (
    <>
      <main
        className={`${teachers.variable} overflow-x-hidden relative min-h-screen`}
      >
        {children}
      </main>
      <ToastContainer theme="dark" autoClose={3000} />
    </>
  );
}

