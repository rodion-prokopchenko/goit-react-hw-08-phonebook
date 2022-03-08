import { Button } from "@mui/material";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authOperations from "../redux/auth/auth-operatons";
import s from "./RegisterForm.module.css";
import { successRegisterNotification } from "../Toastify/Toastify";

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

  const elemLogin = document.querySelector("#login");
  const elemName = document.querySelector("#name");

  console.log(elemName);
  // const elemCounter = elemLogin.nextElementSibling;
  // const maxLength = elemLogin.maxLength;
  // const updateCounter = (e) => {
  //   const len = e ? e.target.value.length : 0;
  //   elemCounter.textContent = `${len} / ${maxLength}`;
  // };
  // updateCounter();
  // elemLogin.addEventListener("keyup", updateCounter);
  // elemLogin.addEventListener("keydown", updateCounter);

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
        {/* NAME */}
        <label className={s.form__label}>
          {nameError ? (
            <div className={s.form__textError}>{nameError}</div>
          ) : null}
          Имя
          <input
            placeholder="Ex: Rodion/rod123"
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
            placeholder="Ex: rod@mail.com"
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
            placeholder="Не меньше 7 символов"
            onBlur={blurHandler}
            type="password"
            name="password"
            size="small"
            value={password}
            onChange={handleChange}
          />
        </label>
        <span id="name" className={s.w}>
          {name.length}/7
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
