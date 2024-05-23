import axios from "axios";

export const SendMessage = async (user:any, UserMessage:any,setmessageloading:any,currconv:any,setcurrconv:any,Topic:any,userHistory:any,setUserHistory:any,setError:any) => {
    try {
        setmessageloading({value:true});
        setcurrconv({
            Topic: Topic,
            Messages: currconv.Messages ? [...currconv.Messages, {
                SenderId: "You",
                message:UserMessage,
            }]:[{
                SenderId: "You",
                message:UserMessage,
            }]
        });
        const { data } = await axios.post('https://ai-gs47.onrender.com/api/sendmessage', {
            topic:Topic,
            senderId: user.id,
            message: UserMessage,
        })
        if (data.error) throw new Error(data.error);

        setmessageloading(false);
        if (!Topic) {
            setUserHistory([...userHistory.Messages, data.Conversation])
        }
        setcurrconv({
            Topic: data.Conversation.topic,
            Messages:currconv.Messages?[...currconv.Messages,data.UserMessage,data.AiMessage]:[data.UserMessage,data.AiMessage]
        });
        
        
    } catch (error: any) {
        setError(error.message);
        setmessageloading(false);
    }
}

export const LoadConversation = async (user:any,setloading:any,topic:any,setcurrconv:any,setError:any) => {
    try {
        setloading(true);
        const { data  } = await axios.put('https://ai-gs47.onrender.com/api/loadconversation', {
            topic: topic,
            participants: [user.id, "AI"],
        });

        if (data.error) {
            throw new Error(data.error);
        }
        setloading(false);
        console.log(data.Conversation);
        setcurrconv(data.Conversation);

    } catch (error: any) {
        setError(error.message)
        setloading(false);
        
    }
}