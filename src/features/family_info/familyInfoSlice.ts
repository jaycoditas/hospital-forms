import { createSlice } from "@reduxjs/toolkit";
import { familyData } from "../../components/forms/FamilyDetails";
import { savefamilyInfo } from "./familyInfoAction";

const initialState: {
  res: familyData;
  loading: boolean;
  error: null;
  success: boolean;
} = {
  res: {
    father_name: "",
    father_age: 0,
    father_origin: "",
    mother_name: "",
    mother_age: 0,
    mother_origin: "",
    isParentDiabetic: false,
    parentHasCardiacIssue: false,
    parentHasBPIssue: false,
  },
  loading: false,
  error: null,
  success: false,
};

const familyInfoSlice = createSlice({
  name: "familyInfo",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register user
    builder
      .addCase(savefamilyInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savefamilyInfo.fulfilled, (state: any, { payload }) => {
        state.loading = false;
        state.success = true;
        state.res = payload;
      })
      .addCase(savefamilyInfo.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default familyInfoSlice.reducer;
