import { useDispatch, useSelector } from "react-redux";
import contactOperations from "../redux/contacts/contact-actions";
import contactSelectors from "../redux/contacts/contact-selectors";
import { useEffect, useRef, useState } from "react";

import s from "./ContactListItem.module.css";
import Button from "@mui/material/Button";
import toastr from "toastr";

export default function ContactListItem({ id, name, number, toggleModal }) {
  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    escapeHtml: true,
  };
  const dispatch = useDispatch();

  const onDeleteContact = (e) => {
    try {
      dispatch(contactOperations.deleteContact(e));

      toastr.success("Успешно удалили");
    } catch {
      console.log("не получилось удалить");
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
