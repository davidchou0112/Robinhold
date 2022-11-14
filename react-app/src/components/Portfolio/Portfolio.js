import './Portfolio.css'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LineGraph from './LineGraph';
import TimePeriod from './TimePeriod';
import Chip from '@material-ui/core/Chip';
import { Avatar } from "@material-ui/core";
import AddFundsModal from './AddFundModal';

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


  const clickBuyPower = () => {
    if (showBP) return;
    setShowBP(true)
  }

  const clickDeposit = async () => {

  }

  useEffect(() => {
    if (!showBP) return;
    const closeshowBP = () => {
      setShowBP(false);
    }
    document.addEventListener('click', closeshowBP);
    return () => document.removeEventListener('click', closeshowBP)
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
          {/* <TimePeriod /> */}
        </div>
      </div>
      <div className="newsfeed__buying__section">
        <h2> Buying Power</h2>
        <h2> $2586.11</h2>
      </div>
      <div className="newsfeed__market__section">
        <div className="newsfeed__market__box">
        </div>
      </div>
      <div className="newsfeed__popularlists__section">
        <div className="newsfeed__popularlists__intro">
          <h1>Trending lists</h1>
          <p>Show More</p>
        </div>
        <div className="newsfeed_popularlists_badges">
          {popularTopics.map((topic) => (
            <Chip
              className="topic__badge"
              variant="outlined"
              label={topic}
              avatar={
                <Avatar
                  src={`https://avatars.dicebear.com/api/human/${topic}.svg`}
                />
              }
            />
          ))}
          {/* <p>{watchlistArr['watched_stocks']}</p> */}
        </div>
      </div>


      <div className='buying-power-div' >
        <div className='buying-power flex-between' onClick={clickBuyPower}>
          <div>Buying Power</div>
          <div>$158,265</div>
        </div>

        {showBP && (

          <div id='add-funds' className='row hidden'>
            <div className='deposit-funds'>
              <div className='flex-between'>
                <div>Brokerage Cash</div>
                <div>$158,265</div>
              </div>
              <div className='flex-between border-grey'>
                <div>Buying Power</div>
                <div>$158,265</div>
              </div>
              {/* <div className='width-full'>
                    <button className='deposit-button'>Deposit Funds</button>
                    </div> */}
              <div>
                <AddFundsModal />
              </div>
              <div></div>
            </div>
            <div className='deposit-message'>Buying Power represents the total value of assets you can purchase.</div>
          </div>
        )}
      </div>



    </div>
  )


}

export default Portfolio;
