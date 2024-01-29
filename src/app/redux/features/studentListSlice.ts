"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { studentList } from "@/app/data/studentDetails";
import {
  StudentList,
  StudentInfo,
  OnlyStudentData,
  AssignStudentToInstrument,
} from "@/app/types/formTypes";

type StudentState = {
  studentList: StudentList;
  filteredList: StudentList;
};
const initialState: StudentState = {
  studentList: studentList,
  filteredList: studentList,
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

    assignInstrumentToStudent: (
      state,
      action: PayloadAction<AssignStudentToInstrument>
    ) => {
      const { studentInfo, instrumentInfo } = action.payload;
      const student = state.studentList.find(
        (student) => student.studentIdNumber === studentInfo?.studentIdNumber
      );
      if (student) {
        student.instrument = instrumentInfo;
      }
    },

    filterStudentList: (state, action: PayloadAction<OnlyStudentData>) => {
      const { studentIdNumber } = action.payload;
      const filteredList = state.studentList.filter(
        (list) => list.studentIdNumber !== studentIdNumber
      );
      return { ...state, filteredList: filteredList };
    },
  },
});

export const {
  addStudentToList,
  assignInstrumentToStudent,
  filterStudentList,
} = studentListSlice.actions;

export default studentListSlice.reducer;
