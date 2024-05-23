import axios from "axios";

export const LoadHistory = async (user:any,setuserHistory:any,setError:any) => {
    try {   
        const { data } = await axios.get(`https://ai-gs47.onrender.com/api/userhistory/${user.id}`);
        if (data.error) throw new Error(data.error);
        let history = [];
        for (let i = 0; i < data.UserHistory.length; i++){
            history.push({
                Topic: data.UserHistory[i].topic,
            })
        }
        setuserHistory(history);
        
    } catch (error: any) {
        setError(error.message);
    }
}