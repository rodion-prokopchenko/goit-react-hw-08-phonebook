import { createSlice, createReducer } from "@reduxjs/toolkit";

import contactOperations from "./contact-actions";

const initialState = {
  contacts: [],
  isFetching: "done",
  isUpdatingContact: "false",
  isSendingContact: "false",
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
    [contactOperations.getContact.rejected](_, action) {
      console.log("что-то не так с фетчингом");
    },

    // ADD
    [contactOperations.addContact.fulfilled](state, action) {
      console.log(action);
      // eslint-disable-next-line no-lone-blocks
      {
        action.payload
          ? state.contacts.push(action.payload)
          : state.contacts.push(action.meta.arg);
      }
      state.isFetching = "done";

      console.log("Успешно добавилил");
    },
    [contactOperations.addContact.pending](state, action) {
      console.log(action);

      state.isFetching = "pending";

      console.log("Добавляем...");
    },
    [contactOperations.addContact.rejected](state, _) {
      console.log("что-то не так");
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
    },

    // UPDATE
    [contactOperations.updateContact.fulfilled](state, action) {
      state.contacts.splice(action.meta.arg.index, 1, action.payload);

      // console.log("action in Fulfilled:", action);
      // console.log("updatedContact in Fulfilled:", updateContact);
      // console.log("action.index in Fulfilled:", action.meta.arg.index);
      // console.log("action.id in Fulfilled:", action.payload.id);
    },
    [contactOperations.updateContact.pending](state, action) {
      console.log("updatedContact in Pending:", action);
    },
    [contactOperations.updateContact.rejected](state, action) {
      console.log(action);
      console.log("что-то пошло не так");
    },

    [contactOperations.sendUpdatedContact](state, action) {
      state.isUpdatingContact = action.payload;
    },
  },
});

export default contactsSlice.reducer;
