const express = require("express");
const { createCheckout, activateSubscription } = require("../controllers/subscriptionController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", verifyToken, createCheckout);
router.post("/activate", verifyToken, activateSubscription);

module.exports = router;