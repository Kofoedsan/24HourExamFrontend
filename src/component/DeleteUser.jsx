import facade from "./apiFacade";
import URL from "./URL";
import { useNavigate   } from 'react-router-dom';

function DeleteUser({ setLoggedIn }) {

  const userToDelete = facade.getUserName();
  let navigate = useNavigate();
 
  function deleteThatUserNow() {
    const op = facade.makeOptions("DELETE", true, userToDelete);
    fetch(URL + "/api/info/" + userToDelete, op)
      .then(facade.handleHttpErrors)
      .then(localStorage.clear())
      .then(
        alert("The user with username " + userToDelete + " has been deleted")
      )
      .then(setLoggedIn(false));
    navigate("/24H/")
  }

  const msg = "DoubleClik to delete user";

  return (
    <div>
      <button id="Delete" onDoubleClick={deleteThatUserNow}>
        Delete user with username "{userToDelete}"
      </button>
      <p>{msg}</p>
    </div>
  );
}
export default DeleteUser;
