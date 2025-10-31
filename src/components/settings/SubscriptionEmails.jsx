// src/components/settings/SubscriptionEmails.jsx
"use client";
import React, { useState } from "react";
import { LuBell, LuMail } from "react-icons/lu";

export default function SubscriptionEmails() {
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  return (
    <section className="py-4">
      <div className="  px-4 ">
        <div className="bg-[#FCFAFF] border border-[#D9D9D9] rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
          {/* ===== Header ===== */}
          <div className="mb-5 text-center md:text-left">
            <h2 className="text-[18px] sm:text-[20px] font-semibold text-gray-800">
              Weekly Digest / Marketing Email
            </h2>
            <p className="text-[14px] text-gray-500 mt-1">
              Automate and manage regular email communications with users or
              companies.
            </p>
          </div>

          {/* ===== Email Settings ===== */}
          <div className="space-y-4">
            {/* Weekly Digest Emails */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-200 rounded-xl p-4 bg-white">
              <div className="flex items-start sm:items-center gap-3">
                <LuBell className="w-5 h-5 text-gray-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-[16px] sm:text-[16px] font-medium text-gray-800">
                    Weekly Digest Emails
                  </h3>
                  <p className="text-[14px] sm:text-[14px] text-gray-500">
                    Send weekly summaries with new candidates and company
                    insights.
                  </p>
                </div>
              </div>
              <label className="inline-flex items-center cursor-pointer self-end sm:self-auto">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={weeklyDigest}
                  onChange={() => setWeeklyDigest(!weeklyDigest)}
                />
                <div
                  className="w-11 h-6 bg-gray-300 rounded-full relative peer peer-checked:bg-blue-600 
                  after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border 
                  after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"
                ></div>
              </label>
            </div>

            {/* Marketing Emails */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-200 rounded-xl p-4 bg-white">
              <div className="flex items-start sm:items-center gap-3">
                <LuMail className="w-5 h-5 text-gray-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-[16px] sm:text-[16px] font-medium text-gray-800">
                    Marketing Emails
                  </h3>
                  <p className="text-[14px] sm:text-[14px] text-gray-500">
                    Send promotional content and platform updates.
                  </p>
                </div>
              </div>
              <label className="inline-flex items-center cursor-pointer self-end sm:self-auto">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={marketingEmails}
                  onChange={() => setMarketingEmails(!marketingEmails)}
                />
                <div
                  className="w-11 h-6 bg-gray-300 rounded-full relative peer peer-checked:bg-blue-600 
                  after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border 
                  after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
