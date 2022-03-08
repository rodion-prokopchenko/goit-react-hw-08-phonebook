import { TextField, Box } from "@mui/material";
import s from "./Filter.module.css";
import contactSelectors from "../redux/contacts/contact-selectors";
import { useDispatch, useSelector } from "react-redux";
import contactOperations from "../redux/contacts/contact-actions";

const Filter = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(contactSelectors.getContacts);
  const isValidFilter = contacts.length === 0 ? false : true;
  const onChangeFilter = (e) =>
    dispatch(contactOperations.changeFilter(e.target.value));

  return (
    <>
      {contacts.length !== 0 ? (
        <>
          {" "}
          <h2>Contacts</h2>
          <Box component="form">
            <label className={s.filter__label}>
              Find contacts by name:
              <input
                disabled={!isValidFilter}
                type="text"
                size="small"
                onInput={onChangeFilter}
                sx={{
                  "& ": { width: "20ch", mt: 1 },
                }}
                className={s.filter__input}
              ></input>
            </label>
          </Box>
        </>
      ) : null}
    </>
  );
};

export default Filter;
