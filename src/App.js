import "./styles/style2.css";
import "./styles/customHead.css";
import "./styles/logincss.css";
import Home from "./component/Home";
import React from "react";
import { LoginUI } from "./component/LogIn";
import { Logout } from "./component/Logout";
import Signup from "./component/Signup";
import facade from "./component/apiFacade";
import { useState } from "react";
import DeleteUser from "./component/DeleteUser";
import Unauthorized from "./component/Unauthorized";
import NotFound from "./component/NotFound";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

export default function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  facade.tokenValid(setLoggedIn)

  return (
    <Router>
      <div className="bagGrund">
        <ul className="header">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {facade.loginCheck(loggedIn) && (
            <li>
              <NavLink to="/Login">Sign-in</NavLink>
            </li>
          )}
          {facade.loginCheck(loggedIn) && (
            <li>
              <NavLink to="/signup">Sign-up</NavLink>
            </li>
          )}
          {facade.loginCheck(!loggedIn) && (
            <li>
              <NavLink to="/logout">Logout</NavLink>
            </li>
          )}
          {facade.loginCheck(!loggedIn) && (
            <li>
              <NavLink to="/deleteUser">Delete user</NavLink>
            </li>
          )}
  
          <li>
            <h2 className="customhead">Welcome to Dat3 Exam</h2>
          </li>
        </ul>
        <br />
        <div className="content">
          <Routes>

            <Route path="/" element={<Home setLoggedIn={setLoggedIn} />} />
            <Route path="/Unauthorized" element={<Unauthorized setLoggedIn={setLoggedIn} />} />
            <Route path="*" element={<NotFound />} />
            
            <Route
              className="LoginBackground"
              path="/login"
              element={
                <LoginUI
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  facade={facade}
                />
              }
            />

            <Route
              className="LoginBackground"
              path="/logout"
              element={<Logout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
            />

            <Route
              path="/signup"
              element={
                <Signup
                  facade={facade}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                />
              }
            />

            <Route
              path="/deleteUser"
              element={
                <DeleteUser
                  facade={facade}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                />
              }
            />

          </Routes>
        </div>
      </div>
    </Router>
  );
}
