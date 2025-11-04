"use client";
import { getCandidatesCountAPI } from "@/src/services/allAPI";
import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
function StatsOverview() {
  const [count, setCount] = useState({
    candidatesCount: 0,
    applicationsTodayCount: 0,
    pendingApplicationsCount: 0,
  });

  const handleFetchCount = async () => {
    try {
      const result = await getCandidatesCountAPI();
      console.log(result);
      if (result.status === 200) {
        setCount({
          candidatesCount: result.data.data.candidatesCount,
          applicationsTodayCount: result.data.data.applicationsTodayCount,
          pendingApplicationsCount: result.data.data.pendingApplicationsCount,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.response.data.message,
        });
      }
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  };
  const stats = [
    {
      id: 1,
      title: "Total Candidates Registered",
      count: count.candidatesCount,
    },
    {
      id: 2,
      title: "Applications Recieved Today",
      count: count.applicationsTodayCount,
    },
    {
      id: 3,
      title: "Pending Reviews",
      count: count.pendingApplicationsCount,
    },
  ];

  useEffect(() => {
    const fetch = async () => {
      handleFetchCount();
    };
    fetch();
  }, []);

  return (
    <div className="w-full h-auto mt-10">
      <div className="flex md:flex-row flex-col items-center justify-center gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="md:w-[32%] w-full flex items-center justify-center flex-col gap-3 py-4"
          >
            <span className="text-black font-normal text-[22px]">
              {stat?.title}
            </span>
            <span
              className={`${
                stat?.id === 3 ? "text-red-600" : "text-[#00C951] "
              } text-[36px] font-medium`}
            >
              {stat?.count}
            </span>
            <div className="w-full flex items-center justify-end">
              <button className="w-max me-6">
                <FaArrowRightLong
                  size={20}
                  className="bg-primary text-white rounded-full pe-1"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsOverview;
