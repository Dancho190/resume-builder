import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

// https://cdn-icons-png.flaticon.com/128/9131/9131795.png // Download
// https://cdn-icons-png.flaticon.com/128/10550/10550076.png // Share
// https://cdn-icons-png.flaticon.com/128/446/446991.png // Print
// Страница загрузки.
const DownloadPage = () => {
  return (
    <div className="flex jusitfy-center items-center h-screen">
        <div>
            <h2 className="font-bold text-lg">Congratulations!Your Resume succesfully created!</h2>
            <p>You can download,print or share it with anyone.</p>

            <div className="flex justify-between my-20">
              <div className="flex flex-col items-center">
                <Image 
                src="https://cdn-icons-png.flaticon.com/128/9131/9131795.png"
                width={50}
                height={50}
                />
                <Button className="my-3">Download</Button>
              </div>
              <div className="flex flex-col items-center">
                <Image 
                src="https://cdn-icons-png.flaticon.com/128/446/446991.png"
                width={50}
                height={50}
                />
                <Button className="my-3">Print</Button>
              </div>
              <div className="flex flex-col items-center">
                <Image 
                src="https://cdn-icons-png.flaticon.com/128/10550/10550076.png"
                width={50}
                height={50}
                />
                <Button className="my-3">Share</Button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default DownloadPage
