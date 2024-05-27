import { useState, useEffect } from "react";
import { useApp } from "./useApp";

export function useMongoDbDataAccess({
  collectionName,
}: {
  collectionName: string;
}) {
  const app = useApp();
  const [data, setData] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  console.log({data, loading, error})
  useEffect(() => {
    (async () => {
      try {
        if (app?.currentUser) {
          setLoading(true);
          const mongo = app.currentUser.mongoClient("mongodb-atlas");
          const db = mongo.db("Test");
          const collection = db.collection(collectionName);
          const result = await collection.find();
          setData(result);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(error as Error);
      }
      
    })();
  }, [app, app?.currentUser, app?.currentUser?.id, collectionName, data, error]);

  return [data, loading, error];
}
