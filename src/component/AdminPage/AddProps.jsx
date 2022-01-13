import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import url from "../URL";
import Modal from 'react-modal';


const AddProps = ({ editId, setmodalStatus }) => {
    const [res, setRes] = useState();
    const [modalIsOpen, setIsOpen] = useState(true);

    Modal.setAppElement('#root');

    useEffect(() => {
    }, []);

    const [newProps, setnewProps] = useState({})

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
        setmodalStatus(false)
        setIsOpen(false);
    }


    const handleChange = (event) => {
        const target = event.target;
        const id = target.id;
        const value = target.value;
        setnewProps({ ...newProps, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postprop = facade.makeOptions("PUT", true, newProps);
        const res = await fetch(url + "/api/admin/addProp/" + editId, postprop);
        facade.myFetchErrors(res,setRes)
    };

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="View props"
            >
                <div>Add prop for talk with ID: {editId}</div>

                <input
                    type="text"
                    required
                    onChange={handleChange}
                    className="input1"
                    placeholder="Prop name"
                    id="dto_item"
                />

                <button onClick={handleSubmit}>Submit</button>
                <button onClick={closeModal}>Close</button>
                <h1>{res}</h1>
            </Modal>

        </div>
    );

}
export default AddProps;