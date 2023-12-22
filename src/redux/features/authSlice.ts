import { isLoggedIn } from "@/services/auth.service";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: isLoggedIn(),
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
