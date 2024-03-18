"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Realm from "realm-web";
import { UserInformation } from "@/app/types/formTypes";

const app = Realm.getApp(process.env.NEXT_PUBLIC_APP_ID as string);

const initialState: UserInformation = {
  id: "",
  email: "",
  isLoggedIn: false,
  accessToken: "",
  customUserData: undefined,
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
      accessToken: user.accessToken,
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

export const updateAccessToken = createAsyncThunk(
  "userInformation/updateAccessToken",
  async () => {
    if (!app.currentUser?.isLoggedIn) {
      logOutUser();
      throw new Error("You were logged out due to inactivity");
    } else {
      await app.currentUser.refreshAccessToken();
    }
    return app.currentUser.accessToken;
  }
);

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
        const { id, email, isLoggedIn, accessToken } = action.payload;
        return {
          ...state,
          id: id,
          email: email,
          isLoggedIn: isLoggedIn,
          accessToken: accessToken,
        };
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.id = "";
        state.email = "";
        state.isLoggedIn = false;
        state.accessToken = "";
        state.customUserData = undefined;
      })
      .addCase(updateAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(getCustomUserData.fulfilled, (state, action) => {
        state.customUserData = action.payload;
      });
  },
});

export default userInformationSlice.reducer;
