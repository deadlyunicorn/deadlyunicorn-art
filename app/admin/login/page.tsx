import { getCsrfToken } from "next-auth/react";
import { cookies } from "next/headers";

const LoginPage = async( { searchParams }:{ searchParams: { error?: string } } ) => {

  const csrfToken = cookies()
    .getAll()
    .find( cookie => cookie.name == "next-auth.csrf-token")?.value
    .split('|')[0]; 
    //because get a string: "cookie1|cookie2"

  return (

    <main className="flex flex-col items-center mt-2">

      <form 
        method="POST"
        //this variable should be equal to process.env.NEXTAUTH_URL
        action={`${process.env.serverURL}/api/auth/callback/credentials`} 
        className="flex flex-col group gap-2">
      
        <input 
          className="outline-none focus:border-b border-black" 
          required 
          placeholder="login" 
          name="login"/>

        <input 
          className="outline-none focus:border-b border-black" 
          required 
          placeholder="password" 
          name="password" 
          type="password"/>

        <input 
          hidden 
          value={csrfToken} 
          name="csrfToken" 
          readOnly/>

        <button 
          className="outline-none 
            focus:underline focus:decoration-red-600 
            focus:group-valid:decoration-green-600">
              submit
        </button>
        
      </form>

      {
        searchParams.error && 
          <p 
            className="text-red-600 text-center capitalize">
              login failed.
          </p>
      }

      
    </main>
  )
}


export default LoginPage;