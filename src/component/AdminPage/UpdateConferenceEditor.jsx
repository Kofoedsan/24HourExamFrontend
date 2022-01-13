import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import url from "../URL";
import Modal from 'react-modal';

const UpdateConferenceEditor = ({ editId, seteditConf, Conferences }) => {
    const [res, setRes] = useState();
    const [modalIsOpen, setIsOpen] = useState(true);

    const [newConf, setnewConf] = useState({});

    const confedit = Conferences.find((Conferences)=>Conferences.dto_id === editId)

    Modal.setAppElement('#root');

    useEffect(() => {
        setnewConf(confedit)
    }, []);


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

    const closeModal = () => {
        seteditConf(false)
        setIsOpen(false);
    }

    const handleChange = (event) => {
        const target = event.target;
        const id = target.id;
        const value = target.value;
        setnewConf({ ...newConf, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = facade.makeOptions("PUT", true, newConf);
        const res = await fetch(url + "/api/admin/updateConference/" + editId, post);
        facade.myFetchErrors(res, setRes)
    };

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Edit owner"
            >
                <div>Edit conference with the id: {editId}</div>

                <input
                    type="text"
                    required
                    onChange={handleChange}
                    className="input1"
                    placeholder="Location"
                    defaultValue={confedit.dto_location}
                    id="dto_location"
                />
                {<br></br>}
                <input
                    type="number"
                    required
                    onChange={handleChange}
                    className="input1"
                    placeholder="Capacity"
                    defaultValue={confedit.dto_capacity}
                    id="dto_capacity"
                />
                {<br></br>}
                <input
                    type="date"
                    required
                    onChange={handleChange}
                    className="input1"
                    placeholder="Date"
                    defaultValue={confedit.dto_date}
                    id="dto_date"
                />
                {<br></br>}
                <input
                    type="time"
                    required
                    onChange={handleChange}
                    className="input1"
                    placeholder="Time"
                    defaultValue={confedit.dto_time}
                    id="dto_time"
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
export default UpdateConferenceEditor;