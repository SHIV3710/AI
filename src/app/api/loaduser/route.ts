import { gettokendata } from "@/app/helpers/gettokendata";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    try {

        const data = await request.json();

        const decoded = await gettokendata(data.token);
        
        return NextResponse.json({
            data,
            decoded,
        })
    } catch (error) {
        return NextResponse.json({
            error:error,
        })
    }
}