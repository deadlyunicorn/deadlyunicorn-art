
const LoginPage = () => {

  const loggedIn = false;

  if (loggedIn){
    // redirect /admin
  }

  return (
    <dialog open>
      <form 
      // method="dialog">
      action={handleLogin} className="flex flex-col group" >
      
        <input className="outline-none focus:border-b border-black" required placeholder="login" name="login"/>
        <input className="outline-none focus:border-b border-black" required placeholder="password" name="password" type="password"/>
        <button className="outline-none focus:underline focus:decoration-red-600 focus:group-valid:decoration-green-600">submit</button>
      </form>
    </dialog>
  )
}


const handleLogin = async( formData: FormData ) => {

  "use server"

  const login = formData.get('login') as String;
  const password = formData.get('password') as String;

  await fetch ( `${process.env.serverURL}/admin/login`, 
    { 
      method: "POST",
      body: JSON.stringify({ 
        login: login,
        password: password 
      }),
      cache:"no-cache" //! To be removed when done testing
    })
    .then( async( res ) => { 
      if (res.ok) console.log(await res.json());
    })

}

/* //TODO 
    const user = await mongoFindUser(username)
    if ( !user ) return done( null, false);

    const hash = user.password;
    const passwordIsCorrect = await bcrypt.compare( password, hash );

    if ( !passwordIsCorrect ) return done( null, false);
    return done( null, { username: user.username } );

*/

export default LoginPage;