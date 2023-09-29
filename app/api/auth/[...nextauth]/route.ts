import { customUser } from "@/app/api/verification/route"
import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const handler = NextAuth({
  providers: [
    CredentialsProvider({

      credentials: {
        login: { label: "username" },
        password: { label: "password", type: "password" }
      },

      async authorize(credentials) {

        const user: customUser|null = await fetch ( `${process.env.serverURL}/api/verification`, 
        { 
          method: "POST",
          body: JSON.stringify(credentials),
          // cache:"no-cache" 
        })
        .then( async( res ) => { 
          if (res.ok) return await res.json();
          else return null;
        })

        if ( user && user.username) {

          const sessionUser: User = {
            id: user.id,          
            name: user.username, 
            email: undefined,    
            image: undefined     
          }

          return sessionUser;
          
        }

        return null;

      },
    }),
  ],
  pages: {
    signIn: '/admin/login'
  }
})

export { handler as POST, handler as GET }

