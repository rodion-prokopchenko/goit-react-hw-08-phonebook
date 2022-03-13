import { createSlice } from "@reduxjs/toolkit";
import authOperations from "./auth-operatons";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isLoadingCurrentUser: false,
  isLoginningUser: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    // OFF LOADING(as login.rejected doesn't work)
    [authOperations.changeLoadingUser](state, _) {
      state.isLoginningUser = false;
    },

    // REGISTER
    [authOperations.register.fulfilled](state, action) {
      console.log(`action in FF: `, action);
      state.user = action.meta.arg;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      console.log("Успешно зарегистрировались");
    },
    [authOperations.register.pending](state, _) {
      console.log("регистрация");
      state.isLoading = true;
    },
    [authOperations.register.rejected](state, _) {
      state.isLoading = false;
    },

    // LOGIN
    [authOperations.logIn.fulfilled](state, action) {
      console.log("FF a : ", action);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoginningUser = false;
    },
    [authOperations.logIn.pending](state, action) {
      state.isLoginningUser = true;
    },
    // REJECTED DOESN'T WORK.
    [authOperations.logIn.rejected](state, _) {
      state.isLoginningUser = false;
    },

    // LOGOUT
    [authOperations.logOut.fulfilled](state, _) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [authOperations.logOut.pending](state, _) {
      state.isLoading = true;
    },
    [authOperations.logOut.rejected](state, _) {
      state.isLoading = false;
    },

    // FETCHCURRENTUSER
    [authOperations.fetchCurrentUser.pending](state, _) {
      state.isLoading = true;
    },
    [authOperations.fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [authOperations.fetchCurrentUser.rejected](state, _) {
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
