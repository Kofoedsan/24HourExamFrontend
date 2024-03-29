import { Container } from "react-bootstrap";
import React, { useState } from "react";
import "../styles/loginstyle.css";
import facade from "./apiFacade";
import url from "./URL";
import { useNavigate } from "react-router-dom";

const UserData = ({ setLoggedIn }) => {
  const [userdata, setUserdata] = useState({
    dto_userName: "",
    dto_userPass: "",
    dto_name: "",
    dto_email: "",
    dto_phone: "",
  });

  var loading = <p className="signUpBlinker">Please wait</p>;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));


  let respond = "";
  const [res, setRes] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userdata.dto_userPass != userdata.repeatPW) {
      setRes("Passwords does not match");
    } else if (userdata.dto_phone.length != 8) {
      setRes("Invalid phone number. Must be 8 digits");
    } else {
      const op = facade.makeOptions("POST", false, userdata);
      await fetch(url + "/api/user", op)
      .then(async (response) => {
        if(response.status===200) {
          setRes(loading);
          await delay(5000);
          await facade.login(userdata.dto_userName, userdata.dto_userPass);
          setLoggedIn(true);
          navigate("/24H/");
        } else {
          respond = await response.json();
          setRes(respond.message);

        }})
  };
}

  const handleChange = (event) => {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    setUserdata({ ...userdata, [id]: value });
  };

  return (
    <Container className="LoginBackground">
      <div style={{ marginTop: 100 }}>
        <h3>Enter your information</h3>
        <form onSubmit={handleSubmit}>
          {<br></br>}
          <input
            type="text"
            required
            onChange={handleChange}
            className="input1"
            placeholder="User name"
            id="dto_userName"
          />
          {<br></br>}
          <input
            type="text"
            required
            onChange={handleChange}
            className="input1"
            placeholder="Your name"
            id="dto_name"
          />
          {<br></br>}
          <input
            type="number"
            required
            onChange={handleChange}
            className="input1"
            placeholder="Phone"
            id="dto_phone"
          />
          {<br></br>}
          <input
            type="text"
            required
            onChange={handleChange}
            className="input1"
            placeholder="Email"
            id="dto_email"
          />
          {<br></br>}
          <input
            type="password"
            required
            onChange={handleChange}
            className="input1"
            placeholder="Password"
            id="dto_userPass"
          />
          {<br></br>}
          <input
            type="password"
            required
            onChange={handleChange}
            className="input1"
            placeholder="Repeat Password"
            id="repeatPW"
          />
          {<br></br>}
          <button
            required
            style={{ backgroundColor: "dodgerblue", color: "white" }}
            type="Submit"
          >
            Submit
          </button>
          <button
            style={{
              marginLeft: 20,
              backgroundColor: "crimson",
              color: "white",
            }}
          >
            Cancel
          </button>
        </form>
        <h1>
          <label id="resp">{res}</label>
        </h1>
      </div>
    </Container>
  );
};

export default UserData;
