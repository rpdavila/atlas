import { combineReducers } from "@reduxjs/toolkit";

import searchOptionsSlice from "./searchOptionsSlice";
import studentListSlice from "./studentListSlice";
import instrumentDetailsSlice from "./instrumentSLice";
import userInformationSlice from "./userSlice";
import windowSlice from "./windowSlice";

const rootReducer = combineReducers({
  searchOptions: searchOptionsSlice,
  students: studentListSlice,
  instruments: instrumentDetailsSlice,
  userInfo: userInformationSlice,
  window: windowSlice
});

export default rootReducer;
