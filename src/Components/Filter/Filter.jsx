import { TextField, Box } from "@mui/material";
import s from "./Filter.module.css";
import { useDispatch } from "react-redux";
import contactOperations from "../redux/contacts/contact-actions";

const Filter = () => {
  const dispatch = useDispatch();

  const onChangeFilter = (e) =>
    dispatch(contactOperations.changeFilter(e.target.value));

  return (
    <>
      <h2>Contacts</h2>

      <Box component="form">
        <label className={s.filter__label}>
          Find contacts by name:
          <TextField
            type="text"
            size="small"
            onInput={onChangeFilter}
            sx={{
              "& ": { width: "20ch", mt: 1 },
            }}
            className={s.contactList__label}
          ></TextField>
        </label>
      </Box>
    </>
  );
};

export default Filter;
