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

  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameDirty, setNameDirty] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [nameError, setNameError] = useState(null);

  const nameValidation = (e) => {
    if (e.target.value.length === 0) {
      return setNameError("Имя не может быть пустым");
    }
    if (e.target.value.length < 3) {
      return setNameError("Имя должно иметь минимум 6 символов");
    }
    setNameError(null);
  };

  const passwordValidation = (e) => {
    if (e.target.value.length === 0) {
      return setPasswordError("Пароль не может быть пустым");
    }
    if (e.target.value.length < 7) {
      return setPasswordError("Пароль должен быть минимум 7 символов");
    }
    setPasswordError(null);
  };

  const emailValidation = (e) => {
    if (e.target.value.length === 0) {
      return setEmailError("Емейл не может быть пустым");
    }
    const v = /.+@.+\..+/i;
    if (!v.test(String(e.target.value).toLocaleLowerCase())) {
      return setEmailError("Некорректный емейл");
    }
    setEmailError(null);
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        nameValidation(e);
        return setNameDirty(true);
      case "email":
        emailValidation(e);
        return setEmailDirty(true);
      case "password":
        passwordValidation(e);
        return setPasswordDirty(true);
      default:
        return;
    }
  };

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
          {nameDirty && nameError && (
            <div className={s.form__textError}>{nameError}</div>
          )}
          Имя
          <TextField
            placeholder="Пример: Rodion/rod123"
            onBlur={blurHandler}
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
          {emailDirty && emailError && (
            <div className={s.form__textError}>{emailError}</div>
          )}
          Почта
          <TextField
            placeholder="Пример: rod@mail.com"
            onBlur={blurHandler}
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
          {passwordDirty && passwordError && (
            <div className={s.form__textError}>{passwordError}</div>
          )}
          Пароль
          <TextField
            placeholder="Не меньше 7 символов"
            onBlur={blurHandler}
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
