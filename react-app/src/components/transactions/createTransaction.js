import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleStock } from '../../store/stocks';
import { useParams } from 'react-router-dom';
import '../Stock/singleStock.css'
import { createTransaction } from "../../store/transactions";
import { addBuyingPowerThunk } from "../../store/portfolio";
import { fetchUserTransactions } from '../../store/transactions'


const TransactionContainer = () => {
  const dispatch = useDispatch();
  const { stockId } = useParams();
  const [errors, setErrors] = useState([]);
  const [displayBuy, setDisplayBuy] = useState(true)
  const [displaySell, setDisplaySell] = useState(true)
  const [transactionType, setTransactionType] = useState('buy')
  const singleStock = useSelector(state => state.stocks.singleStock)
  const userId = useSelector(state=> state.session.user.id)
  let buyingPower = useSelector(state=>Number(state.session.user.buying_power))
  const stockSymbol = singleStock.symbol
  const stockPrice = singleStock.price
  const [amount, setAmount] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isPurchased, setIsPurchased] = useState(true)
  const userTransactions = useSelector(state =>Object.values(state.transaction.transactions))

  useEffect(() => {
    dispatch(getSingleStock(stockId))
    dispatch(fetchUserTransactions(userId))
}, [dispatch, stockId])

  const handleTransaction = (e) => {
    let ErrorArr = []
    e.preventDefault();
    setIsSubmitted(true)
    let totalPrice = amount * stockPrice


    if(transactionType === 'buy') {

        if(amount <= 0){
            ErrorArr.push('must be greater than 0')
            setErrors(ErrorArr)
        }
        else if(buyingPower < totalPrice) {
            ErrorArr.push('Not enough funds')
            setErrors(ErrorArr)
        }
        else {
            buyingPower -= totalPrice
            const newBuyingPower = {buying_power: buyingPower}
            const newTransaction = {
                user_id: Number(userId),
                stock_symbol:stockSymbol,
                quantity: Number(amount),
                is_purchased: isPurchased,
                price: Number(stockPrice)
        }
        dispatch(createTransaction(newTransaction, Number(userId)))
        dispatch(addBuyingPowerThunk(newBuyingPower, userId))
    }
    } else {
        setIsPurchased(false)
        let matchingStock = userTransactions.filter((ele)=>ele.stock_symbol === stockSymbol)
        if(matchingStock){
            matchingStock = matchingStock.filter((ele)=>ele.is_purchased === true)
            let matchingStockVal=0
            matchingStock.forEach((ele)=>{
                matchingStockVal += ele.price * ele.quantity
            })
            if(matchingStockVal < totalPrice) {
                ErrorArr.push('Not enough asset for this transaction')
                setErrors(ErrorArr)
            } else {
        buyingPower += totalPrice

        const newBuyingPower = {buying_power: buyingPower}
        const newTransaction = {
        user_id: Number(userId),
        stock_symbol:stockSymbol,
        quantity: Number(amount),
        is_purchased: isPurchased,
        price: Number(stockPrice)
        }
        dispatch(createTransaction(newTransaction, Number(userId)))
        dispatch(addBuyingPowerThunk(newBuyingPower, userId))

            }
        }
    }
  }





  return (
    <>
      <div>
      <div className="errorList">
          {
          isSubmitted &&
          errors?.map((error)=>(<div key={error}>{error}</div>))
          }
        </div>
        <div>
          <div>
            {displayBuy &&
            <div className={`trsc-type ${transactionType === 'buy' ? 'active-trsc-type' : ''}`}
                 onClick={()=>setTransactionType('buy')}
            >
                Buy
            </div>
            }

            {displaySell &&
            <div className={`trsc-type ${transactionType === 'sell' ? 'active-trsc-type' : ''}`}
                 onClick={()=>setTransactionType('sell')}
            >
                Sell
            </div>
            }
          </div>
          <form onSubmit={handleTransaction}>
            <div>
              <div>buy or sell</div>

              {/* <select>
                <option>USD</option>
                <option>Shares</option>
              </select> */}
            </div>

            <div>

              <input
                type='number'
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
              />
              <div>Shares</div>
            </div>

            <div>
              <div>Est. Price {stockPrice * amount} </div>

              <div>current buying power {buyingPower}</div>
            </div>

            <div>
              <div></div>

              <div></div>
            </div>

            {/* <button>Review Order</button> */}

            <button id="submit-buy-order" >
              Submit
            </button>

            {/* <button id="cancel-order" >
              Back
            </button> */}
          </form>

          <div> available</div>
        </div>
      </div>
    </>
  );
};

export default TransactionContainer;
