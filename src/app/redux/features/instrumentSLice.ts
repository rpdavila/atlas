"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InstrumentDetails,
  RentStatus,
  OnlyStudentData,
  basicInstrumentData,
  StudentInfo,
} from "@/app/types/formTypes";
import { ACTION_REFRESH } from "next/dist/client/components/router-reducer/router-reducer-types";

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
    assignedTo: {
      firstName: "",
      lastName: "",
      studentIdNumber: "",
    },
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
