import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SearchOptionsState = {
  type: string;
  search: string;
  loading: boolean;
};

const initialState: SearchOptionsState = {
  type: "",
  search: "",
  loading: false,
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

    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
  },
});

export const { setType, setSearch, setLoading } = searchOptionsSlice.actions;

export default searchOptionsSlice.reducer;
