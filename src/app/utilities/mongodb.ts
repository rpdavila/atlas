import { UpdateResult } from "mongodb";
import * as Realm from "realm-web"



const config: Realm.AppConfiguration = {
  id: process.env.NEXT_PUBLIC_APP_ID as string,
  baseUrl: "https://eu-central-1.aws.services.cloud.mongodb.com"
}
export const app = new Realm.App(config)
//export const app = Realm.getApp(process.env.NEXT_PUBLIC_APP_ID as string)
const client = app.currentUser?.mongoClient("mongodb-atlas")

const db = client?.db("Test"); 
export const studentCollection =  db?.collection("studentInfo");
export const instrumentCollection =  db?.collection("instrumentInfo")
export const userCollection = db?.collection("users");

export function convertObjectIdToString(result: any[] | undefined  ) : any[]
export function convertObjectIdToString(result: UpdateResult<any>) : UpdateResult<any>
export function convertObjectIdToString(result: any) : any[] | UpdateResult<any> {
  if(Array.isArray(result)) {
    return result.map(item => {
      item._id = item._id.toString()
      return item
    })
  } else {
    result._id = result._id.toString()
    return result
  }
}
  
