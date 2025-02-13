//redux imports
import { createSlice } from "@reduxjs/toolkit";
//mongodb Imports

//type imports
import { Instrument } from "@prisma/client";


// initial state types
type InstrumentState = {
  instrumentList: Array<Instrument>;
  instrumentSearch: string;
  loading: boolean;
  initialized: boolean;
};



const initialState: InstrumentState = {
  instrumentList: [],
  instrumentSearch: "",
  loading: false,
  initialized: false,
};

export const instrumentDetailsSlice = createSlice({
  name: "instrumentDetails",
  initialState,
  reducers: {
      setInstrumentsInitialized: (state) => {
        return {
          ...state,
          initialized: true
        }     
      }
    },
  });
export default instrumentDetailsSlice.reducer;
export const { setInstrumentsInitialized } = instrumentDetailsSlice.actions;
