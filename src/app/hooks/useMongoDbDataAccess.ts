import { useState, useEffect } from "react";
import { useApp } from "./useApp";

export function useMongoDbDataAccess({
  collectionName,
}: {
  collectionName: string;
}) {
  const app = useApp();
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    (async () => {
      if (app?.currentUser) {
        const mongo = app.currentUser.mongoClient("mongodb-atlas");
        const db = mongo.db("Test");
        const collection = db.collection(collectionName);
        const result = await collection.find();
        setData(result);
      }
    })();
  }, [app, app?.currentUser, app?.currentUser?.id, collectionName, data]);

  return data;
}
