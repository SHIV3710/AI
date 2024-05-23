'use client'

import React, { useEffect, useState } from 'react'
import  { CurrConv, User, UserContext, UserHistory } from './UserContext';
 import { Bounce, ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const UserContextProvider = ({ children,}: Readonly<{children: React.ReactNode;}>) =>  { 


    const [user, setuser] = useState<User>( {
        id: "",
        Email:"",
    });
    const [loading, setloading] = useState<Boolean>(false);
    const [currconv, setcurrconv] = useState<CurrConv>(
        {
            Topic: "",
            Messages:[],
        }
    );
    const [messageloading, setmessageloading] = useState<Boolean>(false);
    const [userHistory, setuserHistory] = useState<UserHistory>([]);
    const [Error, setError] = useState<String>("");


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

    useEffect(() => {
        if (Error) {
            error();
        }
        setError("");
    }, [Error])
    
    useEffect(() => {
        if (user && user.Email) {
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
    }, [messageloading])
    
    return (
        <UserContext.Provider value={{ user, setuser ,loading, setloading ,currconv,setcurrconv,messageloading,setmessageloading, userHistory,setuserHistory,Error,setError}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;