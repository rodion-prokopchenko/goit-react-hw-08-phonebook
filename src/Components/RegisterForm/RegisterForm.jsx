import { Button } from "@mui/material";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authOperations from "../redux/auth/auth-operatons";
import s from "./RegisterForm.module.css";
import {
  successRegisterNotification,
  warningRegisterNameNotification,
  warningRegisterPasswordNotification,
  warningRegisterEmailNotification,
} from "../Toastify/Toastify";

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
      setNameError(false);
      return;
    }
    if (e.target.value.length < 6) {
      setNameError(false);
      return warningRegisterNameNotification();
    }
    setNameError(null);
  };

  const passwordValidation = (e) => {
    if (e.target.value.length === 0) {
      setPasswordError(false);
      return;
    }
    if (e.target.value.length < 7) {
      setPasswordError(false);
      return warningRegisterPasswordNotification();
    }
    setPasswordError(null);
  };

  const emailValidation = (e) => {
    if (e.target.value.length === 0) {
      setEmailError(false);
      return;
    }
    const v = /.+@.+\..+/i;
    if (!v.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError(false);
      return warningRegisterEmailNotification();
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

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        if (e.target.value.length >= 6) {
          nameValidation(e);
        }
        return;
      case "email":
        return setEmail(e.target.value);
      case "password":
        setPassword(e.target.value);
        if (e.target.value.length >= 7) {
          passwordValidation(e);
        }
        return;
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
    <div className={s.form}>
      <h1 className={s.form__text}>Регистрации</h1>

      <form onSubmit={handleSubmit} className={s.form__box} autoComplete="off">
        {/* NAME */}
        <label className={s.form__label}>
          {nameError ? (
            <div className={s.form__textError}>{nameError}</div>
          ) : null}
          Имя
          <input
            className={s.form__input}
            onBlur={blurHandler}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </label>{" "}
        <span id="name" className={s.w}>
          {name.length}/6
        </span>
        {/* EMAIL */}
        <label className={s.form__label}>
          {emailError ? (
            <div className={s.form__textError}>{emailError}</div>
          ) : null}
          Почта
          <input
            className={s.form__input}
            onBlur={blurHandler}
            type="email"
            name="email"
            size="small"
            value={email}
            id="login"
            onChange={handleChange}
          />
        </label>
        {/* PASSWORD */}
        <label className={s.form__label}>
          {passwordError ? (
            <div className={s.form__textError}>{passwordError}</div>
          ) : null}
          Пароль
          <input
            className={s.form__input}
            onBlur={blurHandler}
            type="password"
            name="password"
            size="small"
            value={password}
            onChange={handleChange}
          />
        </label>
        <span id="name" className={s.w}>
          {password.length}/7
        </span>
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
