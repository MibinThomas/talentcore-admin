import ViewAllApplicants from '@/src/components/jobs-management/ViewAllApplicants'
import React from 'react'

async function page({params}) {
  const {id}=await params;
  return (
    <ViewAllApplicants jobId={id}/>
  )
}

export default page