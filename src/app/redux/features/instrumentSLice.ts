"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";
import {
  OnlyStudentData,
  InstrumentList,
  InstrumentDetails,
  RentStatus,
  OnlyInstrumentType,
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
  },
});

export const { assignInstrumentToStudent, addInstrumentToList } =
  instrumentDetailsSlice.actions;

export default instrumentDetailsSlice.reducer;
