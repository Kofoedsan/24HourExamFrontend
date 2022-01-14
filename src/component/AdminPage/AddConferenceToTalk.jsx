import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import url from "../URL";
import Modal from 'react-modal';

const AddConferenceToTalk = ({ editId, setaddconference }) => {
    const [res, setRes] = useState();
    const [modalIsOpen, setIsOpen] = useState(true);


    const [speakerId, setSpeakerId] = useState();

    Modal.setAppElement('#root');

    useEffect(() => {
        getAll()
    }, []);

    const [conference, setconference] = useState([
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
        data.unshift(0)
        setconference(...[data, conference]);
    };

    let conferenceList = conference.length > 0
    && conference.map((item, i) => {
        return (
            <option defaultValue={conference} 
                key={i} value={item.dto_id}> Location: {item.dto_location} Capacity: {item.dto_capacity} Date: {item.dto_date} Time: {item.dto_time}</option>
        )
    });

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
        setaddconference(false)
        setIsOpen(false);
    }


    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        setSpeakerId(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(speakerId);
        const post = facade.makeOptions("PUT", true, speakerId);
        const res = await fetch(url + "/api/admin/addConferenceToTalk/" + editId, post);
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
                <div>Update talk with the id: {editId}</div>

                <select onChange={handleChange}>
                    {conferenceList}
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
export default AddConferenceToTalk;