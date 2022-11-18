import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Line } from "react-chartjs-2";
import * as stockActions from '../../store/stocks'

function TestingGraph() {
    const [graphData, setGraphData] = useState([]);
    // const []
    const [isActive, setIsActive] = useState(false)
    const dispatch = useDispatch()
    const stockObj = useSelector(state=>state.stocks.singleStock)
    const stockId = stockObj.id
    const StockSymbol = stockObj.symbol

    useEffect(() => {
      dispatch(stockActions.getSingleStock(stockId))
      fetchLiveStock()
    }, [dispatch, stockId])

    // useEffect(() => {
    //   // createMockData();
    // }, []);



    const handleTpClick = (timeSpan) => {
      console.log(timeSpan)
      fetchLiveStock(timeSpan)

      // createMockData();
      setIsActive(current => !current)
    }



    function fetchLiveStock(timeSpan) {
      let dataArr = []
      const API_KEY = 'FZ0Z77IPDL0DZW40';
      const API_KEY2 = 'VKXG6NIW2LT1ELQ8'
      let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=full&apikey=${API_KEY2}`;
      let limit;
      // console.log(timeSpan)

      switch (timeSpan) {
        case 20:
          limit = 20
        case 60:
          limit = 60
        case 240:
          limit = 240
        case 720:
          limit = 720
        case 1200:
          limit = 1200
        default:
        limit = 60;
      }


      fetch(API_Call)
      .then(
        function (response) {
          return response.json()
        }
        )
        .then(
          function (data) {
          console.log('////////////////////rt', data)
            let counter = 0;
            for (var key in data['Time Series (Daily)']) {
              if(counter >= 1200) break;
              let value = Number(data['Time Series (Daily)'][key]['1. open'])
              let value2 = Number(data['Time Series (Daily)'][key]['3. low'])
              let date = new Date(key)
              date.setHours(0, 0, 0, 0);
              dataArr.push({x: date, y: value})
              // dataArr.push({x: date, y: value2})
              counter++
              }
              // console.log('-------graphdataBEFORE-----------',dataArr)
              setGraphData(dataArr)
          }
          )
          console.log('-------graphdataFS------------', graphData)
        }

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
          console.log('-------graphdata------------', graphData)
    };


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
                  <div className='timeperiod__button active'onClick={()=>handleTpClick('day')}>1D</div>
                  <div className="timeperiod__button" onClick={()=>handleTpClick('week')}>1W</div>
                  <div className="timeperiod__button active" onClick={()=>handleTpClick(20)}>1M</div>
                  <div className="timeperiod__button" onClick={()=>handleTpClick(60)}>3M</div>
                  <div className="timeperiod__button" onClick={()=>handleTpClick(240)}>1Y</div>
                  <div className="timeperiod__button" onClick={()=>handleTpClick(720)}>3Y</div>
                  <div className="timeperiod__button" onClick={()=>handleTpClick(1200)}>5Y</div>
              </div>
          </div> */}
      </div>

    );
  }


  export default TestingGraph
