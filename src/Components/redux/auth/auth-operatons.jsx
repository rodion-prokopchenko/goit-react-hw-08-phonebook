import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  errorLoginNotification,
  errorRegisterNotification,
} from "../../Toastify/Toastify";

axios.defaults.baseURL = "https://connections-api.herokuapp.com/";

const token = {
  set(token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.Authorization = "";
  },
};

// REGISTER
const register = createAsyncThunk("auth/register", async (credentials) => {
  console.log(credentials);

  try {
    const { data } = await axios.post("/users/signup", credentials);
    token.set(data.token);
    console.log(data);
    return data;
  } catch (error) {
    errorRegisterNotification(error);
    return console.log(error);
  }
});

// LOGIN
const logIn = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const { data } = await axios.post("/users/login", credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    errorLoginNotification(error);
  }
});

// LOGOUT
const logOut = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.post("/users/logout");
    token.unset();
  } catch (error) {
    return console.log(error.message);
  }
});

// FETCHCURRENTUSER
const fetchCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      return console.log(error.message);
    }
  }
);

const authOperations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default authOperations;
