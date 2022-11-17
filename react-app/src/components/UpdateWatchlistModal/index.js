import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import "../../context/Modal.css"
import UpdateWatchlistForm from "./updateWatchlistForm";


function UpdateWatchlistModal({watchlistId}){
    const [ showModal, setShowModal ] = useState(false)

    return (
        <>
            <button className="update-delete-button" onClick={()=> setShowModal(true)}>Update</button>
            {showModal && (
                <Modal onClose={()=>setShowModal(false)}>
                    < UpdateWatchlistForm
                    watchlistId={watchlistId}
                    setShowModal={setShowModal}
                    />
                </Modal>
            )}
        </>
    )
}

export default UpdateWatchlistModal
