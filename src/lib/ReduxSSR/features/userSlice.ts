import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { School, District } from "@prisma/client";

type DistrictName = Omit<District, "id" | "profileId" | "state">
type UserState = {
  schools: School[];
  district: DistrictName | undefined;
};
const initialState: UserState = {
  schools: [],
  district: {
    name: ""
  },
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
    setDistrict: (state, action: PayloadAction<DistrictName>) => {
      return {
        ...state,
        district: {
          name: action.payload.name
        }
      };
    },
  },
});

export default userInformationSlice.reducer;
export const { setSchools, setDistrict } = userInformationSlice.actions;
