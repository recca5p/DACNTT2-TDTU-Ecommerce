import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import * as Actions from "actions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogedIn: !!(
      localStorage.getItem("token") && localStorage.getItem("user-info")
    ),
    data: JSON.parse(localStorage.getItem("user-info")) ?? null,
    token: localStorage.getItem("token") ?? null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(Actions.signInAccount.fulfilled, Actions.signUpAccount.fulfilled),
      (state, action) => {
        localStorage.setItem("user-info", JSON.stringify(action.payload));
        localStorage.setItem("token", action.payload.token);

        state.isLogedIn = true;
        state.data = action.payload;
        state.token = action.payload.token;
      }
    );
  },
});

const { reducer } = authSlice;
export default reducer;
