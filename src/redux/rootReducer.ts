import { baseApi } from "./api/baseApi";
import loginReducer from "../redux/features/authSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  loginInfo: loginReducer,
};
