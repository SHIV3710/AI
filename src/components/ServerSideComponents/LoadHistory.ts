import axios from "axios";

export const LoadHistory = async (user:any,setUserHistory:any,setError:any) => {
    try {   

        const { data } = await axios.get(`http://localhost:3000/api/userhistory/${user.id}`);
        if (data.error) throw new Error(data.error);
        setUserHistory(data.UserHistory);
        
    } catch (error: any) {
        setError(error.message);
    }
}