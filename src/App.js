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
            <NavLink to="/24H/">Home</NavLink>
          </li>
          {facade.loginCheck(loggedIn) && (
            <li>
              <NavLink to="/24H/Login">Sign-in</NavLink>
            </li>
          )}
          {facade.loginCheck(loggedIn) && (
            <li>
              <NavLink to="/24H/signup">Sign-up</NavLink>
            </li>
          )}
          {facade.loginCheck(!loggedIn) && (
            <li>
              <NavLink to="/24H/logout">Logout</NavLink>
            </li>
          )}
          {facade.loginCheck(!loggedIn) && (
            <li>
              <NavLink to="/24H/deleteUser">Delete user</NavLink>
            </li>
          )}
          {facade.hasUserAccess("user", loggedIn) && (
            <li>
              <NavLink to="/24H/getAllConferences">View all Conferences</NavLink>
            </li>
          )}
          {facade.hasUserAccess("user", loggedIn) && (
            <li>
              <NavLink to="/24H/getSpeakerById">View talks by speaker</NavLink>
            </li>
          )}
           {facade.hasUserAccess("admin", loggedIn) && (
            <li>
              <NavLink to="/24H/createnewconference">Create New Conference</NavLink>
            </li>
          )}
          {facade.hasUserAccess("admin", loggedIn) && (
            <li>
              <NavLink to="/24H/createnewspeaker">Create New Speaker</NavLink>
            </li>
          )}
          {facade.hasUserAccess("admin", loggedIn) && (
            <li>
              <NavLink to="/24H/createnewtalk">Create New Talk</NavLink>
            </li>
          )} 
           {facade.hasUserAccess("admin", loggedIn) && (
            <li>
              <NavLink to="/24H/UpdateTalkSpeaker">Update Talk</NavLink>
            </li>
          )}
           {facade.hasUserAccess("admin", loggedIn) && (
            <li>
              <NavLink to="/24H/getalltalks">Delete talk</NavLink>
            </li>
          )}
            {facade.hasUserAccess("admin", loggedIn) && (
            <li>
              <NavLink to="/24H/UpdateConferenceViewer">Edit Conference</NavLink>
            </li>
          )}
          {facade.hasUserAccess("admin", loggedIn) && (
            <li>
              <NavLink to="/24H/UpdatedSpeakerViewer">Edit Speakers</NavLink>
            </li>
          )}
           {facade.hasUserAccess("admin", loggedIn) && (
            <li>
              <NavLink to="/24H/UpdateTalkInfoViewer">Edit Talkers</NavLink>
            </li>
          )}
          <li>
            <h2 className="customhead">Welcome to Dat3 Exam</h2>
          </li>
        </ul>
        <br />
        <div className="content">
          <Routes>

            <Route path="/24H/" element={<Home setLoggedIn={setLoggedIn} />} />
            <Route path="/24H/Unauthorized" element={<Unauthorized setLoggedIn={setLoggedIn} />} />
            <Route path="*" element={<NotFound />} />

            <Route
              className="LoginBackground"
              path="/24H/login"
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
              path="/24H/logout"
              element={<Logout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
            />

            <Route
              path="/24H/signup"
              element={
                <Signup
                  facade={facade}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                />
              }
            />

            <Route
              path="/24H/deleteUser"
              element={
                <DeleteUser
                  facade={facade}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                />
              }
            />

            <Route path="/24H/getAllConferences" element={<GetAllConferences />} />

            <Route path="/24H/getSpeakerById" element={<GetAllSpeakers />} />

            <Route path="/24H/createnewconference" element={<CreateNewConference />} />

            <Route path="/24H/createnewtalk" element={<CreateNewTalk />} />

            <Route path="/24H/createnewspeaker" element={<CreateNewSpeaker />} />

            <Route path="/24H/UpdateTalkSpeaker" element={<UpdateTalkSpeaker />} />

            <Route path="/24H/getalltalks" element={<DeleteTalk />} />

            <Route path="/24H/UpdateConferenceViewer" element={<UpdateConferenceViewer />} />

            <Route path="/24H/UpdatedSpeakerViewer" element={<UpdatedSpeakerViewer />} />

            <Route path="/24H/UpdateTalkInfoViewer" element={<UpdateTalkInfoViewer />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}
