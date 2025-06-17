import { useState, useEffect } from "react";
import { Link } from "react-router";
import * as stockService from "../../services/stockService";
import StockFilter from "../../components/StockFilter/StockFilter";

export default function StockListPage({ user }) {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);

  useEffect(
    function () {
      async function fetchStocks() {
        const stocks = await stockService.index();
        setStocks(stocks);
        setFilteredStocks(stocks);
      }
      if (user) {
        fetchStocks();
      }
    },
    [user]
  );

  function handleFilter(filtered) {
    setFilteredStocks(filtered);
  }

  return (
    <>
      <h1>Stock List</h1>
      <StockFilter stocks={stocks} handleFilter={handleFilter} />
      {filteredStocks.length ? (
        <main>
          {filteredStocks.map((stock) => (
            <Link key={stock._id} to={`/stocks/${stock._id}`}>
              <article>
                <header>
                  <h2>
                    {stock.name} - Added on{" "}
                    {new Date(stock.createdAt).toLocaleDateString()}
                  </h2>
                </header>
              </article>
            </Link>
          ))}
        </main>
      ) : (
        <p>No Stocks Yet!</p>
      )}
    </>
  );
}
