import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInformation } from "@/app/types/formTypes";

const initialState: UserInformation = {
  schools: [],
  district: ''
};

export const userInformationSlice = createSlice({
  name: "userInformation",
  initialState,
  reducers: {
    setSchools: (state, action) => {
      return {
        ...state,
        schools: action.payload.schools,
        district: action.payload.district
      };
    },
    setDistrict: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        district: action.payload
      };
    },
  },
});

export default userInformationSlice.reducer;
export const { setSchools, setDistrict } = userInformationSlice.actions;
