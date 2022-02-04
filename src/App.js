import s from "./App.module.css";
import AppBar from "./Components/AppBar/AppBar";
import { useEffect, Suspense } from "react";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterPage from "./Components/RegisterForm/RegisterForm";
import ContactPage from "./Components/ContactPage/ContactPage";
import PublicRoute from "./Components/PublicRoute/PublicRoute";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "./Components/redux/auth/auth-selectors";
import authOperations from "./Components/redux/auth/auth-operatons";

export default function App() {
  const dispatch = useDispatch();
  // const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <div className={s.app}>
      <AppBar path="/" />
      <Suspense>
        <Routes>
          <Route
            element={
              <>
                <PrivateRoute redirectTo="/login" />
              </>
            }
          >
            <Route path="/contact" element={<ContactPage />}></Route>
          </Route>
          <Route element={<PublicRoute restricted />}>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}
{
  /* <PrivateRoute
            path="/contact"
            redirectTo="/login"
            element={<ContactPage />}
          ></PrivateRoute> */
}

{
  /* <PrivateRoute path="/contact" redirectTo="/login">
            {" "}
            <ContactPage />
          </PrivateRoute> */
}
