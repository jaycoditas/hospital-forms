// features/user/userSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteUser, loginUser, registerUser } from "./userAction";

// check if userToken is present in local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null, // for user object
  userToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successful
      })
      .addCase(registerUser.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }: any) => {
        console.log("🚀 ~ payload", payload);
        state.loading = false;
        state.success = true; // login successful
        state.userToken = payload?.token;
        state.userInfo = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }: any) => {
        console.log("🚀 ~ payload", payload);
        state.loading = false;
        state.success = false; // delete successful
        state.userToken = null;
        state.userInfo = null;
      })
      .addCase(deleteUser.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default userSlice.reducer;
