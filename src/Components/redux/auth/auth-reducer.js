import { createSlice } from "@reduxjs/toolkit";
import authOperations from "./auth-operatons";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [authOperations.register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      console.log("Успешно зарегистрировались");
    },
    [authOperations.register.pending](_, action) {
      console.log("регистрация");
    },
    [authOperations.register.rejected](state, action) {
      console.log("что-то не так");
    },
    [authOperations.logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      console.log("Успешно зашли");
    },
    [authOperations.logIn.pending](state, action) {
      console.log("Заходим...");
    },
    [authOperations.logIn.rejected](state, action) {
      console.log("что-то не так");
    },
    [authOperations.logOut.fulfilled](state, action) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      console.log("Успешно вышли");
    },
    [authOperations.logOut.pending](state, action) {
      console.log("Выходим...");
    },
    [authOperations.logOut.rejected](state, action) {
      console.log("что-то не так");
    },
    [authOperations.fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export default authSlice.reducer;
