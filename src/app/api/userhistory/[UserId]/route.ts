import { NextResponse } from "next/server";
import { supabase } from "../../../../../utils/supabase";

export async function GET(request: Request,params:any) {
    try {
        
        const UserId = params.params.UserId.toStromg;

        let UserHistory;
        const { data, error } = await supabase.from('conversation').select('topic').contains('participants',[UserId]);
        if (data && data.length > 0) {
            UserHistory = [...data];
        }
        return NextResponse.json({
            UserHistory : UserHistory,
        })
        
    } catch (error: any) {
    
        return NextResponse.json({
            Error:error,
        })
    }
}