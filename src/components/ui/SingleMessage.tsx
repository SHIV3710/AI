"use client"

import React from 'react'

const SingleMessage = (params:any) => {
  return (
      <div className='flex flex-col gap-2'> 
          <div className='h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium' style={{ backgroundColor: params.sender == 'AI'? "#7aaa70":"#b57b7b"}}>{params.sender == 'AI' ? "AI" : "You"}</div>
          <div>{params.message}</div>
      </div>
  )
}

export default SingleMessage