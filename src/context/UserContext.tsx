import React, { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';


export type User = {
    id: String,
    Email: String,
};
export type Message = {
    id: String,
    created_at: String,
    SenderId: String,
    RecieverId: String,
    message:String,
}
export type Topic = String;
export type CurrConv = {
    Topic: String,
    Messages: Message[],
}
export type UserHistory = Topic[];

export const UserContext = createContext<{
    user: User
    setuser: (user: User) => void
    currconv: CurrConv
    setcurrconv: (currconv: CurrConv) => void
    loading: Boolean
    setloading: (loading: Boolean) => void
    userHistory: UserHistory
    setuserHistory: (userHistory: UserHistory) => void
    Error: String
    setError: (Error: String) => void
    messageloading: Boolean,
    setmessageloading: (messageloading:Boolean) => void
}>({
    user: {id:"",Email:""},
    setuser: () => { },
    currconv: { Topic: "", Messages: [{ id: "", created_at: "", SenderId: "", RecieverId: "", message: "" }] },
    setcurrconv: () => { },
    loading: false,
    setloading: () => { },
    userHistory: [],
    setuserHistory: () => { },
    Error: "",
    setError: () => { },
    messageloading: false,
    setmessageloading:()=>{},
})
