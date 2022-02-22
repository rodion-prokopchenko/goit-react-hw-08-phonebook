import axios from "axios";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.herokuapp.com/";

// GETCONTACT
const getContact = createAsyncThunk(
  "contact/getContact",
  async (credentials) => {
    try {
      const { data } = await axios.get("/contacts", credentials);

      return data;
    } catch (error) {
      return console.log(error.message);
    }
  }
);

// ADDCONTACT
const addContact = createAsyncThunk(
  "contact/addContact",
  async (credentials) => {
    try {
      const { data } = await axios.post("/contacts", credentials);
      console.log(credentials);
      console.log(data);

      return data;
    } catch (error) {
      return console.log(error.message);
    }
  }
);

// DELETECONTACT
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

// UPDATECONTACT
const updateContact = createAsyncThunk(
  "updateContact/sendUpdatedContact",
  async ({ id, updatedContact, index }) => {
    try {
      const { data } = await axios.patch(
        `contacts/${id}`,
        updatedContact,
        index
      );

      return data;
    } catch (error) {
      return console.error(error);
    }
  }
);

// CHANGEFILTER
const changeFilter = createAction("filter/change");

const contactOperations = {
  addContact,
  updateContact,
  deleteContact,
  getContact,
  changeFilter,
};
export default contactOperations;
