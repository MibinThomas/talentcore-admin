"use client";
import React, { useEffect, useState } from "react";
import ProfileOverview from "./ProfileOverview";
import CandidateProfileDetails from "./CandidateProfileDetails";
import { getCandidatesDetailsByIdAPI } from "@/src/services/allAPI";

function CandidateProfileView({ candidateId }) {
  //candidate details
  const [data, setData] = useState({});
  const handleGetCandidateDetails = async () => {
    try {
      const result = await getCandidatesDetailsByIdAPI(candidateId);
      if (result.status === 200) {
        setData(result.data.data);
      } else {
        // console.log(result.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      handleGetCandidateDetails();
    };
    fetch();
  }, []);
  return (
    <>
      <ProfileOverview data={data} />
      <CandidateProfileDetails data={data} />
    </>
  );
}

export default CandidateProfileView;
