"use client";
//redux imports
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
//mongodb Imports
import {app, convertObjectIdToString, instrumentCollection} from "@/app/utilities/mongodb";

//type imports
import {InstrumentDetails, InstrumentList, StudentInfo, RentStatus} from "@/app/types/formTypes";

// initial state types
type InstrumentState = {
  instrumentList: InstrumentList;
  instrumentSearch: string;
  loading: boolean;
};

const initialState: InstrumentState = {
  instrumentList: [],
  instrumentSearch: "",
  loading: false,
};

export const getInstruments = createAsyncThunk(
  "instrumentDetails/getInstruments",
  async () => {
    try {
      if (app.currentUser) {
        const result = await instrumentCollection?.find();        
        return convertObjectIdToString(result)
      }
    } catch (error) {
      console.log(error)
    }    
  }
);

export const addInstrument = createAsyncThunk(
    "instrumentDetails/addInstrument",
    async (instrument: InstrumentDetails) => {
      try {
        if (app.currentUser) {
          return await instrumentCollection?.insertOne(
              {
                classification: instrument.classification,
                brand: instrument.brand,
                serialNumber: instrument.serialNumber,
                rentStatus: instrument.rentStatus
              }
          )
        }
      } catch (error) {
        console.error(error)
      }
    }
)
export const addStudentToInstrument = createAsyncThunk(
  "instrumentDetails/addStudentToInstrument",
  async (modifyInstrument: {serialNumber: string | undefined, student: StudentInfo}) => {
    try {
      if (app.currentUser) {
        return await instrumentCollection?.updateOne(
            {serialNumber: modifyInstrument.serialNumber},
            {
              $set: {
                assignedTo: {
                  firstName: modifyInstrument.student.firstName,
                  lastName: modifyInstrument.student.lastName,
                  studentIdNumber: modifyInstrument.student.studentIdNumber
                },
                rentStatus: RentStatus.Rented
              }
            },
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
)
export const instrumentDetailsSlice = createSlice({
  name: "instrumentDetails",
  initialState,
  reducers: {
    addInstrumentToList: (state, action: PayloadAction<InstrumentDetails>) => {
      return {
        ...state,
        instrumentList: state.instrumentList.concat(action.payload),
      };
    },

    // clearSearchInstrument: (state) => {
    //   return { ...state, result: [] };
    // },

    // addStudentToInstrument: (state, action: PayloadAction<Getinfo>) => {
    //   const { studentInfo, instrumentInfo } = action.payload;
    //   const instrument = state.instrumentList.find((instrument) => {
    //     return instrument._id === instrumentInfo._id;
    //   });
    //   if (instrument) {
    //     instrument.assignedTo = studentInfo;
    //     instrument.rentStatus = RentStatus.Rented;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInstruments.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getInstruments.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      })
      .addCase(getInstruments.fulfilled, (state, action) => {
        return {
          ...state,
          instrumentList: action.payload as InstrumentList,
          loading: false,
        };
      })
      .addCase(addStudentToInstrument.pending, (state, action) => {
        return {
          ...state,
          loading: true
        }
      })
      .addCase(addStudentToInstrument.rejected, (state, action) => {
        return {
          ...state,
          loading: false
        }
      })
      .addCase(addStudentToInstrument.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
        }
      })
  },
});

export const { addInstrumentToList} =
  instrumentDetailsSlice.actions;

export default instrumentDetailsSlice.reducer;
