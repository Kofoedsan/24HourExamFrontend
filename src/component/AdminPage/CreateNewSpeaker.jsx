import { Container } from "react-bootstrap";
import React, { useState } from "react";
import facade from "../apiFacade";
import url from "../URL";


const CreateNewSpeaker = () => {
    const [res, setRes] = useState();

    const [talk, settalk] = useState({
        dto_name: "",
        dto_proffession: "",
        dto_gender: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = facade.makeOptions("POST", true, talk);
        const res = await fetch(url + "/api/admin/createspeaker/", post)
        facade.myFetchErrors(res, setRes)

    };

    const handleChange = (event) => {
        const target = event.target;
        const id = target.id;
        const value = target.value;
        settalk({ ...talk, [id]: value });
    };


    return (
        <Container className="LoginBackground">
            <div style={{ marginTop: 100 }}>
                <h3>Enter speaker info</h3>
                <form onSubmit={handleSubmit}>
                    <label className="formLabel" for="dto_gender">
                        Male
                    </label>
                    <input
                        type="radio"
                        required
                        onChange={handleChange}
                        value="Male"
                        name="gender"
                        id="dto_gender"
                    />
                    <label className="formLabel" for="dto_gender">
                        Female
                    </label>
                    <input
                        type="radio"
                        required
                        onChange={handleChange}
                        value="Female"
                        name="gender"
                        id="dto_gender"
                    />
                    <label className="formLabel" for="dto_gender">
                        Other
                    </label>
                    <input
                        type="radio"
                        required
                        onChange={handleChange}
                        value="Other"
                        name="gender"
                        id="dto_gender"
                    />
                    {<br></br>}
                    {<br></br>}
                    <input
                        type="text"
                        required
                        onChange={handleChange}
                        className="input1"
                        placeholder="Name"
                        id="dto_name"
                    />
                    {<br></br>}
                    <input
                        type="text"
                        required
                        onChange={handleChange}
                        className="input1"
                        placeholder="Proffession"
                        id="dto_proffession"
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

export default CreateNewSpeaker;