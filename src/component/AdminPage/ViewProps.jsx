import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import url from "../URL";
import Modal from 'react-modal';
import { Table } from "react-bootstrap";
import AddProps from "./AddProps";




const ViewProps = ({ editId, setviewPropsStatus }) => {
    const [res, setRes] = useState();
    const [modalIsOpen, setIsOpen] = useState(true);

    const [modalStatus, setmodalStatus] = useState(false);

    Modal.setAppElement('#root');

    useEffect(() => {
        getAll()
    }, [modalStatus]);

    const [props, setProps] = useState([
        {
            dto_props_id: "",
            dto_props_item: "",
        },
    ]);

    const getAll = async () => {
        const op = facade.makeOptions("GET", true,);
        const res = await fetch(url + "/api/admin/getpropsfortalk/" + editId, op);
        const data = await res.json();
        setProps(...[data, props]);
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
        setviewPropsStatus(false)
        setIsOpen(false);
    }


    const removeprop = async (id) => {
        const postboat = facade.makeOptions("PUT", true, id);
        const res = await fetch(url + "/api/admin/removeProp/" + editId, postboat);
        facade.myFetchErrors(res, setRes)
        getAll()

    };

    const addProps = async () => {
        setmodalStatus(true)

    };

    let counter = 0;

    return (
        <div>
            {modalStatus === true && <AddProps editId={editId} setmodalStatus={setmodalStatus} />}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="View props"
            >
                <div>Props for talk with ID: {editId}</div>
                <Table bordered responsive variant="dark">
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}></th>
                            <th style={{ textAlign: "center" }}>Prop items</th>

                        </tr>
                    </thead>
                    <tbody>
                        {props.map((item) => (
                            <tr key={counter++}>
                                <td>
                                    <button onClick={() => removeprop(item.dto_props_id)}>
                                        Remove prop </button>
                                </td>
                                <td>{<strong>{item.dto_props_item}</strong>}</td>


                            </tr>
                        ))}
                    </tbody>
                </Table>
                <button onClick={() => addProps()}>
                    Add new prop </button>

                <button onClick={closeModal}>Close</button>
                <h1>{res}</h1>
            </Modal>

        </div>
    );

}
export default ViewProps;