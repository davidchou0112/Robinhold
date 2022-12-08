import React from 'react';
import Plot from 'react-plotly.js'
import { NavLink } from 'react-router-dom';
import './Stock.css';


class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: []
        }
    }

    componentDidMount() {
        this.fetchStock();
    }

    fetchStock() {
        const pointerToThis = this;
        // console.log(pointerToThis);
        const API_KEY = 'FZ0Z77IPDL0DZW40';
        let StockSymbol = 'AAPL';
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AAPL&outputsize=compact&apikey=${API_KEY}`;

        // let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${-----}&outputsize=compact&apikey=${API_KEY}`;

        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        fetch(API_Call)
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                function (data) {
                    // console.log(data);

                    for (var key in data['Time Series (Daily)']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                    }

                    // console.log(stockChartXValuesFunction);
                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction
                    });
                }
            )
    }

    render() {
        return (
            <div>
                <h1>Stock Market</h1>
                {/* <Line
        /> */}
                <Plot
                    data={[
                        {
                            x: this.state.stockChartXValues,
                            y: this.state.stockChartYValues,
                            type: 'scatter',
                            mode: 'lines',
                            marker: { color: 'green' },
                            showgrid: false,
                            showlegend: false
                        }
                    ]}
                    layout={{ width: 720, height: 440, title: 'AAPL', showgrid: false, showlegend: false,
                              paper_bgcolor: 'purple', plot_bgcolor: 'purple'
                }}
                />
            </div>
        )
    }
}

export default Stock;
