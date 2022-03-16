import { useDispatch, useSelector } from "react-redux";
import contactOperations from "../redux/contacts/contact-actions";
import contactSelectors from "../redux/contacts/contact-selectors";

import PhoneLogo from "../Images/PhoneLogo";
import AvatarLogo from "../Images/AvatarLogo";
import { toast } from "react-toastify";
import s from "./ContactListItem.module.css";
import Button from "@mui/material/Button";
import {
  errorDeletedNotification,
  successReturnNotification,
  errorReturnNotification,
} from "../Toastify/Toastify";
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
      <div className={s.contactList__undo_block}>
        <h3 className={s.contactList__undo_text}>
          The contact "{name}" has been deleted <br />
        </h3>
        <Button
          onClick={handleClick}
          type="button"
          variant="contained"
          sx={{
            "& ": { width: "15ch" },
          }}
        >
          Cancel
        </Button>
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
        <div className={s.contactList__form_information}>
          <AvatarLogo />
          <span>{name}</span>
        </div>
        <div className={s.contactList__form_information}>
          <PhoneLogo />
          <span>{number}</span>
        </div>
        <div className={s.contactList__form_button}>
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
            onClick={() => toggleModal(id)}
          >
            Update
          </Button>
        </div>
      </li>
    </>
  );
}
