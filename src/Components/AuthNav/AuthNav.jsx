import { NavLink, useLocation } from "react-router-dom";
import s from "./AuthNav.module.css";

export default function AuthNav() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <div className={s.authNavigation}>
        {location.pathname === "/register" ? (
          <NavLink to="/login" className={s.authNavigation__link}>
            Логин
          </NavLink>
        ) : (
          <NavLink to="register" className={s.authNavigation__link}>
            Регистрация
          </NavLink>
        )}
      </div>
    </>
  );
}
