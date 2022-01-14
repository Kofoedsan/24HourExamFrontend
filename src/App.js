import "./styles/style2.css";
import "./styles/customHead.css";
import "./styles/logincss.css";
import Home from "./component/Home";
import React from "react";
import { LoginUI } from "./component/LogIn";
import { Logout } from "./component/Logout";
import Signup from "./component/Signup";
import facade from "./component/apiFacade";
import { useState, useEffect } from "react";
import DeleteUser from "./component/DeleteUser";
import Unauthorized from "./component/Unauthorized";
import NotFound from "./component/NotFound";
import GetAllConferences from "./component/User/GetAllConferences";
import GetAllSpeakers from "./component/User/GetAllSpeakers";
import CreateNewConference from "./component/AdminPage/CreateNewConference";
import CreateNewTalk from "./component/AdminPage/CreateNewTalk";
import CreateNewSpeaker from "./component/AdminPage/CreateNewSpeaker";
import UpdateTalkSpeaker from "./component/AdminPage/UpdateTalkSpeaker";
import DeleteTalk from "./component/AdminPage/DeleteTalk";
import UpdateConferenceViewer from "./component/AdminPage/UpdateConferenceViewer";
import UpdatedSpeakerViewer from "./component/AdminPage/UpdatedSpeakerViewer";
import UpdateTalkInfoViewer from "./component/AdminPage/UpdateTalkInfoViewer";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";


export default function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    facade.tokenValid(setLoggedIn)
  }, []);


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
          {facade.hasUserAccess("user", loggedIn) && (
            <li>
              <NavLink to="/getAllConferences">View all Conferences</NavLink>
            </li>
          )}
          {facade.hasUserAccess("user", loggedIn) && (
            <li>
              <NavLink to="/getSpeakerById">View talks by speaker</NavLink>
            </li>
          )}
           {facade.hasUserAccess("admin", loggedIn) && (
            <li>
              <NavLink to="/createnewconference">Create New Conference</NavLink>
            </li>
          )}
          {facade.hasUserAccess("admin", loggedIn) && (
            <li>
              <NavLink to="/createnewspeaker">Create New Speaker</NavLink>
            </li>
          )}
          {facade.hasUserAccess("admin", loggedIn) && (
            <li>
              <NavLink to="/createnewtalk">Create New Talk</NavLink>
            </li>
          )} 
           {facade.hasUserAccess("admin", loggedIn) && (
            <li>
              <NavLink to="/UpdateTalkSpeaker">Update Talk</NavLink>
            </li>
          )}
           {facade.hasUserAccess("admin", loggedIn) && (
            <li>
              <NavLink to="/getalltalks">Delete talk</NavLink>
            </li>
          )}
            {facade.hasUserAccess("admin", loggedIn) && (
            <li>
              <NavLink to="/UpdateConferenceViewer">Edit Conference</NavLink>
            </li>
          )}
          {facade.hasUserAccess("admin", loggedIn) && (
            <li>
              <NavLink to="/UpdatedSpeakerViewer">Edit Speakers</NavLink>
            </li>
          )}
           {facade.hasUserAccess("admin", loggedIn) && (
            <li>
              <NavLink to="/UpdateTalkInfoViewer">Edit Talkers</NavLink>
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

            <Route path="/getAllConferences" element={<GetAllConferences />} />

            <Route path="/getSpeakerById" element={<GetAllSpeakers />} />

            <Route path="/createnewconference" element={<CreateNewConference />} />

            <Route path="/createnewtalk" element={<CreateNewTalk />} />

            <Route path="/createnewspeaker" element={<CreateNewSpeaker />} />

            <Route path="/UpdateTalkSpeaker" element={<UpdateTalkSpeaker />} />

            <Route path="/getalltalks" element={<DeleteTalk />} />

            <Route path="/UpdateConferenceViewer" element={<UpdateConferenceViewer />} />

            <Route path="/UpdatedSpeakerViewer" element={<UpdatedSpeakerViewer />} />

            <Route path="/UpdateTalkInfoViewer" element={<UpdateTalkInfoViewer />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}
