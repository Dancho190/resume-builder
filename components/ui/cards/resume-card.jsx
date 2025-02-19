import PersonalDetails from "@/components/ui/preview/personal-details"

export default function ResumeCard({resume}) { // Специальная карточка резюме с пропом из  БД
    return (
        <div 
        className="shadow-lg h-[175] w-full rounded-xl p-5 border-t-[20px]" 
        style={{borderColor: resume?.themeColor}}
        >
            <PersonalDetails resume={resume} />
        </div>
    )
}