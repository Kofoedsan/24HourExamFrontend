import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import url from "../URL";
import { Table } from "react-bootstrap";
import UpdateTalkInfoEditor from "./UpdateTalkInfoEditor";

const UpdateTalkInfoViewer = () => {

    const [updateTalk, setupdateTalk] = useState(false)
    const [editId, seteditId] = useState()

    const [talks, settalks] = useState([
        {
            dto_id: "",
            dto_topic: "",
            dto_duration: "",
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
    }, [updateTalk]);


    const UpdateTalk = async (id) => {
        seteditId(id)
        setupdateTalk(true)
    }

    let counter = 0;
    return (
        <div>
            {updateTalk === true && <UpdateTalkInfoEditor editId={editId} setupdateTalk={setupdateTalk} talks={talks} />}
            <h1>Edit talk topic & Duration.</h1>
            <Table bordered responsive variant="dark">
            <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>Update talk</th>
                        <th style={{ textAlign: "center" }}>Id</th>
                        <th style={{ textAlign: "center" }}>Topic</th>
                        <th style={{ textAlign: "center" }}>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {talks.map((item) => (
                        <tr key={counter++}>
                             <td>
                                <button onClick={() => UpdateTalk(item.dto_id)}>
                                    Update talk </button>
                            </td>
                            <td>{<strong>{item.dto_id}</strong>}</td>
                            <td>{<strong>{item.dto_topic}</strong>}</td>
                            <td>{<strong>{item.dto_duration}</strong>}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UpdateTalkInfoViewer;