import react, { Component } from "react";
import propTypes from "prop-types";
import shortid from "shortid";
import s from "./ContactList.module.css";
import { useDispatch } from "react-redux";
import contactOperations from "../redux/contacts/contact-actions";

export default function ContactList({
  filteredContacts,
  // deleteContact,
}) {
  const dispatch = useDispatch();
  return (
    <>
      <ul className={s.contactList}>
        {filteredContacts.length !== 0
          ? filteredContacts.map((contacts) => (
              <li
                className={s.contactList__item}
                key={contacts.id}
                id={contacts.id}
                onClick={(e) => {
                  if (e.target.nodeName !== "BUTTON") {
                    return;
                  }
                  if (e.target.id === "delete") {
                    try {
                      dispatch(
                        contactOperations.deleteContact(e.currentTarget.id)
                      );
                    } catch {
                      console.log("не получилось удалить");
                    }
                  }
                  if (e.target.id === "update") {
                    // const updatedContact = {}
                    const w = e.currentTarget;
                    console.log(w.firstChild.textContent);
                    console.log(w);

                    // console.log(w.find("span"));

                    // try {
                    //   dispatch(
                    //     contactOperations.updateContact(e.currentTarget.id)
                    //   );
                    // } catch {
                    //   console.log("не получилось обновить");
                    // }
                  }
                }}
              >
                <span id="name">{contacts.name}</span>:
                <span id="number"> {contacts.number}</span>
                <button
                  type="button"
                  id="delete"
                  className={s.contactList__button}
                >
                  Delete
                </button>
                <button
                  type="button"
                  id="update"
                  className={s.contactList__button}
                >
                  Update
                </button>
              </li>
            ))
          : null}
      </ul>
    </>
  );
}
