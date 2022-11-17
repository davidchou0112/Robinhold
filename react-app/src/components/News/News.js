import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './News.css'

const News = () => {
    return (
        <div>
            <div>
                <a className='news_link' href='https://finance.yahoo.com/news/musks-short-reign-at-twitter-has-been-chaotic-dont-count-him-out-182828565.html'>
                    <div className='news_box'>
                        <div className='site_name'>
                            <p id='transparant_me'>Yahoo Finance</p>
                        </div>
                        <div className='news_title'>
                            <p id='transparant_me'>Musk's Reign At Twitter Has Been Chaotic. Don't Count Him Out.</p>
                        </div>
                        <div className='news_description'>
                            <p id='transparant_me'>Elon Musk’s takeover of Twitter spurred chaos from the get-go. From bungled mass layoffs, to the launch of a verification system that Twitter halted days after its release, Musk’s first weeks have, rightfully, raised doubts about his ability to run the micro-blogging site.</p>
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
                        <p id='transparant_me'>Alibaba, Nio Stocks Fall: Hang Seng Index Today - Alibaba Group Holding - Benzinga</p>
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
            <a className='news_link' href='https://finance.yahoo.com/quote/TSLA/'>
                <div className='news_box'>
                    <div className='site_name'>
                        <p id='transparant_me'>FINANCIAL TIMES</p>
                    </div>
                    <div className='news_title'>
                        <p id='transparant_me'>Autumn Statement Live Updates: What Jeremy Hunt Has Achieved So Far</p>
                    </div>
                    <div className='news_description'>
                        <p id='transparant_me'>UK: Chancellor Jeremy Hunt will deliver a fiscal statement to the House of Commons at 11.30am. He is expected to announce tax increases and cuts to public services in a bid to plug a “fiscal hole” in the country’s public finances.</p>
                    </div>
                </div>
                <div className='news4'></div>
            </a>
        </div>
    )
}

export default News;