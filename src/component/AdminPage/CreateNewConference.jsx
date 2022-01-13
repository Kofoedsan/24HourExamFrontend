import { Container } from "react-bootstrap";
import React, { useState } from "react";
import facade from "../apiFacade";
import url from "../URL";


const CreateNewConference = () => {
    const [res, setRes] = useState();

    const [conference, setConference] = useState({
        dto_location: "",
        dto_capacity: "",
        dto_date: "",
        dto_time: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = facade.makeOptions("POST", true, conference);
        const res = await fetch(url + "/api/admin/createconference/", post)
        facade.myFetchErrors(res, setRes)

    };

    const handleChange = (event) => {
        const target = event.target;
        const id = target.id;
        const value = target.value;
        setConference({ ...conference, [id]: value });
    };

    return (
        <Container className="LoginBackground">
            <div style={{ marginTop: 100 }}>
                <h3>Enter conference info</h3>
                <form onSubmit={handleSubmit}>
                    {<br></br>}
                    <input
                        type="text"
                        required
                        onChange={handleChange}
                        className="input1"
                        placeholder="Location"
                        id="dto_location"
                    />
                    {<br></br>}
                    <input
                        type="number"
                        required
                        onChange={handleChange}
                        className="input1"
                        placeholder="Conference Capacity"
                        id="dto_capacity"
                    />
                    {<br></br>}
                    <input
                        type="date"
                        required
                        onChange={handleChange}
                        className="input1"
                        placeholder="Conference date"
                        id="dto_date"
                    />
                    {<br></br>}

                    <input
                        type="time"
                        required
                        onChange={handleChange}
                        className="input1"
                        placeholder="Conference time"
                        id="dto_time"
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
                <h1>{res}</h1>
            </div>
        </Container>
    );
};

export default CreateNewConference;