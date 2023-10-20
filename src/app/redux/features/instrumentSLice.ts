"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  OnlyStudentData,
  InstrumentList,
  InstrumentDetails,
} from "@/app/types/formTypes";

import { instrumentDetails } from "@/app/data/instrumentDetails";

type InstrumentState = {
  instrumentList: InstrumentList;
};

const initialState: InstrumentState = {
  instrumentList: instrumentDetails,
};

export const instrumentDetailsSlice = createSlice({
  name: "instrumentDetails",
  initialState,
  reducers: {
    assignToStudent: (state, action: PayloadAction<OnlyStudentData>) => {
      return { ...state, assignedTo: action.payload };
    },
    addInstrument: (state, action: PayloadAction<InstrumentDetails>) => {
      return {
        ...state,
        instrumentList: [...state.instrumentList, action.payload],
      };
    },
    searchForType: (state, action: PayloadAction<InstrumentDetails>) => {
      state.instrumentList.filter((instrument) => {
        if (instrument.type === action.payload.type) {
          return instrument;
        }
      });
    },
  },
});

export const { assignToStudent, addInstrument, searchForType } =
  instrumentDetailsSlice.actions;

export default instrumentDetailsSlice.reducer;
