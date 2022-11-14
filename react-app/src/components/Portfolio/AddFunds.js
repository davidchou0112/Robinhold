import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddFunds = ({setShowModal}) => {
    const history = useHistory();
    const dispatch = useDispatch();


    const [submitted, setSubmitted] = useState(false);


    // const handleSubmitAF = async (e) => {

    // }

    return (
        <div className='funds-modal hidden'>
        <div className='close-modal' onClick={this.clickClose}>&times;</div>
        <div className='add-funds-form-div'>
          <form onSubmit={this.handleSubmit} className='deposit-form'>
            <p>Deposit Funds</p>
            <label>From</label>
              <input type="text" value='A BANK' disabled/>
            <label htmlFor='add-amount'> Amount</label>
              <input type="text" value={this.state.amount} placeholder='$0.00' onChange={this.handleChange} id='add-amount' required/>
            <button className='review-button'>Confirm</button>
          </form>
        </div>
      </div>
    )

}

export default AddFunds
