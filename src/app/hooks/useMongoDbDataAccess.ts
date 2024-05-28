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

  
  useEffect(() => {
    const getStudentData = async (collectionName: string): Promise<void> => {
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
    };

    getStudentData(collectionName);
  }, [app?.currentUser, collectionName]);

  return {data: data, loading: loading, error: error};
}
