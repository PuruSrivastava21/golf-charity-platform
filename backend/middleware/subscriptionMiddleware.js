const User = require("../models/User");

const checkSubscription = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.subscriptionStatus !== "Active") {
    return res.status(403).json("Subscription required");
  }

  next();
};

module.exports = { checkSubscription };