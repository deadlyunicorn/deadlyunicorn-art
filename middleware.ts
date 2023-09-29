import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";

export const middleware = ( request: NextRequest ) => {

  const authCookie = cookies().get('next-auth.session-token');

  const pathname = request.nextUrl.pathname;

  if ( pathname != "/admin/login" && !( authCookie && authCookie.value ) ){
    return NextResponse.redirect(`${process.env.serverURL}/admin/login`);
  }


  

}

export const config = {
  matcher : ["/admin/:path*"]
}