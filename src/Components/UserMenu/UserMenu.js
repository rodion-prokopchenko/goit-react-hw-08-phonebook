import authSelectors from "../redux/auth/auth-selectors";
import { useSelector } from "react-redux";

export default function UserMenu() {
  const userName = useSelector(authSelectors.getUsername);
  return (
    <>
      <div>
        <h2>Привет,{userName}</h2>
        <button type="submit">Logout </button>
      </div>
    </>
  );
}
