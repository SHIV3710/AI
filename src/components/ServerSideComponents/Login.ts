import axios from 'axios';
var jwt = require('jsonwebtoken');

export const login = async (email: any, password: any,setuser:any,setloading:any,setError:any) => {
    
    const secretkey = process.env.NEXT_PUBLIC_SECRET_KEY;
    try {
        setloading(true);
        const { data  } = await axios.post("http://localhost:3000/api/login", {
            email: email,
            password: password,
        });
        if (data.error) throw new Error(data.error);
        if (data.user) {

            var token =  await jwt.sign({
                exp: Math.floor(Date.now() + 10),
                data: data.user,
            }, secretkey);
    
            if (token)
            {
                localStorage.setItem('token', token);
            }
            setloading(false);
            setuser(data.user);
        }
    } catch (error:any) {
        setloading(false);
        setError(error.message);
        
    }
}

export const loaduser = async (setuser:any,setError:any) => {
    try {

        const { data } = await axios.put("http://localhost:3000/api/loaduser", {
            token: localStorage.getItem('token'),
        })
        if (data.error) throw new Error(data.error);
        
        setuser(data.decoded.data)
        
    } catch (error) {
        setError(data.error);
    }
}

export const logout = async (setuser: any) => {
    try {

        localStorage.setItem('token', "");
        setuser(null);
        
    } catch (error) {
        console.log(error);
    }
}