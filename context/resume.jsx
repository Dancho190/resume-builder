"use client"
import React, { useEffect } from 'react'
import { saveResumeToDb, getUserResume } from '@/actions/resume' // Специальная функция для сохранения резюме
import toast from 'react-hot-toast' // Специальные уведомления при дейвствиях(toast)
import { useRouter } from 'next/navigation' // Навигация next-а

// Special context and State hook for resume creation
const ResumeContext = React.createContext()

const initialState = {
    name: "",
    job: "",
    address: "",
    phone: "",
    email: "",
    themeColor: "",
}

const ResumeProvider = ({ children }) => {
  // Состояния
    const [resume, setResume] = React.useState(initialState)
    const [resumes, setResumes] = React.useState([])
    const [step, setStep] = React.useState(1)
    // Хуки роутера
     const router = useRouter()

    // Сохраняем резюме в localStorage.Если уже есть,меняем его с помощью кастомного хука для стейта.
    useEffect(() => {
      const savedResume = localStorage.getItem('resume')
    if (savedResume) {
      setResume(JSON.parse(savedResume))
    }
    }, [])

    useEffect(() => {
      getUserResumes()
    }, [])

    const saveResume = async () => { // Асинхронная функция для DB.
      try {
        const data = await saveResumeToDb(resume) // Вызываем функцию вместе с пропом резюме
        setResume(data)
        toast.success("Resume saved!Move to another step✅")
         router.push(`dashboard/resume/edit/${data._id}`)
         setStep(2)// Меняем состояние и переходим на страницу редакции
      } catch(err) {
        console.error(err)
        toast.error("Failed to save resume❎")
      }
    }

    const getUserResumes = async () => {
      try {
        const data = await getUserResume() // Вызываем функцию из Actions
        setResumes(data)
      } catch(err) {
        console.log("Failed to get resumes")
        toast.error("Failed to get resumes")
      }
    }

  return (
    <ResumeContext.Provider value={{step, setStep, resume, setResume, saveResume, resumes}}>
        {children}
        </ResumeContext.Provider>
  )
}

export const useResume = () => React.useContext(ResumeContext)

export default ResumeProvider