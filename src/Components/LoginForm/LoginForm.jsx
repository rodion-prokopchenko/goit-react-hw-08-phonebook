import { useState } from "react";
import { useDispatch } from "react-redux";
import authOperations from "../redux/auth/auth-operatons";
import { Button, TextField } from "@mui/material";
import s from "./LoginForm.module.css";
import {
  successLoginNotification,
  errorLoginNotification,
} from "../Toastify/Toastify";

export default function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(authOperations.logIn({ email, password }));
      setEmail("");
      setPassword("");
      successLoginNotification(email);
    } catch (error) {
      errorLoginNotification(error.message);
    }
  };

  return (
    <>
      <div>
        <h1>Страница логина</h1>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className={s.form__box}
        >
          <label className={s.form__label}>
            Почта
            <input
              className={s.form__input_marginBottom}
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </label>

          <label className={s.form__label}>
            Пароль
            <input
              className={s.form__input}
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </label>

          <Button
            type="submit"
            variant="contained"
            sx={{
              "& ": { mt: 2, width: "15ch" },
            }}
          >
            Войти
          </Button>
        </form>
      </div>
    </>
  );
}
