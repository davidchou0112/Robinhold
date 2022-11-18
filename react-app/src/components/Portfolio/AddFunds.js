import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBuyingPower,addBuyingPowerThunk } from "../../store/portfolio";
import './Portfolio.css'
const AddFundsForm = ({setShowBP}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showcConfirmation, setShowConfirmation] = useState(false);
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const currentUser = useSelector((state) => state?.session?.user);
  const [errors, setErrors] = useState([]);
  useEffect(()=> {
    dispatch(getBuyingPower(currentUser.id))
  },[dispatch])
  const buyingPower = useSelector(state=>Number(state?.portfolio?.user?.buying_power))

  const handleSubmitAF = async (e) => {
    e.preventDefault();
    let ErrorArr = []
    setErrors([]);
    if (Number(amount) <= 0) {
      ErrorArr.push("Amount must be greater than 0");
      setSubmitted(true);
      setErrors(ErrorArr)
    } else {
      setSubmitted(true);
      setShowBP(false)
      const finalAmount = buyingPower + Number(amount);
      const payload = { buying_power: finalAmount };
      await dispatch(addBuyingPowerThunk(payload, currentUser.id));
      // history.push('/')
      window.alert(
        `$${amount} will be deducted from your bank account within the next several days. It may take up to 5 business days to transfer.`
      );
      // window.location.reload();
    }
  };

  return (
    <div className="add-funds-container">
      <form className="addFund-form" onSubmit={handleSubmitAF}>
      <div className="errorList">
        {submitted && errors?.map((error) => <div key={error}>{error}</div>)}
      </div>
        <label>From</label>
        <input type="text" value="Rothschild's Family Trust" disabled />
        <label> Amount</label>
        <input
          type="number"
          placeholder="$0.00"
          id="add-amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit" className="Deposit-fund-button">
          Deposit Fund
        </button>
      </form>
    </div>
  );
};

export default AddFundsForm;
