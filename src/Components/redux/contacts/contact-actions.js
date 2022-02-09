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
      console.log(credentials);
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

// const addContactUpdate = createAsyncThunk(
//   "contact/addContact",
//   async (contactId, userData) => {
//     try {
//       const { data } = await axios.patch(`contacts/${contactId}`, {
//         name: "NAME",
//         number: "NUMBER",
//       });
//       console.log("data:", data);
//       return data;
//     } catch (error) {
//       return console.log(error.message);
//     }
//   }
// );

//  axios
//     .patch(`/tasks/${id}`, update)
//     .then(({ data }) => dispatch(toggleCompletedSuccess(data)))
//     .catch(error => dispatch(toggleCompletedError(error.message)));
// };

const updateContact = createAsyncThunk(
  "updateContact/sendUpdatedContact",
  async ({ id, updatedContact }) => {
    try {
      console.log("id в функцие при отправке:", id);
      console.log("updateContact в функцие при отправке:", updatedContact);

      const { data } = await axios.patch(`contacts/${id}`, updatedContact);
      console.log("👉 Returned data:", data);
      return data;

      // const { data } = await axios
      //   .patch(`contact/${contactId}`, {
      //     name: contactId.name,
      //     number: contactId.number,
      //   })
      //   .then((res) => res.data);
      // return { data };
    } catch (error) {
      return console.error(error);
    }
  }
);

// const updateContact = createAsyncThunk(
//   "updateContact/sendUpdatedContact",
//   async (userData) => {
//     try {
//       console.log("contactId+updContact в функцие при отправке:", userData);
//       const { data } = await axios.patch(`contacts/${userData.id}`, {
//         name: userData.updateContact.name,
//         number: userData.updateContact.number,
//       });
//       console.log("👉 Returned data:", { data });
//       // return { data };

//       // const { data } = await axios
//       //   .patch(`contact/${contactId}`, {
//       //     name: contactId.name,
//       //     number: contactId.number,
//       //   })
//       //   .then((res) => res.data);
//       // return { data };
//     } catch (error) {
//       return console.error(error);
//     }
//   }
// );

const sendUpdatedContact = createAction("updateContact/updating");

const changeFilter = createAction("filter/change");

const contactOperations = {
  addContact,
  updateContact,
  deleteContact,
  getContact,
  changeFilter,
  sendUpdatedContact,
  // addContactUpdate,
};
export default contactOperations;
