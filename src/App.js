import s from "./App.module.css";
import AppBar from "./Components/AppBar/AppBar";
import { useEffect } from "react";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterPage from "./Components/RegisterForm/RegisterForm";
import ContactPage from "./Components/ContactPage/ContactPage";
import PublicRoute from "./Components/PublicRoute/PublicRoute";
import { useDispatch, useSelector } from "react-redux";
import authOperations from "./Components/redux/auth/auth-operatons";
import authSelectors from "./Components/redux/auth/auth-selectors";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import UserMenu from "./Components/UserMenu/UserMenu";
import AuthNav from "./Components/AuthNav/AuthNav";

export default function App() {
  const dispatch = useDispatch();

  const loadingCurrentUser = useSelector(authSelectors.getIsLoadingCurrentUser);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      {loadingCurrentUser ? (
        <div className={s.spinner}>
          <RotatingLines
            width="100"
            strokeColor="#6495ED"
            strokeWidth="3"
            animationDuration="3"
          />
        </div>
      ) : (
        <>
          <AppBar path="/" />

          <div className={s.app}>
            <Routes>
              <Route element={<PrivateRoute redirectTo="/login" />}>
                <Route path="/contact" element={<ContactPage />} />
              </Route>
              <Route element={<PublicRoute restricted />}>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>
            </Routes>
            <ToastContainer
              limit={4}
              autoClose={333000}
              newestOnTop={true}
              closeOnClick={false}
              pauseOnFocusLoss={false}
            />
          </div>
        </>
      )}
    </>
  );
}
