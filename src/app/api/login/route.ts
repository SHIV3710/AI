import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../utils/supabase"
import bcrypt from "bcryptjs";


export async function POST(request:Request) {
    
    try {

        const user = await request.json();

        let User;

        if (!User) {
            let { data, error } = await supabase.from("users").select().eq("Email", user.email);
            if (data && data.length > 0) {
                User = data[0];
            }
        }

        if (User) {
            if (!bcrypt.compareSync(user.password, User.Password)) throw new Error("Wrong Password!")
        }
        else {
            const hash = bcrypt.hashSync(user.password, 10);
            const { data, error } = await supabase.from("users").insert({ Email: user.email, Password: hash }).select();
            if (data && data.length > 0) {
                User = data[0];
            }
        }
        return NextResponse.json({
            user: User,
        })

    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
        })
    }
}

