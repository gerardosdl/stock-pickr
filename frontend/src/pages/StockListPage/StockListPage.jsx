import { useState, useEffect } from "react";
import { Link } from "react-router";
import * as stockService from "../../services/stockService";

export default function StockListPage({ user }) {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    async function fetchStocks() {
      const stocks = await stockService.index();
      setStocks(stocks);
    }
    if (user) {
      fetchStocks();
    }
  }, [user]);

  return (
    <>
      <h1>Stock List</h1>
      {stocks.length ? (
        <main>
          {stocks.map((stock) => (
            <Link key={stock._id} to={`/stocks/${stock._id}`}>
              <article>
                <header>
                  <h2>{stock.name}</h2>
                  <p>
                    Added on {new Date(stock.createdAt).toLocaleDateString()}
                  </p>
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
