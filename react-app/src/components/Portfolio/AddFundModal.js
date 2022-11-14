import { Modal } from "../../context/Modal";
import React, { useState } from "react";
import AddFunds from "./AddFunds";

const AddFundsModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="width-full">
        <button className="deposit-button" onClick={()=>setShowModal(true)}>
            Deposit Funds
            </button>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>

        <AddFunds
        onCreation={() => setShowModal(false)}
        setShowModal={setShowModal}
        />

      </Modal>
      )}
    </>
  );
};


export default AddFundsModal
