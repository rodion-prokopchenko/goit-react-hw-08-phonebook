import s from "./App.module.css";
// import ContactPage from "./Components/ContactPage/ContactPage";

import AppBar from "./Components/AppBar/AppBar";
import { lazy, Suspense } from "react";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";

const ContactPage = lazy(() => import("./Components/ContactPage/ContactPage"));
const LoginPage = lazy(() => import("./Components/LoginForm/LoginForm"));

export default function App() {
  return (
    <div className={s.app}>
      <AppBar />
      <Suspense>
        <Routes>
          <Route
            path="/contact"
            element={
              <PrivateRoute redirectTo="/login">
                <ContactPage />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/register" element={<LoginForm />}></Route>

          {/* <PrivateRoute path="/contact" redirectTo="/login">
            {" "}
            <ContactPage />
          </PrivateRoute> */}
        </Routes>
      </Suspense>
    </div>
  );
}
