import PersonalDetails from "@/components/ui/preview/personal-details"// Личная информация.
import Summary from "@/components/ui/preview/summary" // Превью резюме.
import Link from "next/link"


export default function ResumeCard({resume}) { // Специальная карточка резюме с пропом из  БД
    return (
     <Link href={`/dashboard/resume/edit/${resume._id}`}>
        <div 
         className="shadow-lg h-[175] w-full rounded-xl p-5 border-t-[20px]" 
         style={{borderColor: resume?.themeColor}}
        >
         <PersonalDetails resume={resume} />
         <Summary resume={resume} />
        </div>
     </Link>
    )
}