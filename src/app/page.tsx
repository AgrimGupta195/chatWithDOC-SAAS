import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import {LogIn} from "lucide-react"
import FileUpload from "@/components/FileUpload";
export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 flex items-center justify-center p-1" >
      <div className="absolute top-4 right-4">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-10 h-10",
              userButtonAvatarImage: "w-10 h-10 rounded-full",
            },
          }}
        />
      </div>
      <div className="top-0.5 left-0.5 ">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold ">
              Chat with any PDF
            </h1>
            
          </div>
          <div className="flex mt-4 flex-col ">
            {isAuth && <Button>
              Go to Chats
            </Button>}
            <p className="max-w-xl mt-2 text-lg text-slate-600">Join millions of students , researchers and professionals to instantly answer questions and understood research with AI</p>
            <div className="w-full mt-4">
              {isAuth? (<FileUpload/>):(<Link href="/sign-in">
              <Button>
               Login to get started
               <LogIn className="w-4 h-4 ml-1"/>
              </Button>
              </Link>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
