import { useState } from "react";
import { useNavigate } from "react-router";
import * as stockService from "../../services/stockService";

export default function NewStockPage() {
  const [formData, setFormData] = useState({
    symbol: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      // sendRequest is expecting an object as the payload
      await stockService.create(formData);
      navigate("/stocks");
    } catch (err) {
      if (
        err.message === "API rate limit reached. Please try again in a minute."
      ) {
        setErrorMsg("Please try again in a minute");
      } else {
        setErrorMsg("Adding Stock Failed");
      }
    }
  }

  return (
    <>
      <main>
        <h2>Add Stock</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="symbol-input">Ticker Symbol</label>
          <input
            type="text"
            name="symbol"
            id="symbol-input"
            value={formData.symbol}
            onChange={handleChange}
            placeholder="e.g. AAPL"
            required
          />
          <button type="submit">ADD STOCK</button>
        </form>
        <p className="error-message">&nbsp;{errorMsg}</p>
      </main>
    </>
  );
}
