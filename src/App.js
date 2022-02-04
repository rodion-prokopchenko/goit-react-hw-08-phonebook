import s from "./App.module.css";
import AppBar from "./Components/AppBar/AppBar";
import { lazy, Suspense } from "react";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { Route, Routes, Outlet } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterPage from "./Components/RegisterForm/RegisterForm";
import ContactPage from "./Components/ContactPage/ContactPage";
import PublicRoute from "./Components/PublicRoute/PublicRoute";

// const ContactPage = lazy(() => import("./Components/ContactPage/ContactPage"));
// const LoginPage = lazy(() => import("./Components/LoginForm/LoginForm"));

export default function App() {
  return (
    <div className={s.app}>
      <AppBar />
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
