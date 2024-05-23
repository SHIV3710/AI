"use client"
import React, { useContext } from 'react'
import { LoadConversation } from '../ServerSideComponents/Message'
import { UserContext } from '@/context/UserContext';

const ChatHistoryLeftSide = ({ item }: { item: any }) => {

    const { user, setcurrconv,setloading,setError} = useContext(UserContext);

  const LoadOldConv = async () => {
    await LoadConversation(user, setloading, item, setcurrconv,setError);
  }
  return (
    <div onClick={LoadOldConv} className='min-h-8 rounded-sm flex items-center justify-start  hover:text-red-400 mt-1 text-sm no-scrollbar cursor-pointer'>
        {item.length > 30 ? item.substring(0, 45) + '...' : item}
    </div>
      
  )
}

export default ChatHistoryLeftSide