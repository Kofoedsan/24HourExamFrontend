import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import url from "../URL";
import { Table } from "react-bootstrap";

const DeleteTalk = () => {

    const [update, setupdate] = useState()
    const [res, setRes] = useState();

    const [talks, settalks] = useState([
        {
            dto_id: "",
            dto_topic: "",
            dto_duration: "",
            dto_location: "",
            dto_capacity: "",
            dto_date: "",
            dto_time: "",
            dto_propsDTOList: [
                {
                    dto_id: "",
                    dto_item: ""
                }
            ]
        },
    ]);

    const getAll = async () => {
        const op = facade.makeOptions("GET", true,);
        const res = await fetch(url + "/api/user/getAllTalks", op);
        const data = await res.json();
        settalks(...[data, talks]);
        setupdate(false)
    };

    useEffect(() => {
        getAll();
    }, [update]);


    const handleSubmit = async (id) => {
        console.log(id);
        const post = facade.makeOptions("DELETE", true);
        const res = await fetch(url + "/api/admin/deleteTalk/" + id, post)
        facade.myFetchErrors(res, setRes)
        setupdate(true)

    };

    let counter = 0;
    return (
        <div>
            <h1>Here you can delete a talk.. </h1>
            <Table bordered responsive variant="dark">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>Delete talk</th>
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
                                <button onClick={() => handleSubmit(item.dto_id)}>
                                    Delete talk </button>
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
            <h1>{res}</h1>
        </div>
    );
};

export default DeleteTalk;