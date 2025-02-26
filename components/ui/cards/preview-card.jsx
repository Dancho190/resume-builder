import PersonalDetails from "@/components/ui/preview/personal-details"// Личная информация.
import Summary from "@/components/ui/preview/summary" // Превью резюме.
import { useResume } from "@/context/resume"


export default function PreviewCard() { // Специальная карточка резюме с пропом из  БД
    const { resume } = useResume()

    return (
        <div 
         className="shadow-lg max-h-screen w-full rounded-xl p-5 border-t-[20px] overflow-y-auto" 
         style={{ borderColor: resume?.themeColor}}
        >
         <PersonalDetails resume={resume} />
         <Summary resume={resume} />
        </div>
    )
}