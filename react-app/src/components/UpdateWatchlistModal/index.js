import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import "../../context/Modal.css"
import UpdateWatchlistForm from "./updateWatchlistForm";


function UpdateWatchlistModal(){
    const [ showModal, setShowModal ] = useState(false)

    return (
        <>
            <button onClick={()=> setShowModal(true)}>Update</button>
            {showModal && (
                <Modal onClose={()=>setShowModal(false)}>
                    < UpdateWatchlistForm/>
                </Modal>
            )}
        </>
    )
}

export default UpdateWatchlistModal
