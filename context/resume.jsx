"use client"
import React, { useState, useEffect } from 'react'
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

const experienceField = { // Необходимые переменные для Epxerience Schema
  title: "",
  company: "",
  address: "",
  startDate: "",
  endDate: "",
  summary: "",
}

const initialState = { // Необходимое состояние и переменные что нужно заполнить с помощью хуков.
    name: "",
    job: "",
    address: "",
    phone: "",
    email: "",
    themeColor: "",
    experience: [],
}

const ResumeProvider = ({ children }) => {
  // Состояния
    const [resume, setResume] = useState(initialState)
    const [resumes, setResumes] = useState([])
    const [step, setStep] = useState(3)
    // Experience состояния.
    const [experienceList, setExperienceList] = useState([experienceField])
    const [experienceLoading, setExperienceLoading] = useState(false)
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

    const getUserResumes = async () => { // Получаем резюме из БД с помощью GET.
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

    const updateResume = async () => { // Редактируем резюме и обновляем.UPDATE
      try {
        const data = await updateResumeFromDb(resume)
        setResume(data) // Добавляем информацию в резюме.Сохраняем в таком виде.
        toast.success("Resume updated.") // Уведомление об успехе.
      } catch(err) {
        console.error(err)
        toast.error("Failed to Update resume.")
      }
    }

    // Для опыта работы и обновления резюме.
    useEffect(() => {
      if(resume.experience) {
        setExperienceList(resume.experience)
      }
    }, [resume])

    const handleExperienceChange = (e, index) => { // Event handler для изменения опыта работы.

    }

    const handleExperienceSubmit = () => { // Event handler для отправки опыта в БД.

    }

    const addExperience = () => { // Добавление опыта работы. Create операция.
      const newExperience = { ...experienceField}
      setExperienceList([...experienceList, newExperience])
    }

    const removeExperience = () => { // Удаление опыта работы.Delete запрос.
    if(experienceList.length === 1 ) return // Мы не можем удалить единственный опыт работы.
    const newEntries = experienceList.slice(0, experienceList.length - 1)  // Слайсим все элементы кроме последнего.
    setExperienceList(newEntries) // Обновляем Experience List новым переменным.
    // Обновить БД.
    }

    const handleExperienceGenerateWithAi = async () => { // Асинхронный Event Handler для запросов в Gemini.

    }

  return (
    /* Context Provider с функциями и переменными что импортируются */
    <ResumeContext.Provider value={{ 
      step, 
      setStep, 
      resume, 
      setResume, 
      saveResume, 
      resumes,
      updateResume,
      experienceList,
      experienceLoading,
      handleExperienceChange,
      handleExperienceSubmit,
      addExperience,
      removeExperience,
      handleExperienceGenerateWithAi
      }}>
        {children}
        </ResumeContext.Provider>
  )
}

export const useResume = () => React.useContext(ResumeContext)

export default ResumeProvider