import { createSlice } from "@reduxjs/toolkit";

const Auth_init_state = {
  isAuth: false,
  isLoginForm: false,
  isRegForm: false,
  access_token: null,
};
export const AuthSlce = createSlice({
  name: "auth_user",
  initialState: Auth_init_state,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    },
    LoginFormTrue: (state) => {
      state.isLoginForm = true;
    },

    LoginFormFalse: (state) => {
      state.isLoginForm = false;
    },

    RegFormFalse: (state) => {
      state.isRegForm = false;
    },
    RegFormTrue: (state) => {
      state.isRegForm = true;
    },

    setAccessToken: (state, action) => {
      state.access_token = action.payload.access;
      state.isAuth = true;
    },
    UnsetAccessToken: (state, action) => {
      state.access_token = null;
      state.isAuth = false;
    },
  },
});

export const {
  login,
  logout,
  LoginFormTrue,
  LoginFormFalse,
  setAccessToken,
  UnsetAccessToken,
  RegFormTrue,
  RegFormFalse,
} = AuthSlce.actions;
export default AuthSlce.reducer;
