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
                  try {
                    dispatch(
                      contactOperations.deleteContact(e.currentTarget.id)
                    );
                  } catch {
                    console.log("не получилось удалить");
                  }
                }}
              >
                {contacts.name}: {contacts.number}
                <button type="button" className={s.contactList__button}>
                  Delete
                </button>
              </li>
            ))
          : null}
      </ul>
    </>
  );
}
