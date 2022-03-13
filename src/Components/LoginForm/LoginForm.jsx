import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authOperations from "../redux/auth/auth-operatons";
import { Button } from "@mui/material";
import s from "./LoginForm.module.css";
import {
  successLoginNotification,
  errorLoginNotification,
  ErrorLoginPasswordNotification,
} from "../Toastify/Toastify";
import authSelectors from "../redux/auth/auth-selectors";
import { RotatingLines } from "react-loader-spinner";

export default function LoginForm() {
  const dispatch = useDispatch();
  // const offLoadingUser = dispatch(authOperations.changeLoadingUser);
  const isLoginningUser = useSelector(authSelectors.getLoginningUser);
  console.log(isLoginningUser);

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
    if (!email || !password) {
      return;
    }
    if (password.length < 6) {
      ErrorLoginPasswordNotification();
      return;
    }
    try {
      await dispatch(authOperations.logIn({ email, password }));
      setEmail("");
      setPassword("");
      successLoginNotification(email);
    } catch (error) {
      errorLoginNotification();
      dispatch(authOperations.changeLoadingUser());
    }
  };

  return (
    <>
      <div>
        <h1 className={s.form__text}>Страница логина</h1>

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
          {isLoginningUser ? (
            <div className={s.spinner}>
              <RotatingLines
                width="100"
                strokeColor="#6495ED"
                strokeWidth="3"
                animationDuration="3"
              />
            </div>
          ) : null}
        </form>
      </div>
    </>
  );
}
