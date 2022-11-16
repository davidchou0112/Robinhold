import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBuyingPowerThunk } from "../../store/portfolio";
const AddFundsForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showcConfirmation, setShowConfirmation] = useState(false)
    const [amount, setAmount] = useState('')
    const [submitted, setSubmitted] = useState(false);
    const currentUser = useSelector(state=> state?.session?.user)
    const buyingPower = useSelector(state=>Number(state?.session?.user?.buying_power))




    const handleSubmitAF = async (e) => {
      e.preventDefault()
      setSubmitted(true)
      const finalAmount = buyingPower + Number(amount)
      const payload = {buying_power: finalAmount}
      await dispatch(addBuyingPowerThunk(payload, currentUser.id))
      // history.push('/')
      window.alert(`$${amount} will be deducted from your bank account within the next several days. It may take up to 5 business days to transfer.`)
      // window.location.reload();
    }

    return (

        <div className='add-funds-container'>
          <form  className='addFund-form' onSubmit={handleSubmitAF}>
            <label>From</label>
              <input type="text" value= "Rothschild's Family Trust" disabled/>
            <label> Amount</label>
              <input type="number"
              placeholder='$0.00'
              id='add-amount'
              value={amount}
              onChange={(e)=> setAmount(e.target.value)}
              required/>
            <button type="submit" className='Deposit-fund-button'>Deposit Fund</button>
          </form>
        </div>
    )

}

export default AddFundsForm
