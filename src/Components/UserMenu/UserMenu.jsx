import authSelectors from "../redux/auth/auth-selectors";
import { useSelector, useDispatch } from "react-redux";
import authOperations from "../redux/auth/auth-operatons";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import ExitLogo from "../Images/ExitLogo";

import s from "./UserMenu.module.css";

export default function UserMenu() {
  // RESPONSIVE
  const isLess768 = useMediaQuery({ query: "(max-width: 768px)" });

  // CODE
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
        <div className={s.userMenu_block}>
          <h2 className={s.userMenu__text}>
            Привет,
            <br /> {userEmail ? userEmail : null}
          </h2>

          {showContacts ? showContactsPage() : hiddenContactsPage()}
        </div>

        {!isLess768 ? (
          <button
            variant="contained"
            type="button"
            onClick={() => dispatch(authOperations.logOut())}
            className={s.userMenu__button}
          >
            LOGOUT
          </button>
        ) : (
          <ExitLogo exit={() => dispatch(authOperations.logOut())} />
        )}
      </div>
    </>
  );
}
