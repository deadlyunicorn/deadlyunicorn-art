import { MongoClient, ObjectId } from "mongodb";

export const mongoFindUser = async( login:string ) => {
  

  const client = new MongoClient(process.env.MONGODB_URI!);

  try{

    const admins = client.db('deadlyunicorn-art').collection('admins');
    
    const user = await admins.findOne( { login: login } )
    .then( async( res ) => {
        const mongoResult = res as adminResult;
        return mongoResult;
    });

    if ( user ){
      return { 
        username: user.login,
        password: user.password 
      }
    }
    else throw "Not found";

  }
  catch(err){
    return null;
  }
  finally{
    client.close();
  }


}

type adminResult = {
  _id : ObjectId,
  login : string,
  password : string
}
