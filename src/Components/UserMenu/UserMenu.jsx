import authSelectors from "../redux/auth/auth-selectors";
import { useSelector, useDispatch } from "react-redux";
import authOperations from "../redux/auth/auth-operatons";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";

import s from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const location = useLocation();

  const userEmail = useSelector(authSelectors.getEmail);
  const [showContacts, setShowContacts] = useState(
    location.pathname === "/contact" ? false : true
  );

  function changeShowContacts() {
    setShowContacts(!showContacts);
  }
  const showContactsPage = () => {
    return (
      <Link
        to="/contact"
        onClick={changeShowContacts}
        className={s.userMenu__link}
      >
        Показать контакты
      </Link>
    );
  };
  const hiddenContactsPage = () => {
    return (
      <Link to="/" onClick={changeShowContacts} className={s.userMenu__link}>
        Скрыть контакты
      </Link>
    );
  };

  return (
    <>
      <div className={s.userMenu}>
        {showContacts ? showContactsPage() : hiddenContactsPage()}

        <h2>Привет, {userEmail ? userEmail : null}</h2>

        <Button
          className={s.userMenu__button}
          variant="contained"
          type="button"
          onClick={() => dispatch(authOperations.logOut())}
        >
          Logout
        </Button>
      </div>
    </>
  );
}
