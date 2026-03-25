import Score from "../models/Score.js";
import User from "../models/User.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    const scores = await Score.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    res.json({
      stats: {
        subscription: user.subscriptionStatus,
        winnings: 0,
        charity: 10,
      },
      scores,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};