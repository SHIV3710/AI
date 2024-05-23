import axios from "axios";

export const SendMessage = async (user:any, UserMessage:any,setmessageloading:any,currconv:any,setcurrconv:any,Topic:any,UserHistory:any,setUserHistory:any,setError:any) => {
    try {
        setmessageloading(true);
        setcurrconv({
            Topic: Topic,
            messages: currconv.messages ? [...currconv.messages, {
                SenderId: "You",
                message:UserMessage,
            }]:[{
                SenderId: "You",
                message:UserMessage,
            }]
        });
        const { data } = await axios.post('http://localhost:3000/api/sendmessage', {
            topic:Topic,
            senderId: user.id,
            message: UserMessage,
        })
        if (data.error) throw new Error(data.error);

        setmessageloading(false);
        if (!Topic) {
            setUserHistory([...UserHistory, data.Conversation])
        }
        setcurrconv({
            Topic: data.Conversation.topic,
            messages:currconv.messages?[...currconv.messages,data.UserMessage,data.AiMessage]:[data.UserMessage,data.AiMessage]
        });
        
        
    } catch (error: any) {
        setError(error.message);
        setmessageloading(false);
    }
}

export const LoadConversation = async (user:any,setloading:any,topic:any,setcurrconv:any,setError:any) => {
    try {
        setloading(true);
        const { data  } = await axios.put('http://localhost:3000/api/loadconversation', {
            topic: topic,
            participants: [user.id, "AI"],
        });

        if (data.error) {
            throw new Error(data.error);
        }
        setloading(false);
        setcurrconv(data.Conversation);

    } catch (error: any) {
        setError(error.message)
        setloading(false);
        
    }
}