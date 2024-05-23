import React, { Dispatch, SetStateAction } from 'react';


// export type User = {
//     id: String,
//     Email: String,
// };
// export type CurrConv = {
//     topic: String,
//     Messages: Array<Object>,
// }

// export interface UserContextInterface{
//     user: User,
//     setuser: Dispatch<SetStateAction<User>>
//     currconv: CurrConv,
//     setcurrconv: Dispatch<SetStateAction<CurrConv>>
    
// }

// const UserContext = React.createContext({

//     user: {
//         id: "",
//         Email:"",
//     },
//     setuser: (user: User) => { },
//     currconv: {
//         topic: "",
//         Messages:[],
//     },
//     setcurrconv: (currconv: CurrConv) => {},
    

// });

const UserContext = React.createContext({});

export default UserContext;