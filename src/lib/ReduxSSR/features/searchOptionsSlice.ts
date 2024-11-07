import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SearchOptionsState = {
  type: string;
  search: string;
  school: string
  district: boolean
};

const initialState: SearchOptionsState = {
  type: "",
  search: "",
  school: "",
  district: false
};

export const searchOptionsSlice = createSlice({
  name: "searchOptions",
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<string>) => {
      return { ...state, type: action.payload };
    },

    setSearch: (state, action: PayloadAction<string>) => {
      return { ...state, search: action.payload };
    },

    setSchool: (state, action: PayloadAction<string>) => {
      return { ...state, school: action.payload };
    },

    setDistrictSearch: (state, action: PayloadAction<boolean>) => {
      return { ...state, district: action.payload }
    }
  },
});

export const { setType, setSearch, setSchool, setDistrictSearch } = searchOptionsSlice.actions;

export default searchOptionsSlice.reducer;
