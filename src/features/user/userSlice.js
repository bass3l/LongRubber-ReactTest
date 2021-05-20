import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    phoneNumber: "",
    loggedIn: false,
    otpRequested: false,
  },
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    signUp: (state, action) => {
      state.otpRequested = true;
      state.phoneNumber = action.payload;
    },
  },
});

export const { login, signUp } = userSlice.actions;

export const selectPhoneNumber = (state) => state.user.phoneNumber;
export const selectIsLoggedIn = (state) => state.user.loggedIn;
export const selectOtpRequested = (state) => state.user.otpRequested;

export default userSlice.reducer;
