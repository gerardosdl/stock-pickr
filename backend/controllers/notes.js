const Stock = require("../models/stock");

module.exports = {
  create,
  update,
  deleteNote,
};

async function create(req, res) {
  try {
    req.body.user = req.user._id;
    const stock = await Stock.findById(req.params.stockId);
    stock.notes.push(req.body);
    await stock.save();
    const newNote = stock.notes[stock.notes.length - 1];
    newNote._doc.user = req.user;
    res.status(201).json(newNote);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}
