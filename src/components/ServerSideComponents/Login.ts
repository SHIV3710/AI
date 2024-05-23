import axios from 'axios';
var jwt = require('jsonwebtoken');

export const login = async (email: any, password: any,setuser:any,setloading:any,setError:any) => {
    
    const secretkey = process.env.NEXT_PUBLIC_SECRET_KEY;
    try {
        setloading({value:true});
        const { data  } = await axios.post("https://ai-gs47.onrender.com/api/login", {
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
            setloading({value:false});
            setuser({
                id: data.user.id,
                Email: data.user.id,
            });
        }
    } catch (error:any) {
        setloading({ value:false});
        setError( error.message );
        
    }
}

export const loaduser = async (setuser:any,setError:any) => {
    try {

        const { data } = await axios.put("https://ai-gs47.onrender.com/api/loaduser", {
            token: localStorage.getItem('token'),
        })
        if (data.error) throw new Error(data.error);
        setuser({
            id: data.decoded.data.id,   
            Email:data.decoded.data.Email,
        })
        
    } catch (error:any) {
        setError(error.message);
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