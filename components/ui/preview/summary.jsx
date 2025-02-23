import React from 'react' // Summary для превью резюме при редактиовании.

const Summary = (resume) => {
  return (
    <p className= "text-xs">
        {resume.summary}
    </p>
  )
}

export default Summary
