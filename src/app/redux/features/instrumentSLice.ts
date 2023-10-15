"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InstrumentDetails,
  RentStatus,
  OnlyStudentData,
  basicInstrumentData,
} from "@/app/types/formTypes";

type InstrumentState = {
  instrumentList: basicInstrumentData[];
  instrumentDetails: InstrumentDetails;
};

const initialState: InstrumentState = {
  instrumentDetails: {
    id: 0,
    type: "",
    brand: "",
    serialNumber: "",
    rentStatus: RentStatus.Available,
    assignedTo: null,
  },
  instrumentList: [],
};

export const instrumentDetailsSlice = createSlice({
  name: "instrumentDetails",
  initialState,
  reducers: {
    setInstrumentDetails: (state, action: PayloadAction<InstrumentDetails>) => {
      return { ...state, instrumentDetails: action.payload };
    },
    setStudentToInstrument: (state, action: PayloadAction<OnlyStudentData>) => {
      return { ...state, assignedTo: action.payload };
    },
    addInstrument: (state, action: PayloadAction<basicInstrumentData>) => {
      return {
        ...state,
        instrumentList: [...state.instrumentList, action.payload],
      };
    },
  },
});
