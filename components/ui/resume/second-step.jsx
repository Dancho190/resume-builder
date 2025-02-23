import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { useResume } from '@/context/resume'
import { Button } from '@/components/ui/button'

const SecondStep = () => {
  const {resume, setResume, updateResume, setStep } = useResume() // Тут вызываются функции из useResume контекста.

  const handleSubmit = (e) => { // Сабмит хэндлер с информацией.
    e.preventDefault()
    updateResume() // Сохраняем резюме.
    setStep(3) // Сохраняем резюме и переходим на 3 шаг.
  }

  return (
  <div 
    className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Summary</h2>  
        <Textarea 
        onChange={e => setResume({ ...resume,summary:e.target.value })}
        value={resume.summary}
        className="mb-3"
        placeholde="Write a Little description of yourself."
        rows="10"
        required
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmit}>Next</Button>
        </div>  
  </div>
  )
}

export default SecondStep
