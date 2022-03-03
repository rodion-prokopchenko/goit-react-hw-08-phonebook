import react, { useState } from "react";
import s from "./ContactForm.module.css";
import contactOperations from "../redux/contacts/contact-actions";
import { useDispatch } from "react-redux";
import { TextField, Box } from "@mui/material";
import Button from "@mui/material/Button";
import {
  errorSameNameNotification,
  successAddNotification,
  errorDeletedNotification,
} from "../Pnotify/Pnotify";

export const inputForm = react.createRef();

export default function ContactForm({ compairContacts }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
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
      alert("Введите имя");
      return;
    }
    if (number === "") {
      alert("Введите номер");
      return;
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
      <Box
        className={s.form}
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
      >
        <label htmlFor={"nameInput"} className={s.form__text}>
          Name
        </label>
        <TextField
          ref={inputForm}
          size="small"
          className={s.form__item}
          id="nameInput"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onInput={onChange}
          value={name}
        />
        <label htmlFor={"numberInput"} className={s.form__text}>
          Number
        </label>
        <TextField
          width="20ch"
          size="small"
          className={s.form__item}
          id="numberInput"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onInput={onChange}
          value={number}
        />
        <Button
          sx={{
            "& ": { width: "13ch" },
          }}
          type="button"
          variant="contained"
          onClick={onSumbitButton}
        >
          Добавить
        </Button>
      </Box>
    </>
  );
}
