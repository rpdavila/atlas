"use client";
import { combineReducers } from "@reduxjs/toolkit";

import searchOptionsSlice from "../features/searchOptionsSlice";
import toolsSlice from "./toolsSlice";
const rootReducer = combineReducers({
  searchOptions: searchOptionsSlice,
  tools:  toolsSlice
})

export default rootReducer;

