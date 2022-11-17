import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";


function TestingGraph() {
    const [graphData, setGraphData] = useState([]);
    const [isActive, setIsActive] = useState(false)

    const API_KEY = 'FZ0Z77IPDL0DZW40';
    let StockSymbol = 'AAPL';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;

    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];


    const handleTpClick = async (e) => {
      createMockData()
      setIsActive(current => !current)
    }

    // function fetchStock() {
    //   let dataArr = []
    //   let stockChartXValuesFunction = [];
    //   let stockChartYValuesFunction = [];
    //   fetch(API_Call)
    //   .then(
    //     function (response) {
    //       return response.json()
    //     }
    //     )
    //     .then(
    //       function (data) {
    //       // console.log('////////////////////rt', data)
    //         for (var key in data['Time Series (Daily)']) {
    //           let value = data['Time Series (Daily)'][key]['1. open']
    //             // console.log('-------key------------', key)
    //             // console.log('---------value----------', value)
    //             // stockChartXValuesFunction.push(key);
    //             // stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
    //             dataArr.push({x: key, y: value})
    //             // dataArr.push({x: key, y: data['Time Series (Daily)'][key]['1. open']})
    //           }
    //           // console.log('-------graphdataBEFORE-----------',dataArr)
    //       })
    //       setGraphData(dataArr)
    //     }
    // console.log('-------graphdata------------', graphData)

    const createMockData = () => {
      let data = [];
      let value = 50;
      for (var i = 0; i < 366; i++) {
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        date.setDate(i);
        value += Math.round((Math.random() < 0.5 ? 9 : 0) * Math.random() * 10);
        // console.log('========date=========', date)
        // console.log('========value=========', value)
        data.push({ x: date, y: value });
      }
      setGraphData(data);
    };

    useEffect(() => {
      createMockData();
      // fetchStock()
    }, []);

    return (
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
          {/* <div className="timeperiod__container">
              <div className="timeperiod__buttons__container">
                  <div className='timeperiod__button active' onClick={handleTpClick}>1D</div>
                  <div className="timeperiod__button" onClick={handleTpClick}>1W</div>
                  <div className="timeperiod__button" onClick={handleTpClick}>1M</div>
                  <div className="timeperiod__button" onClick={handleTpClick}>3M</div>
                  <div className="timeperiod__button" onClick={handleTpClick}>YTD</div>
                  <div className="timeperiod__button" onClick={handleTpClick}>1Y</div>
                  <div className="timeperiod__button" onClick={handleTpClick}>ALL</div>
              </div>
          </div> */}
      </div>

    );
  }


  export default TestingGraph
