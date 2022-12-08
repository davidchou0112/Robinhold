import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllStocks } from '../../store/stocks'
import './NavBar.css'


const SearchBar = () => {
  const dispatch = useDispatch()



  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const stocks = useSelector(state => state.stocks.allStocks);
  const test_stocks = Object.values(stocks)
  // const test_stock = [{ "name": 'stock1', "id": 1 }, { "name": 'stock2', "id": 2 }, { "name": 'stock3', "id": 3 }, { "name": 'stock4', "id": 4 }, { "name": 'stock4', "id": 4 }, { "name": 'stock4', "id": 4 }, { "name": 'stock4', "id": 4 }]

  useEffect(() => {
    dispatch(getAllStocks())
  }, [dispatch])


  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = test_stocks.filter((value) => {
      return value.symbol.toUpperCase().startsWith(searchWord.toUpperCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className='search_wrapper'>
      <div className="searchInputs">
        <i id='search_icon' className="fa-solid fa-magnifying-glass"></i>
        <input
          name="search"
          type="text"
          placeholder="Search"
          value={wordEntered}
          onChange={handleFilter}
        />

      </div>
      <div className='searchall'>
        {filteredData.length !== 0 && (
          <div className='dataResult'>
            {filteredData.map((value, key) => {
              return <NavLink className='dataItem' key={value.id} to={`/stocks/${value.id}`} onClick={clearInput}>
                <p className='dataName'>{value.symbol}</p></NavLink>
            })}
          </div>
        )}
      </div>
    </div>


  )
}


export default SearchBar;
