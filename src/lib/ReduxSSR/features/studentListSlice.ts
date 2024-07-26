import {createSlice } from "@reduxjs/toolkit";

//type imports
import { StudentList,} from "@/app/types/formTypes";

type StudentState = {
  studentList: StudentList;
  dropDownList: StudentList;
  loading: boolean;
  error: unknown;
  initialized: boolean;
};
const initialState: StudentState = {
  studentList: [],
  dropDownList: [],
  loading: false,
  error: "",
  initialized: false,
};


export const studentListSlice = createSlice({
  name: "studentList",
  initialState,
  reducers: {
    setStudentsInitialized: (state) => {     
        return {
          ...state,
          initialized: true,
        }
      } 
    }, 
});

export default studentListSlice.reducer;
export const {setStudentsInitialized} = studentListSlice.actions;
