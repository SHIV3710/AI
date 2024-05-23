"use client"

import ChatHistoryLeftSide from "@/components/ui/ChatHistoryLeftSide";
import SingleMessage from "@/components/ui/SingleMessage";
import { useTheme } from "next-themes"
import { Textarea } from "@/components/ui/textarea";
import { IoSend } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useContext, useEffect, useState } from "react";
import {UserContext} from "@/context/UserContext";
import { useRouter } from 'next/navigation';
import { loaduser, logout } from "@/components/ServerSideComponents/Login";
import { Button } from "@/components/ui/button";
import { SendMessage } from "@/components/ServerSideComponents/Message";
import { LoadHistory } from "@/components/ServerSideComponents/LoadHistory";


export default function Home() {

  
  const { user, setuser, currconv, setcurrconv,setmessageloading ,userHistory,setuserHistory,setError,loading} = useContext(UserContext);
  const [UserMessage, setCurrMessage] = useState<any>("");
  const [Mode, setMode] = useState<any>("light");


  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMode(localStorage.getItem("theme"));
    }
  })
  
  const router = useRouter();

  const { setTheme} = useTheme();

  useEffect(() => {
    if (!user || !user.Email) {
      router.push('/login');
    }
  }, [user])


  useEffect(() => {
    if(user && user.id)
      LoadHistory(user,setuserHistory,setError);
  },[])

  const handletheme = () => {
    if (localStorage.getItem('theme') == 'light') {
      setTheme('dark');
    }
    else setTheme('light');
  }
  
  const handlesendmessage = async (e:any) => {
    e.preventDefault();
    setCurrMessage("");
    const Topic = currconv   ? currconv.Topic : "";
    await SendMessage(user, UserMessage, setmessageloading, currconv,setcurrconv , Topic, userHistory, setuserHistory,setError);
  }

  const handlenewchat = async () => {
    setcurrconv({
      Topic: "",
      Messages:[],
    });
  }

  useEffect(() => {
    console.log(userHistory);
  },[userHistory])



  return (
    <div className='h-200 w-200 flex'>
      <div className='h-200 w-200  flex flex-col items-center justify-between py-5'>
        <div className="h-10  flex justify-between items-center gap-10 lg:gap-16 ">
          <div className='min-h-12  flex items-center justify-center  rounded-sm cursor-pointer' onClick={handlenewchat}>New Chat</div>
          <Sheet>
            <SheetTrigger>History</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your History</SheetTitle>
              </SheetHeader>
                 {
                  userHistory &&  userHistory.map((item:any, index:any) => {
                    return <ChatHistoryLeftSide item={item.Topic} key={index} />
                  })
                }

            </SheetContent>
          </Sheet>
          <div className="min-h-12 w-14 flex items-center justify-center gap-1 rounded-sm cursor-pointer" onClick={handletheme}>{Mode  == 'light' ? <><FiSun /> </> : <><FaRegMoon /> </>} </div>
          <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="flex justify-center" onClick={async()=> await logout(setuser)}>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu>
          </div>
          
        </div>


        <div className="h-170 w-160 flex flex-col gap-5 overflow-y-scroll no-scrollbar">
              {
                  currconv && currconv.Messages &&
                  currconv.Messages.map((item:any, index:any) => {
                    return <SingleMessage message={item.message}  sender={item.SenderId}  key={index} />
                  })
              }
        </div>
        
        <form className="h-14 w-180 rounded-sm relative" onSubmit={handlesendmessage} method="POST">
          <Textarea className='h-14  pr-16 overflow-wrap  remove-focus ' placeholder="Message MindCase AI" value={UserMessage} onChange={(e) => setCurrMessage(e.target.value)} required />
          <Button  type='submit' className="text-2xl absolute right-6 bottom-2 cursor-pointer" variant={'ghost'}> 
          <IoSend  />
          </Button>
          
        </form>
      </div>

    </div>
  );
}


