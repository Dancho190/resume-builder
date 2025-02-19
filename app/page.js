import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = () => {
  return (
    <div className= "flex justify-center items-center h-screen">
      <Link href="/resume/create">
      <Button>Start Creating</Button>
      </Link>
    </div>
  )
}

export default page
