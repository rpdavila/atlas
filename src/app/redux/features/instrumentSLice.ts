"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
};

const initialState: InstrumentState = {
  instrumentList: instrumentDetails,
  instrumentSearch: "",
};

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
        return instrument.id === instrumentInfo.id;
      });
      if (instrument) {
        instrument.assignedTo = studentInfo;
        instrument.rentStatus = RentStatus.Rented;
      }
    },
  },
});

export const { addInstrumentToList, addStudentToInstrument } =
  instrumentDetailsSlice.actions;

export default instrumentDetailsSlice.reducer;
