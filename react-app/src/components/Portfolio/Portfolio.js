import './Portfolio.css'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LineGraph from './LineGraph';
import TimePeriod from './TimePeriod';
import AddFundsForm from './AddFunds';

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

const Portfolio = () => {
  const [showBP, setShowBP] = useState(false);
  const currentUser = useSelector(state=> state.session.user)
  console.log(currentUser)
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
    <div className='portfolio-wrapper'>
      <div className="newsfeed-container"></div>
      <div className='portfolio-chart-container'>
        <div className='chart-header'>
          <h1>$185,856</h1>
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
      <div className='buying-power-div' >
        <div className='buying-power flex-between' onClick={clickBuyPower}>
          <h2>Buying Power</h2>
          <h2>${currentUser.buying_power}</h2>
        </div>

        {showBP && (

          <div id='add-funds' className='row hidden'>
            <div className='deposit-funds'>
              <div className='flex-between'>
                <div>Brokerage Cash</div>
                <div>${currentUser.buying_power}</div>
              </div>
              <div className='flex-between border-grey'>
                <div>Buying Power</div>
                <div>${currentUser.buying_power}</div>
              </div>
              <AddFundsForm />
            </div>
            <div className='deposit-message'>Buying Power represents the total value of assets you can purchase.</div>
          </div>
        )}
      </div>





    </div>
  )


}

export default Portfolio;
