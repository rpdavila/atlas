"use client";

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// mongodb utility imports
import { app } from "@/app/utilities/realm";
import { studentCollection } from "@/app/utilities/realm";
import { convertObecjtIdToString } from "@/app/utilities/realm";
//type imports
import {
  StudentList,
  StudentInfo,
  OnlyStudentData,
  AssignStudentToInstrument,
} from "@/app/types/formTypes";

type StudentState = {
  studentList: StudentList;
  filteredList: StudentList;
  loading: boolean;
  error: unknown;
  insertResult: any | undefined;
};
const initialState: StudentState = {
  studentList: [],
  filteredList: [],
  loading: false,
  error: "",
  insertResult: undefined,
};
export const getStudents = createAsyncThunk(
  "studentList/getStudents",
  async () => {
    if (app?.currentUser) {
      const result = await studentCollection?.find();
      const stringifiedResult = convertObecjtIdToString(result);
      return stringifiedResult;
    }
  }
);

export const addStudent = createAsyncThunk(
  "studentList/addStudent",
  async (studentDetails: StudentInfo) => {
    const student = studentCollection?.insertOne({
      firstName: studentDetails.firstName,
      lastName: studentDetails.lastName,
      studentIdNumber: studentDetails.studentIdNumber,
    });
    return student;
  }
);
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
      const filteredList = state.filteredList.filter(
        (list) => list.studentIdNumber !== studentIdNumber
      );
      return { ...state, filteredList: filteredList };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        return {
          ...state,
          studentList: action.payload as StudentList,
          loading: false,
        };
      })
      .addCase(addStudent.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(addStudent.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        return {
          ...state,
          insertResult: action.payload,
          loading: false,
        };
      });
  },
});

export const {
  addStudentToList,
  assignInstrumentToStudent,
  filterStudentList,
} = studentListSlice.actions;

export default studentListSlice.reducer;
