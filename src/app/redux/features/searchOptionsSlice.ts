"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SearchOptionsState = {
  searchStudent: boolean;
  searchInstrument: boolean;
  addStudent: boolean;
  addInstrument: boolean;
  assignInstrumentToStudent: boolean;
};

const initialState: SearchOptionsState = {
  searchStudent: false,
  searchInstrument: false,
  addStudent: false,
  addInstrument: false,
  assignInstrumentToStudent: false,
};

export const searchOptionsSlice = createSlice({
  name: "searchOptions",
  initialState,
  reducers: {
    setStudentSearch: (state, action: PayloadAction<boolean>) => {
      return { ...state, searchStudent: action.payload };
    },
    setInstrumentSearch: (state, action: PayloadAction<boolean>) => {
      return { ...state, searchInstrument: action.payload };
    },
    setStudent: (state, action: PayloadAction<boolean>) => {
      return { ...state, addStudent: action.payload };
    },
    setInstrument: (state, action: PayloadAction<boolean>) => {
      return { ...state, addInstrument: action.payload };
    },

    assignInstrumentToStudent: (state, action: PayloadAction<boolean>) => {
      return { ...state, assignInstrumentToStudent: action.payload };
    },
  },
});

export const {
  setStudentSearch,
  setInstrumentSearch,
  setStudent,
  setInstrument,
  assignInstrumentToStudent
} = searchOptionsSlice.actions;

export default searchOptionsSlice.reducer;
