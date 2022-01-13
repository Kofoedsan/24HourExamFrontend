import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import url from "../URL";
import { Table } from "react-bootstrap";
import UpdatedSpeakerEditor from "./UpdatedSpeakerEditor";

const UpdatedSpeakerViewer = () => {

    const [editSpeaker, seteditSpeaker] = useState(false)
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
    }, [editSpeaker]);


    const editSpeakerId = async (id) => {
        seteditId(id)
        seteditSpeaker(true)
    }


    let counter = 0;
    return (
        <div>
            {editSpeaker === true && <UpdatedSpeakerEditor editId={editId} seteditSpeaker={seteditSpeaker} speaker={speaker} />}
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
                                <button onClick={() => editSpeakerId(item.dto_id)}>
                                    Update speaker </button>
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

export default UpdatedSpeakerViewer;