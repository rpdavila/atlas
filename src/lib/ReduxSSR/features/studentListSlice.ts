import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// mongodb utility imports
import {app, convertObjectIdToString, studentCollection} from "@/app/utilities/mongodb";
//type imports
import { OnlyInstrumentData, StudentInfo, StudentList,} from "@/app/types/formTypes";

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
