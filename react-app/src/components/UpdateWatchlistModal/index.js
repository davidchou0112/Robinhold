import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import "../../context/Modal.css"
import UpdateWatchlistForm from "./updateWatchlistForm";


function UpdateWatchlistModal({watchlistId}){
    const [ showModal, setShowModal ] = useState(false)

    return (
        <>
            <button className="watchlist-page-icon" onClick={()=> setShowModal(true)}>
            <i class="fa-solid fa-pen"></i>
            </button>
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
