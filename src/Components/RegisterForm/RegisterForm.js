import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import authOperations from "../redux/auth/auth-operatons";
import s from "./RegisterForm.module.css";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case "name":
        return setName(value);
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    console.log("кнопка работает");
    e.preventDefault();
    dispatch(authOperations.register({ name, email, password }));
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h1>Страница регистрации</h1>

      <form onSubmit={handleSubmit} className={s.form__box} autoComplete="off">
        <label className={s.form__label}>
          Имя
          <TextField
            type="text"
            name="name"
            size="small"
            value={name}
            onChange={handleChange}
            sx={{
              "& ": { mb: 1, mt: 1 },
            }}
          />
        </label>

        <label className={s.form__label}>
          Почта
          <TextField
            type="email"
            name="email"
            size="small"
            value={email}
            onChange={handleChange}
            sx={{
              "& ": { mb: 1, mt: 1 },
            }}
          />
        </label>

        <label className={s.form__label}>
          Пароль
          <TextField
            type="password"
            name="password"
            size="small"
            value={password}
            onChange={handleChange}
            sx={{
              "& ": { mt: 1 },
            }}
          />
        </label>

        <Button
          type="submit"
          variant="contained"
          sx={{
            "& ": { mt: 2, width: "30ch" },
          }}
        >
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
}
