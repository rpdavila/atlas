"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { studentList } from "@/app/data/studentDetails";
import {
  StudentList,
  StudentInfo,
  OnlyInstrumentData,
} from "@/app/types/formTypes";

type StudentState = {
  studentList: StudentList;
};
const initialState: StudentState = {
  studentList: studentList,
};

export const studentListSlice = createSlice({
  name: "studentList",
  initialState,
  reducers: {
    addStudentToList: (state, action: PayloadAction<StudentInfo>) => {
      return {
        ...state,
        studentList: state.studentList.concat(action.payload),
      };
    },

    assignStudentToInstrument: (
      state,
      action: PayloadAction<OnlyInstrumentData>
    ) => {
      return { ...state, instrument: action.payload };
    },
  },
});

export const { addStudentToList, assignStudentToInstrument } =
  studentListSlice.actions;

export default studentListSlice.reducer;
