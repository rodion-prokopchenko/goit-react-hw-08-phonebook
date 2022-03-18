import { useState } from "react";
import s from "./ContactForm.module.css";
import contactOperations from "../redux/contacts/contact-actions";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import {
  errorSameNameNotification,
  successAddNotification,
  errorDeletedNotification,
  warningNameAddNotification,
  warningNumberAddNotification,
} from "../Toastify/Toastify";

export default function ContactForm({ compairContacts }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const isValidButton = name && number ? true : false;

  const reset = () => {
    setName("");
    setNumber("");
  };

  const onSumbitButton = (e) => {
    e.preventDefault();
    if (name === "" && number === "") {
      alert("Введите имя и номер");
      return;
    }
    if (name === "") {
      return warningNameAddNotification();
    }
    if (number === "") {
      return warningNumberAddNotification();
    }
    if (compairContacts(name)) {
      return errorSameNameNotification(name);
    }
    let newContact = { name: name, number: number };
    try {
      dispatch(contactOperations.addContact(newContact));
      successAddNotification(name);
    } catch {
      errorDeletedNotification(name);
    }

    reset();
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;

      case "number":
        setNumber(value);
        break;

      default:
        return;
    }
  };
  return (
    <>
      <form
        className={s.form}
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
      >
        <input
          className={s.form__input_name}
          id="nameInput"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onInput={onChange}
          value={name}
          placeholder="⠀"
          maxLength="21"
        />
        <label htmlFor={"nameInput"} className={s.form__label_name}>
          Name
        </label>
        <input
          className={s.form__input_number}
          id="numberInput"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onInput={onChange}
          value={number}
          placeholder="⠀"
          maxLength="14"
        />
        <label htmlFor={"numberInput"} className={s.form__label_number}>
          Number
        </label>
        <Button
          sx={{
            "& ": { width: "13ch" },
          }}
          type="button"
          variant="contained"
          onClick={onSumbitButton}
          disabled={!isValidButton}
        >
          Add
        </Button>
      </form>
    </>
  );
}
