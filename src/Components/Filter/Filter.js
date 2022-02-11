import propTypes from "prop-types";
import { TextField, Box } from "@mui/material";
import s from "./Filter.module.css";

const Filter = ({ onChange }) => {
  const a = (e) => {
    onChange(e.target.value);
  };

  return (
    <>
      <h2>Contacts</h2>

      <Box component="form">
        <label className={s.filter__label}>
          Find contacts by name:
          <TextField
            type="text"
            size="small"
            onInput={a}
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

Filter.propTypes = {
  value: propTypes.string,
};

export default Filter;
