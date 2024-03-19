"use client";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

//mongodb Imports
import { app } from "@/app/utilities/realm";
import { instrumentCollection } from "@/app/utilities/realm";
import { convertObecjtIdToString } from "@/app/utilities/realm";
//type imports
import {
  Getinfo,
  InstrumentList,
  InstrumentDetails,
  RentStatus,
} from "@/app/types/formTypes";

import { instrumentDetails } from "@/app/data/instrumentDetails";

type InstrumentState = {
  instrumentList: InstrumentList;
  instrumentSearch: string;
  loading: boolean;
  error: unknown;
};

const initialState: InstrumentState = {
  instrumentList: [],
  instrumentSearch: "",
  loading: false,
  error: "",
};
export const getInstruments = createAsyncThunk(
  "instrumentDetails/getInstruments",
  async () => {
    if (app.currentUser) {
      const result = await instrumentCollection?.find();
      const stringifiedResult = convertObecjtIdToString(result);
      return stringifiedResult;
    }
  }
);
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

    clearSearchInstrument: (state) => {
      return { ...state, result: [] };
    },

    addStudentToInstrument: (state, action: PayloadAction<Getinfo>) => {
      const { studentInfo, instrumentInfo } = action.payload;
      const instrument = state.instrumentList.find((instrument) => {
        return instrument._id === instrumentInfo._id;
      });
      if (instrument) {
        instrument.assignedTo = studentInfo;
        instrument.rentStatus = RentStatus.Rented;
      }
    },
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
          loadinf: false,
        };
      });
  },
});

export const { addInstrumentToList, addStudentToInstrument } =
  instrumentDetailsSlice.actions;

export default instrumentDetailsSlice.reducer;
