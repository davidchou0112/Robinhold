import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import './Portfolio.css'

function LineGraph() {
  const [graphData, setGraphData] = useState([]);
  const [isActive, setIsActive] = useState(false)
  const handleTpClick = async (e) => {
    createMockData()
    setIsActive(current => !current)
  }

  const createMockData = () => {
    let data = [];
    let value = 50;
    for (var i = 0; i < 366; i++) {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(i);
      value += Math.round((Math.random() < 0.5 ? 9 : 0) * Math.random() * 10);
      data.push({ x: date, y: value });
    }
    setGraphData(data);
  };
  useEffect(() => {
    createMockData();
  }, []);

  return (
    <>
    <div className="pf-graph">
      <Line
        data={{
          datasets: [
            {
              type: "line",
              data: graphData,
              backgroundColor: "black",
              borderColor: "#5AC53B",
              borderWidth: 2,
              pointBorderColor: "rgba(0,0,0,0)",
              pointBackgroundColor: "rgba(0,0,0,0)",
              pointHoverBackgroundColor: "#5AC53B",
              pointHoverBorderColor: "#000000",
              pointHoverBorderWidth: 4,
              pointHoverRadius: 6,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  format: "MM/DD/YY",
                  tooltipFormat: "ll",
                },
                ticks: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
      </div>
        <div className="timeperiod__container">
            <div className="timeperiod__buttons__container">
                <div className='timeperiod__button active' onClick={handleTpClick}>1D</div>
                <div className="timeperiod__button" onClick={handleTpClick}>1W</div>
                <div className="timeperiod__button" onClick={handleTpClick}>1M</div>
                <div className="timeperiod__button" onClick={handleTpClick}>3M</div>
                <div className="timeperiod__button" onClick={handleTpClick}>YTD</div>
                <div className="timeperiod__button" onClick={handleTpClick}>1Y</div>
                <div className="timeperiod__button" onClick={handleTpClick}>ALL</div>
            </div>
        </div>
    </>

  );
}

export default LineGraph;
