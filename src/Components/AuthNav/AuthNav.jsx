import { NavLink, useLocation, useNavigate } from "react-router-dom";
import s from "./AuthNav.module.css";
import ArrowLogo from "../Images/ArrowLogo";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import authSelectors from "../redux/auth/auth-selectors";

export default function AuthNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  useEffect(() => {
    if (location.pathname === "/" && isLoggedIn === false) {
      navigate("/login");
    }
  }, [location.pathname]);
  return (
    <>
      <div className={s.authNavigation}>
        {location.pathname === "/" ? (
          <>
            {}
            <NavLink to="/login" className={s.authNavigation__link}>
              Логин
            </NavLink>{" "}
            <NavLink to="register" className={s.authNavigation__link}>
              Регистрация
            </NavLink>
          </>
        ) : null}
        {location.pathname === "/register" ? (
          <NavLink to="/login" className={s.authNavigation__link}>
            Логин
          </NavLink>
        ) : null}
        {location.pathname === "/login" ? (
          <NavLink to="register" className={s.authNavigation__link}>
            Регистрация
          </NavLink>
        ) : null}

        <div className={s.authNavigation__logo}>
          <ArrowLogo />
        </div>
      </div>
    </>
  );
}
