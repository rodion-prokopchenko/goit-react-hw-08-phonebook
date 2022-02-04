import authSelectors from "../redux/auth/auth-selectors";
import { useSelector, useDispatch } from "react-redux";
import authOperations from "../redux/auth/auth-operatons";
import { Link, Navigate } from "react-router-dom";

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
  const userEmail = useSelector(authSelectors.getEmail);
  let isShowContacts = false;
  function showContacts() {
    if (isShowContacts) {
      return (isShowContacts = !isShowContacts);
    }
  }
  // СДЕЛАТЬ ТОГЛ
  return (
    <>
      <div style={styles.menu}>
        <Link to="/contact" onClick={showContacts}>
          {isShowContacts ? "крыть контакты" : "Показать контакты"}
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
    </>
  );
}
