import { createSlice } from "@reduxjs/toolkit";
import contactOperations from "./contact-actions";

const initialState = {
  contacts: [],
  filter: "",
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: {
    [contactOperations.getContact.fulfilled](state, action) {
      state.contacts = action.payload.user;
      console.log("Успешно зафетчено ");
    },
    [contactOperations.getContact.pending](_, action) {
      console.log("фетчинг");
    },
    [contactOperations.getContact.rejected](_, action) {
      console.log("что-то не так с фетчингом");
    },
    [contactOperations.addContact.fulfilled](state, action) {
      state.contacts = [...state.contacts, action.payload.user];

      console.log("Успешно добавилил");
    },
    [contactOperations.addContact.pending](state, action) {
      console.log("Добавляем...");
    },
    [contactOperations.addContact.rejected](state, action) {
      console.log("что-то не так");
    },
    [contactOperations.deleteContact.fulfilled](state, action) {
      state.contacts = state.contacts.filter((contacts) =>
        contacts.name.toLowerCase().includes(action.payload)
      );

      console.log("Успешно вышли");
    },
    [contactOperations.deleteContact.pending](state, action) {
      console.log("Выходим...");
    },
    [contactOperations.deleteContact.rejected](state, action) {
      console.log("что-то не так");
    },
  },
});

export default contactsSlice.reducer;

// import { combineReducers, createReducer } from "@reduxjs/toolkit";
// import {
//   addContact,
//   deleteContact,
//   findByName,
//   changeFilter,
// } from "./contact-actions(previous)";

// const items = createReducer([], {
//   [deleteContact]: (state, action) =>
//     state.filter((contacts) => contacts.id !== action.payload),
//   [addContact]: (state, action) => [action.payload, ...state],
//   [findByName]: (state, action) => {
//     state.filter((state) => state.name.toLowerCase().includes(action.payload));
//   },
// });

// const filter = createReducer("", {
//   [changeFilter]: (_, action) => action.payload,
// });

// export default combineReducers({
//   items,
//   filter,
// });
