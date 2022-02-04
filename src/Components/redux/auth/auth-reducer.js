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
      alert("Успешно зарегистрировались");
    },
    [authOperations.register.pending](state, action) {
      alert("Регистрируемся...");
    },
    [authOperations.register.rejected](state, action) {
      alert("что-то не так");
    },
    [authOperations.logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      alert("Успешно зашли");
    },
    [authOperations.logIn.pending](state, action) {
      alert("Заходим...");
    },
    [authOperations.logIn.rejected](state, action) {
      alert("что-то не так");
    },
    [authOperations.logOut.fulfilled](state, action) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      alert("Успешно вышли");
    },
    [authOperations.logOut.pending](state, action) {
      alert("Выходим...");
    },
    [authOperations.logOut.rejected](state, action) {
      alert("что-то не так");
    },
    [authOperations.fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export default authSlice.reducer;
