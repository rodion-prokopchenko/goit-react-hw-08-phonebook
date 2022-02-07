import authSelectors from "../redux/auth/auth-selectors";
import { useSelector, useDispatch } from "react-redux";
import authOperations from "../redux/auth/auth-operatons";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const styles = {
  button: {
    innerHeight: 10,
  },
  menu: {
    display: "flex",
    marginBottom: 15,
  },
};

export default function UserMenu() {
  const dispatch = useDispatch();
  const location = useLocation();
  // const navigation = useNavigate();
  const userToken = useSelector(authSelectors.getToken);

  const userEmail = useSelector(authSelectors.getEmail);
  const [showContacts, setShowContacts] = useState("false");

  function changeShowContacts() {
    setShowContacts(!showContacts);
    // navigation(location="/");
  }

  // СДЕЛАТЬ ТОГЛ
  return (
    <>
      <div style={styles.menu}>
        <Link to="/contact" onClick={changeShowContacts}>
          {showContacts ? "Показать контакты" : "Скрыть контакты"}
        </Link>
        <h2>Привет, {userEmail}</h2>

        <button
          style={styles.button}
          type="button"
          onClick={() => dispatch(authOperations.logOut())}
        >
          Logout
        </button>
      </div>
      <div>
        Вот твой токен: <b>{userToken}</b>
      </div>
    </>
  );
}
