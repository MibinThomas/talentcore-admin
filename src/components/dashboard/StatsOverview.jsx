import React from "react";

function StatsOverview() {
  const stats = [
    {
      id: 1,
      title: "Total Candidates Registered",
      count: 100,
    },
    {
      id: 2,
      title: "Applications Recieved Today",
      count: 250,
    },
    {
      id: 3,
      title: "Pending Reviews",
      count: 15,
    },
  ];
  return (
    <div className="w-full h-auto mt-10">
      <div className="flex md:flex-row flex-col items-center justify-center gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="md:w-[32%] w-full border border-gray-300 flex items-center justify-center flex-col gap-3 py-4"
          >
            <span className="text-black/50 font-normal text-[22px]">
              {stat?.title}
            </span>
            <span className={`${stat?.id === 3 ? "text-red-600" : "text-[#00C951] "} text-[36px] font-medium`}>
              {stat?.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsOverview;
