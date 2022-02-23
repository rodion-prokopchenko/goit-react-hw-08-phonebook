import { useDispatch, useSelector } from "react-redux";
import contactOperations from "../redux/contacts/contact-actions";
import contactSelectors from "../redux/contacts/contact-selectors";

import s from "./ContactListItem.module.css";
import Button from "@mui/material/Button";
import {
  errorDeletedNotification,
  successDeletedNotification,
} from "../Pnotify/Pnotify";

export default function ContactListItem({ id, name, number, toggleModal }) {
  const dispatch = useDispatch();
  const isFetching = useSelector(contactSelectors.getFetching);

  const onDeleteContact = (e) => {
    try {
      dispatch(contactOperations.deleteContact(e));

      successDeletedNotification(name);
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
