'use client'

import React, { useEffect, useState } from 'react'
import UserContext from './UserContext';
 import { Bounce, ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const UserContextProvider = ({ children,}: Readonly<{children: React.ReactNode;}>) =>  { 


    const [user, setuser] = useState<any>(null);
    const [loading, setloading] = useState<any>(false);
    const [currconv, setcurrconv] = useState<any[]>([
        {
            Topic: "",
            messages:[],
        }
    ]);
    const [messageloading, setmessageloading] = useState<any>(false);
    const [UserHistory, setUserHistory] = useState<any[]>([]);
    const [Error, setError] = useState<any>("");


    const error = () => toast.error(Error, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: localStorage.getItem('theme') == 'dark' ? "light":"dark",
      transition: Bounce,
    });
    
    const loginsuccess = () => toast.success('Welcome to MindCube AI', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: localStorage.getItem('theme') == 'dark' ? "light":"dark",
      transition: Bounce,
    });
    
    const loadingnotify = (message:any) => toast.success(message , {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: localStorage.getItem('theme') == 'dark' ? "light":"dark",
      transition: Bounce,
    });


    const AddMessageToConv = async (message: any) => {
    }

    const RemoveLastMessage = async (message: any) => {
        let mess = currconv;
        mess.pop();
        setcurrconv(mess);
    }

    useEffect(() => {
        if (Error) {
            error();
        }
        setError("");
    }, [Error])
    
    useEffect(() => {
        if (user) {
            loginsuccess();
        }
    }, [user])
    
    useEffect(() => {
        if(loading)
            loadingnotify('Wait for a while');
    },[loading])

    useEffect(() => {
        if(messageloading)
            loadingnotify('Ai is thinking...');
    },[messageloading])

    return (
        <UserContext.Provider value={{ user, setuser ,loading, setloading ,currconv,setcurrconv,AddMessageToConv,messageloading,setmessageloading, RemoveLastMessage,UserHistory,setUserHistory,Error,setError}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;