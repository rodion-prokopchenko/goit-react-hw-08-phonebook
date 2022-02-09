import react, { useState, useEffect, useRef } from "react";
import s from "./ContactForm.module.css";
import contactOperations from "../redux/contacts/contact-actions";
import { useDispatch } from "react-redux";
import Context from "../context";
import { TextField, Box } from "@mui/material";

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
      return alert(`${name} is already in contacts`);
    }
    let newContact = { name: name, number: number };
    try {
      dispatch(contactOperations.addContact(newContact));
    } catch {
      console.log("не получилось добавить");
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
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
      >
        <label htmlFor={"nameInput"} className={s.form__item}>
          Name
        </label>
        <TextField
          ref={inputForm}
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
        <label htmlFor={"numberInput"} className={s.form__item}>
          Number
        </label>
        <TextField
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
        <button type="button" onClick={onSumbitButton}>
          Добавить
        </button>
      </Box>
    </>
  );
}
