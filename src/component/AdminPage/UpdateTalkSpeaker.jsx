import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import url from "../URL";
import { Table } from "react-bootstrap";
import UpdateTalk from "./UpdateTalk";
import ViewProps from "./ViewProps";
import AddConferenceToTalk from "./AddConferenceToTalk";


const GetAllSpeakers = () => {

    const [updateSpeak, setupdateSpeak] = useState(false)
    const [editId, seteditId] = useState()
    const [viewPropsStatus, setviewPropsStatus] = useState(false)
    const [addconference, setaddconference] = useState(false)


    const [talks, settalks] = useState([
        {
            dto_id: "",
            dto_topic: "",
            dto_duration: "",
            dto_location: "",
            dto_capacity: "",
            dto_date: "",
            dto_time: ""
        },
    ]);

    const getAll = async () => {
        const op = facade.makeOptions("GET", true,);
        const res = await fetch(url + "/api/user/getAllTalks", op);
        const data = await res.json();
        settalks(...[data, talks]);
    };

    useEffect(() => {
        getAll();
    }, [updateSpeak,viewPropsStatus,addconference]);


    const GetTalkBySpeakerId = async (id) => {
        seteditId(id)
        setupdateSpeak(true)
    }

    const viewProps = async (id) => {
        seteditId(id)
        setviewPropsStatus(true)
    }

    const addConference = async (id) => {
        seteditId(id)
        setaddconference(true)
    }

    let counter = 0;
    return (
        <div>
            {updateSpeak === true && <UpdateTalk editId={editId} setupdateSpeak={setupdateSpeak} />}
            {viewPropsStatus === true && <ViewProps editId={editId} setviewPropsStatus={setviewPropsStatus} />}
            {addconference === true && <AddConferenceToTalk editId={editId} setaddconference={setaddconference} />}

            <h1>Here you view & change talks..</h1>
            <Table bordered responsive variant="dark">
            <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>Update talk</th>
                        <th style={{ textAlign: "center" }}>Update props</th>
                        <th style={{ textAlign: "center" }}>Add conference</th>
                        <th style={{ textAlign: "center" }}>Id</th>
                        <th style={{ textAlign: "center" }}>Topic</th>
                        <th style={{ textAlign: "center" }}>Duration</th>
                        <th style={{ textAlign: "center" }}>Location</th>
                        <th style={{ textAlign: "center" }}>Capacity</th>
                        <th style={{ textAlign: "center" }}>Date</th>
                        <th style={{ textAlign: "center" }}>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {talks.map((item) => (
                        <tr key={counter++}>
                             <td>
                                <button onClick={() => GetTalkBySpeakerId(item.dto_id)}>
                                    Chooce speaker </button>
                            </td>
                            <td>
                                <button onClick={() => viewProps(item.dto_id)}>
                                    Update props </button>
                            </td>
                            <td>
                                <button onClick={() => addConference(item.dto_id)}>
                                    Add conference </button>
                            </td>
                            <td>{<strong>{item.dto_id}</strong>}</td>
                            <td>{<strong>{item.dto_topic}</strong>}</td>
                            <td>{<strong>{item.dto_duration}</strong>}</td>
                            <td>{<strong>{item.dto_location}</strong>}</td>
                            <td>{<strong>{item.dto_capacity}</strong>}</td>
                            <td>{<strong>{item.dto_date}</strong>}</td>
                            <td>{<strong>{item.dto_time}</strong>}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default GetAllSpeakers;