import { useDispatch, useSelector } from "react-redux";
import contactOperations from "../redux/contacts/contact-actions";
import contactSelectors from "../redux/contacts/contact-selectors";
import { useEffect, useRef, useState } from "react";
import ModalWindow from "../Modal/Modal";

import Button from "@mui/material/Button";
import s from "./ContactList.module.css";

export default function ContactList({ filteredContacts }) {
  const [showModal, setShowModal] = useState(false);
  const [editCurrentContact, setEditCurrentContact] = useState(null);
  const Contacts = useSelector(contactSelectors.getContacts);
  const dispatch = useDispatch();

  function onUpdateContact(name, number) {
    const updatedContact = {
      name: name,
      number: number,
    };

    const id = editCurrentContact.id;

    const index = Contacts.findIndex((element, index) => {
      if (element.id === editCurrentContact.id) {
        return true;
      }
    });

    try {
      dispatch(contactOperations.updateContact({ id, updatedContact, index }));
    } catch {
      console.log("не получилось обновить");
    }

    dispatch(contactOperations.sendUpdatedContact("false"));
  }

  const toggleModal = (id) => {
    setEditCurrentContact(Contacts.filter((item) => item.id === id)[0]);
    setShowModal(!showModal);
  };

  const onDeleteContact = (e) => {
    try {
      dispatch(contactOperations.deleteContact(e));
    } catch {
      console.log("не получилось удалить");
    }
  };

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
                    onDeleteContact(e.currentTarget.id);
                  }

                  if (e.target.id === "update") {
                    dispatch(contactOperations.sendUpdatedContact("true"));
                  }
                }}
              >
                <div className={s.contactList__form}>
                  <span>{contacts.name}</span>:<span>{contacts.number}</span>
                  <Button
                    variant="contained"
                    type="button"
                    size="small"
                    id="delete"
                    className={s.contactList__button}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    type="button"
                    id="update"
                    size="small"
                    className={s.contactList__button}
                    onClick={() => toggleModal(contacts.id)}
                  >
                    Update
                  </Button>
                </div>
              </li>
            ))
          : null}
      </ul>
      {showModal && (
        <ModalWindow
          contact={editCurrentContact}
          onClose={toggleModal}
          upd={onUpdateContact}
        />
      )}
    </>
  );
}
