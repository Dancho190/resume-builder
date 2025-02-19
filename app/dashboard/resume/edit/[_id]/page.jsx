"use client"
import React from 'react'
import { useResume }  from '@/context/resume'
import SecondStep from '@/components/ui/resume/second-step'
import ThirdStep from '@/components/ui/resume/third-step'
import FourthStep from '@/components/ui/resume/fourth-step'
import FifthStep from '@/components/ui/resume/fifth-step'
import ResumeNav from '@/components/ui/nav/resume-nav'
import FirstStep from '@/components/ui/resume/first-step-create'
// Специальный edit mode с уникальным id резюме

const ResumeCreatePage = () => {
     // now using the context
     const { step } = useResume()
  return ( 
    <div className="flex flex-col justify-center items-center h-screen">
      <ResumeNav />
        {step === 1 && <FirstStep />}
        {step === 2 && <SecondStep />}
        {step === 3 && <ThirdStep />}
        {step === 4 && <FourthStep />}
        {step === 5 && <FifthStep />}
    </div>
  )
}

export default ResumeCreatePage
