import React from 'react'
import AppliedCandidateDetals from './AppliedCandidateDetals'

async function Page({params}) {
  const {userId} = await params;
  return (
    <AppliedCandidateDetals applicationId = {userId}/>
  )
}

export default Page