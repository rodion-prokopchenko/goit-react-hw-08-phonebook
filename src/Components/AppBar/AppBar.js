import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import authSelectors from "../redux/auth/auth-selectors";
import { useSelector, useDispatch } from "react-redux";
import authOperations from "../redux/auth/auth-operatons";
import contactOperations from "../redux/contacts/contact-actions";

export default function AppBar() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const dispatch = useDispatch();

  return (
    <>
      <button type="button" onClick={() => dispatch(authOperations.logOut())}>
        ВЫЙДИ РАЗБИЙНИК
      </button>
      <header>{isLoggedIn ? <UserMenu /> : <AuthNav />}</header>
    </>
  );
}
