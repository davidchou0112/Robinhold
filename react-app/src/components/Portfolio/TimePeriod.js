import React from 'react'
import './timePeriod.css'

function TimePeriod() {
    return (
        <div className="timeperiod__container">
            <div className="timeperiod__buttons__container">
                <div className="timeperiod__button active">1D</div>
                <div className="timeperiod__button">1W</div>
                <div className="timeperiod__button">1M</div>
                <div className="timeperiod__button">3M</div>
                <div className="timeperiod__button">YTD</div>
                <div className="timeperiod__button">1Y</div>
                <div className="timeperiod__button">ALL</div>
            </div>
        </div>
    )
}

export default TimePeriod
