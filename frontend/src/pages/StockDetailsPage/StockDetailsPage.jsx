import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import * as stockService from "../../services/stockService";

export default function StockDetailsPage({ user }) {
  const { stockId } = useParams();
  console.log("stockId", stockId);
  const [stock, setStock] = useState(null);

  useEffect(() => {
    async function fetchStock() {
      const stockData = await stockService.show(stockId);
      setStock(stockData);
    }
    fetchStock();
  }, [stockId]);

  console.log("stock state:", stock);

  if (!stock) return <main>Loading...</main>;
  return (
    <main>
      <section>
        <header>
          <h1>{stock.symbol}</h1>
          <p>Company name: {stock.name}</p>
          <p>Current Price: {stock.currentPrice}</p>
          <p>Price when added: {stock.priceAddedAt}</p>
          <p>Added on: {new Date(stock.createdAt).toLocaleDateString()}</p>
        </header>
      </section>
    </main>
  );
}
