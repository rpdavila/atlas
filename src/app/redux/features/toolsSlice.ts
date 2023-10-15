"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToolsState = {
  toolOptions: string
}

const initialState = {
  toolOptions: ""
} as ToolsState;

export const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setTools(state, action: PayloadAction<string>){
      return {...state, toolOptions: action.payload}
    }
  }
})

export const {setTools} = toolsSlice.actions;
export default toolsSlice.reducer;