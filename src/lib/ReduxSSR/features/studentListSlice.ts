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
export const getStudents = createAsyncThunk(
  "studentList/getStudents",
  async () => {
    try {
      if (app?.currentUser) {
        const result = await studentCollection?.find();
        return convertObjectIdToString(result as StudentList);
      }
    } catch (error) {
      console.error(error);      
    }    
  }
);

export const unassignInstrumentFromStudent = createAsyncThunk(
  "studentlist/unassignStudent",
  async (studentIdNumber: string | undefined) => {
    try {
      return await studentCollection?.updateOne(
        { studentIdNumber: studentIdNumber},
        { $unset: { instrument:  ""} }
      )
    } catch (error) {
      console.error(error);
    }
  }
)

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
        { studentIdNumber: assignStudentToInstrument.studentIdNumber},
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
      const result =  await studentCollection?.find({
        $and : [
          {instrument: {$exists: false}}, {instrument: null}
        ]
      });
      return convertObjectIdToString(result as StudentList)
    } catch (error) {
      console.log(error)
    }
  }
)
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
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getStudents.rejected, (state, action) => {
        return  {
          ...state,
          error: action.payload,
          loading: false,
        }
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
      })
      .addCase(unassignInstrumentFromStudent.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(assignInstrumentToStudent.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(assignInstrumentToStudent.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      })
      .addCase(assignInstrumentToStudent.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
        };
      })
  },
});

export default studentListSlice.reducer;
export const {setStudentsInitialized} = studentListSlice.actions;
