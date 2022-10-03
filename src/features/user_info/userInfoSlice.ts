import { createSlice } from "@reduxjs/toolkit";
import { userData } from "../../components/forms/PersonalDetails";
import { saveUserInfo, updateUserInfo } from "./userInfoAction";

const initialState: {
  userInfo: userData;
  res: null;
  loading: boolean;
  error: null;
  success: boolean;
} = {
  userInfo: {
    first_name: "",
    last_name: "",
    mob_no: "",
    dob: "",
    weight: 0,
    height: 0,
    country_origin: "",
    is_diabetic: false,
    has_cardiac_issues: false,
    has_bp_issue: false,
  },
  loading: false,
  error: null,
  success: false,
  res: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register user
    builder
      .addCase(saveUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveUserInfo.fulfilled, (state: any, { payload }) => {
        state.loading = false;
        state.success = true;
        state.res = payload;
      })
      .addCase(saveUserInfo.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      })
      //Update
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state: any, { payload }) => {
        state.loading = false;
        state.success = true;
        state.res = payload;
      })
      .addCase(updateUserInfo.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default userInfoSlice.reducer;
