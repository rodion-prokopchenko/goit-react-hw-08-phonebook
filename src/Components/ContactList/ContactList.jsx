import { useDispatch, useSelector } from "react-redux";
import contactOperations from "../redux/contacts/contact-actions";
import contactSelectors from "../redux/contacts/contact-selectors";
import { useState } from "react";
import ModalWindow from "../Modal/Modal";

import ContactListItem from "../ContactListItem/ContactListItem";
import s from "./ContactList.module.css";
import {
  successUpdateNotification,
  errorUpdateNotification,
  errorSameNameNotification,
} from "../Toastify/Toastify";

export default function ContactList({ filteredContacts, compairContacts }) {
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
    if (
      editCurrentContact.name === updatedContact.name &&
      editCurrentContact.number === updatedContact.number
    ) {
      return;
    }
    if (compairContacts(name)) {
      return errorSameNameNotification(name);
    }

    try {
      dispatch(contactOperations.updateContact({ id, updatedContact, index }));
      successUpdateNotification(editCurrentContact.name);
    } catch (error) {
      errorUpdateNotification(editCurrentContact.name);
    }
  }

  const toggleModal = (id) => {
    setEditCurrentContact(Contacts.filter((item) => item.id === id)[0]);
    setShowModal(!showModal);
  };

  const toggleModalForKey = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <ul className={s.contactList}>
        {filteredContacts.length !== 0
          ? filteredContacts.map((contacts) => (
              <ContactListItem
                key={contacts.id}
                {...contacts}
                toggleModal={toggleModal}
              />
            ))
          : null}
      </ul>
      {showModal && (
        <ModalWindow
          contact={editCurrentContact}
          onClose={toggleModal}
          onCloseForKey={toggleModalForKey}
          upd={onUpdateContact}
        />
      )}
    </>
  );
}
