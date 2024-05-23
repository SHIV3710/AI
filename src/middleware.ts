
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

 
export async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;
    const token = await request.json();
    if (token) {
      NextResponse.next();
    }
}
 
export const config = {
  matcher: ['/api/login' , '/api/loaduser'],
}