import { useState, useEffect } from "react";
import { useApp } from "./useApp";
import { useAppDispatch} from "../lib/ReduxSSR/hooks";
import { InstrumentList, StudentList } from "../types/formTypes";

export function useMongoDbDataAccess({
  collectionName,
}: {
  collectionName: string;
}) {
  const dispatch = useAppDispatch();
  const app = useApp();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [studentData, setStudentData] = useState<StudentList | null>(null);
  const [instrumentData, setInstrumentData] = useState<InstrumentList | null>(null);


  
  useEffect(() => {    
    const getData = async (collectionName: string) => {
      try {
        if (app?.currentUser) {
          setLoading(true);
          const mongo = app.currentUser.mongoClient("mongodb-atlas");
          const db = mongo.db("Test");
          const collection = db.collection(collectionName);
          const result = await collection.find();
          if (collectionName === "studentInfo") {
            setStudentData(result as StudentList)
            setLoading(false);
          }
          if (collectionName === "instrumentInfo") {
            setInstrumentData(result as InstrumentList)
            setLoading(false);
          }
          
        }
      } catch (error) {
        setLoading(false);
        setError(error as Error);
      }
    };

    getData(collectionName);
  }, [app?.currentUser, collectionName, dispatch]);

  return { studentData: studentData, instrumentData: instrumentData, loading: loading, error: error };
}
