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
    assignInstrumentToStudent: (
      state,
      action: PayloadAction<OnlyStudentData>
    ) => {
      return { ...state, assignedTo: action.payload };
    },

    addInstrumentToList: (state, action: PayloadAction<InstrumentDetails>) => {
      return {
        ...state,
        instrumentList: state.instrumentList.concat(action.payload),
      };
    },

    clearSearchInstrument: (state) => {
      return { ...state, result: [] };
    },
  },
});

export const {
  assignInstrumentToStudent,
  addInstrumentToList,
  clearSearchInstrument,
} = instrumentDetailsSlice.actions;

export default instrumentDetailsSlice.reducer;
