import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import url from "../URL";
import { Table } from "react-bootstrap";
import UpdateConferenceEditor from "./UpdateConferenceEditor";

const GetAllConferences = () => {

    const [editConf, seteditConf] = useState(false)
    const [editId, seteditId] = useState()


    const [Conferences, setConferences] = useState([
        {
            dto_id: "",
            dto_location: "",
            dto_capacity: "",
            dto_date: "",
            dto_time: "",
        },
    ]);

    const getAll = async () => {
        const op = facade.makeOptions("GET", true,);
        const res = await fetch(url + "/api/user/getAllConferences", op);
        const data = await res.json();
        setConferences(...[data, Conferences]);
    };

    useEffect(() => {
        getAll();
    }, [editConf]);


    const editConference = async (id) => {
        seteditId(id)
        seteditConf(true)
    }


    let counter = 0;
    return (
        <div>
            {editConf === true && <UpdateConferenceEditor editId={editId} seteditConf={seteditConf} Conferences={Conferences} />}
            <Table bordered responsive variant="dark">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>Talks</th>
                        <th style={{ textAlign: "center" }}>ID</th>
                        <th style={{ textAlign: "center" }}>Location</th>
                        <th style={{ textAlign: "center" }}>Capacity</th>
                        <th style={{ textAlign: "center" }}>Date</th>
                        <th style={{ textAlign: "center" }}>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {Conferences.map((item) => (
                        <tr key={counter++}>
                            <td>
                                <button onClick={() => editConference(item.dto_id)}>
                                    Edit Conference </button>
                            </td>
                            <td>{<strong>{item.dto_id}</strong>}</td>
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

export default GetAllConferences;