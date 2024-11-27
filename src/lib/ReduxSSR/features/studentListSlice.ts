import { createSlice } from "@reduxjs/toolkit";

//type imports

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  studentIdNumber: string;
  school: {
    id: string;
    districtId: string | null;
    profileId: string | null;
    name: string;
  } | null;
} | undefined

type StudentList = Student[]


type StudentState = {
  dropDownList: StudentList;
};
const initialState: StudentState = {
  dropDownList: []
};

export const studentListSlice = createSlice({
  name: "studentList",
  initialState,
  reducers: {
    setDropDownList: (state, action) => {
      return { ...state, dropDownList: action.payload };
    },
    addStudentToDropDownList: (state, action) => {
      return {
        ...state,
        dropDownList: [...state.dropDownList, action.payload]
      }
    }
  },
});

export default studentListSlice.reducer;
export const { setDropDownList, addStudentToDropDownList } = studentListSlice.actions;
