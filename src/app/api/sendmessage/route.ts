import { NextResponse } from "next/server";
import { supabase } from "../../../../utils/supabase";
import { GenerateApiResponse } from "@/components/ServerSideComponents/GenerateAiText";

export async function POST(request : Request) {
    try {

        const clientsideinfo = await request.json();
        const senderId = clientsideinfo.senderId || "0000";
        const message = clientsideinfo.message;
        const topic = clientsideinfo.topic || message;


        if ((!senderId)|| !message) {
            throw new Error("Please Provide Id or Message");
        }

        let newMessage;

        if (!newMessage) {
            const { data, error } = await supabase.from("message").insert({
                SenderId: senderId,
                RecieverId: "AI",
                message: message,
            }).select();

            if (data) {
                newMessage = data[0];
            }
        }

        let AIResponse;
        const Ai_Response = await GenerateApiResponse(message);

        if (!AIResponse) {
            const { data, error } = await supabase.from("message").insert({
                SenderId: "AI",
                RecieverId: senderId,
                message: Ai_Response,
            }).select();


            if (data) {
                AIResponse = data[0];
            }
        }

        let conversation;

        if (!conversation) {
            const { data, error } = await supabase.from("conversation").select().contains('participants', [senderId,"AI"]).eq('topic',topic);
            
            if (data && data.length > 0) {
                conversation = data[0];
            }
            else { 
                const { data, error } = await supabase.from("conversation").insert({
                    participants: [senderId , "AI"],
                    topic: topic,
                }).select();
                    
                if (data) {
                    conversation = data[0];
                }
            }
        }


        if (!conversation.messages) {
            const { data, error } = await supabase.from('conversation').update({ messages: [newMessage.id,AIResponse.id] }).eq('id',conversation.id).select();
            if (data) conversation = data[0];
        }
        else {
            const { data, error } = await supabase.from('conversation').update({ messages: [...conversation.messages,newMessage.id,AIResponse.id] }).eq('id',conversation.id).select();
            if (data) conversation = data[0];
        }

        
            
        return NextResponse.json({
            Conversation: conversation,
            UserMessage: newMessage,
            AiMessage:AIResponse,
        })
        
    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
        })
    }
}