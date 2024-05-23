"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import { loaduser, login } from '@/components/ServerSideComponents/Login';
import { useContext } from "react";
import UserContext from "@/context/UserContext";



const page = () => {

  const [useremail, setuseremail] = useState("");
  const [userpassword, setuserpassword] = useState("");
  const { user, setuser, loading, setloading ,Error,setError} = useContext(UserContext);
  const router = useRouter();
  
  const handlelogin = async (e:any) => {
    e.preventDefault();
    await login(useremail, userpassword, setuser ,setloading,setError);
    setuseremail("");
    setuserpassword("");
  }

  const handleloaduser = async () => {
    await loaduser(setuser,setError);
  }
  
  useEffect(() => {
    if (localStorage.getItem('token') && !user) {
      handleloaduser();
    }
    if(user) router.push('/home')
  }, [user])
  
  
  return (
      <div className='h-screen w-screen flex flex-col items-center' style={{background: `url('https://imgs.search.brave.com/bSmPossu2A_WaJGpVUYO6VuAdnTk-1ZNgAd7AyQNxR4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/c3RhdGUuZ292L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIxLzA2/L0FJLU1vdGhlcmJv/YXJkLXNjYWxlZC5q/cGc')`, backgroundSize:"cover"}}>
          <div className='h-100 w-screen flex justify-center items-center text-2xl font-bold text-white'>MindCase AI</div>
          <div className='h-180 w-180 lg:w-96 backdrop-blur-md flex flex-col items-center gap-4 justify-center'>
              <div className='text-lg font-bold text-white'>Welcome Back</div>
              <form className='flex flex-col gap-5 items-center h-130' method='POST' onSubmit={handlelogin}>
                    <Input className='w-170 lg:w-80' type="email" placeholder='Email' onChange={(e)=>setuseremail(e.target.value)} value={useremail} required/>
                    <Input className='w-170 lg:w-80' type="password" placeholder='Password' onChange={(e)=>setuserpassword(e.target.value)} value={userpassword} required/>
                    <Button type='submit' className='w-16'>{ loading?"Signing":"Login"}</Button>
          </form>
              <div className='flex gap-5'>
                  <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <Button variant="outline"><FcGoogle/></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Google Account</p>
                    </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <Button variant="outline"><FaMicrosoft/></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Microsoft Account</p>
                    </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <Button variant="outline"><FaApple/></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Apple Account</p>
                    </TooltipContent>
                </Tooltip>
             </TooltipProvider>
              </div>  
          </div>
    </div>
  )
}

export default page