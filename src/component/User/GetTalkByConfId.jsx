import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import url from "../URL";
import { Table } from "react-bootstrap";
import Modal from 'react-modal';


const GetTalkByConfId = ({editId, setviewTalk}) => {
    const [modalIsOpen, setIsOpen] = useState(true);
    Modal.setAppElement('#root');

    const [Talk, setTalk] = useState([
        {
            dto_id: "",
            dto_topic: "",
            dto_duration: "",
        },
    ]);

    const getAll = async () => {
        const op = facade.makeOptions("GET", true,);
        const res = await fetch(url + "/api/user/getTalkByConferenceId/"+editId, op);
        const data = await res.json();
        setTalk(...[data, Talk]);
    };

    useEffect(() => {
        getAll();
    }, []);

    const closeModal = () => {
        setviewTalk(false)
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    let counter = 0;
    return (
        <div>
            <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Edit owner"
                >
                <h2>All Talks for conference with id: {editId}</h2>
            <Table bordered responsive variant="dark">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>ID</th>
                        <th style={{ textAlign: "center" }}>Topic</th>
                        <th style={{ textAlign: "center" }}>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {Talk.map((item) => (
                        <tr key={counter++}>
                            <td>{<strong>{item.dto_id}</strong>}</td>
                            <td>{<strong>{item.dto_topic}</strong>}</td>
                            <td>{<strong>{item.dto_duration}</strong>}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Modal>
        </div>
    );
};

export default GetTalkByConfId;