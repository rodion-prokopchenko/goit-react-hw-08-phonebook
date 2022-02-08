import axios from "axios";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

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

const getContact = createAsyncThunk(
  "contact/getContact",
  async (credentials) => {
    try {
      const { data } = await axios.get("/contacts", credentials);
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

      console.log(data);

      return data;
    } catch (error) {
      return console.log(error.message);
    }
  }
);

const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (contactId) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
    } catch (error) {
      return console.log(error.message);
    }
  }
);

const changeFilter = createAction("filter/change");

const contactOperations = {
  addContact,
  deleteContact,
  getContact,
  changeFilter,
};
export default contactOperations;
