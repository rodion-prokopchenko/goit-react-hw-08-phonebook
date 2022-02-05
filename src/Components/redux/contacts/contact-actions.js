import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.herokuapp.com/";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const getContact = createAsyncThunk(
  "contact/getContact",
  async (credentials) => {
    console.log(credentials);

    try {
      const { data } = await axios.get("/contacts", credentials);
      // token.set(data.token);
      console.log(data);
      return data;
    } catch (error) {
      return console.log(error.message);
    }
  }
);

const addContact = createAsyncThunk(
  "contact/addContact",
  async (credentials) => {
    try {
      const { data } = await axios.post("/contacts", credentials);

      return data;
    } catch (error) {
      return console.log(error.message);
    }
  }
);

const deleteContact = createAsyncThunk("contact/deleteContact", async (id) => {
  try {
    await axios.delete(` /contacts/${id}`);
  } catch (error) {
    return console.log(error.message);
  }
});

const contactOperations = {
  addContact,
  deleteContact,
  getContact,
};
export default contactOperations;
