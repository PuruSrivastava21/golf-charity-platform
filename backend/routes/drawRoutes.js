const express = require("express");
const { runDraw } = require("../controllers/drawController");

const router = express.Router();

// you can protect later with admin
router.get("/run", runDraw);

module.exports = router;