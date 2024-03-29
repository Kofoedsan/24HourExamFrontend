import facade from "./apiFacade";
import { useNavigate } from "react-router-dom";

export const Logout = ({ setLoggedIn }) => {

  let navigate = useNavigate();
  facade.logout();
  setLoggedIn(false);
  localStorage.clear()
  navigate("/24H/");
  return null;
};

export default Logout;
