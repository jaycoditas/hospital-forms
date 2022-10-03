import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import userInfoReducer from "../features/user_info/userInfoSlice";
import familyInfoReducer from "../features/family_info/familyInfoSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userInfo: userInfoReducer,
    familyInfo: familyInfoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
