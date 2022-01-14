import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import url from "../URL";
import Modal from 'react-modal';

const UpdateTalk = ({ editId, setupdateSpeak }) => {
    const [res, setRes] = useState();
    const [modalIsOpen, setIsOpen] = useState(true);


    const [speakerId, setSpeakerId] = useState();

    Modal.setAppElement('#root');

    useEffect(() => {
        getAll()
    }, []);

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
        data.unshift(0)
        setSpeaker(...[data, speaker]);
    };


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
        setupdateSpeak(false)
        setIsOpen(false);
    }


    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        setSpeakerId(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postboat = facade.makeOptions("PUT", true, speakerId);
        const res = await fetch(url + "/api/admin/updateTalkSpeaker/" + editId, postboat);
        facade.myFetchErrors(res, setRes)
    };

    let speakerList = speaker.length > 0
        && speaker.map((item, i) => {
            return (
                <option defaultValue={speaker}
                    key={i} value={item.dto_id}>Id {item.dto_id} Name {item.dto_name} Proffesion {item.dto_proffession} Gender {item.dto_gender}</option>
            )
        });


    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Edit talk"
            >
                <div>Update talk with the id: {editId}</div>

                <select onChange={handleChange}>
                    {speakerList}
                </select>

                <button onClick={handleSubmit}>Submit</button>


                {<br></br>}
                {<br></br>}
                <button onClick={closeModal}>Close</button>
                <h1>{res}</h1>
            </Modal>

        </div>
    );

}
export default UpdateTalk;