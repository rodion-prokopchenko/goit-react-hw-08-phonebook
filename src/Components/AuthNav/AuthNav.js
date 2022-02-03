import { NavLink } from "react-router-dom";

export default function AuthNav() {
  return (
    <>
      <div>
        <NavLink to="/login">Логин</NavLink>
        <NavLink to="register">Регистрация</NavLink>
      </div>
    </>
  );
}
