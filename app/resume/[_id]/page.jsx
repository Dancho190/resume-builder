import React from 'react'
import { getResumeFromDb } from '@/actions/resume'
import PersonalDetails from '@/components/ui/preview/personal-details'
import Summary from '@/components/ui/preview/summary'
import Experience from '@/components/ui/preview/experience'
import Education from '@/components/ui/preview/education'
import Skills from '@/components/ui/preview/skills'

export default async function ResumePage({params}) {
  const resume = await getResumeFromDb(params._id)

  return (
<div className="m-20">
    <PersonalDetails resume={resume} />
    <Summary resume={resume} />
    <Experience resume={resume} />
    <Education resume={resume} />
    <Skills resume={resume} />
</div>
  )
}


