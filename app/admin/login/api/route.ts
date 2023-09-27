import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";


export const POST = async ( request: NextRequest ) => {

  const credentials:credentials = await request.json();

  const client = new MongoClient(process.env.MONGODB_URI!);

  try{

    const admins = client.db('deadlyunicorn-art').collection('admins');

    await admins.createIndex('login',{unique:true});
    
    const username = await admins.findOne({login:credentials.login})
    .then( async( res ) => {
        const mongoResult = res as adminResult;
        return await bcrypt.compare( credentials.password , mongoResult.password)
        .then( passwordMatch => passwordMatch ?mongoResult.login :null )
    });

    if ( username ){
      return NextResponse.json( { username: username } )
    }

  }
  catch(err){
    return NextResponse.json( { username: null } )
  }
  finally{
    client.close();
    redirect('/');
    
  }



}

type credentials = {
  login:string,
  password:string
}

type adminResult = {
  _id : ObjectId,
  login : string,
  password : string
}