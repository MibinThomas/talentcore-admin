import JobDetailsPage from '@/src/components/jobs-management/JobDetailsPage'
import React from 'react'

async function Page({ params }) {
  const { id } = await params;
  return (
    <JobDetailsPage jobId={id} />
  )
}

export default Page