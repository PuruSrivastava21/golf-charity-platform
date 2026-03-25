const express = require("express");
const { addScore, getScores } = require("../controllers/scoreController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();
const { checkSubscription } = require("../middleware/subscriptionMiddleware");

router.post("/", verifyToken, checkSubscription, addScore);

router.post("/", verifyToken, addScore);
router.get("/", verifyToken, getScores);

module.exports = router;