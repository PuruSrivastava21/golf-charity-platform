const stripe = require("stripe")(process.env.STRIPE_SECRET);
const User = require("../models/User");

const createCheckout = async (req, res) => {
  const { plan } = req.body;

  const price = plan === "yearly" ? 500000 : 50000;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: plan === "yearly" ? "Yearly Plan" : "Monthly Plan",
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:5173/dashboard",
    cancel_url: "http://localhost:5173/dashboard",
  });

  res.json({ url: session.url });
};

const activateSubscription = async (req, res) => {
  try {
    const userId = req.user.id;

    await User.findByIdAndUpdate(userId, {
      subscriptionStatus: "Active",
    });

    res.json({ message: "Subscription Activated" });

  } catch (err) {
    res.status(500).json(err.message);
  }
};



module.exports = { createCheckout, activateSubscription };