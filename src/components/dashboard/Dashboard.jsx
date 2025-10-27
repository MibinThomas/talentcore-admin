"use client";
import React, { use } from "react";
import Header from "./Header";
import StatsOverview from "./StatsOverview";
import CandidateFlowChart from "./CandidateFlowChart";

function Dashboard() {
  return (
  <div className="">
    <Header/>
    <StatsOverview/>
    <CandidateFlowChart/>
  </div>
  );
}

export default Dashboard;
