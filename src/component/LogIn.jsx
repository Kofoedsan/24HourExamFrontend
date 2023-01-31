import { useState } from "react";
import "../styles/loginstyle.css";
import { Container } from "react-bootstrap";
import Home from "./Home";

export function LoginUI({ loggedIn, setLoggedIn, facade }) {
  const login = (user, pass) => {
    let error = "";
    facade.login(user, pass)
      .then((res) => setLoggedIn(true));
    return error;
  };

  return (
    <div>
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <Home setLoggedIn={setLoggedIn} />
        </div>
      )}
    </div>
  );
}

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [msg, setMsg] = useState("");
  const [loginCredentials, setLoginCredentials] = useState(init);
  const performLogin = (evt) => {
    evt.preventDefault();
    setMsg(login(loginCredentials.username, loginCredentials.password));
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div>
          <Container className="LoginBackground">
            <div className="centerFrom">
              <h2>Login</h2>
              <form onChange={onChange}>
                <input
                  className="input1"
                  placeholder="User Name"
                  id="username"
                />
                {<br></br>}
                <input
                type={"password"}
                  className="input2"
                  placeholder="Password"
                  id="password"
                />
                {<br></br>}
                <button className="button" onClick={performLogin}>
                  Login
                </button>
              </form>
              <label id="jsonResponse">{msg}</label>
              <p>Admin login: <br></br> Username: admin <br></br> Pass: test </p> 
              <p>Or create a new user </p> 

            </div>
          </Container>
        
    </div>
  );
}

export default LogIn;
