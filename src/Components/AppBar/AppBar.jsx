import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import authSelectors from "../redux/auth/auth-selectors";
import { useSelector } from "react-redux";
import { RotatingSquare } from "react-loader-spinner";

export default function AppBar() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const loadingCurrentUser = useSelector(authSelectors.getIsLoadingCurrentUser);

  return (
    <>
      <header>{isLoggedIn ? <UserMenu /> : <AuthNav />}</header>
    </>
  );
}
