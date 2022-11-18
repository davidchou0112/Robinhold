import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleStock } from "../../store/stocks";
import { useHistory, useParams } from "react-router-dom";
import "../Stock/singleStock.css";
import { createTransaction } from "../../store/transactions";
import { addBuyingPowerThunk } from "../../store/portfolio";
import { fetchUserTransactions } from "../../store/transactions";
import { getBuyingPower } from '../../store/portfolio';

const TransactionContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { stockId } = useParams();
  const [errors, setErrors] = useState([]);
  const [inputActive, setInputActive] = useState(false)
  const [displayBuy, setDisplayBuy] = useState(true);
  const [displaySell, setDisplaySell] = useState(true);
  const [transactionType, setTransactionType] = useState("buy");
  const singleStock = useSelector((state) => state.stocks.singleStock);
  const userId = useSelector((state) => state.session.user.id);
  let buyingPower = useSelector((state) =>
    Number(state.session.user.buying_power)
  );
  const stockSymbol = singleStock.symbol;
  const stockPrice = singleStock.price;
  const [amount, setAmount] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPurchased, setIsPurchased] = useState(true);
  const userTransactions = useSelector((state) =>
    Object.values(state.transaction.transactions)
  );

  useEffect(() => {
    dispatch(getSingleStock(stockId));
    dispatch(fetchUserTransactions(userId));
    dispatch(getBuyingPower(userId))
  }, [dispatch, stockId, userId]);

  const handleTransaction = async (e) => {
    let ErrorArr = [];
    e.preventDefault();
    setIsSubmitted(true);
    let totalPrice = amount * stockPrice;

    if (transactionType === "buy") {
      if (amount <= 0) {
        ErrorArr.push("must be greater than 0");
        setErrors(ErrorArr);
      } else if (buyingPower < totalPrice) {
        ErrorArr.push("Not enough funds");
        setErrors(ErrorArr);
      } else {
        buyingPower -= totalPrice;
        const newBuyingPower = { buying_power: buyingPower };
        const newTransaction = {
          user_id: Number(userId),
          stock_symbol: stockSymbol,
          quantity: Number(amount),
          is_purchased: isPurchased,
          price: Number(stockPrice),
        };
        dispatch(createTransaction(newTransaction, Number(userId)));
        dispatch(addBuyingPowerThunk(newBuyingPower, userId));
      }
    } else {
      setIsPurchased(false);
      let matchingStock = userTransactions.filter(
        (ele) => ele.stock_symbol === stockSymbol
      );
      if (matchingStock) {
        matchingStock = matchingStock.filter(
          (ele) => ele.is_purchased === true
        );
        let matchingStockVal = 0;
        matchingStock.forEach((ele) => {
          matchingStockVal += ele.price * ele.quantity;
        });
        if (matchingStockVal < totalPrice) {
          ErrorArr.push("Not enough asset for this transaction");
          setErrors(ErrorArr);
        } else {
          buyingPower += totalPrice;

          const newBuyingPower = { buying_power: buyingPower };
          const newTransaction = {
            user_id: Number(userId),
            stock_symbol: stockSymbol,
            quantity: Number(amount),
            is_purchased: isPurchased,
            price: Number(stockPrice),
          };
          await dispatch(createTransaction(newTransaction, Number(userId)));
          await dispatch(addBuyingPowerThunk(newBuyingPower, userId))
        }
      }
    }
      window.alert('Transaction submitted')
      history.push(`/`)
  };

  return (
    <>
      <div className="trsc-wrapper">
          <div className="buy-sell-tab">
            {displayBuy && (
              <div
                className={`trsc-type ${
                  transactionType === "buy" ? "active-trsc-type" : ""
                }`}
                onClick={() => setTransactionType("buy")}
              >
                Buy
              </div>
            )}

            {displaySell && (
              <div
                className={`trsc-type ${
                  transactionType === "sell" ? "active-trsc-type" : ""
                }`}
                onClick={() => setTransactionType("sell")}
              >
                Sell
              </div>
            )}
          </div>
          <div className="form-break"></div>
        <div className="trsc-container">
          <div className="errorList">
            {isSubmitted &&
              errors?.map((error) => <div key={error}>{error}</div>)}
          </div>
          <form className="trsc-form-container" onSubmit={handleTransaction}>
            <div className="grey-background">
              <div className="grey-background">
                {transactionType === "buy" ? "buy shares" : "sell shares"}
              </div>
            </div>
          {/* <div className="form-break"></div> */}
            <div className="grey-background"
            >
              <input
                id="trsc-input"
                className="grey-background"
                type="number"
                value={amount}
                placeholder='$0.00'
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="grey-background">Shares</div>
          <div className="form-break"></div>

            <div className="grey-background">
              <div className="grey-background">Est. Price {stockPrice * amount} </div>
              {/* <div className="form-break"></div> */}

              <div className="grey-background">${buyingPower.toFixed(2)} available</div>
            </div>
            <button className="submit-order">Submit Order</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TransactionContainer;
