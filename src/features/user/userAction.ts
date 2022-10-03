import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { authData } from "../../components/forms/Login";

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ email, password }: authData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "/auth/register",
        { email, password },
        config
      );
      console.log("🚀 ~ res", res);
      //   if (res?.data?.error) toast.error(res?.data?.error?.detail);
      //   else toast.success("User Registered");
      // navigate("/personal_info");
    } catch (err: unknown) {
      let error = err as AxiosError;
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: authData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/auth/login", { email, password }, config);
      console.log("🚀 ~ res", res);
      localStorage.setItem("userToken", res?.data?.token);
      return res?.data;
      //   if (res?.data?.error) toast.error(res?.data?.error?.detail);
      //   else toast.success("User Registered");
      // navigate("/personal_info");
    } catch (err: unknown) {
      let error = err as AxiosError;
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userToken: string | null) => {
    try {
      if (userToken) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: userToken,
          },
        };
        const res = await axios.delete("/auth", config);
        console.log("🚀 ~ user data res", res);

        return res?.data;
      } else throw new Error("Not Authorized");
      //   if (res?.data?.error) toast.error(res?.data?.error?.detail);
      //   else toast.success("User Registered");
      // navigate("/personal_info");
    } catch (err: unknown) {
      let error = err as AxiosError;
      return error?.message || "Something went wrong";
    }
  }
);
