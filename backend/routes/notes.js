const express = require("express");
const router = express.Router();
const notesCtrl = require("../controllers/notes");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

// All paths start with '/api'

// Protect all defined routes
router.use(ensureLoggedIn);

// POST / api/stocks/:stockId/notes (CREATE action)
router.post("/stocks/:stockId/notes", notesCtrl.create);
// PUT / api/notes/:noteId(EDIT action)
router.put("/notes/:noteId", notesCtrl.update);
// DELETE / api/notes/:noteId (DELETE action)
router.delete("/notes/:noteId", notesCtrl.deleteNote);

module.exports = router;
