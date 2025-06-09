import { useState, useEffect } from "react";
import * as stockService from "../../services/stockService";

export default function StockListPage() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    async function fetchStocks() {
      const stocks = await stockService.index();
      setStocks(stocks);
    }
    fetchStocks();
  }, []);

  return (
    <>
      <h1>Stock List</h1>
      {stocks.length ? (
        <ul>
          {stocks.map((stock) => (
            <li key={stock._id}>{stock.content}</li>
          ))}
        </ul>
      ) : (
        <p>No Stocks Yet!</p>
      )}
    </>
  );
}
