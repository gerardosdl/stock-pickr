const Stock = require("../models/stock");

module.exports = {
  index,
  create,
  show,
  deleteStock,
};

async function index(req, res) {
  try {
    const stocks = await Stock.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stocks" });
  }
}

async function create(req, res) {
  try {
    const ticker = req.body.symbol;

    const priceRes = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`
    );

    if (priceRes.status === 429) {
      return res.status(429).json({
        message: "API rate limit reached. Please try again in a minute.",
      });
    }

    const priceData = await priceRes.json();
    const price = priceData?.results?.[0]?.c;

    const nameRes = await fetch(
      `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${process.env.POLYGON_API_KEY}`
    );

    if (nameRes.status === 429) {
      return res.status(429).json({
        message: "API rate limit reached. Please try again in a minute.",
      });
    }

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
    res.status(400).json({ message: "Failed to create stock" });
  }
}

async function show(req, res) {
  try {
    const stock = await Stock.findById(req.params.stockId)
      .populate("user")
      .populate("notes.user");

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    if (!stock.user.equals(req.user._id)) {
      return res.status(403).send("Access denied");
    }
    const priceRes = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${stock.symbol}/prev?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`
    );

    if (priceRes.status === 429) {
      return res.status(429).json({
        message: "API rate limit reached. Please try again in a minute.",
      });
    }

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

async function deleteStock(req, res) {
  try {
    const stock = await Stock.findById(req.params.stockId);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    if (!stock.user.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }
    const deletedStock = await Stock.findByIdAndDelete(req.params.stockId);
    res.status(200).json(deletedStock);
  } catch (err) {
    res.status(500).json({ message: "failed to delete stock" });
  }
}
