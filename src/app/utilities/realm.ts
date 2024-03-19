import * as Realm from "realm-web";
import { instrumentDetails } from "../data/instrumentDetails";
const {
  BSON: { ObjectId },
} = Realm;

export const app = Realm.getApp(process.env.NEXT_PUBLIC_APP_ID as string);

const cluster = app.currentUser?.mongoClient(
  process.env.NEXT_PUBLIC_CLUSTER_NAME as string
);

const db = cluster?.db(process.env.NEXT_PUBLIC_DB_NAME as string);

export const instrumentCollection = db?.collection(
  process.env.NEXT_PUBLIC_DB_INSTRUMENT_COLLECTION as string
);

export const userCollection = db?.collection(
  process.env.NEXT_PUBLIC_DB_USER_COLLECTION as string
);

export const studentCollection = db?.collection(
  process.env.NEXT_PUBLIC_DB_STUDENT_COLLECTION as string
);

export function convertObecjtIdToString(result: any[] | undefined) {
  result?.forEach((document) => {
    const newIdString = String(document._id);
    document._id = newIdString;
  });
  return result;
}
