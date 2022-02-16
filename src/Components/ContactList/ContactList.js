import { useDispatch, useSelector } from "react-redux";
import contactOperations from "../redux/contacts/contact-actions";
import contactSelectors from "../redux/contacts/contact-selectors";
import { useEffect, useRef, useState } from "react";

import Button from "@mui/material/Button";
import { TextField, Box } from "@mui/material";
import s from "./ContactList.module.css";

export default function ContactList({ filteredContacts }) {
  const Contacts = useSelector(contactSelectors.getContacts);
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

  // const inputUpdatedName = useRef();
  // const inputUpdatedNumber = useRef();
  // const getValue = (e) => {
  //   console.log(e.currentTarget);
  // };

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
                      name: updatedName,
                      number: updatedNumber,
                    };

                    const id = e.currentTarget.id;
                    console.log(Contacts);
                    const index = Contacts.findIndex((element, index) => {
                      if (element.id === id) {
                        return true;
                      }
                    });

                    console.log(index);
                    try {
                      dispatch(
                        contactOperations.updateContact({
                          id,
                          updatedContact,
                          index,
                        })
                      );
                    } catch {
                      console.log("не получилось обновить");
                    }

                    dispatch(contactOperations.sendUpdatedContact("false"));
                  }
                  if (e.target.id === "updateStart") {
                    console.log(inputName.current);
                    console.log(inputNumber.current);

                    setUpdatedName(inputName.current.innerText);
                    setUpdatedNumber(inputNumber.current.innerText);

                    dispatch(contactOperations.sendUpdatedContact("true"));
                  }
                }}
              >
                {isUpdating === "false" ? (
                  <div className={s.contactList__form}>
                    <span ref={inputName}>{contacts.name}</span>:
                    <span ref={inputNumber}>{contacts.number}</span>
                    <Button
                      variant="contained"
                      type="button"
                      id="delete"
                      className={s.contactList__button}
                      size="small"
                      sx={{
                        "& ": { ml: 1, mr: 1 },
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      type="button"
                      id="updateStart"
                      size="small"
                      className={s.contactList__button}
                    >
                      Update
                    </Button>
                  </div>
                ) : null}
              </li>
            ))
          : null}
      </ul>
    </>
  );
}

// {
// isUpdating === "false" ? (
//   <div className={s.contactList__form}>
//     <span ref={inputName}>{contacts.name}</span>:
//     <span ref={inputNumber}>{contacts.number}</span>
//     <Button
//       variant="contained"
//       type="button"
//       id="delete"
//       className={s.contactList__button}
//       sx={{
//         "& ": { ml: 1 },
//       }}
//     >
//       Delete
//     </Button>
//   </div>
// ) : (
//     <>
//       <Box component="form" onSubmit={getValue} className={s.contactList__form}>
//         <TextField
//           sx={{
//             "& ": { mr: 1 },
//           }}
//           size="small"
//           onInput={onChange}
//           ref={inputUpdatedName}
//           placeholder={contacts.name}
//           value={updatedName}
//           name="updatedName"
//         ></TextField>
//         <TextField
//           size="small"
//           onInput={onChange}
//           ref={inputUpdatedNumber}
//           placeholder={contacts.number}
//           value={updatedNumber}
//           name="updatedNumber"
//         ></TextField>
//       </Box>
//     </>
//   );
// }

// {
//   isUpdating === "false" ? (
// <Button
//   variant="contained"
//   type="button"
//   id="updateStart"
//   size="small"
//   className={s.contactList__button}
// >
//   Update
// </Button>
//   ) : (
//     <Button
//       variant="contained"
//       type="button"
//       id="updateFinish"
//       size="small"
//       className={s.contactList__button}
//     >
//       Send update
//     </Button>
//   );
// }
