"use client";
import { ToastContainer } from "react-toastify";
import { Teachers } from "next/font/google";
import Sidebar from "../components/common/sidebar/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const teachers = Teachers({
  variable: "--font-teachers",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const authRoutes = ["/auth"];

  useEffect(() => {
    if (!user && !authRoutes.includes(pathname)) {
      // Not logged in and trying to access protected page → redirect to login
      router.replace("/auth");
    }

    if (user && authRoutes.includes(pathname)) {
      // Logged in user trying to access login/register → redirect to dashboard
      router.replace("/dashboard");
    }
  }, [user, pathname, router]);

  // Optionally, don't render anything until redirection is resolved
  if (
    (!user && !authRoutes.includes(pathname)) ||
    (user && authRoutes.includes(pathname))
  ) {
    return null;
  }

  const hideLayout = authRoutes.includes(pathname);
  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        {!hideLayout && <Sidebar />}
        <main
          className={`relative h-full overflow-y-auto overflow-x-hidden ${
            !hideLayout && "lg:ml-80  z-0 pt-18 lg:pt-6 p-4 "
          }`}
        >
          {children}
        </main>
      </div>
      <ToastContainer theme="dark" autoClose={3000} />
    </>
  );
}
