import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SearchOptionsState = {
  type: string;
  search: string;
};

const initialState: SearchOptionsState = {
  type: "",
  search: "",
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
  },
});

export const { setType, setSearch } = searchOptionsSlice.actions;

export default searchOptionsSlice.reducer;
