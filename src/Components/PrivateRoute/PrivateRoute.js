import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";
// import { Redirect } from "react-router";
import authSelectors from "../redux/auth/auth-selectors";

export default function PrivateRoute({
  childrens,
  redirectTo = "/",
  ...routeProps
}) {
  let navigate = useNavigate();
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <>
      <Route {...routeProps}>
        {isLoggedIn ? childrens : navigate({ redirectTo })}
      </Route>
    </>
  );
}
