import CandidateProfileView from "@/src/components/candidate-management/CandidateProfileView";
import React from "react";

async function Page({ params }) {
  const { id } = await params;
  // console.log(id);

  return <CandidateProfileView candidateId={id} />;
}

export default Page;
