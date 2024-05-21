
import {cache} from 'react';
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


export function convertObjectIdToString(result: any[] | undefined) {
  result?.forEach((document) => {
    document._id = String(document._id);
  });
  return result;
}

export const getStudents = cache(async () => {
  try {
    const result = await studentCollection?.find();
    console.log(result)
    return convertObjectIdToString(result);
  } catch (error){
    console.log(error)
  }
});

export async function getInstruments() {
  const result = await instrumentCollection?.find();
  return convertObjectIdToString(result);
}


