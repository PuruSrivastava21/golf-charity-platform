const Draw = require("../models/Draw");
const Score = require("../models/Score");
const User = require("../models/User");

// 🎯 Generate 5 random numbers (1–45)
const generateNumbers = () => {
  const nums = new Set();
  while (nums.size < 5) {
    nums.add(Math.floor(Math.random() * 45) + 1);
  }
  return [...nums];
};

// 💰 Jackpot (carry forward)
let jackpot = 5000;

// 🚀 Run Draw
const runDraw = async (req, res) => {
  try {
    const numbers = generateNumbers();

    await Draw.create({
      numbers,
      date: new Date()
    });

    const users = await User.find();

    let winners3 = [];
    let winners4 = [];
    let winners5 = [];

    for (let user of users) {
      const scores = await Score.find({ userId: user._id });

      const userNums = scores.map(s => s.score);

      const matches = userNums.filter(n => numbers.includes(n)).length;

      if (matches === 3) winners3.push(user);
      if (matches === 4) winners4.push(user);
      if (matches === 5) winners5.push(user);
    }

    // 💰 Simulated pool (based on subscribers)
    const activeUsers = users.filter(u => u.subscriptionStatus === "Active").length;
    const totalPool = activeUsers * 500; // ₹500 per user

    // 🎁 Distribution
    const pool5 = totalPool * 0.40 + jackpot;
    const pool4 = totalPool * 0.35;
    const pool3 = totalPool * 0.25;

    const payout = [];

    // 🧮 Helper for splitting
    const distribute = (winners, pool, match) => {
      if (winners.length === 0) return;

      const share = Math.floor(pool / winners.length);

      winners.forEach(user => {
        const charity = Math.floor(share * 0.10);
        const finalAmount = share - charity;

        payout.push({
          user: user.email,
          match,
          winAmount: share,
          charity,
          finalAmount
        });
      });
    };

    distribute(winners5, pool5, 5);
    distribute(winners4, pool4, 4);
    distribute(winners3, pool3, 3);

    // 🔥 Jackpot logic
    if (winners5.length === 0) {
      jackpot += pool5;
    } else {
      jackpot = 5000; // reset
    }

    res.json({
      drawNumbers: numbers,
      totalPool,
      jackpot,
      winners: payout
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { runDraw };