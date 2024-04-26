"use client";

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

// mongodb utility imports
import {app, convertObjectIdToString, studentCollection} from "@/app/utilities/mongodb";
//type imports
import {AssignStudentToInstrument, StudentInfo, StudentList,} from "@/app/types/formTypes";

type StudentState = {
  studentList: StudentList;
  dropDownList: StudentList;
  loading: boolean;
  error: unknown;
  insertResult: any | undefined;
};
const initialState: StudentState = {
  studentList: [],
  dropDownList: [],
  loading: false,
  error: "",
  insertResult: undefined,
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
    return studentCollection?.insertOne({
      firstName: studentDetails.firstName,
      lastName: studentDetails.lastName,
      studentIdNumber: studentDetails.studentIdNumber,
    });
  }
);

export const assignStudent = createAsyncThunk(
  "studentList/addStudentToInstrument",
  async (assignStudentToInstrument: AssignStudentToInstrument) => {
    try {
      const update = await studentCollection?.findOneAndUpdate(
        { _id: assignStudentToInstrument.studentInfo?.studentIdNumber },
        { $set: { 
            instrument: {
              classification: assignStudentToInstrument.instrumentInfo?.classification,
              brand: assignStudentToInstrument.instrumentInfo?.brand,
              serialNumber: assignStudentToInstrument.instrumentInfo?.serialNumber
            }
          }
        },
        {returnNewDocument: true}
      )
      console.log(update)
    } catch (error) {
      console.error(error);
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

    // assignInstrumentToStudent: (
    //   state,
    //   action: PayloadAction<AssignStudentToInstrument>
    // ) => {
    //   const { studentInfo, instrumentInfo } = action.payload;
    //   const student = state.studentList.find(
    //     (student) => student.studentIdNumber === studentInfo?.studentIdNumber
    //   );
    //   if (student) {
    //     student.instrument = instrumentInfo;
    //   }
    // },

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
        state.error = action.payload;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        return {
          ...state,
          studentList: action.payload as StudentList,
          dropDownList: action.payload as StudentList,
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
          insertResult: action.payload?.insertedId,
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
