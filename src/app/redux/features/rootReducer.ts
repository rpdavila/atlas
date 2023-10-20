"use client";
import { combineReducers } from "@reduxjs/toolkit";

import searchOptionsSlice from "../features/searchOptionsSlice";
import studentListSlice from "./studentListSlice";
import instrumentDetailsSlice from "./instrumentSLice";

const rootReducer = combineReducers({
  searchOptions: searchOptionsSlice,
  students: studentListSlice,
  instruments: instrumentDetailsSlice,
});

export default rootReducer;
