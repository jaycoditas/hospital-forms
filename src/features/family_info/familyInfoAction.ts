import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { familyData } from "../../components/forms/FamilyDetails";

export const savefamilyInfo = createAsyncThunk(
  "family/savefamilyInfo",
  async (
    {
      familyInfo,
      userToken,
    }: { familyInfo: familyData; userToken: string | null },
    { rejectWithValue }
  ) => {
    try {
      if (userToken) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: userToken,
          },
        };
        const res = await axios.post("/family", familyInfo, config);
        console.log("🚀 ~ user data res", res);

        return res?.data;
      } else throw new Error("Not Authorized");
    } catch (err: unknown) {
      let error = err as AxiosError;
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);
