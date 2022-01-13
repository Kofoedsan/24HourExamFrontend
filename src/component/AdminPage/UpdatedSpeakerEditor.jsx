import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import url from "../URL";
import Modal from 'react-modal';

const UpdatedSpeakerEditor = ({ editId, seteditSpeaker, speaker }) => {
    const [res, setRes] = useState();
    const [modalIsOpen, setIsOpen] = useState(true);

    const [newSpeaker, setnewSpeaker] = useState({});

    const confedit = speaker.find((speaker)=>speaker.dto_id === editId)

    Modal.setAppElement('#root');

    useEffect(() => {
        setnewSpeaker(confedit)
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
        seteditSpeaker(false)
        setIsOpen(false);
    }

    const handleChange = (event) => {
        const target = event.target;
        const id = target.id;
        const value = target.value;
        setnewSpeaker({ ...newSpeaker, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = facade.makeOptions("PUT", true, newSpeaker);
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
                <div>Edit speaker with the id: {editId}</div>

                <input
                    type="text"
                    required
                    onChange={handleChange}
                    className="input1"
                    placeholder="Location"
                    defaultValue={confedit.dto_name}
                    id="dto_name"
                />
                {<br></br>}
                <input
                    type="text"
                    required
                    onChange={handleChange}
                    className="input1"
                    placeholder="Capacity"
                    defaultValue={confedit.dto_proffession}
                    id="dto_proffession"
                />
                {<br></br>}
                <input
                    type="text"
                    required
                    onChange={handleChange}
                    className="input1"
                    placeholder="Date"
                    defaultValue={confedit.dto_gender}
                    id="dto_gender"
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
export default UpdatedSpeakerEditor;