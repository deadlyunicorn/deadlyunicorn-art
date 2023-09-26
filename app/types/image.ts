import { ObjectId } from "mongodb"

export type imageDocument = {
  _id: ObjectId,
  title:string,
  url:string,
  created_at:Date,
}