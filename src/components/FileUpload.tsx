'use client'
import { Inbox } from 'lucide-react'
import React, { use } from 'react'
import{useDropzone} from 'react-dropzone'
type Props = {}

const FileUpload = () => {
const{getRootProps, getInputProps}=useDropzone({
    accept: {
        'application/pdf':[".pdf"],
    },
    maxFiles:1,
    onDrop: (acceptedFiles) => {
        console.log(acceptedFiles)
    }
})
  return (
    <div className='p-2 bg-white rounded-xl'>
        <div {...getRootProps({
            className:'border-2 border-dashed  rounded-xl cursor-pointer bg-gray-50 py-8 flex flex-col items-center justify-center '
        })}>
            <input  {...getInputProps()}/>
            <>
            <Inbox className='w-10 h-10 text-blue-500'/>
            <p className='mt-2 text-sm text-slate-400'>Drop PDF Here </p>
            </>
        </div>
    </div>
  )
}

export default FileUpload