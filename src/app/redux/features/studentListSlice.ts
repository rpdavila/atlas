"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { studentList } from "@/app/data/studentDetails";
import { StudentList, StudentInfo } from "@/app/types/formTypes";

type StudentState = {
  studentList: StudentList;
  studentInfo: StudentInfo;
};
const initialState: StudentState = {
  studentList: studentList,
  studentInfo: {
    id: 1,
    firstName: "",
    lastName: "",
    studentIdNumber: "",
    instrument: null,
  },
};

export const studentListSlice = createSlice({
  name: "studentList",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<StudentInfo>) => {
      return { ...state, studentInfo: action.payload };
    },

    addStudentToList: (state, action: PayloadAction<StudentInfo>) => {
      return {
        ...state,
        studentList: state.studentList.concat(action.payload),
      };
    },

    studentInfoReset: (state) => {
      return { ...state, studentInfo: initialState.studentInfo };
    },
  },
});

export const { addStudent, addStudentToList, studentInfoReset } =
  studentListSlice.actions;

export default studentListSlice.reducer;
