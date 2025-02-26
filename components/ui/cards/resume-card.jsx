import PersonalDetails from "@/components/ui/preview/personal-details"// Личная информация.
import Summary from "@/components/ui/preview/summary" // Превью резюме.
import Link from "next/link"


export default function ResumeCard({resume}) { // Специальная карточка резюме с пропом из  БД
    return (
     <Link href={`/dashboard/resume/edit/${resume._id}`}>
        <div 
         className="shadow-lg w-full rounded-xl p-5 border-t-[20px] max-h-screen overflow-y-auto" 
         style={{borderColor: resume?.themeColor}}
        >
         <PersonalDetails resume={resume} />
         <Summary resume={resume} />
        </div>
     </Link>
    )
}