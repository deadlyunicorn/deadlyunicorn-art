import { InsertOneResult, MongoClient } from "mongodb";

export const uploadToMongo = async( title : string, filename : string ) : Promise <InsertOneResult>=>{
  
  const client = new MongoClient(process.env.MONGODB_URI!);
  
  try {

    await client.connect();
    
    const drawings = client.db('deadlyunicorn-art').collection('drawings');

    return await drawings.insertOne({
      title:title,
      url:`https://deadlyunicorn-art.s3.eu-central-1.amazonaws.com/public/${filename}`,
      created_at:new Date(),
    })


  } finally {

      await client.close();

  }
}
