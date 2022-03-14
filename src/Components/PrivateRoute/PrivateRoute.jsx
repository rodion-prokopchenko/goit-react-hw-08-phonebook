import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import authSelectors from "../redux/auth/auth-selectors";

export default function PrivateRoute({ redirectTo = "/login" }) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  console.log(isLoggedIn);
  return <>{isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />}</>;
}
