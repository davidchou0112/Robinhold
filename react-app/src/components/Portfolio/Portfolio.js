import './Portfolio.css'
import React from 'react';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
// import { getBuyingPower } from '../../store/portfolio';


const Portfolio = () => {
  // const dispatch = useDispatch();
  // const { userId } = useParams();

  const buyingPower = useSelector(state => state.session.user.buying_power)
  console.log('buyingPower:', useSelector(state => state.session.user.buying_power))

  const watchlist = useSelector(state => state.session.user.watchlists)
  console.log('watchlist:', watchlist)

  const watchlistArr = Object.entries(watchlist);
  console.log('watchlistArr:', watchlistArr)
  console.log('watched_stocks:', watchlistArr['watched_stocks'])
  // useEffect(() => {
  //   dispatch(getBuyingPower(userId))
  // }, [])

  // return 'this shows the portfolio page when a user is logged in'
  return (
    <div className='port_wrapper'>

      <div className='port_left'>
        <div>
          Total investment money chart section
        </div>

        <div className='buying_power'>
          buying power
          <p>${buyingPower}</p>
        </div>

      </div>

      <div className='port_left'>
        <div>
          stocks holding section


        </div>
        <div>
          watchlists section
          {/* <p>{watchlistArr['watched_stocks']}</p> */}
        </div>
      </div>
    </div>
  )


}

export default Portfolio;
