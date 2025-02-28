import PersonalDetails from "@/components/ui/preview/personal-details"// Личная информация.
import Summary from "@/components/ui/preview/summary" // Превью резюме.
import Experience from "@/components/ui/preview/experience"
import Education from "@/components/ui/preview/education"
import Link from "next/link"
// Превью карточка для Dashboard-а.

export default function ResumeCard({resume}) { // Специальная карточка резюме с пропом из  БД
    return (
     <Link href={`/dashboard/resume/edit/${resume._id}`}>
        <div 
         className="shadow-lg w-full rounded-xl p-5 border-t-[20px] max-h-screen overflow-y-auto" 
         style={{borderColor: resume?.themeColor}}
        >
         <div className="line-clamp-3">
         <PersonalDetails resume={resume} />
         </div>
         <div className="line-clamp-4">
         <Summary resume={resume} />
         </div>
         <div className="line-clamp-4">
         <Experience resume={resume} />
         </div>
         <div className="line-clamp-4">
         <Education resume={resume} />
         </div>
        </div>
     </Link>
    )
}