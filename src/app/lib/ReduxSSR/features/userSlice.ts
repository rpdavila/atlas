import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { app } from "@/app/utilities/mongodb";
import * as Realm from "realm-web";
import { UserInformation } from "@/app/types/formTypes";

const initialState: UserInformation = {
  id: "",
  email: "",
  isLoggedIn: false,
  accessToken: "",
  customUserData: undefined,
  loading: false
};

export const loginUser = createAsyncThunk(
  "userInformation/fetchUser",
  async (userLoginCredentials: { email: string; password: string }) => {
    const credentials = Realm.Credentials.emailPassword(
      userLoginCredentials.email,
      userLoginCredentials.password
    );
    const user = await app.logIn(credentials);
    return {
      id: user.id,
      email: user.profile.email,
      isLoggedIn: user.isLoggedIn,
    };
  }
);

export const logOutUser = createAsyncThunk(
  "userInformtion/logOutUser",
  async () => {
    await app.currentUser?.logOut();
  }
);

export const refreshUserData = createAsyncThunk(
  "userInformation/refreshUserData",
  async () => {
    await app.currentUser?.refreshCustomData();
  }
);

// use for graphql
// export const updateAccessToken = createAsyncThunk(
//   "userInformation/updateAccessToken",
//   async () => {
//     if (!app.currentUser?.isLoggedIn) {
//       logOutUser();
//       throw new Error("You were logged out due to inactivity");
//     } else {
//       await app.currentUser.refreshAccessToken();
//     }
//     return app.currentUser.accessToken;
//   }
// );

export const getCustomUserData = createAsyncThunk(
  "userInformation/getCustomUserData",
  async () => {
    if (app.currentUser?.isLoggedIn) {
      await app.currentUser?.refreshCustomData();
      const userData = app.currentUser.customData;
      return userData;
    }
  }
);

export const userInformationSlice = createSlice({
  name: "userInformation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const { id, email, isLoggedIn } = action.payload;
        return {
          ...state,
          loading: false,
          id: id,
          email: email,
          isLoggedIn: isLoggedIn,
        };
      })
      .addCase(loginUser.pending, (state, action) => {
        return { ...state, loading: true, isLoggedIn: false };
      })
      .addCase(loginUser.rejected, (state, action) => {
        return { ...state, loading: false};
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        return {...state, isLoggedIn: false, id: "", email: "", customUserData: undefined}
      })
      // .addCase(updateAccessToken.fulfilled, (state, action) => {
      //   state.accessToken = action.payload;
      // })
      .addCase(getCustomUserData.fulfilled, (state, action) => {
        return { ...state, customUserData: action.payload };
      });
  },
});

export default userInformationSlice.reducer;
