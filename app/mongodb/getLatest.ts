import { InsertOneResult, MongoClient } from "mongodb";
import { imageDocument } from "../types/image";

export const getLatest = async() : Promise <imageDocument>=>{
  
  const client = new MongoClient(process.env.MONGODB_URI!);
  
  try {

    await client.connect();
    
    const drawings = client.db('deadlyunicorn-art').collection('drawings');

    const Iterator = drawings.aggregate([
      {$sort:{created_at:-1}},
      {$limit:1}
    ]);

    const finalResult = [];

    for await (const result of Iterator){
      finalResult.push(result);
    }

    return finalResult[0] as unknown as imageDocument;


  } finally {

      await client.close();

  }
}

