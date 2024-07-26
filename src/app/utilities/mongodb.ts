import * as Realm from "realm-web"
import { InstrumentList, StudentList } from "../types/formTypes";

const config: Realm.AppConfiguration = {
  id: process.env.NEXT_PUBLIC_APP_ID as string,
  baseUrl: "https://eu-central-1.aws.services.cloud.mongodb.com"
}
export const app = new Realm.App(config)
//export const app = Realm.getApp(process.env.NEXT_PUBLIC_APP_ID as string)
const client = app.currentUser?.mongoClient("mongodb-atlas");

const db = client?.db("Test"); 
export const studentCollection =  db?.collection("studentInfo");
export const instrumentCollection =  db?.collection("instrumentInfo")
export const userCollection = db?.collection("users");

export function convertObjectIdToString(result: InstrumentList | StudentList | undefined ): InstrumentList | StudentList | undefined {
  result?.forEach((document) => {
    document.id = String(document.id);
  });
  return result;
}


