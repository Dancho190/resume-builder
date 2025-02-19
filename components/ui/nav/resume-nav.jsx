import React from 'react'
import { useResume } from '@/context/resume' // Импортируем хук с стэйтом
import { Button } from '@/components/ui/button'

const ResumeNav = () => {
    const {step, setStep} = useResume()

  return (
    <nav className="flex justify-center w-full py-4">
        <div className= "flex space-x-4">
            {[1,2,3,4,5].map((item) => (
                <Button className={`w-10 h-10 flex items-center justify-center rounded-full transition hover:bg-primary hover:text-slate-200 ${
                    step === item ? // Когда пользователь на каком то шагу,меняется шаг и стили в Map. 
                    "bg-primary text-slate-200 dark:text-slate-800" : "bg-secondary text-gray-700 dark:text-gray-400"
                }`} 
                key={item}
                onClick={() => setStep(item)} // Меняем item и state когда переходим на другой шаг.
                // Навигируем по разным компонентам шагов
                // disabled ={step < item}
                >
                    {item}
                </Button>
            )
            )}
        </div>
    </nav>
  )
}

export default ResumeNav
