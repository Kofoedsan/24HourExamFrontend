import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import url from "../URL";
import { Table } from "react-bootstrap";
import GetSpeakerById from "./GetSpeakerById";

const GetAllSpeakers = () => {

    const [viewTalk, setviewTalk] = useState(false)
    const [editId, seteditId] = useState()


    const [speaker, setSpeaker] = useState([
        {
            dto_id: "",
            dto_name: "",
            dto_proffession: "",
            dto_gender: "",
        },
    ]);

    const getAll = async () => {
        const op = facade.makeOptions("GET", true,);
        const res = await fetch(url + "/api/user/GetAllSpeakers", op);
        const data = await res.json();
        setSpeaker(...[data, speaker]);
    };

    useEffect(() => {
        getAll();
    }, [viewTalk]);


    const GetTalkBySpeakerId = async (id) => {
        seteditId(id)
        setviewTalk(true)
    }


    let counter = 0;
    return (
        <div>
            {viewTalk === true && <GetSpeakerById editId={editId} setviewTalk={setviewTalk} />}
            <Table bordered responsive variant="dark">
            <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>View Talks</th>
                        <th style={{ textAlign: "center" }}>ID</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Proffesion</th>
                        <th style={{ textAlign: "center" }}>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {speaker.map((item) => (
                        <tr key={counter++}>
                             <td>
                                <button onClick={() => GetTalkBySpeakerId(item.dto_id)}>
                                    View Talks </button>
                            </td>
                            <td>{<strong>{item.dto_id}</strong>}</td>
                            <td>{<strong>{item.dto_name}</strong>}</td>
                            <td>{<strong>{item.dto_proffession}</strong>}</td>
                            <td>{<strong>{item.dto_gender}</strong>}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default GetAllSpeakers;