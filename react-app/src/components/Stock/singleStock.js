import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleStock } from '../../store/stocks';
import Stock from './Stock'
import './singleStock.css'
import Watchlists from '../Watchlist/allWatchlists';
import AddToWatchlist from '../Watchlist/addToWatchlist';
import TestingGraph from '../Portfolio/testingGraph'
import News from '../News/News';
const SingleStock = () => {
    const dispatch = useDispatch();
    const { stockId } = useParams();
    console.log('this is stockId__:', stockId)

    const singleStock = useSelector(state => state.stocks.singleStock)
    // console.log('this is state__:', useSelector(state => state))
    // console.log('this is singleStock__:', singleStock)

    useEffect(() => {
        dispatch(getSingleStock(stockId))
        // .then(() => setIsLoaded(true))
    }, [dispatch, stockId])

    return (
        <div className='single_stock_wrapper'>
            <div>
                <h2>{singleStock.name}</h2>
                <h1>${singleStock.price}</h1>
                {/* <Stock /> */}
                <TestingGraph stockId={stockId}/>
                <h2 className='header_label'>About (dynamic)</h2>
                <div className='stock_description'>
                    <p>{singleStock.description}</p>
                </div>

                <div className='stock_details'>
                    <div>
                        <div className='detail_label'>Ceo</div>
                        <p className='detail_details'>{singleStock.ceo}</p>
                    </div>
                    <div>
                        <div className='detail_label'>Employees</div>
                        <p className='detail_details'>{singleStock.employees}</p>
                    </div>
                    <div>
                        <div className='detail_label'>Headquarters</div>
                        <p className='detail_details'>{singleStock.headquarter}</p>
                    </div>
                    <div>
                        <div className='detail_label'>Founded</div>
                        <p className='detail_details'>{singleStock.founded}</p>
                    </div>
                </div>

                <h2 className='header_label'>Key statistics (hard coded)</h2>
                <div className='stock_details'>
                    <div>
                        <div className='detail_label'>Market cap</div>
                        <p className='detail_details'>602.97B</p>
                    </div>
                    <div>
                        <div className='detail_label'>Price-Earnings ratio</div>
                        <p className='detail_details'>60.55</p>
                    </div>
                    <div>
                        <div className='detail_label'>Dividend yield</div>
                        <p className='detail_details'>--</p>
                    </div>
                    <div>
                        <div className='detail_label'>Average volume</div>
                        <p className='detail_details'>97.00M</p>
                    </div>
                    <div>
                        <div className='detail_label'>High today</div>
                        <p className='detail_details'>$195.73</p>
                    </div>
                    <div>
                        <div className='detail_label'>Low today</div>
                        <p className='detail_details'>$186.34</p>
                    </div>
                    <div>
                        <div className='detail_label'>Open price</div>
                        <p className='detail_details'>$192.70</p>
                    </div>
                    <div>
                        <div className='detail_label'>Volume</div>
                        <p className='detail_details'>$92.23</p>
                    </div>
                    <div>
                        <div className='detail_label'>52 Week High</div>
                        <p className='detail_details'>$402.67</p>
                    </div>
                    <div>
                        <div className='detail_label'>52 Week Low</div>
                        <p className='detail_details'>$177.12</p>
                    </div>
                </div>

                <h2 className='header_label'>Related lists</h2>
                <div className='stock_description'>
                    Insert Data Here
                </div>

                <h2 className='header_label'>News (hard coded)</h2>
                <div className='stock_description' id='news_list'>
                    <News />
                </div>

                <h2 className='header_label'>Analyst ratings (images)</h2>
                <div className='stock_description'>
                    <div className='analyst_rating'></div>
                </div>

                <h2 className='header_label'>Earnings (images)</h2>
                <div className='stock_description'>
                    <div className='earnings'></div>
                </div>

                <h2 className='header_label'>Shareholder Q&As</h2>
                <div className='stock_description'>
                    Insert Data Here
                </div>

                <h2 className='header_label'>People also own</h2>
                <div className='stock_description'>
                    Insert Data Here
                </div>

                <small>All investments involve risks, including the loss of principal. Securities trading offered through Robinhood Financial LLC, Member SIPC and a registered broker-dealer.</small>

            </div>

            <div className='watchlist'>

                {/* <Watchlists /> */}
                <AddToWatchlist />
            </div>
        </div>

    )
}

export default SingleStock
