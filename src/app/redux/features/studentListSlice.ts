"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { studentList } from "@/app/data/studentDetails";
import {
  StudentList,
  StudentInfo,
  OnlyInstrumentData,
  OnlyStudentData,
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

    filterStudentList: (state, action: PayloadAction<OnlyStudentData>) => {
      const { studentIdNumber } = action.payload;
      const filteredList = state.studentList.filter(
        (list) => list.studentIdNumber !== studentIdNumber
      );
      return { ...state, studentList: filteredList };
    },
  },
});

export const {
  addStudentToList,
  assignStudentToInstrument,
  filterStudentList,
} = studentListSlice.actions;

export default studentListSlice.reducer;
