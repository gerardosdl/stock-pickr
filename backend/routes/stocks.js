const express = require("express");
const router = express.Router();
const stocksCtrl = require("../controllers/stocks");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

// All paths start with '/api/stocks'

// Protect all defined routes
router.use(ensureLoggedIn);

// GET /api/stocks (INDEX action)
router.get("/", stocksCtrl.index);
// POST / api/stocks (CREATE action)
router.post("/", stocksCtrl.create);
// SHOW / api/stocks/:stockId (SHOW action)
router.get("/:stockId", stocksCtrl.show);

module.exports = router;
