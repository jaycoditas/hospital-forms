import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { userData } from "../../components/forms/PersonalDetails";

export const saveUserInfo = createAsyncThunk(
  "user/saveUserInfo",
  async (
    { userInfo, userToken }: { userInfo: userData; userToken: string | null },
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
        const res = await axios.post("/user", userInfo, config);
        console.log("🚀 ~ user data res", res);

        return res?.data;
      } else throw new Error("Not Authorized");
      //   if (res?.data?.error) toast.error(res?.data?.error?.detail);
      //   else toast.success("User Registered");
      // navigate("/personal_info");
    } catch (err: unknown) {
      let error = err as AxiosError;
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (
    { userInfo, userToken }: { userInfo: userData; userToken: string | null },
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
        const res = await axios.put("/user", userInfo, config);
        console.log("🚀 ~ user update res", res);

        return res?.data;
      } else throw new Error("Not Authorized");
      //   if (res?.data?.error) toast.error(res?.data?.error?.detail);
      //   else toast.success("User Registered");
      // navigate("/personal_info");
    } catch (err: unknown) {
      let error = err as AxiosError;
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);
