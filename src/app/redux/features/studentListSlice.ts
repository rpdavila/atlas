"use client";

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

// mongodb utility imports
import {app, convertObjectIdToString, studentCollection} from "@/app/utilities/mongodb";
//type imports
import { OnlyInstrumentData, OnlyStudentId, StudentInfo, StudentList,} from "@/app/types/formTypes";
import { UnknownAsyncThunkAction } from "@reduxjs/toolkit/dist/matchers";

type StudentState = {
  studentList: StudentList;
  dropDownList: StudentList;
  loading: boolean;
};
const initialState: StudentState = {
  studentList: [],
  dropDownList: [],
  loading: false,
};
export const getStudents = createAsyncThunk(
  "studentList/getStudents",
  async () => {
    if (app?.currentUser) {
      const result = await studentCollection?.find();
      return convertObjectIdToString(result);
    }
  }
);

export const addStudent = createAsyncThunk(
  "studentList/addStudent",
  async (studentDetails: StudentInfo) => {
    try {
      return studentCollection?.insertOne({
        firstName: studentDetails.firstName,
        lastName: studentDetails.lastName,
        studentIdNumber: studentDetails.studentIdNumber,
      });
    } catch (error) {
      console.error(error);
    }   
  }
);

export const assignInstrumentToStudent = createAsyncThunk(
  "studentList/addStudentToInstrument",
  async (assignStudentToInstrument: {studentIdNumber: string| undefined, instrument: OnlyInstrumentData }) => {
    try {
      return await studentCollection?.updateOne(
        { studentIdNumber: assignStudentToInstrument.studentIdNumber },
        { $set: { 
            instrument: {
              classification: assignStudentToInstrument.instrument?.classification,
              brand: assignStudentToInstrument.instrument?.brand,
              serialNumber: assignStudentToInstrument.instrument?.serialNumber
            }
          }
        },
      )
    } catch (error) {
      console.error(error);
    }
  }
)

export const getDropDownList = createAsyncThunk(
  "studentList/updateDropDownList",
  async () => {
    try {
      return await studentCollection?.find({
        $and : [
          {instrument: {$exists: false}}, {instrument: null}
        ]
      });
    } catch (error) {
      console.log(error)
    }
  }
)
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

    filterStudentList: (state, action: PayloadAction<StudentInfo>) => {
      const { _id } = action.payload;
      const filteredList = state.dropDownList.filter(
        (list) => list._id !== _id
      );
      return { ...state, dropDownList: filteredList };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = false;
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
      })
      .addCase(getDropDownList.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };       
      })
      .addCase(getDropDownList.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      })
      .addCase(getDropDownList.fulfilled, (state, action) => {
        return {
          ...state,
          dropDownList: action.payload as StudentList,
          loading: false,
        };
      });
  },
});

export const {
  addStudentToList,
  filterStudentList,
} = studentListSlice.actions;

export default studentListSlice.reducer;
