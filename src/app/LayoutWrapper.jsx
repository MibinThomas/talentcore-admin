"use client";
import { ToastContainer } from "react-toastify";
import { Teachers } from "next/font/google";
import Sidebar from "../components/common/sidebar/Sidebar";
import { usePathname } from "next/navigation";
const teachers = Teachers({
  variable: "--font-teachers",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const path = ["/auth"]
  const hideLayout = path.includes(pathname);
  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        {!hideLayout && <Sidebar />}
        <main className={`relative h-full overflow-y-auto overflow-x-hidden ${!hideLayout &&  "lg:ml-80  z-0 pt-18 lg:pt-6 p-4 "}`}>
          {children}
        </main>
      </div>
      <ToastContainer theme="dark" autoClose={3000} />
    </>
  );
}