//src/components/settings/SubscriptionManagement.jsx
"use client";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { LuCalendarX, LuCircleCheck, LuTrendingUp, LuUsers } from "react-icons/lu";

function SubscriptionManagement() {
  // ===== Summary Cards =====
  const summaryCards = [
    {
      title: "Active Subscriptions",
      value: "35",
      icon: <LuUsers className="w-5 h-5 text-green-600" />,
    },
    {
      title: "Expired / Cancelled",
      value: "5",
      icon: <LuCalendarX className="w-5 h-5 text-red-500" />,
    },
    {
      title: "Monthly Revenue",
      value: "₹35,000",
      icon: <LuTrendingUp className="w-5 h-5 text-purple-600" />,
    },
  ];

  const plans = [
    {
      title: "Basic",
      price: "₹0",
      duration: "",
      description: "Get started with essential job search features",
      features: [
        "Access to basic job listings",
        "Up to 5 job alerts",
        "Standard application tracking",
        "Basic profile analytics",
      ],
    },
    {
      title: "Pro",
      price: "₹199.99",
      duration: "| 30 days",
      description: "Access premium tools and insights for better visibility",
      features: [
        "Unlimited premium job listings",
        "Advanced application insights",
        "Unlimited job alerts",
        "Priority application status",
        "Resume optimization tools",
        "Interview preparation resources",
      ],
    },
    {
      title: "Enterprise",
      price: "₹499.99",
      duration: "| 30 days",
      description: "For recruiters and HR professionals",
      features: [
        "Unlimited listings + team dashboard",
        "Dedicated account manager",
        "Priority candidate search",
        "Company branding features",
        "Resume optimization tools",
        "Interview preparation resources",
      ],
    },
  ];

  return (
    <section className="py-10">
      <div className="container">
        <div>
          <h2 className="text-[22px] font-normal mb-4">
            Subscription Management
          </h2>
        </div>
        {/* cards */}
        <div className="grid grid-cols-3 gap-4">
          {/* card-1 */}
          {summaryCards.map((card, index) => (
            <div
              key={index}
              className="bg-[#FCFAFF] p-5 border border-[#D9D9D9] rounded-xl shadow-sm flex flex-col justify-between h-full transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-[#333232] text-[18px] font-medium">
                  {card.title}
                </h2>
                <span>{card.icon}</span>
              </div>
              <h3 className="mt-3 px-2 text-[28px] font-semibold text-gray-800">
                {card.value}
              </h3>
            </div>
          ))}
        </div>
        {/* ---- Plans ---- */}
        <div className="mt-10">
          <div className="w-full flex flex-wrap justify-between gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="
          bg-[#FCFAFF] rounded-2xl shadow-md border border-[#D9D9D9]
          p-6 relative hover:shadow-lg transition-all
          w-full md:w-full  lg:w-[48%]
        "
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-[22px] font-semibold text-gray-900">
                      {plan.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {plan.description}
                    </p>
                  </div>
                  <button className="bg-gray-100 p-2 border border-[#9AA0B6] rounded-lg hover:bg-gray-200 transition">
                    <FaEdit className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Price */}
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {plan.price}{" "}
                    {plan.duration && (
                      <span className="text-gray-400 text-sm font-normal">
                        {plan.duration}
                      </span>
                    )}
                  </h3>
                </div>

                {/* Features */}
                <ul className="mt-5 space-y-2 text-sm text-gray-700">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <LuCircleCheck className="w-4 h-4 text-purple-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SubscriptionManagement;
