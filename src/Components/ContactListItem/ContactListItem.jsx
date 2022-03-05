import { useDispatch, useSelector } from "react-redux";
import contactOperations from "../redux/contacts/contact-actions";
import contactSelectors from "../redux/contacts/contact-selectors";

import { toast } from "react-toastify";
import s from "./ContactListItem.module.css";
import Button from "@mui/material/Button";
import {
  errorDeletedNotification,
  successReturnNotification,
  errorReturnNotification,
} from "../Notify/Toastify";
import { useRef } from "react";

export default function ContactListItem({ id, name, number, toggleModal }) {
  const Contacts = useSelector(contactSelectors.getContacts);
  const toastId = useRef(null);

  function cancelDelete(name, number, id) {
    const reternedContact = {
      name: name,
      number: number,
    };

    const index = Contacts.findIndex((element, _) => {
      if (element.id === id) {
        return true;
      }
    });

    try {
      dispatch(
        contactOperations.returnDeletedContact({ reternedContact, index })
      );
      successReturnNotification(name);
    } catch (error) {
      errorReturnNotification(name);
    }
  }

  const Undo = () => {
    const handleClick = () => {
      cancelDelete(name, number, id);
      toast.dismiss(toastId.current);
    };

    return (
      <div>
        <h3>
          The contact "{name}" has been deleted <br />
          <button onClick={handleClick}>Cancel</button>
        </h3>
      </div>
    );
  };

  const removeItem = () => {
    toastId.current = toast.success(<Undo />);
  };

  const dispatch = useDispatch();

  const onDeleteContact = (e) => {
    try {
      dispatch(contactOperations.deleteContact(e));
    } catch (error) {
      errorDeletedNotification(error);
      console.log("не получилось удалить", error);
    }
  };

  return (
    <>
      <li
        className={s.contactList__item}
        id={id}
        onClick={(e) => {
          if (e.target.nodeName !== "BUTTON") {
            return;
          }
          if (e.target.id === "delete") {
            onDeleteContact(e.currentTarget.id);
            removeItem(e.currentTarget.id);
          }
        }}
      >
        <div className={s.contactList__form}>
          <span>{name}</span>:<span>{number}</span>
          <Button
            variant="contained"
            type="button"
            size="small"
            id="delete"
            className={s.contactList__button}
            sx={{
              "& ": { mr: 1, ml: 1 },
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            type="button"
            id="update"
            size="small"
            className={s.contactList__button}
            onClick={() => toggleModal(id)}
          >
            Update
          </Button>
        </div>
      </li>
    </>
  );
}
