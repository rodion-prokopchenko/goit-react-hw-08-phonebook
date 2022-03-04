import { Button, TextField } from "@mui/material";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authOperations from "../redux/auth/auth-operatons";
import s from "./RegisterForm.module.css";
import { successRegisterNotification } from "../Notify/Toastify";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const [isValidForm, setIsValidForm] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (emailError === null && passwordError === null && nameError === null) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [emailError, passwordError, nameError]);

  const nameValidation = (e) => {
    if (e.target.value.length === 0) {
      return setNameError("Имя не может быть пустым");
    }
    if (e.target.value.length < 6) {
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
        return;
      case "email":
        emailValidation(e);
        return;
      case "password":
        passwordValidation(e);
        return;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(authOperations.register({ name, email, password }));
      setName("");
      setEmail("");
      setPassword("");

      successRegisterNotification(name);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div>
      <h1>Страница регистрации</h1>

      <form onSubmit={handleSubmit} className={s.form__box} autoComplete="off">
        <label className={s.form__label}>
          {nameError ? (
            <div className={s.form__textError}>{nameError}</div>
          ) : null}
          Имя
          <TextField
            placeholder="Пример: Rodion/rod1234"
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
          {emailError ? (
            <div className={s.form__textError}>{emailError}</div>
          ) : null}
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
          {passwordError ? (
            <div className={s.form__textError}>{passwordError}</div>
          ) : null}
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
          disabled={!isValidForm}
        >
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
}
