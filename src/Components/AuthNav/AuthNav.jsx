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
  const isFirstRender = useRef(true);
  const navToLogin = () => {
    navigate("/login");
  };
  console.log(isLoggedIn);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      navToLogin();

      return;
    }
  }, []);
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

        <div className={s.authNavigation__logo}>
          <ArrowLogo />
        </div>
      </div>
    </>
  );
}
