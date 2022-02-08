import s from "./ContactList.module.css";
import { useDispatch, useSelector } from "react-redux";
import contactOperations from "../redux/contacts/contact-actions";
import contactSelectors from "../redux/contacts/contact-selectors";
import { useContext, useEffect, useRef, useState } from "react";
import Context from "../context";

export default function ContactList({ filteredContacts }) {
  const isUpdating = useSelector(contactSelectors.getUpdating);
  const dispatch = useDispatch();

  const [updatedName, setUpdatedName] = useState("");
  const [updatedNumber, setUpdatedNumber] = useState("");

  const reset = () => {
    setUpdatedName("");
    setUpdatedNumber("");
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "updatedName":
        setUpdatedName(value);
        break;

      case "updatedNumber":
        setUpdatedNumber(value);
        break;

      default:
        return;
    }
  };
  const inputName = useRef();
  const inputNumber = useRef();

  const inputUpdatedName = useRef();
  const inputUpdatedNumber = useRef();

  useEffect(() => {}, [isUpdating]);
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
                    try {
                      dispatch(
                        contactOperations.deleteContact(e.currentTarget.id)
                      );
                    } catch {
                      console.log("не получилось удалить");
                    }
                  }
                  if (e.target.id === "updateFinish") {
                    const updatedContact = {
                      name: inputUpdatedName.current.value,
                      number: inputUpdatedNumber.current.value,
                    };
                    const id = e.currentTarget.id;
                    console.log(id);
                    try {
                      dispatch(
                        contactOperations.updateContact(id, updatedContact)
                      );
                    } catch {
                      console.log("не получилось обновить");
                    }

                    dispatch(contactOperations.sendUpdatedContact("false"));

                    console.log(isUpdating);
                  }
                  if (e.target.id === "updateStart") {
                    setUpdatedName(inputName.current.innerText);
                    setUpdatedNumber(inputNumber.current.innerText);

                    dispatch(contactOperations.sendUpdatedContact("true"));
                  }
                }}
              >
                {isUpdating === "false" ? (
                  <div>
                    <span ref={inputName}>{contacts.name}</span>:
                    <span ref={inputNumber}>{contacts.number}</span>
                    <button
                      type="button"
                      id="delete"
                      className={s.contactList__button}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      onInput={onChange}
                      ref={inputUpdatedName}
                      placeholder={contacts.name}
                      value={updatedName}
                      name="updatedName"
                    ></input>
                    <input
                      onInput={onChange}
                      ref={inputUpdatedNumber}
                      placeholder={contacts.number}
                      value={updatedNumber}
                      name="updatedNumber"
                    ></input>
                  </>
                )}

                {isUpdating === "false" ? (
                  <button
                    type="button"
                    id="updateStart"
                    className={s.contactList__button}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="button"
                    id="updateFinish"
                    className={s.contactList__button}
                  >
                    Send update
                  </button>
                )}
              </li>
            ))
          : null}
      </ul>
    </>
  );
}
