import { useDispatch, useSelector } from "react-redux";
import contactOperations from "../redux/contacts/contact-actions";
import contactSelectors from "../redux/contacts/contact-selectors";
import { useEffect, useRef, useState } from "react";
import ModalWindow from "../Modal/Modal";

import ContactListItem from "../ContactListItem/ContactListItem";
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
  }

  const toggleModal = (id) => {
    setEditCurrentContact(Contacts.filter((item) => item.id === id)[0]);
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
          upd={onUpdateContact}
        />
      )}
    </>
  );
}
