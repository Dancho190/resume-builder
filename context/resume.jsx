"use client"
import React, { useEffect } from 'react'
import {
   saveResumeToDb,
   getUserResume, 
   getResumeFromDb,
   updateResumeFromDb
   } from '@/actions/resume' // Специальная функция для сохранения резюме
import toast from 'react-hot-toast' // Специальные уведомления при действиях(toast)
import { useRouter, useParams, usePathname } from 'next/navigation' // Навигация next-а

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
     const {_id} = useParams() // Добавляем id резюме в контекст.
     const pathname = usePathname() 

    // Сохраняем резюме в localStorage.Если уже есть,меняем его с помощью кастомного хука для стейта.
    useEffect(() => {
      const savedResume = localStorage.getItem('resume')
    if (savedResume) {
      setResume(JSON.parse(savedResume))
    }
    }, [])

    useEffect(() => { // Если есть id в базе данных,берем резюме и дисплеим.
      if(_id) {
        getResume(_id) // Получаем id и меняем состояние.
      }
    }, [_id]) // id это зависимость.

    useEffect(() => {
      if(pathname?.includes("/resume/create")) {
        setResume(initialState) // Если мы находимся на resume/createБ
        // то резюме переходит в начальное состояние
        setStep(1) // Автоматически на первом шагу.
      }
    }, [pathname]) // pathname-зависимость.

    useEffect(() => {
      getUserResumes() // Используем GetUserResumes функцию для получения резюме.
    }, [])

    const saveResume = async () => { // Асинхронная функция для DB.
      try {
        const data = await saveResumeToDb(resume) // Вызываем функцию вместе с пропом резюме
        setResume(data)
        localStorage.removeItem('resume') // Удаляем резюме из локального хранилища при сохранении.
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

    const getResume = async () => { // Получаем резюме с базы данных.
      try {
        const data = await getResumeFromDb(_id)
        setResume(data)
      } catch(err) {
        toast.error('Failed to get resume')
      }
    }

    const updateResume = async () => { // Редактируем резюме.
      try {
        const data = await updateResumeFromDb(resume)
        setResume(data)
        toast.success("Resume updated.") // Уведомление об успехе.
      } catch(err) {
        console.error(err)
        toast.error("Failed to Update resume.")
      }
    }

  return (
    <ResumeContext.Provider value={{
      step, 
      setStep, 
      resume, 
      setResume, 
      saveResume, 
      resumes,
      updateResume
      }}>
        {children}
        </ResumeContext.Provider>
  )
}

export const useResume = () => React.useContext(ResumeContext)

export default ResumeProvider