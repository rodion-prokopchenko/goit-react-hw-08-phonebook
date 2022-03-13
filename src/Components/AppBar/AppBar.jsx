import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import authSelectors from "../redux/auth/auth-selectors";
import { useSelector } from "react-redux";

export default function AppBar() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <>
      <header>{isLoggedIn ? <UserMenu /> : <AuthNav />}</header>
    </>
  );
}
