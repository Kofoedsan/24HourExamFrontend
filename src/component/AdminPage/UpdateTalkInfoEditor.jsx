import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import url from "../URL";
import Modal from 'react-modal';

const UpdateTalkInfoEditor = ({ editId, setupdateTalk, talks }) => {
    const [res, setRes] = useState();
    const [modalIsOpen, setIsOpen] = useState(true);

    const [newTalk, setnewTalk] = useState({});

    const confedit = talks.find((talks) => talks.dto_id === editId)

    Modal.setAppElement('#root');

    useEffect(() => {
        setnewTalk(confedit)
    }, []);


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -30%)',
        },
    };

    const closeModal = () => {
        setupdateTalk(false)
        setIsOpen(false);
    }

    const handleChange = (event) => {
        const target = event.target;
        const id = target.id;
        const value = target.value;
        setnewTalk({ ...newTalk, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = facade.makeOptions("PUT", true, newTalk);
        const res = await fetch(url + "/api/admin/updateTalk/" + editId, post);
        facade.myFetchErrors(res, setRes)
    };

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Edit talk"
            >
                <div>Edit talk with the id: {editId}</div>
                <input
                    type="text"
                    required
                    onChange={handleChange}
                    className="input1"
                    placeholder="Topic"
                    defaultValue={confedit.dto_topic}
                    id="dto_topic"
                />
                {<br></br>}
                <input
                    type="text"
                    required
                    onChange={handleChange}
                    className="input1"
                    placeholder="Duration"
                    defaultValue={confedit.dto_duration}
                    id="dto_duration"
                />

                {<br></br>}
                <button onClick={handleSubmit}>Submit</button>
                {<br></br>}
                <button onClick={closeModal}>Close</button>
                <h1>{res}</h1>
            </Modal>

        </div>
    );

}
export default UpdateTalkInfoEditor;