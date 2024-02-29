"use client";
import { combineReducers } from "@reduxjs/toolkit";

import searchOptionsSlice from "../features/searchOptionsSlice";
import studentListSlice from "./studentListSlice";
import instrumentDetailsSlice from "./instrumentSLice";
import userInformationSlice from "./userSlice";

const rootReducer = combineReducers({
  searchOptions: searchOptionsSlice,
  students: studentListSlice,
  instruments: instrumentDetailsSlice,
  userInfo: userInformationSlice,
});

export default rootReducer;
