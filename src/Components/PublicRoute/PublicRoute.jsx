import { Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelectors from "../redux/auth/auth-selectors";

export default function PublicRoute({ restricted = false }) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;

  return <>{shouldRedirect ? <Navigate to="/" /> : <Outlet />}</>;
}
