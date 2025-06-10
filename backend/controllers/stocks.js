const Stock = require("../models/stock");

module.exports = {
  index,
  create,
  show,
};

async function index(req, res) {
  try {
    const stocks = await Stock.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(stocks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch stocks" });
  }
}

async function create(req, res) {
  try {
    const ticker = req.body.symbol;

    const priceRes = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`
    );
    const priceData = await priceRes.json();
    const price = priceData?.results?.[0]?.c;

    const nameRes = await fetch(
      `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${process.env.POLYGON_API_KEY}`
    );
    const nameData = await nameRes.json();
    const name = nameData?.results?.name;

    if (!price || !name) {
      return res.status(400).json({ message: "Invalid symbol or API error" });
    }

    const stock = await Stock.create({
      symbol: ticker,
      name,
      priceAddedAt: price,
      user: req.user._id,
    });
    res.json(stock);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create stock" });
  }
}

async function show(req, res) {
  try {
    const stock = await Stock.findOne({
      _id: req.params.stockId,
      user: req.user._id,
    });
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    const priceRes = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${stock.symbol}/prev?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`
    );
    const priceData = await priceRes.json();
    const currentPrice = priceData?.results?.[0]?.c;

    res.status(200).json({
      ...stock.toObject(),
      currentPrice,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stock" });
  }
}
