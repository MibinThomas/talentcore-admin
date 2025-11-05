import CandidateManagement from "@/src/components/candidate-management/CandidateManagement";
import PlanCandidates from "@/src/components/subscription-plan/PlanCandidates";
import SubscriptionPlan from "@/src/components/subscription-plan/SubscriptionPlan";
import React from "react";

function page() {
  return (
    <div>
      <SubscriptionPlan />
      <PlanCandidates />
    </div>
  );
}

export default page;
