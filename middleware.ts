import { User } from "next-auth";
import { headers } from "next/headers"
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const middleware = async( request: NextRequest ) => {

  const session:session = await fetch(`${process.env.serverURL}/api/auth/session`, {
    headers:headers()
  })
  .then( async( res ) => await res.json() );

  const loggedIn = Object.keys(session).length > 0? true :false;
  const pathname = request.nextUrl.pathname;

  if ( pathname != "/admin/login" && !loggedIn ){
    redirect(`/admin/login`);
  }

}

export const config = {
  matcher : ["/admin/:path*"]
}

type session = {} | User;