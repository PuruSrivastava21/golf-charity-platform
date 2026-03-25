const Score = require("../models/Score");

const addScore = async (req, res) => {
  try {
    const userId = req.user.id;
    const { score, date } = req.body;

    // ✅ Validation (1–45)
    if (score < 1 || score > 45) {
      return res.status(400).json("Score must be between 1 and 45");
    }

    const existing = await Score.find({ userId }).sort({ createdAt: 1 });

    // Keep only last 5 scores
    if (existing.length >= 5) {
      await Score.findByIdAndDelete(existing[0]._id);
    }

    const newScore = await Score.create({
      userId,
      score,
      date
    });

    res.json(newScore);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getScores = async (req, res) => {
  try {
    const userId = req.user.id;

    const scores = await Score.find({ userId })
      .sort({ createdAt: -1 });

    res.json(scores);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { addScore, getScores };