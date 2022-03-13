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

  const elemName = document.querySelector("#name");

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
      <h1 className={s.form__text}>Страница регистрации</h1>

      <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
        {/* NAME */}

        <input
          className={s.form__input_name}
          placeholder=" "
          type="text"
          name="name"
          value={name}
          onBlur={blurHandler}
          onChange={handleChange}
        />
        <label className={s.form__label_name}>
          {/* {nameError ? (
            <div className={s.form__text_Error}>{nameError}</div>
          ) : null} */}
          Имя
        </label>
        <span id="name" className={s.w}>
          {name.length}/6
        </span>
        {/* EMAIL */}

        <input
          className={s.form__input_email}
          placeholder=" "
          onBlur={blurHandler}
          type="email"
          name="email"
          size="small"
          value={email}
          id="login"
          onChange={handleChange}
        />
        <label className={s.form__label_email}>
          {/* {emailError ? (
            <div className={s.form__text_Error}>{emailError}</div>
          ) : null} */}
          Почта
        </label>
        {/* PASSWORD */}

        <input
          className={s.form__input_password}
          placeholder=" "
          onBlur={blurHandler}
          type="password"
          name="password"
          size="small"
          value={password}
          onChange={handleChange}
        />
        <label className={s.form__label_password}>
          {/* {passwordError ? (
            <div className={s.form__text_Error}>{passwordError}</div>
          ) : null} */}
          Пароль
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
