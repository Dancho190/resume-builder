"use server"
import db from "@/utils/db"
import Resume from "@/models/resume"
import { currentUser } from "@clerk/nextjs/server"

// Асинхронное создание резюме в БД.
export const saveResumeToDb = async(data) => { 
    try {
        db()
        const user = await currentUser()
        const userEmail = user?.emailAddresses[0]?.emailAddress

        const {_id, ...rest} = data

        const resume = await Resume.create({...rest, userEmail})
        return JSON.parse(JSON.stringify(resume))
    } catch(err) {
        throw new Error(err)
    }
}

export const getUserResume = async () => { // Функция для нахождения резюме пользователей по ID
    try {
        db()
        const user = await currentUser()
        const userEmail = user?.emailAddresses[0]?.emailAddress

        const resumes = await Resume.find({userEmail})
        return JSON.parse(JSON.stringify(resumes))
    } catch(err) {
        throw new Error(err)
    }
}
