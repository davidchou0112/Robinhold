import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './News.css'

const News = () => {
    return (
        <div>
            <div>
                <a className='news_link' href='https://www.theatlantic.com/technology/archive/2022/10/elon-musk-twitter-nightmare-scenarios/671906/'>
                    <div className='news_box'>
                        <div className='site_name'>
                            <p id='transparant_me'>The Atlantic</p>
                        </div>
                        <div className='news_title'>
                            <p id='transparant_me'>How Elon Musk Could Actually Kill Twitter</p>
                        </div>
                        <div className='news_description'>
                            <p id='transparant_me'>Journalists have been declaring Twitter dead for nearly a decade. Observers see flagging user numbers or feel an amorphous, grim vibe shift and pounce, often prematurely.</p>
                        </div>
                    </div>
                    <div className='news1'></div>
                </a>
            </div>
            <br></br>
            <a className='news_link' href='https://www.benzinga.com/markets/asia/22/11/29759701/tencent-stake-cut-in-meituan-sends-hang-seng-down-over-2-5-alibaba-ev-shares-take-a-hit'>
                <div className='news_box'>
                    <div className='site_name'>
                        <p id='transparant_me'>Benzinga</p>
                    </div>
                    <div className='news_title'>
                        <p id='transparant_me'>Tencent Stake-Cut In Meituan Sends Hang Seng Down Over 2.5%: Alibaba, EV Shares Take A Hit</p>
                    </div>
                    <div className='news_description'>
                        <p id='transparant_me'>Hong Kong stocks opened in the red on Thursday, with the benchmark Hang Seng losing over 2.5% in morning trade, following news of Tencent cutting its $20 billion stake in Meituan.</p>
                    </div>
                </div>
                <div className='news2'></div>
            </a>
            <br></br>
            <a className='news_link' href='https://www.cnbc.com/2022/11/17/amazon-is-looking-to-trim-headcount-through-a-voluntary-buyout-program.html'>
                <div className='news_box'>
                    <div className='site_name'>
                        <p id='transparant_me'>CNBC</p>
                    </div>
                    <div className='news_title'>
                        <p id='transparant_me'>Amazon Is Looking To Trim Headcount Through A Voluntary Buyout Program</p>
                    </div>
                    <div className='news_description'>
                        <p id='transparant_me'>Amazon is offering voluntary buyouts to some employees inside the company, as it looks for ways to trim its headcount beyond the massive layoffs already underway.</p>
                    </div>
                </div>
                <div className='news3'></div>
            </a>
            <br></br>
            <a className='news_link' href='https://finance.yahoo.com/news/top-trending-stocks-after-hours-nvidia-cisco-sonos-and-more-232448502.html'>
                <div className='news_box'>
                    <div className='site_name'>
                        <p id='transparant_me'>Yahoo Finance</p>
                    </div>
                    <div className='news_title'>
                        <p id='transparant_me'>Top Trending Stocks After Hours: Nvidia, Cisco, Sonos And More</p>
                    </div>
                    <div className='news_description'>
                        <p id='transparant_me'>Cisco (CSCO): Shares rose in extended trading after the company reported solid quarterly sales and raised its full-year guidance. Cisco now sees revenue growth of 4.5% to 6.5%, up from its prior forecast of 4% to 6%.</p>
                    </div>
                </div>
                <div className='news4'></div>
            </a>
        </div>
    )
}

export default News;