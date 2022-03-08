import { createSlice, createReducer } from "@reduxjs/toolkit";

import contactOperations from "./contact-actions";

const initialState = {
  contacts: [],
  isFetching: "done",
};

export const filter = createReducer("", {
  [contactOperations.changeFilter]: (_, action) => action.payload,
});

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: {
    [contactOperations.getContact.fulfilled](state, action) {
      state.contacts = action.payload;
      state.isFetching = "done";
    },
    [contactOperations.getContact.pending](state, action) {
      state.isFetching = "pending";
    },
    [contactOperations.getContact.rejected](state, action) {
      console.log("что-то не так с фетчингом");
      state.isFetching = "done";
    },

    // ADD
    [contactOperations.addContact.fulfilled](state, action) {
      {
        action.payload
          ? state.contacts.push(action.payload)
          : state.contacts.push(action.meta.arg);
      }
      state.isFetching = "done";

      console.log("Успешно добавилил");
    },
    [contactOperations.addContact.pending](state, action) {
      state.isFetching = "pending";

      console.log("Добавляем...");
    },
    [contactOperations.addContact.rejected](state, _) {
      console.log("что-то не так");
      state.isFetching = "done";
    },

    // DELETE
    [contactOperations.deleteContact.fulfilled](state, action) {
      state.contacts = state.contacts.filter(
        (contacts) => contacts.id !== action.meta.arg
      );
      state.isFetching = "done";

      console.log("Успешно удалили");
    },
    [contactOperations.deleteContact.pending](state, _) {
      state.isFetching = "pending";
      console.log("Удаляем...");
    },
    [contactOperations.deleteContact.rejected](state, _) {
      console.log("что-то не так");
      state.isFetching = "done";
    },
    // RETURN DELETED CONTACT
    [contactOperations.returnDeletedContact.fulfilled](state, action) {
      state.contacts.splice(action.meta.arg.index, 0, action.payload);
      state.isFetching = "done";
    },
    [contactOperations.returnDeletedContact.pending](state, _) {
      console.log("обновляем контакт");
      state.isFetching = "pending";
    },
    [contactOperations.returnDeletedContact.rejected](state, _) {
      console.log("что-то пошло не так");
      state.isFetching = "done";
    },
    // UPDATE
    [contactOperations.updateContact.fulfilled](state, action) {
      state.contacts.splice(action.meta.arg.index, 1, action.payload);
      state.isFetching = "done";
    },
    [contactOperations.updateContact.pending](state, _) {
      console.log("обновляем контакт");
      state.isFetching = "pending";
    },
    [contactOperations.updateContact.rejected](state, _) {
      console.log("что-то пошло не так");
      state.isFetching = "done";
    },
  },
});

export default contactsSlice.reducer;
