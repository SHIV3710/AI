import { NextResponse } from "next/server";
import { supabase } from "../../../../utils/supabase";

export async function PUT(request:Request) {
    
    try {
        const loadconversation = await request.json();
        const topic = loadconversation.topic;
        const participants = loadconversation.participants;

        if (!topic || !participants) {
            throw new Error("Check Input");
        }

        let conversation;

        const { data, error } = await supabase
        .from('conversation')
        .select()
        .eq('topic', topic)
        .contains('participants', [participants[0]])
        .contains('participants', [participants[1]]);
        
        if (data && data.length > 0) conversation = data[0]; 

        const conversationmessages = [];

        console.log(conversation);

        for (let i = 0; i < conversation.messages.length; i++){
            const { data, error } = await supabase.from("message").select().eq('id', conversation.messages[i]);
            if (data && data.length > 0) {
                conversationmessages.push(data[0]);
            }
        }

        if (conversationmessages && conversationmessages.length > 0) {
            conversation.messages = conversationmessages;
        }
        
        if (data && data.length == 0 || !data) {
            throw new Error('No Conversation Found');
        }

        return NextResponse.json({
            Conversation: data ? {
                Topic: data[0].topic,
                Messages:data[0].messages,
            }:"",
            
        })
        
    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
        })
    }
}