import * as Realm from "realm-web"

const {
  BSON: { ObjectId },
} = Realm;

const config: Realm.AppConfiguration = {
  id: process.env.NEXT_PUBLIC_APP_ID as string,
  baseUrl: "https://eu-central-1.aws.services.cloud.mongodb.com"
}
export const app = new Realm.App(config)
//export const app = Realm.getApp(process.env.NEXT_PUBLIC_APP_ID as string)
const client = app.currentUser?.mongoClient("mongodb-atlas")

const db = client?.db(process.env.NEXT_PUBLIC_DB_NAME as string); 
export const studentCollection =  db?.collection(process.env.NEXT_PUBLIC_DB_STUDENT_COLLECTION as string);
export const instrumentCollection =  db?.collection(process.env.NEXT_PUBLIC_DB_INSTRUMENT_COLLECTION as string)
export const userCollection = db?.collection(
  process.env.NEXT_PUBLIC_DB_USER_COLLECTION as string
);
export function convertObjectIdToString(result: any[] | undefined) {
  result?.forEach((document) => {
    document._id = String(document._id);
  });
  return result;
}
