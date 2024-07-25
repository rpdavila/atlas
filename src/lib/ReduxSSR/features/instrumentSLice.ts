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
export const {setInstrumentsInitialized} = instrumentDetailsSlice.actions;
