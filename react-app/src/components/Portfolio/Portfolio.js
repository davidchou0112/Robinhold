import './Portfolio.css'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LineGraph from './LineGraph';
import TimePeriod from './TimePeriod';
import AddFundsForm from './AddFunds';
import { fetchUserTransactions } from '../../store/transactions'
import { useTransition } from 'react';
import * as portfolioActions from '../../store/portfolio'
const popularTopics = [
  "Newly Listed Crypto",
  "New OTC securities",
  "IPO Access",
  "Crypto",
  "Altcoins",
  "Bitcoin Family",
  "Daily Movers",
  "Technology",
  "ETFs",
  "100 Most Popular",
  "Ethereum Family",
  "Upcoming Earnings",
  "HealthCare",
  "Tech,Media,&Telecom",
  "Energy",
  "Pharma",
  "Growth&Value ETFs",
  "Energy&Water"
];
const CalculateShareTotal = (userTransactions) => {
  let totalShareVal = 0
  for (let i = 0; i < userTransactions.length; i++) {
    let ele = useTransition[i]
    totalShareVal += ele.price * ele.quantity
  }
  return totalShareVal
}


const Portfolio = () => {
  const [showBP, setShowBP] = useState(false);
  const currentUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const userTransactions = useSelector(state => Object.values(state.transaction))
  const userId = Number(currentUser.id)
  const buyingPower = Number(currentUser.buying_power)
  useEffect(() => {
    dispatch(fetchUserTransactions(userId))
  }, [dispatch, userId])

  let totalVal = 0
  userTransactions.forEach(transaction => {
    totalVal += transaction.price * transaction.quantity
  })
  console.log('......', totalVal)

  const totalHolding = buyingPower + totalVal

  const clickBuyPower = () => {
    if (showBP) return
    setShowBP(true)
  }

  const clickDeposit = async () => {

  }


  useEffect(() => {
    if (!showBP) return;
    const closeshowBP = () => {
      setShowBP(false);
    }
    document.addEventListener('submit', closeshowBP);
    return () => document.removeEventListener('submit', closeshowBP)
  }, [showBP])


  return (
    <div className='body-wrapper'>
      <div className='body-container'>


        <div className='portfolio-wrapper'>
          <div className="pf-left-container">
            <div className='portfolio-chart-container'>
              <div className='chart-header'>
                <h1>${totalHolding}</h1>
                <p>+$88.88(+0.068%) Today</p>
              </div>
              <div className='pf-chart-wrapper'>
                <LineGraph />
              </div>
            </div>
            {/* <div className="newsfeed__buying__section">
        <h2> Buying Power</h2>
        <h2>${currentUser.buying_power}</h2>
      </div> */}

            <div className='buying-power-wrapper' onClick={clickBuyPower}>
              <h2>Buying Power</h2>
              <h2>${currentUser?.buying_power}</h2>
            </div>

            <div className="form-break"></div>

            {showBP && (

              <div className='buying-power-container'>
                <div className='deposit-funds'>
                  <div className='flex-between'>
                    <div>Brokerage Cash</div>
                    <div>${currentUser?.buying_power}</div>
                  </div>
                  <div className="form-break"></div>
                  <div className='flex-between'>
                    <div>Buying Power</div>
                    <div>${currentUser?.buying_power}</div>
                  </div>
                  <div className="form-break"></div>
                  <div className='addFundForm'>
                    <AddFundsForm />
                    <div className='deposit-message'>Buying Power represents the total value of assets you can purchase.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>


        <div className='watchlist-wrapper'></div>

      </div>

    </div>
  )


}

export default Portfolio;
