import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserDetails} from "../../types/auth.types";

export interface IAuthSlice {
  isAuthenticated: boolean;
  token?: string | null;
  userDetails?: IUserDetails;
}

const initialState: IAuthSlice = {
  isAuthenticated: false,
  token: null,
  userDetails: undefined,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
    setUserDetails: (state, action: PayloadAction<IUserDetails>) => {
      state.userDetails = action.payload;
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice;
