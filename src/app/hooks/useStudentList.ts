
import {useState, useEffect} from "react";
import { StudentList } from "../types/formTypes";
import { getStudentDropDownListFirstQuery, getStudentDropDownListNextQuery } from "@/actions/actions";


export function useStudentList() {
  const [studentDropDownList, setStudentDropDownList] = useState<StudentList>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] =   useState<string>("")
  const limit = 5; // Number of items per page, adjust as necessary
  const skip = 1; // skips curser point and returns new items per page instead of also return item at cursor
  
  
  const loadNextQuery = async () => {
    try {
      setIsLoading(true);
      const result:StudentList = await getStudentDropDownListNextQuery(limit, skip, cursor)
      setHasMore(result.length === limit);
      setStudentDropDownList((prevItems) => [...prevItems, ...result]);
    } catch (error) {
      console.error("There was an error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadfirstQuery = async () => {    
      try {        
        setIsLoading(true);        
        const result:StudentList= await getStudentDropDownListFirstQuery(limit)
        setHasMore(result.length === limit);
        setStudentDropDownList((prevItems) => [...prevItems, ...result]);
      } catch (error) {
        console.error("There was an error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }; 
    loadfirstQuery()
  }, []);

  const onLoadMore = () => {
    const newCursor = studentDropDownList[studentDropDownList.length - 1].id;
    setCursor(newCursor);
    loadNextQuery();
  }

  
  return {
    studentDropDownList,
    hasMore,
    isLoading,
    onLoadMore,
  };
}