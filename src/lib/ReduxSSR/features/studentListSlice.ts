import { createSlice } from "@reduxjs/toolkit";

//type imports
import { StudentListWithoutUserIdAndInstrument, } from "@/app/types/formTypes";

type StudentState = {
  dropDownList: StudentListWithoutUserIdAndInstrument;
};
const initialState: StudentState = {
  dropDownList: [],
};


export const studentListSlice = createSlice({
  name: "studentList",
  initialState,
  reducers: {
    setDropDownList: (state, action) => {
      return { ...state, dropDownList: action.payload };
    },
    addStudentToDropDownList: (state, action) => {
      return {
        ...state,
        dropDownList: [...state.dropDownList, action.payload]
      }
    }
  },
});

export default studentListSlice.reducer;
export const { setDropDownList, addStudentToDropDownList } = studentListSlice.actions;
