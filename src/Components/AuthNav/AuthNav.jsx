import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.css";

export default function AuthNav() {
  return (
    <>
      <div className={s.authNavigation}>
        <NavLink to="/login" className={s.authNavigation__link}>
          Логин
        </NavLink>
        <NavLink to="register" className={s.authNavigation__link}>
          Регистрация
        </NavLink>
      </div>
    </>
  );
}
