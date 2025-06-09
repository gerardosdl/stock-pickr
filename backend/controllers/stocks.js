const Stock = require("../models/stock");

module.exports = {
  index,
  create,
};

async function index(req, res) {
  try {
    const stocks = await Stock.find({});
    // Below would return all stocks for just the logged in user
    // const stocks = await Post.find({author: req.user._id});
    res.json(stocks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch stocks" });
  }
}

async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const stock = await Stock.create(req.body);
    res.json(stock);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create stock" });
  }
}
