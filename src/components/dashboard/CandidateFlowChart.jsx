"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function CandidateFlowChart() {
  const [view, setView] = useState("monthly");

  // Example dataset
  const data = [
    { name: "January", Applied: 10, Hired: 5 },
    { name: "February", Applied: 190, Hired: 50 },
    { name: "March", Applied: 140, Hired: 40 },
    { name: "April", Applied: 110, Hired: 45 },
    { name: "May", Applied: 90, Hired: 60 },
    { name: "June", Applied: 70, Hired: 40 },
    { name: "July", Applied: 150, Hired: 100 },
    { name: "August", Applied: 150, Hired: 100 },
    { name: "September", Applied: 150, Hired: 100 },
    { name: "October", Applied: 150, Hired: 100 },
    { name: "November", Applied: 150, Hired: 100 },
    { name: "December", Applied: 150, Hired: 100 },
  ];

  return (
    <div className="bg-white md:p-4 rounded-xl shadow-sm border border-gray-200 mt-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left">
          Monthly Candidate Flow
        </h2>

        {/* View Toggle Buttons */}
        <div className="flex items-center justify-center sm:justify-end border border-gray-300 rounded-lg overflow-hidden w-full sm:w-auto">
          {["monthly", "quarterly", "annually"].map((type) => (
            <button
              key={type}
              onClick={() => setView(type)}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 text-sm sm:text-base font-medium transition-all ${
                view === type
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[250px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#00000050" />
            <XAxis dataKey="name" tick={{ fill: "#666", fontSize: 12 }} />
            <YAxis tick={{ fill: "#666", fontSize: 12 }} />
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />

            {/* Applied Line */}
            <Line
              type="monotone"
              dataKey="Applied"
              stroke="#facc15"
              strokeWidth={3}
              dot={{ r: 5, strokeWidth: 2, fill: "#facc15" }}
              activeDot={{ r: 7 }}
            />

            {/* Hired Line */}
            <Line
              type="monotone"
              dataKey="Hired"
              stroke="#818cf8"
              strokeWidth={3}
              dot={{ r: 5, strokeWidth: 2, fill: "#818cf8" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CandidateFlowChart;
