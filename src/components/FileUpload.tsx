'use client'
import { uploadToS3 } from '@/lib/s3'
import { useMutation } from '@tanstack/react-query'
import { Inbox } from 'lucide-react'
import React, { use } from 'react'
import{useDropzone} from 'react-dropzone'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'
type Props = {}

const FileUpload = () => {
    const[uploading,setUploading] = React.useState(false);
   const { mutate, isPending } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });

const{getRootProps, getInputProps}=useDropzone({
    accept: {
        'application/pdf':[".pdf"],
    },
    maxFiles:1,
    onDrop:async (acceptedFiles) => {
        console.log(acceptedFiles)
        const file = acceptedFiles[0];
        if(file.size > 10 * 1024 * 1024) {
            toast.error('File size exceeds 10MB limit');
            return;
        }
        try {
            setUploading(true);
            const data = await uploadToS3(file);
            console.log('File uploaded to S3:', data);
            
            if(!data?.file_key || !data.file_name) {
                toast.error('Failed to upload file');
                return;
            }
             mutate(data, {
          onSuccess: () => {
            toast.success("Chat created successfully");
          },
          onError: (err) => {
            toast.error("Error creating chat");
            console.error(err);
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    }
})
  return (
    <div className='p-2 bg-white rounded-xl'>
        <div {...getRootProps({
            className:'border-2 border-dashed  rounded-xl cursor-pointer bg-gray-50 py-8 flex flex-col items-center justify-center '
        })}>
            <input  {...getInputProps()}/>
            {uploading || isPending ? (
               <Loader className='w-10 h-10 text-blue-500 animate-spin' />
            ) : <>
            <Inbox className='w-10 h-10 text-blue-500'/>
            <p className='mt-2 text-sm text-slate-400'>Drop PDF Here </p>
            </>}
            
        </div>
    </div>
  )
}

export default FileUpload